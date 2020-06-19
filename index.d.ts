declare module '@chris-talman/rethink-utilities'
{
	// Types
	import { RQuery, RDatum, Connection, RunOptions, WriteResult } from 'rethinkdb-ts';
	import Moment from 'moment';

	/** Runs query and returns result if successful, otherwise reattempts several times until throwing an exception with the final error. */
	export function run <GenericQuery extends RQuery> ({query, options}: {query: GenericQuery, options: RunUtilityOptions}): Promise<ReturnType<GenericQuery['run']>>;
	export interface RunUtilityOptions
	{
		/**
			Determines whether runtime errors are detected and thrown.
			'Runtime errors' can occur with write operations like insert(), and can be found in the write operation result object.
		*/
		throwRuntime: boolean;
		/** RethinkDB connection. */
		connection?: Connection;
		/** Options passed to RethinkDB run(). */
		runOptions?: RunOptions;
	}
	export class ReqlRuntimeWriteError extends Error
	{
		public readonly result: MinimalWriteResult;
		constructor(result: MinimalWriteResult);
	}
	export interface MinimalWriteResult extends Required<Pick<WriteResult, 'errors' | 'first_error'>> {}

	/** Returns `new_val`, if truthy, of first change in `WriteResult`, otherwise throws error with full log of result object. */
	export function resolveFirstChange <GenericChange extends any> (result: WriteResult <GenericChange> | null): GenericChange;

	/** Conducts RethinkDB-style pluck on array of objects. */
	export function pluck <GenericRows extends PluckRowsVariant> (parameters: {rows: GenericRows} & ({pluck: Pluck} | {plucks: Array<Pluck>})): GenericRows;
	export type PluckRowsVariant = PluckRows | PluckRow;
	export interface PluckRows extends Array<PluckRow> {}
	export type PluckRow = object;
	export type Pluck = string | ArrayPluck | ObjectPluck;
	export interface ArrayPluck extends Array<Pluck> {}
	export interface ObjectPluck
	{
		[key: string]: string | true | ArrayPluck | ObjectPluck;
	}
	export interface PureObjectPluck
	{
		[key: string]: true | PureObjectPluck;
	}

	/** Determines whether nest has field. */
	export function hasNestedField({nest, path}: {nest: Pluck, path: Array<string>}): boolean;

	/** Gets nest at path within nested fields. */
	export function getNestedField({pluck, path}: {pluck: Pluck, path: Array<string>}): Pluck | undefined;

	/** Parses extended insert options, returning them in an ordinary insert options form. */
	export function extendInsertOptions(options: ParsableOptions): ParsedOptions;
	export interface ParsableOptions
	{
		conflict?: 'error' | 'replace' | 'update' | ConflictCallback | WithoutOldHelper;
	}
	export interface WithoutOldHelper
	{
		withoutOld: Array<string>;
	}
	export type ConflictCallback = (id: RDatum<string>, oldDocument: RDatum, newDocument: RDatum) => RDatum<boolean>;
	export interface ParsedOptions
	{
		conflict?: 'error' | 'replace' | 'update' | ConflictCallback;
	}

	/** Generates RethinkDB query which creates a dictionary of keys from the given array using the given ID key, with every value set as boolean true. */
	export function emptyDictionaryFromArray <GenericArray extends Array<object>, GenericId extends keyof GenericArray[0]> (array: GenericArray, id: GenericId): RDatum;

	/** Insert a document with unique properties with a very low chance of conflicts. */
	export class WriteUnique
	{
		public readonly table: string;
		constructor({table}: {table: string});
		/**
			`r.insert()` or `r.update()` a document with unique properties.
			Uniqueness is evaluated with atomic operations.
			There is a chance that uniqueness could be violated due to the limitations of atomicity in RethinkDB, but it is low.
		*/
		public execute
		<
			GenericConflict extends Array<
				RDatum<boolean> | RDatum<boolean | string> | RDatum<boolean | string | null> |
				RDatum<string> | RDatum<string | null> |
				RDatum<null>
			>,
			GenericWrite extends RDatum<WriteResult>
		>
		(
			{
				conflict: conflictQuery,
				unique,
				write: writeQuery
			}:
			{
				conflict: GenericConflict,
				unique: WriteUniqueParameters,
				write: GenericWrite
			}
		): Promise <WriteUniqueResult <GenericWrite>>;
		/** Evaluates write result and throws `WriteUniqueConflictError` if an error is detected. */
		public handleExecuteError <GenericWrite extends RDatum <WriteResult>> (result: WriteUniqueResult <GenericWrite>): void;
		/** Generates query used in `execute()`. */
		public generateExecuteQuery <GenericWrite extends RDatum <WriteResult>> (parameters: this['execute']): RDatum <WriteUniqueResult <GenericWrite>>;
	}
	export interface WriteUniqueParameters
	{
		/** Document type. */
		type: string;
		/** An array of objects of fields, each of which must be unique among other documents. */
		fields: Array<object>;
		lifetime?: Moment.Duration;
	}
	export interface WriteUniqueDocument
	{
		/** [document type, hash of array of property path hashes] */
		id: [string, string];
		count: number;
		/** Unix timestamp. */
		created: number;
	}
	export interface WriteUniqueResult <GenericWrite extends RDatum<WriteResult>>
	{
		conflict: Array<boolean | string | null>;
		unique: WriteUniqueResultUnique | null;
		write: RDatumValue <GenericWrite> | null;
		delete: WriteResult | null;
	}
	export interface WriteUniqueResultUnique
	{
		result: WriteResult <WriteUniqueDocument>;
		documents: Array<WriteUniqueDocument>;
	}
	type RDatumValue <T> = T extends RDatum<infer V> ? V : never;
	export class WriteUniqueConflictError <GenericWrite extends RDatum<WriteResult>> extends Error
	{
		public readonly result: WriteUniqueResult <GenericWrite>;
	}
}