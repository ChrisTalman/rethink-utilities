'use strict';

// External Modules
import Moment from 'moment';

// Internal Modules
import { execute, handleExecuteError, generateExecuteQuery } from './Execute';

// Types
import { WriteResult, RDatum } from 'rethinkdb-ts';
import { Result as ExecuteResult } from './Execute';
export type RDatumValue <T> = T extends RDatum<infer V> ? V : never;

// Constants
export const DEFAULT_LIFETIME_MILLISECONDS = Moment.duration({seconds: 30}).asMilliseconds();
const ERROR_PREFIX = 'Write Unique Error: ';

export class WriteUnique
{
	public readonly table: string;
	constructor({table}: {table: string})
	{
		this.table = table;
	};
	public execute = execute;
	public handleExecuteError = handleExecuteError;
	public generateExecuteQuery = generateExecuteQuery;
};

export class WriteUniqueConflictError <GenericWrite extends RDatum<WriteResult>> extends Error
{
	public readonly result: ExecuteResult<GenericWrite>;
	constructor({result}: {result: ExecuteResult<GenericWrite>})
	{
		const message = `${ERROR_PREFIX}Document cannot be written because of conflict`;
		super(message);
		this.result = result;
	};
};

export class WriteUniqueGeneralError extends Error
{
	constructor(message: string)
	{
		message = `${ERROR_PREFIX}${message}`;
		super(message);
	};
};