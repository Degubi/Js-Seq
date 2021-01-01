import { Sequence } from '../src/seq.js';

export function range() { return Sequence.range(0, 10); }
export function rangeClosed() { return Sequence.rangeClosed(0, 10); }
export function array() { return [ 1, 2, 3 ].sequence(); }
export function iterate() { return Sequence.iterate(0, k => k + 1, k => k < 5); }
export function of() { return Sequence.of(0, 1, 2, 3); }
export function filter() { return Sequence.of(0, 1, 2, 3, 4, 5).filter(k => k % 2 === 0); }
export function map() { return Sequence.of(0, 2, 4).map(k => k * 2); }
export function flatMap() { return [{ data: [ 1, 2, 3 ] }, { data: [ 4, 5, 6 ] }].sequence().flatMap(k => k.data); }
export function limit() { return Sequence.iterate(0, k => k + 2).limit(6); }
export function skip() { return Sequence.range(0, 6).skip(3); }
export function takeWhile() { return Sequence.iterate(1, k => k * 2).takeWhile(k => k < 20); }
export function dropWhile() { return Sequence.range(0, 10).dropWhile(k => k < 6); }
export function distinctNumbers() { return Sequence.of(0, 2, 2, 0, 5, 10, 2, 5).distinct(); }
export function distinctObjects() { return Sequence.of('asd', 'sad', 'lal', 'a', 'c', 'ba').distinct(k => k.length); }
export function descendingNumbers() { return Sequence.range(0, 5).sortDescending(); }