declare export class Sequence<T> {
    private constructor();

    static range(begin: number, end: number, increment: number = 1): Sequence<number>;
    static rangeClosed(begin: number, end: number, increment: number = 1): Sequence<number>;
    static iterate<T>(seed: T, generatorFunction: (element: T) => T, limiterPredicateFunction: (element: T) => boolean = (_) => true): Sequence<T>;
    static generate<T>(generatorFunction: () => T): Sequence<T>;
    static of<T>(...elements: T[]): Sequence<T>;

    filter(predicateFunction: (element: T) => boolean): Sequence<T>;
    map<TT>(mapperFunction: (element: T) => TT): Sequence<TT>
    limit(count: number): Sequence<T>;
    skip(count: number): Sequence<T>;
    takeWhile(predicateFunction: (element: T) => boolean): Sequence<T>;
    distinct(keySelectorFunction: (element: T) => any = k => k): Sequence<T>;
    sortAscending(keySelectorFunction: (element: T) => any = k => k): Sequence<T>;
    sortDescending(keySelectorFunction: (element: T) => any = k => k): Sequence<T>;

    forEach(consumerFunction: (element: T) => void): void;
    reduce<TT>(seed: TT, accumulatorFunction: (accumulator: TT, element: T) => TT): TT;
    sum(): number;
    count(): number;
    min(keySelectorFunction: (k: T) => number): Optional<T>;
    max(keySelectorFunction: (k: T) => number): Optional<T>;
    toArray(): T[];
    toMap<K, V>(keySelectorFunction: (k: T) => K, valueSelectorFunction: (k: T) => V): {[key: K]: V};
    partitionBy(predicateFunction: (k: T) => boolean): T[2][];
    first(): Optional<T>;
    allMatches(predicateFunction: (k: T) => boolean): boolean;
    anyMatches(predicateFunction: (k: T) => boolean): boolean;
}

declare export class Optional<T> {

    public readonly value: T;
    public readonly hasValue: boolean;

    private constructor();

    static empty(): Optional<null>;
    static of(element: T): Optional<T>;
    static ofNullable(element: T?): Optional<T?>;
}

declare global {
    interface Array<T> {
        sequence(): Sequence<T>;
    }
}