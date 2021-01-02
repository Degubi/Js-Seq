import * as sources from './testSources.js';
import { test, expect } from '@jest/globals';

test('Number sequence from 0 to 10', () =>
    expect(sources.range().join())
    .toEqual('0123456789'));

test('Number sequence from 0 to 10 closed', () =>
    expect(sources.rangeClosed().join(', '))
    .toEqual('0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10'));

test('Create sequence from array', () =>
    expect(sources.array().join('-'))
    .toEqual('1-2-3'));

test('Create sequence using iterate', () =>
    expect(sources.iterate().join(','))
    .toEqual('0,1,2,3,4'));

test('Create sequence using of', () =>
    expect(sources.of().join())
    .toEqual('0123'));

test('Create sequence using empty', () =>
    expect(sources.empty().join(', '))
    .toEqual(''));

test('Use already terminated sequence', () =>
    expect(() => sources.terminated().join())
    .toThrowError());

test('Test filter', () =>
    expect(sources.filter().join(', '))
    .toEqual('0, 2, 4'));

test('Test map', () =>
    expect(sources.map().join('x'))
    .toEqual('0x4x8'));

test('Test flatMap', () =>
    expect(sources.flatMap().join(', '))
    .toEqual('1, 2, 3, 4, 5, 6'));

test('Test take', () =>
    expect(sources.take().join(' '))
    .toEqual('0 2 4 6 8 10'));

test('Test skip', () =>
    expect(sources.skip().join('-'))
    .toEqual('3-4-5'));

test('Test takeWhile', () =>
    expect(sources.takeWhile().join(', '))
    .toEqual('1, 2, 4, 8, 16'));

test('Test skipWhile', () =>
    expect(sources.skipWhile().join(','))
    .toEqual('6,7,8,9'));

test('Test distinct with numbers', () =>
    expect(sources.distinctNumbers().join('x'))
    .toEqual('0x2x5x10'));

test('Test distinct with objects', () =>
    expect(sources.distinctObjects().join(', '))
    .toEqual('asd, a, ba'));

test('Test sort with numbers', () =>
    expect(sources.descendingNumbers().join(', '))
    .toEqual('4, 3, 2, 1, 0'));