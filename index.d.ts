/// <types="rethinkdb-ts">

// Types
import { RQuery, Connection, RunOptions } from 'rethinkdb-ts';
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
    export class ReqlRuntimeWriteError extends Error {}
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
    export namespace ExtendInsertOptions
    {
        export interface ParsableOptions
        {
        	conflict?: 'error' | 'replace' | 'update' | ConflictCallback | WithoutHelper;
        }
        export interface WithoutHelper
        {
        	withoutOld: Array<string>;
        }
        export interface ParsedOptions
        {
        	conflict?: 'error' | 'replace' | 'update' | ConflictCallback;
        }
        export type ConflictCallback = (id: string, oldDocument: any, newDocument: any) => boolean;
    }
}