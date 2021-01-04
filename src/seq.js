export class Sequence {
    
    constructor(generator) {
        this._generator = generator();
        this._terminated = false;
    }

    static range(begin, end, step = 1) {
        return new Sequence(() => generate_range(begin, end, step));
    }

    static rangeClosed(begin, end, step = 1) {
        return Sequence.range(begin, end + 1, step);
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
        return elements.length === 1 && Array.isArray(elements[0]) ? new Sequence(() => generate_of(elements[0]))
                                                                   : new Sequence(() => generate_of(elements));
    }



    filter(predicateFunction) {
        checkTerminated(this);
        return new Sequence(() => generate_filter(predicateFunction, this._generator));
    }

    map(mapperFunction) {
        checkTerminated(this);
        return new Sequence(() => generate_map(mapperFunction, this._generator));
    }

    flatMap(nestMapperFunction) {
        checkTerminated(this);
        return new Sequence(() => generate_flatMap(nestMapperFunction, this._generator));
    }

    take(count) {
        checkTerminated(this);
        return new Sequence(() => generate_take(count, this._generator));
    }

    skip(count) {
        checkTerminated(this);
        return new Sequence(() => generate_skip(count, this._generator));
    }

    takeWhile(predicateFunction) {
        checkTerminated(this);
        return new Sequence(() => generate_takeWhile(predicateFunction, this._generator));
    }

    skipWhile(predicateFunction) {
        checkTerminated(this);
        return new Sequence(() => generate_skipWhile(predicateFunction, this._generator));
    }

    distinct(keySelectorFunction = k => k) {
        checkTerminated(this);
        return new Sequence(() => generate_distinct(keySelectorFunction, this._generator));
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

    chunk(chunkSizes) {
        checkTerminated(this);
        return new Sequence(() => generate_chunk(chunkSizes, this._generator));
    }


    forEach(consumerFunction) {
        checkTerminated(this);

        for(const e of this._generator) {
            consumerFunction(e);
        }
    }

    reduce(seed, accumulatorFunction) {
        checkTerminated(this);

        let returnVal = seed;
    
        for(const e of this._generator) {
            returnVal = accumulatorFunction(returnVal, e);
        }
    
        return returnVal;
    }

    sum() {
        return this.reduce(0, (accumulator, nextElement) => accumulator + nextElement);
    }

    count() {
        return this.reduce(0, (accumulator, _) => accumulator + 1);
    }

    average() {
        const { sum, count } = _collect({ count: 0, sum: 0 }, this, (accumulator, nextElement) => { ++accumulator.count; accumulator.sum += nextElement; });

        return count === 0 ? null : sum / count;
    }

    join(separator = '') {
        return this.toArray().join(separator);
    }

    min(keySelector = k => k) {
        const firstElement = this._generator.next();

        return this.reduce(firstElement.done ? null : firstElement.value, (accumulator, nextElement) => keySelector(accumulator) < keySelector(nextElement) ? accumulator : nextElement);
    }

    max(keySelector = k => k) {
        const firstElement = this._generator.next();

        return this.reduce(firstElement.done ? null: firstElement.value, (accumulator, nextElement) => keySelector(accumulator) > keySelector(nextElement) ? accumulator : nextElement);
    }

    toArray() {
        return _collect([], this, (result, element) => result.push(element));
    }

    toMap(keySelectorFunction, valueSelectorFunction,
          duplicateResolverFunction = (key, oldE, newE) => { throw `Duplicate value found for key: '${key}', previous value: '${oldE}', current value: '${newE}'`;}) {

        return _collect(new Map(), this, (result, element) => {
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
        return _collect([[], []], this, (result, element) => result[predicateFunction(element) === true ? 0 : 1].push(element));
    }

    groupingBy(keySelectorFunction, grouperFunction = Grouper.toArray()) {
        const result = _collect(new Map(), this, (result, element) => {
            const mappedKey = keySelectorFunction(element);

            if(result[mappedKey] === undefined) {
                result[mappedKey] = grouperFunction._accumulatorSupplier();
            }

            grouperFunction._accumulatorFunction(result, mappedKey, element);
        });

        const finisherFunction = grouperFunction._finisherFunction;
        if(finisherFunction) {
            for(const [key, value] of Object.entries(result)) {
                finisherFunction(result, key, value);
            }
        }

        return result;
    }

    first() {
        checkTerminated(this);

        const firstElement = this._generator.next();

        return firstElement.done ? null : firstElement.value;
    }

    last() {
        const firstElement = this._generator.next();

        return this.reduce(firstElement.done ? null : firstElement.value, (_, nextElement) => nextElement);
    }

    allMatches(predicateFunction) {
        checkTerminated(this);

        for(const e of this._generator) {
            if(predicateFunction(e) === false) {
                return false;
            }
        }

        return true;
    }

    anyMatches(predicateFunction) {
        checkTerminated(this);

        for(const e of this._generator) {
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
            _accumulatorSupplier: () => [],
            _accumulatorFunction: (accumulator, key, element) => accumulator[key].push(element)
        }
    }

    static counting() {
        return {
            _accumulatorSupplier: () => 0,
            _accumulatorFunction: (accumulator, key, _) => ++accumulator[key]
        }
    }

    static summing(keySelector) {
        return {
            _accumulatorSupplier: () => 0,
            _accumulatorFunction: (accumulator, key, element) => accumulator[key] += keySelector(element)
        }
    }

    static averaging(keySelector) {
        return {
            _accumulatorSupplier: () => ({ sum: 0, count: 0 }),
            _accumulatorFunction: (accumulator, key, element) => { accumulator[key].sum += keySelector(element); ++accumulator[key].count; },
            _finisherFunction: (result, key, value) => result[key] = value.sum / value.count
        }
    }
}


function _collect(result, sequenceInstance, accumulatorFunction) {
    checkTerminated(sequenceInstance);

    for(const e of sequenceInstance._generator) {
        accumulatorFunction(result, e);
    }

    return result;
}

function checkTerminated(sequenceInstance) {
    if(sequenceInstance._terminated) {
        throw new Error('Sequence was already terminated!');
    }

    sequenceInstance._terminated = true;
}


function* generate_range(begin, end, step) {
    for(let i = begin; i < end; i += step) {
        yield i;
    }
}

function* generate_iterate(seed, generatorFunction, limiter) {
    for(let i = seed; limiter(i) === true; i = generatorFunction(i)) {
        yield i;
    }
}

function* generate_of(iterableObject) {
    for(const e of iterableObject) {
        yield e;
    }
}

function* generate_empty() {}

function* generate_generate(supplierFunction) {
    while(true) {
        yield supplierFunction();
    }
}

function* generate_filter(predicate, generatorInstance) {
    for(const element of generatorInstance) {
        if(predicate(element) === true) {
            yield element;
        }
    }
}

function* generate_map(mapper, generatorInstance) {
    for(const element of generatorInstance) {
        yield mapper(element);
    }
}

function* generate_flatMap(mapper, generatorInstance) {
    for(const element of generatorInstance) {
        const nested = mapper(element);

        for(const n of nested) {
            yield n;
        }
    }
}

function* generate_distinct(keySelectorFunction, generatorInstance) {
    const uniqueElements = [];

    generatorLoop:
    for(const element of generatorInstance) {
        const elementKeySelected = keySelectorFunction(element);

        for(const uniq of uniqueElements) {
            if(elementKeySelected === keySelectorFunction(uniq)) {
                continue generatorLoop;
            }
        }

        uniqueElements.push(element);
        yield element;
    }
}

function* generate_take(count, generatorInstance) {
    let yieldedCount = 0;

    while(true) {
        const nextElement = generatorInstance.next();

        if(nextElement.done || yieldedCount === count) {
            break;
        }

        ++yieldedCount;
        yield nextElement.value;
    }
}

function* generate_skip(count, generatorInstance) {
    let skippedCount = 0;

    while(true) {
        const nextElement = generatorInstance.next();

        if(nextElement.done) {
            break;
        }

        if(skippedCount++ >= count) {
            yield nextElement.value;
        }
    }
}

function* generate_takeWhile(predicate, generatorInstance) {
    while(true) {
        const nextElement = generatorInstance.next();

        if(nextElement.done || predicate(nextElement.value) === false) {
            break;
        }

        yield nextElement.value;
    }
}

function* generate_skipWhile(predicate, generatorInstance) {    
    while(true) {
        const nextElement = generatorInstance.next();

        if(nextElement.done) {
            return;
        }

        if(predicate(nextElement.value) === false) {
            yield nextElement.value;
            break;
        }
    }

    for(const remaining of generatorInstance) {
        yield remaining;
    }
}

function* generate_chunk(chunkSizes, generatorInstance) {
    while(true) {
        const elements = [];

        for(let i = 0; i < chunkSizes; ++i) {
            const element = generatorInstance.next();

            if(element.done) {
                break;
            }

            elements.push(element.value);
        }

        if(elements.length === 0) {
            break;
        }
        
        yield elements;
    }
}