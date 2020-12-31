import { Sequence } from '../src/seq.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(Sequence.range(0, 10).sum())
    .toEqual(45));

test('Number sequence from 0 to 10 closed', () =>
    expect(Sequence.rangeClosed(0, 10).sum())
    .toEqual(55));

test('Create sequence from array', () =>
    expect([ 1, 2, 3 ].sequence().sum())
    .toEqual(6));

test('Create sequence using iterate', () =>
    expect(Sequence.iterate(0, k => k + 1, k => k < 5).sum())
    .toEqual(10));

test('Create sequence using of', () =>
    expect(Sequence.of(0, 1, 2, 3).sum())
    .toEqual(6));

test('Test filter', () =>
    expect(Sequence.of(0, 1, 2, 3, 4, 5).filter(k => k % 2 === 0).sum())
    .toEqual(6));

test('Test map', () =>
    expect(Sequence.of(0, 2, 4).map(k => k * 2).sum())
    .toEqual(12));

const nestedObjectData = [{ data: [ 1, 2, 3 ] }, { data: [ 4, 5, 6 ] }];
test('Test flatMap', () =>
    expect(nestedObjectData.sequence().flatMap(k => k.data).sum())
    .toEqual(21));

test('Test limit', () =>
    expect(Sequence.iterate(0, k => k + 2).limit(6).sum())
    .toEqual(30));

test('Test skip', () =>
    expect(Sequence.range(0, 6).skip(3).sum())
    .toEqual(12));

test('Test takeWhile', () =>
    expect(Sequence.iterate(1, k => k * 2).takeWhile(k => k < 20).sum())
    .toEqual(31));

test('Test dropWhile', () =>
    expect(Sequence.range(0, 10).dropWhile(k => k < 6).sum())
    .toEqual(30));

test('Test distinct with numbers', () =>
    expect(Sequence.of(0, 2, 2, 0, 5, 10, 2, 5).distinct().sum())
    .toEqual(17));