'use strict';

// Internal Modules
import Instance from 'src/Instance';

export default function(value: any)
{
	const instance: Instance = value;
    if (!(instance instanceof Instance))
	{
		throw new Error('Method can only be called on instances of the Instance class.');
	};
	return instance;
};