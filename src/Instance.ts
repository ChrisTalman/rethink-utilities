'use strict';

// Internal Modules
import { default as run } from './Run';
import { default as parseExtendedInsertOptions } from './ExtendInsertOptions';
import { default as emptyDictionaryFromArray } from './EmptyDictionaryFromArray';

export default class Instance
{
	public RethinkDB;
	constructor({RethinkDB}: {RethinkDB})
	{
		this.RethinkDB = RethinkDB;
	};
	public run = run;
	public parseExtendedInsertOptions = parseExtendedInsertOptions;
	public emptyDictionaryFromArray = emptyDictionaryFromArray;
};