/**
 * Sequence class used for creating, manipulating & finishing sequences.
 * Sequences are created using static factories or from arrays using .sequence().
 * @author Degubi
 */
export declare class Sequence<T> {
    private constructor();

    /**
     * Function for creating a sequence of numbers using a non inclusive number range generator.
     * @param begin The first value of the range
     * @param end The last value of the range
     * @param step Default is 1
     * @returns Sequence from begin-to stepping with increment
     */
    static range(begin: number, end: number, step?: number): Sequence<number>;

    /**
     * Function for creating a sequence of numbers using an inclusive number range generator.
     * @param begin The first value of the range
     * @param end The last value of the range
     * @param step Default is 1
     * @returns Sequence from begin-to stepping with step
     */
    static rangeClosed(begin: number, end: number, step?: number): Sequence<number>;

    /**
     * Function for creating a sequence of elements using the seed as a base value and then applying the generator function to it,
     * until the limiterPredicateFunction returns false.  
     * Note: This generates an infinite sequence if the last parameter is ommited.
     * @param seed The initial value of the sequence
     * @param generatorFunction Function to generate the next element of the sequence
     * @param limiterPredicateFunction Optional parameter, defaults to always returning to true (meaning that it's infinite)
     * @returns Sequence with elements being populated lazily
     */
    static iterate<T>(seed: T, generatorFunction: (element: T) => T, limiterPredicateFunction?: (element: T) => boolean): Sequence<T>;

    /**
     * Function for creating a sequence of elements using the input generator.  
     * Note: This generates an infinite sequence.
     * @param generatorFunction A function that when called returns an element
     * @returns Sequence with elements being populated lazily from the input generatorFunction
     */
    static generate<T>(generatorFunction: () => T): Sequence<T>;

    /**
     * Function for creating an empty sequence.
     * @returns Sequence with 0 elements
     */
    static empty<T>(): Sequence<T>;

    /**
     * Function for creating a sequence of elements using the passed in array source.  
     * @param elements Input elements
     * @returns Sequence populated from the input array
     */
    static of<T>(elements: T[]): Sequence<T>;

    /**
     * Function for creating a sequence of elements using the passed in elements as the source.  
     * @param elements Input elements
     * @returns Sequence populated from the input elements
     */
    static of<T>(...elements: T[]): Sequence<T>;


    /**
     * Method for creating a new sequence containing only the elements that match the given predicate.
     * @param predicateFunction The predicate to test against the elements, if it returns true the element is kept in the sequence
     * @returns New sequence containing only the elements that match the given predicate
     */
    filter(predicateFunction: (element: T) => boolean): Sequence<T>;

    /**
     * Method for creating a new sequence with elements after applying the given function.
     * @param mapperFunction The function to apply to each element
     * @returns New sequence with elements after applying the given function
     */
    map<TT>(mapperFunction: (element: T) => TT): Sequence<TT>;

    /**
     * Method for creating a new sequence with elements after applying the given flatMapper function.
     * @param flatMapperFunction The function to apply to each element
     * @returns New sequence with elements after applying the given function
     */
    flatMap<TT>(flatMapperFunction: (element: T) => TT[]): Sequence<TT>;

    /**
     * Method for creating a new sequence with a specific amount of elements.
     * @param count Number of elements to keep in the sequence
     * @returns New sequence containing the first 'n' number of elements
     */
    take(count: number): Sequence<T>;

    /**
     * Method for creating a new sequence while skipping 'n' number of elements.
     * @param count Number of elements to skip
     * @returns New sequence with the first 'n' elements skipped
     */
    skip(count: number): Sequence<T>;

    /**
     * Method for creating a new sequence that takes elements until the given predicate returns false
     * @param predicateFunction The function to test against
     * @returns New sequence that takes elements until the given predicate returns false
     */
    takeWhile(predicateFunction: (element: T) => boolean): Sequence<T>;

