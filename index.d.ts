declare module '@bluecewe/rethink-utilities'
{
    export default class
    {
    	public RethinkDB;
    	constructor({RethinkDB}: {RethinkDB});
    	public run({query, options}: {query, options?: RunOptions});
    	public parseExtendedInsertOptions(options: ExtendInsertOptions.ParsableOptions): ExtendInsertOptions.ParsedOptions;
		/** Generates RethinkDB query which creates a dictionary of keys from the given array using the given ID key, with every value set as boolean true. */
		public emptyDictionaryFromArray <GenericArray extends Array<object>, GenericId extends keyof GenericArray[0]> (array: GenericArray, id: GenericId): any;
    }
    export interface RunOptions
    {
        throwResultError?: boolean;
    	rethink?: object;
    }
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