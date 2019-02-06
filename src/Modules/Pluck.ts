'use strict';

// Types
export type RowsVariant = Rows | Row;
export interface Rows extends Array<Row> {};
export type Row = object;
export namespace Pluck
{
	export type Variant = List | Object;
    export interface List extends Array<string | Object> {};
	export interface Object
	{
		[field: string]: Variant | boolean;
	};
};

/** Conducts RethinkDB-style pluck on array of objects. */
export default function({rows, pluck}: {rows: RowsVariant, pluck: Pluck.Variant})
{
	const rowsList = Array.isArray(rows) ? rows : [rows];
    const pluckedRows: Rows = [];
    for (let row of rowsList)
    {
        const pluckedRow = {};
        pluckFields(pluck, row, pluckedRow);
        pluckedRows.push(pluckedRow);
    };
    const output = Array.isArray(rows) ? pluckedRows : pluckedRows[0];
	return output;
};

function pluckFields(pluck: Pluck.Variant, document: object, pluckedDocument: object)
{
    const pluckList = Array.isArray(pluck) ? pluck : Object.keys(pluck).map(key => ({[key]: pluck[key]}));
    for (let field of pluckList)
    {
        if (typeof field === 'string' && document.hasOwnProperty(field))
        {
            pluckedDocument[field] = document[field];
        }
        else if (typeof field === 'object')
        {
            const subFieldKeys = Object.keys(field);
            for (let subFieldKey of subFieldKeys)
            {
                if (!document.hasOwnProperty(subFieldKey))
                {
                    continue;
                };
                const subDocument = document[subFieldKey];
                const pluckedSubdocument = {};
                const subField = field[subFieldKey];
                if (typeof subField === 'boolean')
                {
                    pluckedSubdocument[subFieldKey] = document[subFieldKey];
                }
                else
                {
                    pluckFields(subField, subDocument, pluckedSubdocument);
                };
                const somePlucked = Object.keys(pluckedSubdocument).length > 0;
                if (somePlucked)
                {
                    pluckedDocument[subFieldKey] = pluckedSubdocument;
                };
            };
        };
    };
};