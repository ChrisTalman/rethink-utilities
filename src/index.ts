'use strict';

// Methods
export { run, ReqlRuntimeWriteError, MinimalWriteResult } from 'src/Modules/Run';
export { resolveFirstChange } from 'src/Modules/ResolveFirstChange';
export { pluck } from 'src/Modules/Pluck';
export { hasNestedField } from 'src/Modules/HasNestedField';
export { getNestedField } from 'src/Modules/GetNestedField';
export { emptyDictionaryFromArray } from 'src/Modules/EmptyDictionaryFromArray';
export { extendInsertOptions } from 'src/Modules/ExtendInsertOptions';
export { WriteUnique, WriteUniqueConflictError } from './Modules/WriteUnique';
export { handleExecuteError as handleWriteUniqueExecuteError } from './Modules/WriteUnique/Execute';