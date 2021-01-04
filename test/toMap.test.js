import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().toMap(k => k, k => k % 2 === 0))
    .toEqual(new Map([[ 0, true ], [ 1, false ], [ 2, true ], [ 3, false ], [ 4, true ], [ 5, false ], [ 6, true ], [ 7, false ], [ 8, true ], [ 9, false ]])));

test('Number sequence from 0 to 10 closed', () =>
    expect(() => sources.rangeClosed().toMap(k => k % 2, k => k))
    .toThrowError());

test('Create sequence from array', () =>
    expect(sources.array().toMap(_ => 1, k => k, (k, _, currentVal) => currentVal))
    .toEqual(new Map([[ 1, 3 ]])));

test('Create sequence using iterate', () =>
    expect(sources.iterate().toMap(k => k + 1, k => k - 1))
    .toEqual(new Map([[ 1, -1 ], [ 2, 0 ], [ 3, 1 ], [ 4, 2 ], [ 5, 3 ]])));

test('Create sequence using of', () =>
    expect(sources.of().toMap(k => k, k => k * 2))
    .toEqual(new Map([[ 0, 0], [ 1, 2 ], [ 2, 4], [ 3, 6 ]])));

test('Create sequence using empty', () =>
    expect(sources.empty().toMap(k => k, k => k / 2))
    .toEqual(new Map()));

test('Use already terminated sequence', () =>
    expect(() => sources.terminated().toMap(k => k, k => k / 2))
    .toThrowError());

test('Test filter', () =>
    expect(sources.filter().toMap(k => k, k => k))
    .toEqual(new Map([[ 0, 0 ], [ 2, 2], [ 4, 4]])));

test('Test map', () =>
    expect(sources.map().toMap(k => k, k => k % 4))
    .toEqual(new Map([[ 0, 0 ], [ 4, 0], [ 8, 0]])));

test('Test flatMap', () =>
    expect(sources.flatMap().toMap(_ => 0, k => k, (k, oldValue, _) => oldValue))
    .toEqual(new Map([[ 0, 1 ]])));

test('Test take', () =>
    expect(() => sources.take().toMap(_ => 1, _ => 2))
    .toThrowError());

test('Test skip', () =>
    expect(sources.skip().toMap(k => k, k => Math.min(k, 4)))
    .toEqual(new Map([[ 3, 3 ], [ 4, 4], [ 5, 4]])));

test('Test takeWhile', () =>
    expect(sources.takeWhile().toMap(k => k % 2, k => k, (k, _, newValue) => newValue))
    .toEqual(new Map([[ 1, 1], [0, 16 ]])));

test('Test skipWhile', () =>
    expect(() => sources.skipWhile().toMap(_ => 0, k => k))
    .toThrowError());

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().toMap(k => k, k => k))
    .toEqual(new Map([[ 0, 0 ], [ 2, 2 ], [ 5, 5 ], [ 10, 10 ]])));

test('Test distinct with objects', () =>
    expect(sources.distinctObjects().toMap(k => k, k => k.length))
    .toEqual(new Map([[ 'asd', 3 ], [ 'a', 1 ], [ 'ba', 2 ]])));