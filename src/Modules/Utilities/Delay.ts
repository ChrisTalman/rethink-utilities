'use strict';

export default function delay(milliseconds: number)
{
    const promise: Promise<void> = new Promise(resolve => setTimeout(resolve, milliseconds));
    return promise;
};