'use strict';

// External Modules
const { r: RethinkDB } = require('rethinkdb-ts');
const { listenUnhandledErrors } = require('@chris-talman/node-utilities');
const { WriteUnique } = require('../../');

// Constants
const WRITE_UNIQUE_DATABASE_NAME = 'WriteUnique';
const WRITE_UNIQUE_TABLE_NAME = 'WriteUnique';
const USERS_TABLE_NAME = 'Users';
const GUILD_ROLES_TABLE_NAMES = 'Guilds_Roles';

listenUnhandledErrors();
run();
async function run()
{
	const pool = await RethinkDB.connectPool({db: WRITE_UNIQUE_DATABASE_NAME});
	const writeUnique = new WriteUnique({table: WRITE_UNIQUE_TABLE_NAME});
	const promises = [];
	for (let index = 0; index < 2; index++)
	{
		promises.push
		(
			executeWriteUser({username: 'Bob', email: 'bob@example.com'}, writeUnique),
			executeWriteUser({username: 'Bill', email: 'bill@example.com'}, writeUnique),
			executeWriteUser({username: 'Bob', email: 'bob@example.com'}, writeUnique),
			executeWriteUser({username: 'Jane', email: 'jane@example.com'}, writeUnique),
			executeWriteUser({username: 'Jane', email: 'jane@example.com'}, writeUnique),
			executeWriteRole({clubId: '01DYJW5KHYZJ954B1YBP1R0T9W', name: 'Admin'}, writeUnique),
			executeWriteRole({clubId: '01DYJW5KHYZJ954B1YBP1R0TAB', name: 'Admin'}, writeUnique),
			executeWriteRole({clubId: '01DYJW5KHYZJ954B1YBP1R0T9W', name: 'Admin'}, writeUnique),
			executeWriteRole({clubId: '01DYJW5KHYZJ954B1YBP1R0T9W', name: 'Moderator'}, writeUnique)
		);
	};
	await Promise.all(promises);
	await pool.drain();
};

async function executeWriteUser(document, writeUnique)
{
	try
	{
		await writeUser(document, writeUnique);
	}
	catch (error)
	{
		console.log('Failure:', error.message);
		return;
	};
	console.log('Success');
};

async function writeUser(document, writeUnique)
{
	await writeUnique.update
	(
		{
			conflict:
			[
				RethinkDB
					.table(USERS_TABLE_NAME)
					.filter(document)
					.count()
					.gt(0)
			],
			unique:
			{
				type: USERS_TABLE_NAME,
				fields:
				[
					{
						username: document.username
					},
					{
						email: document.email
					}
				]
			},
			write: RethinkDB
				.table(USERS_TABLE_NAME)
				.insert(document)
		}
	);
};

async function executeWriteRole(document, writeUnique)
{
	try
	{
		await writeRole(document, writeUnique);
	}
	catch (error)
	{
		console.log('Failure:', error.message);
		return;
	};
	console.log('Success');
};

async function writeRole(document, writeUnique)
{
	await writeUnique.execute
	(
		{
			conflict:
			[
				RethinkDB
					.table(GUILD_ROLES_TABLE_NAMES)
					.filter(document)
					.count()
					.gt(0)
			],
			unique:
			{
				type: GUILD_ROLES_TABLE_NAMES,
				fields:
				[
					{
						clubId: document.clubId,
						name: document.name
					}
				]
			},
			write: RethinkDB
				.table(GUILD_ROLES_TABLE_NAMES)
				.insert(document)
		}
	);
};