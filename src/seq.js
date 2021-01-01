export class Sequence {
    
    constructor(generator) {
        this._generator = generator;
    }

    static range(begin, end, increment = 1) {
        return new Sequence(() => generate_range(begin, end, increment));
    }

    static rangeClosed(begin, end, increment = 1) {
        return Sequence.range(begin, end + 1, increment);
    }

    static iterate(seed, generatorFunction, limiterPredicateFunction = _ => true) {
        return new Sequence(() => generate_iterate(seed, generatorFunction, limiterPredicateFunction));
    }

    static generate(generatorFunction) {
        return new Sequence(() => generate_generate(generatorFunction));
    }

    static empty() {
        return new Sequence(() => generate_empty());
    }

    static of(...elements) {
        return new Sequence(() => generate_of(elements));
    }



    filter(predicateFunction) {
        return new Sequence(() => generate_filter(predicateFunction, this._generator));
    }

    map(mapperFunction) {
        return new Sequence(() => generate_map(mapperFunction, this._generator));
    }

    flatMap(nestMapperFunction) {
        return new Sequence(() => generate_flatMap(nestMapperFunction, this._generator));
    }

    take(count) {
        return new Sequence(() => generate_take(count, this._generator));
    }

    skip(count) {
        return new Sequence(() => generate_skip(count, this._generator));
    }

    takeWhile(predicateFunction) {
        return new Sequence(() => generate_takeWhile(predicateFunction, this._generator));
    }

    skipWhile(predicateFunction) {
        return new Sequence(() => generate_skipWhile(predicateFunction, this._generator));
    }

    distinct(keySelectorFunction = k => k) {
        const generator = this._generator();
        const uniqueElements = [];

        generatorLoop:
        for(const e of generator) {
            const elementKeySelected = keySelectorFunction(e);

            for(const uniq of uniqueElements) {
                if(elementKeySelected === keySelectorFunction(uniq)) {
                    continue generatorLoop;
                }
            }

            uniqueElements.push(e);
        }

        return new Sequence(() => generate_of(uniqueElements));
    }

    sort(comparerFunction) {
        const allElements = this.toArray();

        allElements.sort(comparerFunction);

        return new Sequence(() => generate_of(allElements));
    }

    sortAscending(keySelectorFunction = k => k) {
        return this.sort((f, s) => {
            const firstKey = keySelectorFunction(f);
            const secondKey = keySelectorFunction(s);

            return firstKey < secondKey ? -1 : firstKey > secondKey ? 1 : 0;
        });
    }

    sortDescending(keySelectorFunction = k => k) {
        return this.sort((f, s) => {
            const firstKey = keySelectorFunction(f);
            const secondKey = keySelectorFunction(s);

            return firstKey < secondKey ? 1 : firstKey > secondKey ? -1 : 0;
        });
    }


    forEach(consumerFunction) {
        const generator = this._generator();

        for(const e of generator) {
            consumerFunction(e);
        }
    }

    reduce(seed, accumulatorFunction) {
        return _reduce(seed, this._generator(), accumulatorFunction);
    }

    sum() {
        return this.reduce(0, (accumulator, nextElement) => accumulator + nextElement);
    }

    count() {
        return this.reduce(0, (accumulator, _) => accumulator + 1);
    }

    average() {
        const { sum, count } = _collect({ count: 0, sum: 0 }, this._generator(), (accumulator, nextElement) => { ++accumulator.count; accumulator.sum += nextElement; });

        return count === 0 ? null : sum / count;
    }

    join(separator = '') {
        return this.toArray().join(separator);
    }

    min(keySelector = k => k) {
        const generator = this._generator();
        const firstElement = generator.next();

        if(firstElement.done) {
            return null;
        }

        return _reduce(firstElement.value, generator, (accumulator, nextElement) => keySelector(accumulator) < keySelector(nextElement) ? accumulator : nextElement);
    }

    max(keySelector = k => k) {
        const generator = this._generator();
        const firstElement = generator.next();

        if(firstElement.done) {
            return null;
        }

        return _reduce(firstElement.value, generator, (accumulator, nextElement) => keySelector(accumulator) > keySelector(nextElement) ? accumulator : nextElement);
    }

    toArray() {
        return _collect([], this._generator(), (result, element) => result.push(element));
    }

    toMap(keySelectorFunction, valueSelectorFunction,
          duplicateResolverFunction = (key, oldE, newE) => { throw `Duplicate value found for key: '${key}', previous value: '${oldE}', current value: '${newE}'`;}) {

        return _collect({}, this._generator(), (result, element) => {
            const key = keySelectorFunction(element);
            const value = valueSelectorFunction(element);

            if(result[key] === undefined) {
                result[key] = value;
            }else{
                result[key] = duplicateResolverFunction(key, result[key], value);
            }
        });
    }

    partitionBy(predicateFunction) {
        return _collect([[], []], this._generator(), (result, element) => result[predicateFunction(element) === true ? 0 : 1].push(element));
    }

    chunking(chunkSizes) {
        const generator = this._generator();
        const firstElement = generator.next();

        return firstElement.done ? [] : _collect([[ firstElement.value ]], generator, (result, element) => {
            const lastArray = result[result.length - 1];

            if(lastArray.length === chunkSizes) {
                result.push([ element ]);
            }else{
                lastArray.push(element);
            }
        });
    }

    groupingBy(keySelectorFunction, grouperFunction = Grouper.toArray()) {
        const result = _collect({}, this._generator(), (result, element) => {
            const mappedKey = keySelectorFunction(element);

            if(result[mappedKey] === undefined) {
                result[mappedKey] = grouperFunction.accumulatorSupplier();
            }

            grouperFunction.accumulatorFunction(result, mappedKey, element);
        });

        const finisherFunction = grouperFunction.finisherFunction;
        if(finisherFunction) {
            for(const [key, value] of Object.entries(result)) {
                finisherFunction(result, key, value);
            }
        }

        return result;
    }

    first() {
        const firstElement = this._generator().next();

        return firstElement.done ? null : firstElement.value;
    }

    last() {
        const firstElement = this._generator().next();

        return firstElement.done ? null : this.reduce(firstElement.value, (_, nextElement) => nextElement);
    }

    allMatches(predicateFunction) {
        const generator = this._generator();

        for(const e of generator) {
            if(predicateFunction(e) === false) {
                return false;
            }
        }

        return true;
    }

    anyMatches(predicateFunction) {
        const generator = this._generator();

        for(const e of generator) {
            if(predicateFunction(e) === true) {
                return true;
            }
        }

        return false;
    }
}

