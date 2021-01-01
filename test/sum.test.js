import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().sum())
    .toEqual(45));

test('Number sequence from 0 to 10 closed', () =>
    expect(sources.rangeClosed().sum())
    .toEqual(55));

test('Create sequence from array', () =>
    expect(sources.array().sum())
    .toEqual(6));

test('Create sequence using iterate', () =>
    expect(sources.iterate().sum())
    .toEqual(10));

test('Create sequence using of', () =>
    expect(sources.of().sum())
    .toEqual(6));

test('Create sequence using empty', () =>
    expect(sources.empty().sum())
    .toEqual(0));

test('Test filter', () =>
    expect(sources.filter().sum())
    .toEqual(6));

test('Test map', () =>
    expect(sources.map().sum())
    .toEqual(12));

test('Test flatMap', () =>
    expect(sources.flatMap().sum())
    .toEqual(21));

test('Test take', () =>
    expect(sources.take().sum())
    .toEqual(30));

test('Test skip', () =>
    expect(sources.skip().sum())
    .toEqual(12));

test('Test takeWhile', () =>
    expect(sources.takeWhile().sum())
    .toEqual(31));

test('Test skipWhile', () =>
    expect(sources.skipWhile().sum())
    .toEqual(30));

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().sum())
    .toEqual(17));