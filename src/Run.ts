'use strict';

// Interal Modules
import EmptyPromise from '@bluecewe/empty-promise';
import throwResultError from './ThrowResultError';
import getInstance from 'src/Utilities/GetInstance';

// Types
import Instance from 'src/Instance';
export interface Options
{
	throwResultError?: boolean;
	rethink?: object;
};

// Constants
const MAX_ATTEMPTS = 3;
const DELAY_MILLISECONDS = 200;
const WRITE_COMMANDS =
[
	'insert',
	'update',
	'replace',
	'delete'
];

export default async function({query, options}: {query, options?: Options})
{
	if (typeof query !== 'function')
	{
		throw new RethinkRunError('\'query\' parameter must be function.');
	};
	const instance = getInstance(this);
	options = parseOptions(options);
	validateQuery({query, instance});
	for (let attemptNumber = 0; attemptNumber < (MAX_ATTEMPTS + 1); attemptNumber++)
	{
		let output: any;
		try
		{
			output = await attempt({query, options});
		}
		catch (error)
		{
			const moreAttempts = attemptNumber < MAX_ATTEMPTS;
			if (moreAttempts)
			{
				await delay(attemptNumber);
				continue;
			}
			else
			{
				throw error;
			};
		};
		handleResultError(output, options, query);
		return output;
	};
};

async function attempt({query, options}: {query, options: Options})
{
	const output = await query.run(options.rethink);
	return output;
};

function delay(attemptNumber: number)
{
	const promise = EmptyPromise.generate();
	const delay = DELAY_MILLISECONDS + ((DELAY_MILLISECONDS * 2) * attemptNumber);
	setTimeout(promise.resolve, delay);
	return promise;
};

function validateQuery({query, instance}: {query, instance: Instance})
{
	return;
	const RethinkDbTerm = Object.getPrototypeOf(instance.RethinkDB.table('none')).constructor;
	if (typeof query === 'function')
	{
		//const _query = query.hasOwnProperty('_query') && Array.isArray(query._query);
		//const _r = query.hasOwnProperty('_r') && typeof query._r === 'function';
		//const queryValid = _query && _r;
		console.log('Constant:', RethinkDbTerm);
		console.log('Type:', Object.getPrototypeOf(query).constructor);
		const isTerm = Object.getPrototypeOf(query).constructor === RethinkDbTerm;
		if (isTerm)
		{
			throw new RethinkRunError('Query not of RethinkDB Term type.');
		};
	}
	else if (typeof query === 'object' && query !== null && !(query instanceof Promise))
	{
		console.log('Constructor:', query.constructor);
		console.log('Prototype:', Object.getPrototypeOf(query));
	}
	else
	{
		throw new RethinkRunError('Query must be function or response object.');
	};
};

function parseOptions(options: Options = {})
{
	if (!options.hasOwnProperty('throwResultError'))
	{
		options.throwResultError = true;
	};
	return options;
};

function handleResultError(output, options: Options, query)
{
	const isWriteQuery = WRITE_COMMANDS.includes(Object.getPrototypeOf(query).mt);
	if (!options.throwResultError || !isWriteQuery)
	{
		return;
	};
	throwResultError(output);
};

export class RethinkRunError extends Error
{
	constructor(message: string)
	{
		super(message);
	};
};