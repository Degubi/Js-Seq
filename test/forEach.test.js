import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(forEachOpHelper(sources.range()))
    .toStrictEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]));

test('Number sequence from 0 to 10 closed', () =>
    expect(forEachOpHelper(sources.rangeClosed()))
    .toStrictEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]));

test('Create sequence from array', () =>
    expect(forEachOpHelper(sources.array()))
    .toStrictEqual([ 1, 2, 3 ]));

test('Create sequence using iterate', () =>
    expect(forEachOpHelper(sources.iterate()))
    .toStrictEqual([ 0, 1, 2, 3, 4 ]));

test('Create sequence using of', () =>
    expect(forEachOpHelper(sources.of()))
    .toStrictEqual([ 0, 1, 2, 3 ]));

test('Create sequence using empty', () =>
    expect(forEachOpHelper(sources.empty()))
    .toStrictEqual([ ]));

test('Test filter', () =>
    expect(forEachOpHelper(sources.filter()))
    .toStrictEqual([ 0, 2, 4 ]));

test('Test map', () =>
    expect(forEachOpHelper(sources.map()))
    .toStrictEqual([ 0, 4, 8 ]));

test('Test flatMap', () =>
    expect(forEachOpHelper(sources.flatMap()))
    .toStrictEqual([ 1, 2, 3, 4, 5, 6 ]));

test('Test take', () =>
    expect(forEachOpHelper(sources.take()))
    .toStrictEqual([ 0, 2, 4, 6, 8, 10 ]));

test('Test skip', () =>
    expect(forEachOpHelper(sources.skip()))
    .toStrictEqual([ 3, 4, 5 ]));

test('Test takeWhile', () =>
    expect(forEachOpHelper(sources.takeWhile()))
    .toStrictEqual([ 1, 2, 4, 8, 16 ]));

test('Test skipWhile', () =>
    expect(forEachOpHelper(sources.skipWhile()))
    .toStrictEqual([ 6, 7, 8, 9 ]));

test('Test distinct with numbers', () =>
    expect(forEachOpHelper(sources.distinctNumbers()))
    .toStrictEqual([ 0, 2, 5, 10 ]));

test('Test distinct with objects', () =>
    expect(forEachOpHelper(sources.distinctObjects()))
    .toStrictEqual([ 'asd', 'a', 'ba' ]));

test('Test sort with numbers', () =>
    expect(forEachOpHelper(sources.descendingNumbers()))
    .toStrictEqual([ 4, 3, 2, 1, 0 ]));


function forEachOpHelper(sequence) {
    const result = [];

    sequence.forEach(k => result.push(k));

    return result;
}