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

    limit(count) {
        return new Sequence(() => generate_limit(count, this._generator));
    }

    skip(count) {
        return new Sequence(() => generate_skip(count, this._generator));
    }

    takeWhile(predicateFunction) {
        return new Sequence(() => generate_takeWhile(predicateFunction, this._generator));
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
        const generator = this._generator();
        let returnVal = seed;

        for(const e of generator) {
            returnVal = accumulatorFunction(returnVal, e);
        }

        return returnVal;
    }

    _collect(collection, accumulatorFunction, finisherFunction) {
        const generator = this._generator();

        for(const e of generator) {
            accumulatorFunction(collection, e);
        }

        if(finisherFunction) {
            for(const [key, value] of Object.entries(collection)) {
                finisherFunction(collection, key, value);
            }
        }

        return collection;
    }

    sum() {
        return this.reduce(0, (accumulator, nextElement) => accumulator + nextElement);
    }

    count() {
        return this.reduce(0, (accumulator, _) => accumulator + 1);
    }

    average() {
        const generator = this._generator();
        let count = 0;
        let sum = 0;

        for(const e of generator) {
            ++count;
            sum += e;
        }

        return sum / count;
    }

    join(separator = '') {
        return this.toArray().join(separator);
    }

    min(keySelectorFunction = k => k) {
        const generator = this._generator();
        const firstElement = generator.next();

        if(firstElement.done) {
            return Optional.empty();
        }

        let returnValue = firstElement.value;
        for(const e of generator) {
            if(keySelectorFunction(e) < keySelectorFunction(returnValue)) {
                returnValue = e;
            }
        }

        return Optional.of(returnValue);
    }

    max(keySelectorFunction = k => k) {
        const generator = this._generator();
        const firstElement = generator.next();

        if(firstElement.done) {
            return Optional.empty();
        }

        let returnValue = firstElement.value;
        for(const e of generator) {
            if(keySelectorFunction(e) > keySelectorFunction(returnValue)) {
                returnValue = e;
            }
        }

        return Optional.of(returnValue);
    }

    toArray() {
        return this._collect([], (result, element) => result.push(element));
    }

    toMap(keySelectorFunction, valueSelectorFunction) {
        return this._collect({}, (result, element) => result[keySelectorFunction(element)] = valueSelectorFunction(element));
    }

    partitionBy(predicateFunction) {
        return this._collect([[], []], (result, element) => result[predicateFunction(element) === true ? 0 : 1].push(element));
    }

    groupingBy(keySelectorFunction, grouperFunction = Grouper.toArray()) {
        return this._collect({}, (result, element) => {
            const mappedKey = keySelectorFunction(element);

            if(result[mappedKey] === undefined) {
                result[mappedKey] = grouperFunction.accumulatorSupplier();
            }

            grouperFunction.accumulatorFunction(result, mappedKey, element);
        }, grouperFunction.finisherFunction);
    }

    first() {
        const element = this._generator().next();

        return element.done ? Optional.empty() : Optional.of(element.value);
    }

    last() {
        const element = this._generator().next();

        return element.done ? Optional.empty() : this.reduce(element.value, (_, nextElement) => nextElement);
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

export class Optional {
    static empty_optional = new Optional();

    constructor(value, hasValue) {
        this.value = value;
        this.hasValue = hasValue;
    }

    static empty() {
        return Optional.empty_optional;
    }

    static of(element) {
        if(element === null || element === undefined) {
            throw `Can't put null or undefined into an optional!`;
        }

        return new Optional(element, true);
    }

    static ofNullable(element) {
        return new Optional(element, element !== null && element !== undefined);
    }
}

Array.prototype.sequence = function() {
    return new Sequence(() => generate_of(this));
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

function* generate_limit(count, oldGeneratorRef) {
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