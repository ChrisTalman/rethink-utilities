'use strict';

// Internal Modules
import { default as run } from './Run';
import { default as parseExtendedInsertOptions } from './ExtendInsertOptions';

export default class
{
	public RethinkDB;
	constructor({RethinkDB}: {RethinkDB})
	{
		this.RethinkDB = RethinkDB;
	};
	public run = run;
	public parseExtendedInsertOptions = parseExtendedInsertOptions;
};