export class Grouper {

    static toArray() {
        return {
            accumulatorSupplier: () => [],
            accumulatorFunction: (accumulator, key, element) => accumulator[key].push(element)
        }
    }

    static counting() {
        return {
            accumulatorSupplier: () => 0,
            accumulatorFunction: (accumulator, key, _) => ++accumulator[key]
        }
    }

    static summing(keySelector) {
        return {
            accumulatorSupplier: () => 0,
            accumulatorFunction: (accumulator, key, element) => accumulator[key] += keySelector(element)
        }
    }

    static averaging(keySelector) {
        return {
            accumulatorSupplier: () => ({ sum: 0, count: 0 }),
            accumulatorFunction: (accumulator, key, element) => { accumulator[key].sum += keySelector(element); ++accumulator[key].count; },
            finisherFunction: (result, key, value) => result[key] = value.sum / value.count
        }
    }
}

Array.prototype.sequence = function() {
    return new Sequence(() => generate_of(this));
}


function _reduce(seed, generator, accumulatorFunction) {
    let returnVal = seed;

    for(const e of generator) {
        returnVal = accumulatorFunction(returnVal, e);
    }

    return returnVal;
}

function _collect(result, generator, accumulatorFunction) {
    for(const e of generator) {
        accumulatorFunction(result, e);
    }

    return result;
}


function* generate_range(begin, end, increment) {
    for(let i = begin; i < end; i += increment) {
        yield i;
    }
}

function* generate_iterate(seed, generator, limiter) {
    for(let i = seed; limiter(i) === true; i = generator(i)) {
        yield i;
    }
}

function* generate_of(elements) {
    for(const e of elements) {
        yield e;
    }
}

function* generate_empty() {}

function* generate_generate(generator) {
    while(true) {
        yield generator();
    }
}

function* generate_filter(predicate, oldGeneratorRef) {
    const generator = oldGeneratorRef();

    while(true) {
        const nextElement = generator.next();

        if(nextElement.done) {
            break;
        }

        if(predicate(nextElement.value) === true) {
            yield nextElement.value;
        }
    }
}

function* generate_map(mapper, oldGeneratorRef) {
    const generator = oldGeneratorRef();

    while(true) {
        const nextElement = generator.next();

        if(nextElement.done) {
            break;
        }

        yield mapper(nextElement.value);
    }
}

function* generate_flatMap(mapper, oldGeneratorRef) {
    const generator = oldGeneratorRef();

    for(const element of generator) {
        const nested = mapper(element);

        for(const n of nested) {
            yield n;
        }
    }
}

function* generate_take(count, oldGeneratorRef) {
    const generator = oldGeneratorRef();
    let yieldedCount = 0;

    while(true) {
        const nextElement = generator.next();

        if(nextElement.done || yieldedCount === count) {
            break;
        }

        ++yieldedCount;
        yield nextElement.value;
    }
}

function* generate_skip(count, oldGeneratorRef) {
    const generator = oldGeneratorRef();
    let skippedCount = 0;

    while(true) {
        const nextElement = generator.next();

        if(nextElement.done) {
            break;
        }

        if(skippedCount++ >= count) {
            yield nextElement.value;
        }
    }
}

function* generate_takeWhile(predicate, oldGeneratorRef) {
    const generator = oldGeneratorRef();

    while(true) {
        const nextElement = generator.next();

        if(nextElement.done || predicate(nextElement.value) === false) {
            break;
        }

        yield nextElement.value;
    }
}

function* generate_skipWhile(predicate, oldGeneratorRef) {
    const generator = oldGeneratorRef();
    
    while(true) {
        const nextElement = generator.next();

        if(nextElement.done) {
            return;
        }

        if(predicate(nextElement.value) === false) {
            yield nextElement.value;
            break;
        }
    }

    for(const remaining of generator) {
        yield remaining;
    }
}