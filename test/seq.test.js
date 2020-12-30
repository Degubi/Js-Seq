import { Sequence } from '../src/seq.js';
import { test, expect } from '@jest/globals';

// TODO: Add more tests
test('Number sequence from 0 to 10', () => expect(Sequence.range(0, 10).toArray())
                                          .toStrictEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]));

test('Create sequence from array', () => expect([ 1, 2, 3 ].sequence().toArray())
                                         .toStrictEqual([ 1, 2, 3 ]));