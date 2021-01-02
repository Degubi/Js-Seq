import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().count())
    .toEqual(10));

test('Number sequence from 0 to 10 closed', () =>
    expect(sources.rangeClosed().count())
    .toEqual(11));

test('Create sequence from array', () =>
    expect(sources.array().count())
    .toEqual(3));

test('Create sequence using iterate', () =>
    expect(sources.iterate().count())
    .toEqual(5));

test('Create sequence using of', () =>
    expect(sources.of().count())
    .toEqual(4));

test('Create sequence using empty', () =>
    expect(sources.empty().count())
    .toEqual(0));

test('Use already terminated sequence', () =>
    expect(() => sources.terminated().count())
    .toThrowError());

test('Test filter', () =>
    expect(sources.filter().count())
    .toEqual(3));

test('Test map', () =>
    expect(sources.map().count())
    .toEqual(3));

test('Test flatMap', () =>
    expect(sources.flatMap().count())
    .toEqual(6));

test('Test take', () =>
    expect(sources.take().count())
    .toEqual(6));

test('Test skip', () =>
    expect(sources.skip().count())
    .toEqual(3));

test('Test takeWhile', () =>
    expect(sources.takeWhile().count())
    .toEqual(5));

test('Test skipWhile', () =>
    expect(sources.skipWhile().count())
    .toEqual(4));

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().count())
    .toEqual(4));

test('Test distinct with objects', () =>
    expect(sources.distinctObjects().count())
    .toEqual(3));

test('Test sort with numbers', () =>
    expect(sources.descendingNumbers().count())
    .toEqual(5));