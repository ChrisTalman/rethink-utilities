/// <types="rethinkdb-ts">

// Types
import { RQuery, RDatum, Connection, RunOptions, WriteResult } from 'rethinkdb-ts';
type ReturnType <T> = T extends (...args: any[]) => infer R ? R : any;
type PromiseValue <T> = T extends Promise<infer V> ? V : never;

declare module '@bluecewe/rethink-utilities'
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
    export function pluck({rows, pluck}: {rows: PluckTypes.RowsVariant, pluck: PluckTypes.Pluck.Variant}): object;
    export namespace PluckTypes
    {
        export type RowsVariant = Rows | Row;
        export interface Rows extends Array<Row> {}
        export type Row = object;
        export namespace Pluck
        {
        	export type Variant = List | Object;
            export interface List extends Array<string | Object> {}
        	export interface Object
        	{
        		[field: string]: Variant | boolean;
        	}
        }
    }
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