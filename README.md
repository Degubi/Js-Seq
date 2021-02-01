# Javascript functional sequence processing library
[![Github issues](https://img.shields.io/github/issues/Degubi/Js-Seq?label=Issues&style=plastic&logo=github)](https://github.com/Degubi/Js-Seq/issues)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/degubi/Js-Seq?color=orange&label=Npm%20Version&style=plastic&logo=npm)](https://github.com/Degubi/Js-Seq/packages/558414)
[![Linecount](https://img.shields.io/tokei/lines/github/degubi/Js-Seq?label=Total%20Lines&logo=Github&style=plastic)](https://github.com/Degubi/Js-Seq/tree/master/src)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/degubi/js-seq/Run%20tests?label=Build&style=plastic&logo=github-actions)](https://github.com/Degubi/Js-Seq/actions)
[![Dependencies](https://img.shields.io/badge/dependencies-none-green.svg?label=Dependencies&style=plastic)](https://github.com/Degubi/Js-Seq/blob/master/package.json)

- The api is very similar to java8 streams
- Lazy by default
- Made because of boredom

# Versions for other languages
- Python: https://github.com/Degubi/Py-Seq

# Installation
## Using npm: (via Github packages)

```npm install @degubi/js-seq```
<br>

## Without npm:

```Minified .js file is available in the 'build' directory, .ts file is available in the src directory```
<br>

# Usage <a href = "https://degubi.github.io/Js-Seq/">(Docs)</a>
## Importing:

```javascript
import { Sequence } from './seq.js';
```
## Creating sequences:
```javascript
Sequence.range(0, 10);                           // 1 to 10 excluding 10
Sequence.rangeClosed(0, 10)                      // 1 to 10 including 10
Sequence.range(0, 10, 2);                        // 1 to 10 stepping 2, excluding 10
Sequence.iterate(1, k => k * 2)                  // 1, 2, 4, 8.... this sequence is infinite
Sequence.iterate(1, k => k * 2, k => k < 50)     // Same as the last one but taking values less than 50 (same as doing a takeWhile)
Sequence.generate(readline)                      // Generate strings with reading from console
Sequence.from(1, 3, 3, 7, 4, 2, 0)               // Sequence of elements
Sequence.from([ 1, 2, 3 ])                       // Create sequence from array
```

## Transforming sequences (intermediate operations):
- These operations do nothing by themselves, they only start doing work when the terminal operation gets called
- Function list:

<br>
<table>
    <tr>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#filter">filter</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#map">map</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#flatmap">flatMap</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#distinct">distinct</a></td>
    </tr>
    <tr>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#take">take</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#skip">skip</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#takewhile">takeWhile</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#skipwhile">skipWhile</a></td>
    </tr>
    <tr>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#sort">sort</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#sortascending">sortAscending</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#sortdescending">sortDescending</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#chunk">chunk</a></td>
    </tr>
</table>
<br>

- Examples:

```javascript
Sequence.range(0, 100);             // Need to create a new sequence with every new pipeline
        .filter(k => k % 2 === 0)   // Keep only even values in the sequence
        .map(k => k * 2)            // Multiply them by 2
        .skip(2)                    // Skip the first 2 elements
        .take(10)                   // Take the first 10 elements only
        .sortAscending()            // Sort them in ascending order

Sequence.from({ prop1: 5, prop2: 'hey' }, { prop1: 5, prop2: 'ho'}, { prop1: 20, prop2: 'hi' })
        .distinct(k => k.prop1)         // Many functions have key selecting overloads, default is always identity
        .sortDescending(k => k.prop1)   // Same happens here

Sequence.from({ data: [ 1, 2, 3, 4 ] }, { data: [ 5, 6, 7, 8 ] })
        .flatMap(k => k.data)
        .takeWhile(k => k < 6)
```

## Finishing sequences (terminal operations):
- Function list:

<br>
<table>
    <tr>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#foreach">forEach</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#reduce">reduce</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#toarray">toArray</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#tomap">toMap</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#partitionby">partitionBy</a></td>
    </tr>
    <tr>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#sum">sum</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#count">count</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#average">average</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#min">min</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#max">max</a></td>
    </tr>
    <tr>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#groupby">groupBy</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#first">first</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#last">last</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#join">join</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#statistics">statistics</a></td>
    </tr>
    <tr>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#allmatches">allMatches</a></td>
        <td><a href = "https://degubi.github.io/Js-Seq/classes/sequence.html#anymatches">anyMatches</a></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
<br>

- Examples

```javascript
const seq = Sequence.range(0, 100); // Let's assume we recreate this sequence every time

seq.forEach(console.log);           // Print every value to the console
seq.reduce(0, (k, l) => k + l);     // Sum all values
seq.sum();                          // Shorthand for summing
seq.count();                        // Count number of elements in sequence
seq.min();                          // Find the smallest value in the sequence, has key selector overload
seq.max();                          // Find the largest value in the sequence, has key selector overload
seq.average();                      // Average of the values in the sequence
seq.toArray();                      // Collect all elements into an array
seq.first();                        // Find the first element in the sequence, this returns the element or null
seq.last();                         // Find the last element in the sequence, this returns the element or null
seq.join(',');                      // Join elements with a comma
seq.statistics();                   // Returns an object with sum, count, min, max, average properties

const seq = Sequence.from({ prop1: 5, prop2: 'hey' }, { prop1: 20, prop2: 'hi' }, { prop1: 20, prop2: 'hey' });

// Creates an object where the keys are from 'prop1' and the corresponding values are from 'prop2'
// Note: This call throws an error because of the duplicate 'prop1: 20' key
seq.toMap(k => k.prop1, k => k.prop2);

// This is the same as the last example, but this version handles the duplicate key problem by keeping the first value
seq.toMap(k => k.prop1, k => k.prop2, (key, previousValue, currentValue) => previousValue);

// Returns true if the given predicate is true for all elements of the sequence
seq.allMatches(k => k.prop1 > 0);

// Returns true if the given predicate is true for any of the elements of the sequence
seq.anyMatches(k => k.prop2 === 'nope');

// Groups elements by 'prop1' where the values are the objects that had the same key
seq.groupBy(k => k.prop1);

// This does the same as the last example
seq.groupBy(k => k.prop1, Grouper.toArray());

// Groups elements prop1' where the value is the frequency of the key
seq.groupBy(k => k.prop1, Grouper.counting());

// Groups elements by 'prop2' where the value is the sum of 'prop1'
seq.groupBy(k => k.prop2, Grouper.summing(k => k.prop1));

// First array contains the elements where the predicate was true
const [matching, notMatching] = seq.partitionBy(k => k.prop1 % 2 === 0);
```