import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().statistics())
    .toEqual({ sum: 45, min: 0, max: 9, count: 10, average: 4.5 }));

test('Number sequence from 0 to 10 closed', () =>
    expect(sources.rangeClosed().statistics())
    .toEqual({ sum: 55, min: 0, max: 10, count: 11, average: 5 }));

test('Create sequence from array', () =>
    expect(sources.array().statistics())
    .toEqual({ sum: 6, min: 1, max: 3, count: 3, average: 2 }));

test('Create sequence using iterate', () =>
    expect(sources.iterate().statistics())
    .toEqual({ sum: 10, min: 0, max: 4, count: 5, average: 2 }));

test('Create sequence using of', () =>
    expect(sources.of().statistics())
    .toEqual({ sum: 6, min: 0, max: 3, count: 4, average: 1.5 }));

test('Create sequence using empty', () =>
    expect(sources.empty().statistics())
    .toBeNull());

test('Use already terminated sequence', () =>
    expect(() => sources.terminated().statistics())
    .toThrowError());

test('Test filter', () =>
    expect(sources.filter().statistics())
    .toEqual({ sum: 6, min: 0, max: 4, count: 3, average: 2 }));

test('Test map', () =>
    expect(sources.map().statistics())
    .toEqual({ sum: 12, min: 0, max: 8, count: 3, average: 4 }));

test('Test flatMap', () =>
    expect(sources.flatMap().statistics())
    .toEqual({ sum: 21, min: 1, max: 6, count: 6, average: 3.5 }));

test('Test take', () =>
    expect(sources.take().statistics())
    .toEqual({ sum: 30, min: 0, max: 10, count: 6, average: 5 }));

test('Test skip', () =>
    expect(sources.skip().statistics())
    .toEqual({ sum: 12, min: 3, max: 5, count: 3, average: 4 }));

test('Test takeWhile', () =>
    expect(sources.takeWhile().statistics())
    .toEqual({ sum: 31, min: 1, max: 16, count: 5, average: 6.2 }));

test('Test skipWhile', () =>
    expect(sources.skipWhile().statistics())
    .toEqual({ sum: 30, min: 6, max: 9, count: 4, average: 7.5 }));

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().statistics())
    .toEqual({ sum: 17, min: 0, max: 10, count: 4, average: 4.25 }));