import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().chunk(3).toArray())
    .toStrictEqual([[ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ], [ 9 ]]));

test('Number sequence from 0 to 10 closed', () =>
    expect(sources.rangeClosed().chunk(6).toArray())
    .toStrictEqual([[ 0, 1, 2, 3, 4, 5 ], [ 6, 7, 8, 9, 10 ]]));

test('Create sequence from array', () =>
    expect(sources.array().chunk(1).toArray())
    .toStrictEqual([[ 1 ], [ 2 ], [ 3 ]]));

test('Create sequence using iterate', () =>
    expect(sources.iterate().chunk(2).toArray())
    .toStrictEqual([[ 0, 1 ], [ 2, 3 ], [ 4 ]]));

test('Create sequence using of', () =>
    expect(sources.of().chunk(10).toArray())
    .toStrictEqual([[ 0, 1, 2, 3 ]]));

test('Create sequence using empty', () =>
    expect(sources.empty().chunk(42).toArray())
    .toStrictEqual([ ]));

test('Use already terminated sequence', () =>
    expect(() => sources.terminated().chunk(420).toArray())
    .toThrowError());

test('Test filter', () =>
    expect(sources.filter().chunk(2).toArray())
    .toStrictEqual([[ 0, 2 ], [ 4 ]]));

test('Test map', () =>
    expect(sources.map().chunk(3).toArray())
    .toStrictEqual([[ 0, 4, 8 ]]));

test('Test flatMap', () =>
    expect(sources.flatMap().chunk(4).toArray())
    .toStrictEqual([[ 1, 2, 3, 4 ], [ 5, 6 ]]));

test('Test take', () =>
    expect(sources.take().chunk(5).toArray())
    .toStrictEqual([[ 0, 2, 4, 6, 8 ], [ 10 ]]));

test('Test skip', () =>
    expect(sources.skip().chunk(1).toArray())
    .toStrictEqual([[ 3 ], [ 4 ], [ 5 ]]));

test('Test takeWhile', () =>
    expect(sources.takeWhile().chunk(2).toArray())
    .toStrictEqual([[ 1, 2 ], [ 4, 8 ], [ 16 ]]));

test('Test skipWhile', () =>
    expect(sources.skipWhile().chunk(3).toArray())
    .toStrictEqual([[ 6, 7, 8 ], [ 9 ]]));

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().chunk(20).toArray())
    .toStrictEqual([[ 0, 2, 5, 10 ]]));

test('Test distinct with objects', () =>
    expect(sources.distinctObjects().chunk(2).toArray())
    .toStrictEqual([[ 'asd', 'a' ], [ 'ba' ]]));

test('Test sort with numbers', () =>
    expect(sources.descendingNumbers().chunk(3).toArray())
    .toStrictEqual([[ 4, 3, 2 ], [ 1, 0 ]]));