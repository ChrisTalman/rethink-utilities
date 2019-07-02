'use strict';

// Types
import { Pluck } from './Pluck';

/** Determines whether nest has field. */
export function hasNestedField({nest, path}: {nest: Pluck, path: Array<string>}): boolean
{
	if (path.length === 0) return false;
	const pathField = path[0];
	let has = false;
	if (Array.isArray(nest))
	{
		for (let field of nest)
		{
			if (typeof field === 'object')
			{
				has = hasNestedField({nest: field, path});
			}
			else
			{
				has = field === pathField;
			};
			if (has)
			{
				break;
			};
		};
	}
	else if (typeof nest === 'object')
	{
		for (let { 0: key, 1: value } of Object.entries(nest))
		{
			if (typeof value === 'object')
			{
				const nestedPath = path.slice(1);
				has = key === pathField && (path.length === 1 || hasNestedField({nest: value, path: nestedPath}));
			}
			else if (typeof value === 'string')
			{
				has = value === pathField;
			}
			else
			{
				has = key === pathField;
			};
			if (has)
			{
				break;
			};
		};
	}
	else
	{
		has = nest === pathField;
	};
	return has;
};