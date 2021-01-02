import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().max())
    .toEqual(9));

test('Number sequence from 0 to 10 closed', () =>
    expect(sources.rangeClosed().max())
    .toEqual(10));

test('Create sequence from array', () =>
    expect(sources.array().max())
    .toEqual(3));

test('Create sequence using iterate', () =>
    expect(sources.iterate().max())
    .toEqual(4));

test('Create sequence using of', () =>
    expect(sources.of().max())
    .toEqual(3));

test('Create sequence using empty', () =>
    expect(sources.empty().max())
    .toBeNull());

test('Use already terminated sequence', () =>
    expect(() => sources.terminated().max())
    .toThrowError());

test('Test filter', () =>
    expect(sources.filter().max())
    .toEqual(4));

test('Test map', () =>
    expect(sources.map().max())
    .toEqual(8));

test('Test flatMap', () =>
    expect(sources.flatMap().max())
    .toEqual(6));

test('Test take', () =>
    expect(sources.take().max())
    .toEqual(10));

test('Test skip', () =>
    expect(sources.skip().max())
    .toEqual(5));

test('Test takeWhile', () =>
    expect(sources.takeWhile().max())
    .toEqual(16));

test('Test skipWhile', () =>
    expect(sources.skipWhile().max())
    .toEqual(9));

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().max())
    .toEqual(10));

test('Test distinct with objects', () =>
    expect(sources.distinctObjects().max(k => k.length))
    .toEqual('asd'));

test('Test sort with numbers', () =>
    expect(sources.descendingNumbers().max())
    .toEqual(4));