import { Sequence } from '../src/seq.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(Sequence.range(0, 10).toArray())
    .toStrictEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]));

test('Number sequence from 0 to 10 closed', () =>
    expect(Sequence.rangeClosed(0, 10).toArray())
    .toStrictEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]));

test('Create sequence from array', () =>
    expect([ 1, 2, 3 ].sequence().toArray())
    .toStrictEqual([ 1, 2, 3 ]));

test('Create sequence using iterate', () =>
    expect(Sequence.iterate(0, k => k + 1, k => k < 5).toArray())
    .toStrictEqual([ 0, 1, 2, 3, 4 ]));

test('Create sequence using of', () =>
    expect(Sequence.of(0, 1, 2, 3).toArray())
    .toStrictEqual([ 0, 1, 2, 3 ]));

test('Test filter', () =>
    expect(Sequence.of(0, 1, 2, 3, 4, 5).filter(k => k % 2 === 0).toArray())
    .toStrictEqual([ 0, 2, 4 ]));

test('Test map', () =>
    expect(Sequence.of(0, 2, 4).map(k => k * 2).toArray())
    .toStrictEqual([ 0, 4, 8 ]));

const nestedObjectData = [{ data: [ 1, 2, 3 ] }, { data: [ 4, 5, 6 ] }];
test('Test flatMap', () =>
    expect(nestedObjectData.sequence().flatMap(k => k.data).toArray())
    .toStrictEqual([ 1, 2, 3, 4, 5, 6 ]));

test('Test limit', () =>
    expect(Sequence.iterate(0, k => k + 2).limit(6).toArray())
    .toStrictEqual([ 0, 2, 4, 6, 8, 10 ]));

test('Test skip', () =>
    expect(Sequence.range(0, 6).skip(3).toArray())
    .toStrictEqual([ 3, 4, 5 ]));

test('Test takeWhile', () =>
    expect(Sequence.iterate(1, k => k * 2).takeWhile(k => k < 20).toArray())
    .toStrictEqual([ 1, 2, 4, 8, 16 ]));

test('Test dropWhile', () =>
    expect(Sequence.range(0, 10).dropWhile(k => k < 6).toArray())
    .toStrictEqual([ 6, 7, 8, 9 ]));

test('Test distinct with numbers', () =>
    expect(Sequence.of(0, 2, 2, 0, 5, 10, 2, 5).distinct().toArray())
    .toStrictEqual([ 0, 2, 5, 10 ]));

test('Test distinct with objects', () =>
    expect(Sequence.of('asd', 'sad', 'lal', 'a', 'c', 'ba').distinct(k => k.length).toArray())
    .toStrictEqual([ 'asd', 'a', 'ba' ]));

test('Test sort with numbers', () =>
    expect(Sequence.range(0, 5).sortDescending().toArray())
    .toStrictEqual([ 4, 3, 2, 1, 0 ]));