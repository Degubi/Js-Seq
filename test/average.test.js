import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().average())
    .toEqual(4.5));

test('Number sequence from 0 to 10 closed', () =>
    expect(sources.rangeClosed().average())
    .toEqual(5));

test('Create sequence from array', () =>
    expect(sources.array().average())
    .toEqual(2));

test('Create sequence using iterate', () =>
    expect(sources.iterate().average())
    .toEqual(2));

test('Create sequence using of', () =>
    expect(sources.of().average())
    .toEqual(1.5));

test('Create sequence using empty', () =>
    expect(sources.empty().average())
    .toBeNull());

test('Test filter', () =>
    expect(sources.filter().average())
    .toEqual(2));

test('Test map', () =>
    expect(sources.map().average())
    .toEqual(4));

test('Test flatMap', () =>
    expect(sources.flatMap().average())
    .toEqual(3.5));

test('Test take', () =>
    expect(sources.take().average())
    .toEqual(5));

test('Test skip', () =>
    expect(sources.skip().average())
    .toEqual(4));

test('Test takeWhile', () =>
    expect(sources.takeWhile().average())
    .toEqual(6.2));

test('Test skipWhile', () =>
    expect(sources.skipWhile().average())
    .toEqual(7.5));

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().average())
    .toEqual(4.25));

test('Test sort with numbers', () =>
    expect(sources.descendingNumbers().average())
    .toEqual(2));