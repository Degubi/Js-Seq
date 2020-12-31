/**
 * Sequence class used for creating, manipulating & finishing sequences.
 * Sequences are created using static factories.
 * @author Degubi
 */
declare export class Sequence<T> {
    private constructor();

    /**
     * Function for creating a sequence of numbers using a non inclusive number range generator.
     * @param begin The first value of the range
     * @param end The last value of the range
     * @param increment Default is 1
     * @returns Sequence from begin-to stepping with increment
     */
    static range(begin: number, end: number, increment: number = 1): Sequence<number>;

    /**
     * Function for creating a sequence of numbers using an inclusive number range generator.
     * @param begin The first value of the range
     * @param end The last value of the range
     * @param increment Default is 1
     * @returns Sequence from begin-to stepping with increment
     */
    static rangeClosed(begin: number, end: number, increment: number = 1): Sequence<number>;

    /**
     * Function for creating a sequence of elements using the seed as a base value and then applying the generator function to it,
     * until the limiterPredicateFunction returns false.  
     * Note: This generates an infinite sequence if the last parameter is ommited.
     * @param seed The initial value of the sequence
     * @param generatorFunction Function to generate the next element of the sequence
     * @param limiterPredicateFunction Optional parameter, defaults to always returning to true (meaning that it's infinite)
     * @returns Sequence with elements being populated lazily
     */
    static iterate<T>(seed: T, generatorFunction: (element: T) => T, limiterPredicateFunction: (element: T) => boolean = (_) => true): Sequence<T>;

    /**
     * Function for creating a sequence of elements using the input generator.  
     * Note: This generates an infinite sequence.
     * @param generatorFunction A function that when called returns an element
     * @returns Sequence with elements being populated lazily from the input generatorFunction
     */
    static generate<T>(generatorFunction: () => T): Sequence<T>;

    /**
     * Function for creating a sequence of elements using the passed in elements as the source.  
     * Note: this is not the same as calling Array.sequence, do not pass in an array into this function.
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
     * @returns New sequence containing 'n' number of elements
     */
    limit(count: number): Sequence<T>;

    /**
     * Method for creating a new sequence while skipping 'n' number of elements.
     * @param count Number of elements to skip
     * @returns New sequence with the first 'n' elements skipped
     */
    skip(count: number): Sequence<T>;
    takeWhile(predicateFunction: (element: T) => boolean): Sequence<T>;
    dropWhile(predicateFunction: (element: T) => boolean): Sequence<T>;

    /**
     * Method for creating a new sequence containing only unique values.  
     * Note: This is a stateful operation.
     * @param The Function for selecting a key for uniqueness, defaults to identity
     * @returns New sequence containing distinct elements according to the input function
     */
    distinct(keySelectorFunction: (element: T) => any = k => k): Sequence<T>;
    sort(comparerFunction: (element1: T, element2: T) => number): Sequence<T>;
    sortAscending(keySelectorFunction: (element: T) => any = k => k): Sequence<T>;
    sortDescending(keySelectorFunction: (element: T) => any = k => k): Sequence<T>;

    /**
     * Method for terminating the sequence and applying a function to each of the elements.
     * @param consumerFunction Function to apply to each of the elements
     * @returns Nothing
     */
    forEach(consumerFunction: (element: T) => void): void;
    reduce<TT>(seed: TT, accumulatorFunction: (accumulator: TT, element: T) => TT): TT;

    /**
     * Method for terminating the sequence while calculating the sum of the elements.
     * @returns Sum of the elements in the sequence
     */
    sum(): number;

    /**
     * Method for terminating the sequence while counting the number of elements.
     * @returns Count of the elements in the sequence
     */
    count(): number;

    /**
     * Method for terminating the sequence while calculating the average of the elements.
     * @returns Average of the elements in the sequence
     */
    average(): number;

    /**
     * Method for terminating the sequence while joining the elements together using the given separator.
     * @param separator The separator used for joining the elements
     * @returns The final joined string
     */
    join(separator: string = ''): string;

    /**
     * Method for getting the smallest element from the sequence.  
     * Note: This function returns null if the sequence is empty
     * @param keySelectorFunction Function used for extracting the key from the object to compare against, defaults to identity
     * @returns The smallest element in the sequence according to the keySelector or null if the sequence was empty
     */
    min(keySelectorFunction: (element: T) => number = k => k): T?;

    /**
     * Method for getting the largest element from the sequence.  
     * Note: This function returns null if the sequence is empty
     * @param keySelectorFunction Function used for extracting the key from the object to compare against, defaults to identity
     * @returns The largest element in the sequence according to the keySelector or null if the sequence was empty
     */
    max(keySelectorFunction: (element: T) => number = k => k): T?;

    /**
     * Method for terminating the sequence while collecting the elements of the sequence into an array.
     * @returns An array containing the elements of the sequence
     */
    toArray(): T[];
    toMap<K, V>(keySelectorFunction: (element: T) => K, valueSelectorFunction: (element: T) => V): Map<K, V>;
    partitionBy(predicateFunction: (element: T) => boolean): T[2][];
    groupingBy<K, V>(keySelectorFunction: (element: T) => K, grouperFunction: Grouper<V> = Grouper.toArray()): Map<K, V>;

    /**
     * Method for terminating the sequence and getting the first element from it.  
     * Note: This function returns null if the sequence is empty
     * @returns The first element of the sequence or null if the sequence was empty
     */
    first(): T?;

    /**
     * Method for terminating the sequence and getting the last element from it.  
     * Note: This function returns null if the sequence is empty
     * @returns The last element of the sequence or null if the sequence was empty
     */
    last(): T?;

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

declare export class Grouper<V> {

    /**
     * Creates a grouper function that maps each key to an array of elements for that specific key.
     * @returns A new grouper instance
     */
    static toArray(): Grouper<V[]>;

    /**
     * Creates a grouper function that maps each key to 1 and then sums it (a.k.a counts the occurence of it).  
     * Useful for creating frequency maps.
     * @returns A new grouper instance
     */
    static counting(): Grouper<number>;

    /**
     * Creates a grouper function that maps each key to the sum of the keySelector's key.
     * @returns A new grouper instance
     */
    static summing<K>(keySelectorFunction: (element: K) => number): Grouper<number>;

    /**
     * Creates a grouper function that maps each key to the average of the keySelector's key.
     * @returns A new grouper instance
     */
    static averaging<K>(keySelectorFunction: (element: K) => number): Grouper<number>;
}

declare global {
    interface Array<T> {

        /**
        * Method for creating a sequence of elements using this array as the source.  
        * @returns Sequence populated from this array
        */
        sequence(): Sequence<T>;
    }
}