    /**
     * Method for creating a new sequence that skips elements until the given predicate returns true
     * @param predicateFunction The function to test against
     * @returns New sequence that skips elements until the given predicate returns true
     */
    skipWhile(predicateFunction: (element: T) => boolean): Sequence<T>;

    /**
     * Method for creating a new sequence containing only unique values.
     * @param The Function for selecting a key for uniqueness, defaults to identity
     * @returns New sequence containing distinct elements according to the input function
     */
    distinct(keySelectorFunction?: (element: T) => any): Sequence<T>;

    /**
     * Method for creating a new sequence where the elements are sorted based on the given comparer
     * @param comparerFunction This function has the same properties as the comparer function given to Array.sort
     * @returns New sequence with elements are sorted based on the given comparer
     */
    sort(comparerFunction: (element1: T, element2: T) => number): Sequence<T>;

    /**
     * Method for creating a new sequence where the elements are sorted in ascending order based on the given keySelector
     * @param keySelectorFunction Function for selecting a key property to be used for sorting, defaults to identity
     * @returns New sequence with elements sorted in ascending order based on the given keySelector
     */
    sortAscending(keySelectorFunction?: (element: T) => any): Sequence<T>;

    /**
     * Method for creating a new sequence where the elements are sorted in descending order based on the given keySelector
     * @param keySelectorFunction Function for selecting a key property to be used for sorting, defaults to identity
     * @returns New sequence with elements sorted in descending order based on the given keySelector
     */
    sortDescending(keySelectorFunction?: (element: T) => any): Sequence<T>;

    /**
     * Method for creating a new sequence where the elements are chunked into arrays with each array containing max of 'chunkSizes' elements
     * @param chunkSizes Max size of each chunk
     * @returns New sequence with arrays containing the sequence's elements, with their maximum lengths restricted to the given chunk size
     */
    chunk(chunkSizes: number): Sequence<T[]>

    
    /**
     * Method for terminating the sequence and applying a function to each of the elements.
     * @param consumerFunction Function to apply to each of the elements
     * @returns Nothing
     */
    forEach(consumerFunction: (element: T) => void): void;

    /**
     * Method for terminating the sequence and peforming a reduction on the elements of the sequence.
     * @param seed Used as an 'initial' or 'base' value
     * @param accumulatorFunction Function used for combining the accumulator and the current element
     * @returns Result of the reduction
     */
    reduce<TT>(seed: TT, accumulatorFunction: (accumulator: TT, element: T) => TT): TT;

    /**
     * Method for terminating the sequence while calculating the sum of the elements.
     * @returns Sum of the elements in the sequence
     */
    sum(this: Sequence<number>): number;

    /**
     * Method for terminating the sequence while counting the number of elements.
     * @returns Count of the elements in the sequence
     */
    count(): number;

    /**
     * Method for terminating the sequence while calculating the average of the elements.
     * Note: This function returns null if the sequence is empty
     * @returns Average of the elements in the sequence or null if the sequence was empty
     */
    average(this: Sequence<number>): number | null;

    /**
     * Method for terminating the sequence while joining the elements together using the given separator.
     * @param separator The separator used for joining the elements, defaults to empty string
     * @returns The final joined string
     */
    join(this: Sequence<string>, separator?: string): string;

    /**
     * Method for retrieving the smallest element from the sequence.  
     * Note: This function returns null if the sequence is empty
     * @param keySelectorFunction Function used for extracting the key from the object to compare against, defaults to identity
     * @returns The smallest element in the sequence according to the keySelector or null if the sequence was empty
     */
    min(keySelectorFunction?: (element: T) => number): T | null;

    /**
     * Method for retrieving the largest element from the sequence.  
     * Note: This function returns null if the sequence is empty
     * @param keySelectorFunction Function used for extracting the key from the object to compare against, defaults to identity
     * @returns The largest element in the sequence according to the keySelector or null if the sequence was empty
     */
    max(keySelectorFunction?: (element: T) => number): T | null;

    /**
     * Method for terminating the sequence and collecting the elements of the sequence into an array.
     * @returns An array containing the elements of the sequence
     */
    toArray(): T[];

