'use strict';

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';

/** Generates RethinkDB query which creates a dictionary of keys from the given array using the given ID key, with every value set as boolean true. */
export default function <GenericArray extends Array<object>, GenericId extends keyof GenericArray[0]> (array: GenericArray, id: GenericId)
{
	const query = RethinkDB
		.expr(array.map(item => item[id as string]))
		.map(id => [id, true])
		.coerceTo('object');
	return query;
};