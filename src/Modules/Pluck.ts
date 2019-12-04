'use strict';

// Types
export type RowsVariant = Rows | Row;
export interface Rows extends Array<Row> {};
export type Row = object;
export type Pluck = string | ArrayPluck | ObjectPluck;
export interface ArrayPluck extends Array<Pluck> {};
export interface ObjectPluck
{
	[key: string]: string | true | ArrayPluck | ObjectPluck;
};

export function pluck({rows: rowsRaw, pluck: pluckRaw}: {rows: RowsVariant, pluck: Pluck})
{
	const rows = Array.isArray(rowsRaw) ? rowsRaw : [rowsRaw];
	let fields: ArrayPluck;
	if (Array.isArray(pluckRaw))
	{
		fields = pluckRaw;
	}
	else if (typeof pluckRaw === 'string')
	{
		fields = [pluckRaw];
	}
	else
	{
		fields = Object.keys(pluckRaw).map(key => ({[key]: pluckRaw[key]}));
	};
	const results: Array<object> = [];
	for (let row of rows)
	{
		const result: object = {};
		for (let field of fields)
		{
			if (typeof field === 'string')
			{
				if (field in row)
				{
					result[field] = row[field];
				};
			}
			else if (Array.isArray(field))
			{
				for (let subfield of field)
				{
					Object.assign(result, pluck({rows: row, pluck: subfield}));
				};
			}
			else
			{
				for (let { 0: subfield, 1: subsubfield } of Object.entries(field))
				{
					const resolvedPluck = subsubfield === true ? [ subfield ] : subsubfield;
					result[subfield] = pluck({rows: row[subfield], pluck: resolvedPluck});
				};
			};
		};
		results.push(result);
	};
	const output = Array.isArray(rowsRaw) ? results : results[0];
	return output;
};