'use strict';

// Internal Modules
import Instance from './Instance';

// Types
export interface ParsableOptions
{
	conflict?: 'error' | 'replace' | 'update' | ConflictCallback | WithoutHelper;
};
export interface WithoutHelper
{
	withoutOld: Array<string>;
};
export interface ParsedOptions
{
	conflict?: 'error' | 'replace' | 'update' | ConflictCallback;
};
export type ConflictCallback = (id: string, oldDocument: any, newDocument: any) => boolean;

export default function parse(options: ParsableOptions)
{
	const instance: Instance = this;
	if (!(instance instanceof Instance))
	{
		throw new RethinkExtendInsertOptionsError('\'this\' must be Instance class.');
	};
	if ('conflict' in options && typeof options.conflict === 'object' && options.conflict !== null && 'withoutOld' in options.conflict)
	{
		const helper = options.conflict;
		options.conflict = (id, oldDocument, newDocument) => oldDocument.without(instance.RethinkDB.args(helper.withoutOld)).merge(newDocument);
	}
	else
	{
		return options as ParsedOptions;
	};
};

export class RethinkExtendInsertOptionsError extends Error {};