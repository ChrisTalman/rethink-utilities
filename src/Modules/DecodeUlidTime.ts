'use strict';

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';

// Types
import { RDatum } from 'rethinkdb-ts';
interface DecodeAccumulator
{
	index: number;
	carry: number;
};

// Constants
const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const ENCODING_LEN = ENCODING.length;
const TIME_LENGTH = 10;

export function generateDecodeUlidTimeQuery({id}: {id: RDatum <string>})
{
	const query =
		(
			id
			.slice(0, TIME_LENGTH) as RDatum <string>
		)
		.split('')
		.do
		(
			(originalCharacters: RDatum <Array <string>>) => originalCharacters
				.fold([], (accumulator, character) => accumulator.prepend(character))
				.fold
				(
					{
						index: 0,
						carry: 0
					},
					(accumulator, character) => accumulator
						.merge
						(
							(accumulator: RDatum <DecodeAccumulator>) =>
							(
								{
									index: accumulator('index').add(1),
									carry: accumulator
										('carry')
										.add
										(
											RethinkDB
												.expr(ENCODING)
												.split('')
												.offsetsOf(character)
												.nth(0)
												.do
												(
													(encodingIndex: RDatum <number>) => encodingIndex
														.mul
														(
															RethinkDB
																.range(accumulator('index').sub(1))
																.map(() => RethinkDB.expr(ENCODING_LEN))
																.fold
																(
																	RethinkDB.expr(ENCODING_LEN),
																	(accumulator, encodingLength) => accumulator.mul(encodingLength)
																) as any as RDatum <number>
														)
												) as RDatum <number>
										)
								}
							)
						)
				)
				('carry')
		) as RDatum <number>;
	return query;
};