import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().anyMatches(k => k < 1000))
    .toBeTruthy());

test('Number sequence from 0 to 10 closed', () =>
    expect(sources.rangeClosed().anyMatches(k => k % 2 === 0))
    .toBeTruthy());

test('Create sequence from array', () =>
    expect(sources.array().anyMatches(k => k > 0))
    .toBeTruthy());

test('Create sequence using iterate', () =>
    expect(sources.iterate().anyMatches(k => k % 10 !== 0))
    .toBeTruthy());

test('Create sequence using of', () =>
    expect(sources.of().anyMatches(k => k - k === 0))
    .toBeTruthy());

test('Create sequence using empty', () =>
    expect(sources.empty().anyMatches(k => k % 2 === 0))
    .toBeFalsy());

test('Use already terminated sequence', () =>
    expect(() => sources.terminated().anyMatches(k => k === k))
    .toThrowError());

test('Test filter', () =>
    expect(sources.filter().anyMatches(k => k % 2 === 0))
    .toBeTruthy());

test('Test map', () =>
    expect(sources.map().anyMatches(k => k % 4 === 0))
    .toBeTruthy());

test('Test flatMap', () =>
    expect(sources.flatMap().anyMatches(k => k - 2 === 0))
    .toBeTruthy());

test('Test take', () =>
    expect(sources.take().anyMatches(k => k * 0 === 0))
    .toBeTruthy());

test('Test skip', () =>
    expect(sources.skip().anyMatches(k => k * -1 !== k))
    .toBeTruthy());

test('Test takeWhile', () =>
    expect(sources.takeWhile().anyMatches(k => k < 10))
    .toBeTruthy());

test('Test skipWhile', () =>
    expect(sources.skipWhile().anyMatches(k => k % 5 !== 0))
    .toBeTruthy());

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().anyMatches(k => k < 0))
    .toBeFalsy());

test('Test distinct with objects', () =>
    expect(sources.distinctObjects().anyMatches(k => k !== 'a'))
    .toBeTruthy());

test('Test sort with numbers', () =>
    expect(sources.descendingNumbers().anyMatches(k => k === 3))
    .toBeTruthy());