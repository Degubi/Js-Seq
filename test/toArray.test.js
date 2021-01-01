import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().toArray())
    .toStrictEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]));

test('Number sequence from 0 to 10 closed', () =>
    expect(sources.rangeClosed().toArray())
    .toStrictEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]));

test('Create sequence from array', () =>
    expect(sources.array().toArray())
    .toStrictEqual([ 1, 2, 3 ]));

test('Create sequence using iterate', () =>
    expect(sources.iterate().toArray())
    .toStrictEqual([ 0, 1, 2, 3, 4 ]));

test('Create sequence using of', () =>
    expect(sources.of().toArray())
    .toStrictEqual([ 0, 1, 2, 3 ]));

test('Create sequence using empty', () =>
    expect(sources.empty().toArray())
    .toStrictEqual([ ]));

test('Test filter', () =>
    expect(sources.filter().toArray())
    .toStrictEqual([ 0, 2, 4 ]));

test('Test map', () =>
    expect(sources.map().toArray())
    .toStrictEqual([ 0, 4, 8 ]));

test('Test flatMap', () =>
    expect(sources.flatMap().toArray())
    .toStrictEqual([ 1, 2, 3, 4, 5, 6 ]));

test('Test take', () =>
    expect(sources.take().toArray())
    .toStrictEqual([ 0, 2, 4, 6, 8, 10 ]));

test('Test skip', () =>
    expect(sources.skip().toArray())
    .toStrictEqual([ 3, 4, 5 ]));

test('Test takeWhile', () =>
    expect(sources.takeWhile().toArray())
    .toStrictEqual([ 1, 2, 4, 8, 16 ]));

test('Test skipWhile', () =>
    expect(sources.skipWhile().toArray())
    .toStrictEqual([ 6, 7, 8, 9 ]));

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().toArray())
    .toStrictEqual([ 0, 2, 5, 10 ]));

test('Test distinct with objects', () =>
    expect(sources.distinctObjects().toArray())
    .toStrictEqual([ 'asd', 'a', 'ba' ]));

test('Test sort with numbers', () =>
    expect(sources.descendingNumbers().toArray())
    .toStrictEqual([ 4, 3, 2, 1, 0 ]));