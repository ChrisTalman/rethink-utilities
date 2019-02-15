'use strict';

// Interal Modules
import delay from 'src/Modules/Utilities/Delay';

// Types
import { RQuery, Connection, RunOptions, WriteResult } from 'rethinkdb-ts';
type ReturnType <T> = T extends (...args: any[]) => infer R ? R : any;
type PromiseValue <T> = T extends Promise<infer V> ? V : never;
export interface Options
{
	/**
		Determines whether runtime errors are detected and thrown.
		'Runtime errors' can occur with write operations like insert(), and can be found in the write operation result object.
	*/
	throwRuntime: boolean;
	/** RethinkDB connection. */
	connection?: Connection;
	/** Options passed to RethinkDB run(). */
	runOptions?: RunOptions;
};
export interface MinimalWriteResult extends Required<Pick<WriteResult, 'errors' | 'first_error'>> {};

// Constants
const DELAY_DURATIONS = [200, 600, 1800, 3000];
const MAX_ATTEMPTS = DELAY_DURATIONS.length;
const TRANSIENT_ERROR_NAMES =
[
	'ReqlTimeoutError',
	'ReqlOpFailedError',
	'ReqlOpIndeterminateError'
];

/** Runs query and returns result if successful, otherwise reattempts several times until throwing an exception with the final error. */
export default async function <GenericQuery extends RQuery> ({query, options}: {query: GenericQuery, options: Options})
{
	let result: PromiseValue<ReturnType<GenericQuery['run']>>;
	let success = false;
	let lastError: Error;
	for (let attemptIndex = 0; attemptIndex < MAX_ATTEMPTS; attemptIndex++)
	{
		try
		{
			result = await attempt({query, options});
		}
		catch (error)
		{
			const isTransientError = typeof error === 'object' && error !== null && TRANSIENT_ERROR_NAMES.includes(error.name);
			if (!isTransientError) throw error;
			lastError = error;
			const delayDuration = DELAY_DURATIONS[attemptIndex];
			await delay(delayDuration);
			continue;
		};
		success = true;
		break;
	};
	if (!success) throw lastError;
	if (options.throwRuntime) throwReqlRuntimeWriteError(result);
	return result;
};

async function attempt <GenericQuery extends RQuery> ({query, options}: {query: GenericQuery, options: Options})
{
	const parameters: [(Connection | RunOptions)?, RunOptions?] = [];
	if (options.connection) parameters.push(options.connection);
	if (options.runOptions) parameters.push(options.runOptions);
	const result = await query.run(... parameters);
	return result;
};

/** Throws exception if result value contains a write operation error signature at any depth, using recursion. */
function throwReqlRuntimeWriteError(result: any)
{
	if (Array.isArray(result))
	{
		for (let item of result)
		{
			throwReqlRuntimeWriteError(item);
		};
	}
	else if (typeof result === 'object' && result !== null)
	{
		if (typeof result.errors === 'number' && result.errors > 0 && typeof result.first_error === 'string') throw new ReqlRuntimeWriteError(result);
		const keys = Object.keys(result);
		for (let key of keys)
		{
			const value = result[key];
			throwReqlRuntimeWriteError(value);
		};
	};
};

export class ReqlRuntimeWriteError extends Error
{
	public readonly result: MinimalWriteResult;
	constructor(result: MinimalWriteResult)
	{
		super(result.first_error);
		this.result = result;
	};
};