import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';
import { Grouper } from '../src/seq.js';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().groupingBy(k => k % 2))
    .toStrictEqual(new Map([[ 0, [ 0, 2, 4, 6, 8 ]], [ 1, [ 1, 3, 5, 7, 9 ]]])));

test('Create sequence using empty', () =>
    expect(sources.empty().groupingBy(k => k))
    .toStrictEqual(new Map()));

test('Use already terminated sequence', () =>
    expect(() => sources.terminated().groupingBy(k => k))
    .toThrowError());


test('Use toArray with objects', () =>
    expect(sources.ofObjects().groupingBy(k => k.prop1, Grouper.toArray()))
    .toEqual(new Map([[ 'asd', [{ prop1: 'asd', prop2: 50 }, { prop1: 'asd', prop2: 20 }]], [ 'kek', [{ prop1: 'kek', prop2: 10 }]]])));

test('Use toArray with empty sequence', () =>
    expect(sources.empty().groupingBy(k => k, Grouper.toArray()))
    .toStrictEqual(new Map()));

test('Use toArray with already terminated sequence', () =>
    expect(() => sources.terminated().groupingBy(k => k, Grouper.toArray()))
    .toThrowError());


test('Use counting with objects', () =>
    expect(sources.ofObjects().groupingBy(k => k.prop1, Grouper.counting()))
    .toEqual(new Map([[ 'asd', 2 ], [ 'kek', 1 ]])));

test('Use counting with empty sequence', () =>
    expect(sources.empty().groupingBy(k => k, Grouper.counting()))
    .toStrictEqual(new Map()));

test('Use counting with already terminated sequence', () =>
    expect(() => sources.terminated().groupingBy(k => k, Grouper.counting()))
    .toThrowError());


test('Use summing with objects', () =>
    expect(sources.ofObjects().groupingBy(k => k.prop1, Grouper.summing(k => k.prop2)))
    .toEqual(new Map([[ 'asd', 70 ], [ 'kek', 10 ]])));

test('Use summing with empty sequence', () =>
    expect(sources.empty().groupingBy(k => k, Grouper.summing(k => k)))
    .toStrictEqual(new Map()));

test('Use summing with already terminated sequence', () =>
    expect(() => sources.terminated().groupingBy(k => k, Grouper.summing(k => summing)))
    .toThrowError());


test('Use averaging with objects', () =>
    expect(sources.ofObjects().groupingBy(k => k.prop1, Grouper.averaging(k => k.prop2)))
    .toEqual(new Map([[ 'asd', 35 ], [ 'kek', 10 ]])));

test('Use averaging with empty sequence', () =>
    expect(sources.empty().groupingBy(k => k, Grouper.averaging(k => k)))
    .toStrictEqual(new Map()));

test('Use averaging with already terminated sequence', () =>
    expect(() => sources.terminated().groupingBy(k => k, Grouper.averaging(k => k)))
    .toThrowError());