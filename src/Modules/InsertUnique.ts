'use strict';

// External Modules
import * as Crypto from 'crypto';
import Moment from 'moment';
import { r as RethinkDB } from 'rethinkdb-ts';
import { run } from 'src';

// Types
import { WriteResult, RDatum } from 'rethinkdb-ts';
export interface UniqueParameters
{
	type: string;
	hash: object;
	lifetime?: Moment.Duration;
};
export interface Unique
{
	id: string;
	type: string;
	hash: string;
	count: number;
	created: number;
};
export interface Result <GenericInsert extends RDatum<WriteResult>>
{
	conflict: boolean;
	unique?: ResultUnique | null;
	insert?: RDatumValue <GenericInsert> | null;
	delete?: WriteResult | null;
};
export interface ResultUnique
{
	result: WriteResult <Unique>;
	document?: Unique;
};
type RDatumValue <T> = T extends RDatum<infer V> ? V : never;

// Constants
const DEFAULT_LIFETIME_MILLISECONDS = Moment.duration({minutes: 5}).asMilliseconds();
const UNIQUE_FIELD_NAME = 'unique';
const CONFLICT_FIELD_NAME = 'conflict';

export class InsertUnique
{
	public readonly table: string;
	constructor({table}: {table: string})
	{
		this.table = table;
	};
	public insert = insert;
};

async function insert <GenericConflict extends RDatum<boolean>, GenericInsert extends RDatum<WriteResult>>
(
	this: InsertUnique,
	{
		conflict: conflictQuery,
		unique,
		insert: insertQuery
	}:
	{
		conflict: GenericConflict,
		unique: UniqueParameters,
		insert: GenericInsert
	}
)
{
	const uniqueParameters = Object.assign({}, unique, {instance: this});
	const query = RethinkDB
		.expr({conflict: conflictQuery})
		.merge
		(
			(result: RDatum) =>
			(
				{
					[UNIQUE_FIELD_NAME]: RethinkDB
						.branch
						(
							result(CONFLICT_FIELD_NAME).eq(true),
							null,
							RethinkDB.expr({result: generateUniqueQuery(uniqueParameters)})
						)
				}
			)
		)
		.merge
		(
			(result: RDatum) =>
			(
				{
					[UNIQUE_FIELD_NAME]: RethinkDB.branch
					(
						RethinkDB.or
						(
							result(UNIQUE_FIELD_NAME).eq(null),
							result(UNIQUE_FIELD_NAME)('result')('errors').gt(0)
						),
						null,
						result(UNIQUE_FIELD_NAME).merge({document: result(UNIQUE_FIELD_NAME)('result')('changes').nth(0)('new_val')})
					)
				}
			)
		)
		.merge
		(
			(result: RDatum) =>
			(
				{
					conflict: RethinkDB.branch
					(
						result(UNIQUE_FIELD_NAME).eq(null),
						result(CONFLICT_FIELD_NAME),
						result(UNIQUE_FIELD_NAME)('document')('count').ne(1)
					)
				}
			)
		)
		.merge
		(
			(result: RDatum) =>
			(
				{
					insert: RethinkDB.branch
					(
						RethinkDB.or
						(
							result(UNIQUE_FIELD_NAME).eq(null),
							result(UNIQUE_FIELD_NAME)('result')('errors').gt(0),
							result(CONFLICT_FIELD_NAME).eq(true)
						),
						null,
						insertQuery
					)
				}
			)
		)
		.merge
		(
			(result: RDatum) =>
			(
				{
					delete: RethinkDB.branch
					(
						result('insert').eq(null),
						null,
						RethinkDB
							.table(this.table)
							.get(result(UNIQUE_FIELD_NAME)('document')('id'))
							.delete()
					)
				}
			)
		);
	const result: Result <GenericInsert> = await run({query, options: {throwRuntime: true}});
	if (result.conflict)
	{
		throw new InsertUniqueConflictError({result});
	};
	return result;
};

/** Generates query to insert unique document. */
function generateUniqueQuery({type, hash: hashObject, lifetime, instance}: UniqueParameters & {instance: InsertUnique})
{
	const lifetimeMilliseconds = lifetime ? lifetime.asMilliseconds() : DEFAULT_LIFETIME_MILLISECONDS;
	const hashObjectString = JSON.stringify(hashObject);
	const hash = Crypto.createHash('sha1').update(hashObjectString).digest('base64');
	const id = type + '-' + hash;
	const query = RethinkDB
		.table(instance.table, {readMode: 'majority'})
		.get(id)
		.replace
		(
			(document: RDatum<Unique>) => document
				.do
				(
					RethinkDB.branch
					(
						RethinkDB.and
						(
							document.ne(null),
							RethinkDB.now().toEpochTime().mul(1000).gt(document('created').add(lifetimeMilliseconds))
						),
						null,
						document
					)
				)
				.do
				(
					(document: RDatum<Unique>) =>
					{
						const newDocument: Unique =
						{
							id,
							type,
							hash,
							count: document.default({count: 0})('count').add(1) as unknown as number,
							created: document.default({created: RethinkDB.now().toEpochTime().mul(1000)})('created') as unknown as number
						};
						return newDocument;
					}
				),
			{
				returnChanges: true
			}
		);
	return query;
};

export class InsertUniqueConflictError <GenericInsert extends RDatum<WriteResult>> extends Error
{
	public readonly result: Result <GenericInsert>;
	constructor({result}: {result: Result <GenericInsert>})
	{
		const message = 'Insert Unique Error: Document could not be inserted because it already exists';
		super(message);
		this.result = result;
	};
};