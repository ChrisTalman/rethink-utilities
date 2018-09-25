'use strict';

// Types
import { WriteResult } from 'rethinkdbdash';

/** If result has one or more errors, throw Error with first error message. */
export default function throwResultError(result: WriteResult)
{
    if (result.errors > 0)
    {
        throw new Error(result.first_error);
    };
};