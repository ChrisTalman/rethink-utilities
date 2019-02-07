'use strict';

// Types
export interface ParsableOptions
{
	conflict?: 'error' | 'replace' | 'update' | ConflictCallback | WithoutOldHelper;
};
export interface WithoutOldHelper
{
	withoutOld: Array<string>;
};
export type ConflictCallback = (id: string, oldDocument: any, newDocument: any) => boolean;
export interface ParsedOptions
{
	conflict?: 'error' | 'replace' | 'update' | ConflictCallback;
};

/** Parses extended insert options, returning them in an ordinary insert options form. */
export default function parse(options: ParsableOptions)
{
	if ('conflict' in options && typeof options.conflict === 'object' && options.conflict !== null && 'withoutOld' in options.conflict)
	{
		const helper = options.conflict;
		options.conflict = (id: string, oldDocument, newDocument) => oldDocument.without(... helper.withoutOld).merge(newDocument);
		return options;
	}
	else
	{
		return options as ParsedOptions;
	};
};

export class RethinkExtendInsertOptionsError extends Error {};