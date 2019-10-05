/// <types="rethinkdb-ts">

// Types
import { RQuery, RDatum, Connection, RunOptions, WriteResult } from 'rethinkdb-ts';
type ReturnType <T> = T extends (...args: any[]) => infer R ? R : any;
type PromiseValue <T> = T extends Promise<infer V> ? V : never;

declare module '@ChrisTalman/rethink-utilities'
{
	/** Runs query and returns result if successful, otherwise reattempts several times until throwing an exception with the final error. */
	export function run <GenericQuery extends RQuery> ({query, options}: {query: GenericQuery, options: RunUtilityOptions}): PromiseValue<ReturnType<GenericQuery['run']>>;
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
	/** Conducts RethinkDB-style pluck on array of objects. */
	export function pluck({rows, pluck}: {rows: PluckRowsVariant, pluck: Pluck}): object;
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
}