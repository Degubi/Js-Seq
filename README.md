# Javascript functional sequence processing library
- The api is very similar to java8 streams
- Lazy by default
- Made because of boredom
- Not even close being complete

# Usage
## Importing:

```javascript
import { Sequence } from './seq.js';
```
## Creating sequences:
```javascript
Sequence.range(0, 10);                         // 1 to 10 excluding 10
Sequence.rangeClosed(0, 10)                    // 1 to 10 including 10
Sequence.range(0, 10, 2);                      // 1 to 10 stepping 2, excluding 10
Sequence.iterate(1, k => k * 2)                // 1, 2, 4, 8.... this sequence is infinite
Sequence.iterate(1, k => k * 2, k => k < 50)   // Same as the last one but taking values less than 50 (same as doing a takeWhile)
Sequence.generate(readline)                    // Generate strings with reading from console
Sequence.of(1, 3, 3, 7, 4, 2, 0)               // Sequence of specific elements
[ 1, 2, 3 ].sequence()                         // Create sequence from array
```

## Transforming sequences (intermediate operations):
- These operations do nothing by themselves, they only start doing work when the terminal operation gets called
- Examples:

```javascript
Sequence.range(0, 100);               // Need to create a new sequence with every new pipeline
        .filter(k => k % 2 === 0)     // Keep only even values in the sequence
        .map(k => k * 2)              // Multiply them by 2
        .skip(2)                      // Skip the first 2 elements
        .limit(10)                    // Take the first 10 elements only
        .sortAscending()              // Sort them in ascending order

Sequence.of({ prop1: 5, prop2: 'hey' }, { prop1: 5, prop2: 'ho'}, { prop1: 20, prop2: 'hi' })
        .distinct(k => k.prop1)             // Many functions have key selecting overloads, default is always identity
        .sortDescending(k => k.prop1)       // Same happens here

Sequence.of({ data: [ 1, 2, 3, 4 ] }, { data: [ 5, 6, 7, 8 ] })
        .flatMap(k => k.data)
        .takeWhile(k => k < 6)
```

## Finishing sequences (terminal operations):
- Examples

```javascript
const seq = Sequence.range(0, 100);  // Let's assume we recreate this sequence every time

seq.forEach(console.log);            // Print every value to the console
seq.reduce(0, (k, l) => k + l);      // Sum all values
seq.sum();                           // Shorthand for summing
seq.count();                         // Count number of elements in sequence
seq.min();                           // Find the smallest value in the sequence, has key selector overload
seq.max();                           // Find the largest value in the sequence, has key selector overload
seq.average();                       // Average of the values in the sequence
seq.toArray();                       // Collect all elements into an array
seq.first();                         // Find the first element in the sequence, this returns the element or null
seq.last();                          // Find the last element in the sequence, this returns the element or null
seq.join(',');                       // Join elements with a comma

const seq = Sequence.of({ prop1: 5, prop2: 'hey' }, { prop1: 20, prop2: 'hi' }, { prop1: 20, prop2: 'hey' });

seq.toMap(k => k.prop1, k => k.prop2);                        // Creates an object where the keys are from 'prop1' and the corresponding values are from 'prop2'
seq.allMatches(k => k.prop1 > 0);                             // Returns true if the given predicate is true for all elements of the sequence
seq.anyMatches(k => k.prop2 === 'nope');                      // Returns true if the given predicate is true for any of the elements of the sequence
seq.groupingBy(k => k.prop1);                                 // Groups elements by 'prop1' where the values are the objects that had the same key
seq.groupingBy(k => k.prop1, Grouper.toArray());              // This does the same as the last example
seq.groupingBy(k => k.prop1, Grouper.counting());             // Groups elements prop1' where the value is the frequency of the key
seq.groupingBy(k => k.prop2, Grouper.summing(k => k.prop1));  // Groups elements by 'prop2' where the value is the sum of 'prop1'

const [matching, notMatching] = seq.partitionBy(k => k.prop1 % 2 === 0);  // First array contains the elements where the predicate was true
```