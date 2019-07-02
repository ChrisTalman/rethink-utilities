'use strict';

// To Do: Ensure that path is handled correctly with arrays and objects, namely that nested arrays are considered to share the same depth.

// Types
import { Pluck, ArrayPluck, ObjectPluck } from './Pluck';

/** Gets nest at path within nested fields. */
export function getNestedField({pluck, path}: {pluck: Pluck, path: Array<string>})
{
	if (path.length === 0)
	{
		return undefined;
	};
	const pathField = path[0];
	let nest: ArrayPluck | ObjectPluck;
	if (Array.isArray(pluck))
	{
		for (let field of pluck)
		{
			if (typeof field === 'object' && !Array.isArray(field))
			{
				const fieldNest = field[pathField];
				if (typeof fieldNest === 'object')
				{
					nest = fieldNest;
					break;
				};
			};
		};
		if (!nest)
		{
			return undefined;
		};
	}
	else if (typeof pluck === 'object')
	{
		const pluckNest = pluck[pathField];
		if (typeof pluckNest === 'object')
		{
			nest = pluckNest;
		}
		else
		{
			return undefined;
		};
	}
	else
	{
		return undefined;
	};
	if (path.length > 1)
	{
		const nestPath = path.slice(1);
		nest = getNestedField({pluck: nest, path: nestPath});
	};
	return nest;
};