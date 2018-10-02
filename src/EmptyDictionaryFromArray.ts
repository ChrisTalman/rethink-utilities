'use strict';

// Internal Modules
import getInstance from 'src/Utilities/GetInstance';

/** Generates RethinkDB query which creates a dictionary of keys from the given array using the given ID key, with every value set as boolean true. */
export default function <GenericArray extends Array<object>, GenericId extends keyof GenericArray[0]> (array: GenericArray, id: GenericId)
{
	const instance = getInstance(this);
	const query = instance.RethinkDB
		.expr(array.map(item => item[id as string]))
		.map(id => [id, true])
		.coerceTo('object');
	return query;
};