    /**
     * Method for terminating the sequence and collecting the elements into an object using the key & value selector functions  
     * @param keySelectorFunction Function used for extracting the key from the object
     * @param valueSelectorFunction Function used for extracting the value from the object
     * @param duplicateResolverFunction Takes 3 arguments: the key, the old value and the value we're trying to insert at the moment. Defaults to throwing an error
     * Return value is the value that gets inserted as the value of the duplicate key. Default is to throw an error
     * @returns An object where the keys are populated using the keySelector and the corresponding values are the values returned by the valueSelector
     */
    toMap<K, V>(keySelectorFunction: (element: T) => K, valueSelectorFunction: (element: T) => V,
                duplicateResolverFunction?: (key: K, previousValue: V, currentValue: V) => V): Map<K, V>;

    /**
     * Method for terminating the sequence and partitioning the elements into 2 arrays according to the given predicate
     * @param predicateFunction The predicate to test against
     * @returns 2 arrays where the first one contains the elements that matched the predicate and the second one that didn't
     */
    partitionBy(predicateFunction: (element: T) => boolean): [T[], T[]];

    /**
     * Method for terminating the sequence and performing a grouping by operation on the elements of the sequence.  
     * Note: This is the same as calling groupingBy with Grouper.toArray()
     * @param keySelectorFunction Function used for extracting the keys of the result
     * @returns The result of the grouping
     */
    groupingBy<K>(keySelectorFunction: (element: T) => K): Map<K, T[]>;

    /**
     * Method for terminating the sequence and performing a grouping by operation on the elements of the sequence
     * @param keySelectorFunction Function used for extracting the keys of the result
     * @param grouperFunction An instance of a Grouper object, defaults to Grouper.toArray()
     * @returns The result of the grouping
     */
    groupingBy<K, V>(keySelectorFunction: (element: T) => K, grouperFunction: Grouper<V>): Map<K, V>;

    /**
     * Method for terminating the sequence and getting the first element from it.  
     * Note: This function returns null if the sequence is empty
     * @returns The first element of the sequence or null if the sequence was empty
     */
    first(): T | null;

    /**
     * Method for terminating the sequence and getting the last element from it.  
     * Note: This function returns null if the sequence is empty
     * @returns The last element of the sequence or null if the sequence was empty
     */
    last(): T | null;

    /**
     * Method for terminating the sequence which returns true only if the given predicate matches all of the elements in the sequence.
     * @param predicateFunction The function to test against
     * @returns True if the given predicate matches all of the elements in the sequence
     */
    allMatches(predicateFunction: (element: T) => boolean): boolean;

    /**
     * Method for terminating the sequence which returns true if the given predicate matches any of the elements in the sequence.
     * @param predicateFunction The function to test against
     * @returns True if the given predicate matches any of the elements in the sequence
     */
    anyMatches(predicateFunction: (element: T) => boolean): boolean;
}

export declare class Grouper<T> {

    /**
     * Creates a grouper function that maps each key to an array of elements for that specific key.
     * @returns A new grouper instance
     */
    static toArray<T>(): Grouper<T[]>;

    /**
     * Creates a grouper function that maps each key to 1 and then sums it (a.k.a counts the occurence of it).  
     * Useful for creating frequency maps.
     * @returns A new grouper instance
     */
    static counting(): Grouper<number>;

    /**
     * Creates a grouper function that maps each key to the sum of the keySelector's key.
     * @param keySelectorFunction Function used for extracting the property to calculate the sum of
     * @returns A new grouper instance
     */
    static summing<T>(keySelectorFunction: (element: T) => number): Grouper<number>;

    /**
     * Creates a grouper function that maps each key to the average of the keySelector's key.
     * @param keySelectorFunction Function used for extracting the property to calculate the average of
     * @returns A new grouper instance
     */
    static averaging<T>(keySelectorFunction: (element: T) => number): Grouper<number>;
}