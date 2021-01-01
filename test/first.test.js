import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().first())
    .toEqual(0));

test('Number sequence from 0 to 10 closed', () =>
    expect(sources.rangeClosed().first())
    .toEqual(0));

test('Create sequence from array', () =>
    expect(sources.array().first())
    .toEqual(1));

test('Create sequence using iterate', () =>
    expect(sources.iterate().first())
    .toEqual(0));

test('Create sequence using of', () =>
    expect(sources.of().first())
    .toEqual(0));

test('Test filter', () =>
    expect(sources.filter().first())
    .toEqual(0));

test('Test map', () =>
    expect(sources.map().first())
    .toEqual(0));

test('Test flatMap', () =>
    expect(sources.flatMap().first())
    .toEqual(1));

test('Test limit', () =>
    expect(sources.limit().first())
    .toEqual(0));

test('Test skip', () =>
    expect(sources.skip().first())
    .toEqual(3));

test('Test takeWhile', () =>
    expect(sources.takeWhile().first())
    .toEqual(1));

test('Test dropWhile', () =>
    expect(sources.dropWhile().first())
    .toEqual(6));

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().first())
    .toEqual(0));

test('Test distinct with objects', () =>
    expect(sources.distinctObjects().first())
    .toEqual('asd'));

test('Test sort with numbers', () =>
    expect(sources.descendingNumbers().first())
    .toEqual(4));