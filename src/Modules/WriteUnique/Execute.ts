'use strict';

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';
import Moment from 'moment';
import { generateHash } from '@chris-talman/node-utilities';

// Internal Modules
import { run } from 'src';
import { WriteUnique, WriteUniqueConflictError, WriteUniqueGeneralError } from './';

// Types
import { WriteResult, RDatum } from 'rethinkdb-ts';
import { RDatumValue } from './';
export interface UniqueParameters
{
	/** Document type. */
	type: string;
	/** An array of objects of fields, each of which must be unique among other documents. */
	fields: Array<object>;
	lifetime?: Moment.Duration;
};
export interface Unique
{
	/** [document type, hash of array of property path hashes] */
	id: [string, string];
	count: number;
	/** Unix timestamp. */
	created: number;
};
export interface Result <GenericWrite extends RDatum<WriteResult>>
{
	conflict: Array<boolean | string | null>;
	unique: ResultUnique | null;
	write: RDatumValue <GenericWrite> | null;
	delete: WriteResult | null;
};
export interface ResultUnique
{
	result: WriteResult <Unique>;
	documents: Array<Unique>;
};
interface PropertyPaths extends Array<PropertyPath> {};
interface PropertyPath
{
	path: string;
	value: any;
};

// Constants
import { DEFAULT_LIFETIME_MILLISECONDS } from './';
const CONFLICT_FIELD_NAME = 'conflict';
const UNIQUE_FIELD_NAME = 'unique';
const UNIQUE_RESULTS_FIELD_NAME = 'results';
const UNIQUE_DOCUMENTS_FIELD_NAME = 'documents';
const WRITE_FIELD_NAME = 'write';
const DELETE_FIELD_NAME = 'delete';
const HASH_ALGORITHM = 'sha384';
const HASH_ENCODING = 'base64';

export async function execute <GenericConflict extends Array<RDatum<boolean> | RDatum<string> | RDatum<null>>, GenericWrite extends RDatum<WriteResult>>
(
	this: WriteUnique,
	{
		conflict: conflictQuery,
		unique,
		write: writeQuery
	}:
	{
		conflict: GenericConflict,
		unique: UniqueParameters,
		write: GenericWrite
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
							result
								(CONFLICT_FIELD_NAME)
								.filter
								(
									conflict => RethinkDB.or
									(
										conflict.eq(true),
										conflict.typeOf().eq('STRING')
									)
								)
								.count()
								.gt(0),
							null,
							RethinkDB.expr({[UNIQUE_RESULTS_FIELD_NAME]: generateUniqueQueries(uniqueParameters)})
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
							result
								(UNIQUE_FIELD_NAME)
								('results')
								.filter
								(
									result => RethinkDB.or
									(
										result('errors').gt(0)
									)
								)
								.count()
								.gt(0)
						),
						null,
						result
							(UNIQUE_FIELD_NAME)
							.merge
							(
								{
									[UNIQUE_DOCUMENTS_FIELD_NAME]: result
										('unique')
										('results')
										.map(result => result('changes').nth(0)('new_val'))
								}
							)
					)
				}
			)
		)
		.merge
		(
			(result: RDatum) =>
			(
				{
					[CONFLICT_FIELD_NAME]: RethinkDB.branch
					(
						result(UNIQUE_FIELD_NAME).eq(null),
						result(CONFLICT_FIELD_NAME),
						conflictQuery
					)
				}
			)
		)
		.merge
		(
			(result: RDatum) =>
			(
				{
					[WRITE_FIELD_NAME]: RethinkDB.branch
					(
						RethinkDB.or
						(
							result(UNIQUE_FIELD_NAME).eq(null),
							result
								(UNIQUE_FIELD_NAME)
								('results')
								.filter
								(
									result => RethinkDB.or
									(
										result('errors').gt(0),
										result('changes').nth(0)('new_val')('count').gt(1)
									)
								)
								.count()
								.gt(0),
							result
								(CONFLICT_FIELD_NAME)
								.filter
								(
									conflict => RethinkDB.or
									(
										conflict.eq(true),
										conflict.typeOf().eq('STRING')
									)
								)
								.count()
								.gt(0)
						),
						null,
						writeQuery
					)
				}
			)
		)
		.merge
		(
			(result: RDatum) =>
			(
				{
					[DELETE_FIELD_NAME]: RethinkDB.branch
					(
						result(WRITE_FIELD_NAME).eq(null),
						null,
						RethinkDB
							.table(this.table)
							.getAll(RethinkDB.args(result(UNIQUE_FIELD_NAME)(UNIQUE_DOCUMENTS_FIELD_NAME)('id') as any))
							.delete()
					)
				}
			)
		);
	const result: Result <GenericWrite> = await run({query, options: {throwRuntime: true}});
	const conflicted = result.conflict.some(conflict => conflict === true || typeof conflict === 'string') || (result.unique === null || result.unique.documents.some(document => document.count > 1));
	if (conflicted)
	{
		throw new WriteUniqueConflictError({result});
	};
	return result;
};

function generateUniqueQueries({type: documentType, fields: fieldGroups, lifetime, instance}: UniqueParameters & {instance: WriteUnique})
{
	const queries: Array<RDatum<WriteResult>> = [];
	for (let fieldGroup of fieldGroups)
	{
		const query = generateUniqueQuery({documentType, fieldGroup, lifetime, instance});
		queries.push(query);
	};
	return queries;
};

/** Generates query to insert unique document. */
function generateUniqueQuery({documentType, fieldGroup, lifetime, instance}: {documentType: string, fieldGroup: object, lifetime: UniqueParameters['lifetime'], instance: WriteUnique})
{
	const paths = generatePropertyPaths(fieldGroup);
	const fieldGroupFields: Array<[string, string]> = [];
	for (let path of paths)
	{
		if (typeof path.value === 'object' && path.value !== null)
		{
			if (Array.isArray(path.value))
			{
				throw new WriteUniqueGeneralError(`Field value cannot be array: ${path.path}`);
			};
		};
		fieldGroupFields.push([path.path, path.value]);
	};
	const fieldGroupFieldsString = JSON.stringify(fieldGroupFields);
	const fieldGroupFieldsHash = generateHash({value: fieldGroupFieldsString, algorithm: HASH_ALGORITHM, encoding: HASH_ENCODING});
	const lifetimeMilliseconds = lifetime ? lifetime.asMilliseconds() : DEFAULT_LIFETIME_MILLISECONDS;
	const id: Unique['id'] = [documentType, fieldGroupFieldsHash];
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

function generatePropertyPaths(object: object, path: Array<string> = [], root = true)
{
	const paths: PropertyPaths = [];
	for (let { 0: key, 1: value } of Object.entries(object))
	{
		if (typeof value === 'object' && value !== null)
		{
			paths.push(... generatePropertyPaths(value, path));
		}
		else
		{
			const propertyPathPath = Array.from(path);
			propertyPathPath.push(key);
			const propertyPath: PropertyPath =
			{
				path: propertyPathPath.join('.'),
				value
			};
			paths.push(propertyPath);
		};
	};
	if (root)
	{
		paths.sort();
	};
	return paths;
};