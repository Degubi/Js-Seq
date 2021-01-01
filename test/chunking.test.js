import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().chunking(3))
    .toStrictEqual([[ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ], [ 9 ]]));

test('Number sequence from 0 to 10 closed', () =>
    expect(sources.rangeClosed().chunking(6))
    .toStrictEqual([[ 0, 1, 2, 3, 4, 5 ], [ 6, 7, 8, 9, 10 ]]));

test('Create sequence from array', () =>
    expect(sources.array().chunking(1))
    .toStrictEqual([[ 1 ], [ 2 ], [ 3 ]]));

test('Create sequence using iterate', () =>
    expect(sources.iterate().chunking(2))
    .toStrictEqual([[ 0, 1 ], [ 2, 3 ], [ 4 ]]));

test('Create sequence using of', () =>
    expect(sources.of().chunking(10))
    .toStrictEqual([[ 0, 1, 2, 3 ]]));

test('Create sequence using empty', () =>
    expect(sources.empty().chunking(42))
    .toStrictEqual([ ]));

test('Test filter', () =>
    expect(sources.filter().chunking(2))
    .toStrictEqual([[ 0, 2 ], [ 4 ]]));

test('Test map', () =>
    expect(sources.map().chunking(3))
    .toStrictEqual([[ 0, 4, 8 ]]));

test('Test flatMap', () =>
    expect(sources.flatMap().chunking(4))
    .toStrictEqual([[ 1, 2, 3, 4 ], [ 5, 6 ]]));

test('Test take', () =>
    expect(sources.take().chunking(5))
    .toStrictEqual([[ 0, 2, 4, 6, 8 ], [ 10 ]]));

test('Test skip', () =>
    expect(sources.skip().chunking(1))
    .toStrictEqual([[ 3 ], [ 4 ], [ 5 ]]));

test('Test takeWhile', () =>
    expect(sources.takeWhile().chunking(2))
    .toStrictEqual([[ 1, 2 ], [ 4, 8 ], [ 16 ]]));

test('Test skipWhile', () =>
    expect(sources.skipWhile().chunking(3))
    .toStrictEqual([[ 6, 7, 8 ], [ 9 ]]));

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().chunking(20))
    .toStrictEqual([[ 0, 2, 5, 10 ]]));

test('Test distinct with objects', () =>
    expect(sources.distinctObjects().chunking(2))
    .toStrictEqual([[ 'asd', 'a' ], [ 'ba' ]]));

test('Test sort with numbers', () =>
    expect(sources.descendingNumbers().chunking(3))
    .toStrictEqual([[ 4, 3, 2 ], [ 1, 0 ]]));