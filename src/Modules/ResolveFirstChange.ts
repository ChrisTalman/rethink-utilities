'use strict';

// External Modules
import { inspect } from 'util';

// Types
import { WriteResult } from 'rethinkdb-ts';

/** Returns `new_val`, if truthy, of first change in `WriteResult`, otherwise throws error with full log of result object. */
export function resolveFirstChange <GenericChange extends any> (result: WriteResult <GenericChange> | null)
{
	const change = result && result.changes && result.changes[0] && result.changes[0].new_val;
	if (!change)
	{
		throw new Error('Change not found:\n' + inspect(result, {depth: 10}));
	};
	return change;
};