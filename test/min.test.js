import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().min())
    .toEqual(0));

test('Number sequence from 0 to 10 closed', () =>
    expect(sources.rangeClosed().min())
    .toEqual(0));

test('Create sequence from array', () =>
    expect(sources.array().min())
    .toEqual(1));

test('Create sequence using iterate', () =>
    expect(sources.iterate().min())
    .toEqual(0));

test('Create sequence using of', () =>
    expect(sources.of().min())
    .toEqual(0));

test('Create sequence using empty', () =>
    expect(sources.empty().min())
    .toBeNull());

test('Use already terminated sequence', () =>
    expect(() => sources.terminated().min())
    .toThrowError());

test('Test filter', () =>
    expect(sources.filter().min())
    .toEqual(0));

test('Test map', () =>
    expect(sources.map().min())
    .toEqual(0));

test('Test flatMap', () =>
    expect(sources.flatMap().min())
    .toEqual(1));

test('Test take', () =>
    expect(sources.take().min())
    .toEqual(0));

test('Test skip', () =>
    expect(sources.skip().min())
    .toEqual(3));

test('Test takeWhile', () =>
    expect(sources.takeWhile().min())
    .toEqual(1));

test('Test skipWhile', () =>
    expect(sources.skipWhile().min())
    .toEqual(6));

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().min())
    .toEqual(0));

test('Test distinct with objects', () =>
    expect(sources.distinctObjects().min(k => k.length))
    .toEqual('a'));

test('Test sort with numbers', () =>
    expect(sources.descendingNumbers().min())
    .toEqual(0));