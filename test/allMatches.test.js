import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().allMatches(k => k < 1000))
    .toBeTruthy());

test('Number sequence from 0 to 10 closed', () =>
    expect(sources.rangeClosed().allMatches(k => k % 2 === 0))
    .toBeFalsy());

test('Create sequence from array', () =>
    expect(sources.array().allMatches(k => k > 0))
    .toBeTruthy());

test('Create sequence using iterate', () =>
    expect(sources.iterate().allMatches(k => k % 10 !== 0))
    .toBeFalsy());

test('Create sequence using of', () =>
    expect(sources.of().allMatches(k => k - k === 0))
    .toBeTruthy());

test('Create sequence using empty', () =>
    expect(sources.empty().allMatches(k => k % 2 === 0))
    .toBeTruthy());

test('Use already terminated sequence', () =>
    expect(() => sources.terminated().allMatches(k => k === k))
    .toThrowError());

test('Test filter', () =>
    expect(sources.filter().allMatches(k => k % 2 === 0))
    .toBeTruthy());

test('Test map', () =>
    expect(sources.map().allMatches(k => k % 4 === 0))
    .toBeTruthy());

test('Test flatMap', () =>
    expect(sources.flatMap().allMatches(k => k - 2 === 0))
    .toBeFalsy());

test('Test take', () =>
    expect(sources.take().allMatches(k => k * 0 === 0))
    .toBeTruthy());

test('Test skip', () =>
    expect(sources.skip().allMatches(k => k * -1 !== k))
    .toBeTruthy());

test('Test takeWhile', () =>
    expect(sources.takeWhile().allMatches(k => k < 10))
    .toBeFalsy());

test('Test skipWhile', () =>
    expect(sources.skipWhile().allMatches(k => k % 5 !== 0))
    .toBeTruthy());

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().allMatches(k => k < 0))
    .toBeFalsy());

test('Test distinct with objects', () =>
    expect(sources.distinctObjects().allMatches(k => k !== 'a'))
    .toBeFalsy());

test('Test sort with numbers', () =>
    expect(sources.descendingNumbers().allMatches(k => k === 3))
    .toBeFalsy());