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
            for(const uniq of uniqueElements) {
                if(keySelectorFunction(e) === keySelectorFunction(uniq)) {
                    continue generatorLoop;
                }
            }

            uniqueElements.push(e);
        }

        return new Sequence(() => generate_of(uniqueElements));
    }

    sortAscending(keySelectorFunction = k => k) {
        const allElements = this.toArray();

        allElements.sort((f, s) => {
            const firstKey = keySelectorFunction(f);
            const secondKey = keySelectorFunction(s);

            return firstKey < secondKey ? -1 : firstKey > secondKey ? 1 : 0;
        });

        return new Sequence(() => generate_of(allElements));
    }

    sortDescending(keySelectorFunction = k => k) {
        const allElements = this.toArray();

        allElements.sort((f, s) => {
            const firstKey = keySelectorFunction(f);
            const secondKey = keySelectorFunction(s);

            return firstKey < secondKey ? 1 : firstKey > secondKey ? -1 : 0;
        });

        return new Sequence(() => generate_of(allElements));
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

    _collect(collection, accumulatorFunction) {
        const generator = this._generator();

        for(const e of generator) {
            accumulatorFunction(collection, e);
        }

        return collection;
    }

    sum() {
        return this.reduce(0, (accumulator, nextElement) => accumulator + nextElement);
    }

    count() {
        return this.reduce(0, (accumulator, _) => accumulator + 1);
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
        return this._collect([], (result, nextElement) => result.push(nextElement));
    }

    toMap(keySelectorFunction, valueSelectorFunction) {
        return this._collect({}, (result, nextElement) => result[keySelectorFunction(nextElement)] = valueSelectorFunction(nextElement));
    }

    partitionBy(predicateFunction) {
        return this._collect([[], []], (result, nextElement) => result[predicateFunction(nextElement) === true ? 0 : 1].push(nextElement));
    }

    first() {
        const generator = this._generator();

        for(const e of generator) {
            return Optional.of(e);
        }

        return Optional.empty();
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