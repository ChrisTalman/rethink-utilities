'use strict';

// Internal Modules
import { default as run } from './Run';

export default class
{
	public RethinkDB;
	constructor({RethinkDB}: {RethinkDB})
	{
		this.RethinkDB = RethinkDB;
	};
	public run = run;
};