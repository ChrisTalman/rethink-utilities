'use strict';

// External Modules
const NodeExternals = require('webpack-node-externals');

// Constants
const IGNORE = /(?:node_modules)$/;
const NODE_EXTERNALS_WHITELIST = [/^@bluecewe\/[\w-]+/];

module.exports =
{
	mode: 'development',
    target: 'node',
    entry: './src/index.ts',
    resolve:
    {
        extensions:
        [
            '.ts',
            '.json'
        ],
        alias:
        {
            src: __dirname + '/src',
            node_modules: __dirname + '/node_modules'
        }
    },
    output:
    {
        filename: 'index.js',
        path: __dirname,
        libraryTarget: 'umd'
    },
    watch: true,
    module:
    {
        rules:
        [
            {
                loader: 'ts-loader',
                test: /\.tsx?$/,
                exclude: IGNORE
            }
        ]
    },
	externals:
	[
		NodeExternals({whitelist: NODE_EXTERNALS_WHITELIST})
	]
};