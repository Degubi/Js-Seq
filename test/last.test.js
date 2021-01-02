import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().last())
    .toEqual(9));

test('Number sequence from 0 to 10 closed', () =>
    expect(sources.rangeClosed().last())
    .toEqual(10));

test('Create sequence from array', () =>
    expect(sources.array().last())
    .toEqual(3));

test('Create sequence using iterate', () =>
    expect(sources.iterate().last())
    .toEqual(4));

test('Create sequence using of', () =>
    expect(sources.of().last())
    .toEqual(3));

test('Create sequence using empty', () =>
    expect(sources.empty().last())
    .toBeNull());

test('Use already terminated sequence', () =>
    expect(() => sources.terminated().last())
    .toThrowError());

test('Test filter', () =>
    expect(sources.filter().last())
    .toEqual(4));

test('Test map', () =>
    expect(sources.map().last())
    .toEqual(8));

test('Test flatMap', () =>
    expect(sources.flatMap().last())
    .toEqual(6));

test('Test take', () =>
    expect(sources.take().last())
    .toEqual(10));

test('Test skip', () =>
    expect(sources.skip().last())
    .toEqual(5));

test('Test takeWhile', () =>
    expect(sources.takeWhile().last())
    .toEqual(16));

test('Test skipWhile', () =>
    expect(sources.skipWhile().last())
    .toEqual(9));

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().last())
    .toEqual(10));

test('Test distinct with objects', () =>
    expect(sources.distinctObjects().last())
    .toEqual('ba'));

test('Test sort with numbers', () =>
    expect(sources.descendingNumbers().last())
    .toEqual(0));