const sliceCalculator = require('slice-calculator')

function arrayReduce (f, acc, arr) {
    const length = arr.length
    for (let i = 0; i < length; ++i) {
        acc = f(acc, arr[i])
    }
    return acc
}

function descriptorsFactory (props) {
    return arrayReduce((descriptors, prop) => {
        descriptors[prop] = {
            value: props[prop]
        }
        return descriptors
    }, {}, Object.keys(props))
}

class SliceArrayLikeIterable {
    constructor (iterable) {
        Object.defineProperties(this, descriptorsFactory({
            iterable,
            start: 0,
            end: iterable.length
        }))
    }

    slice (start, end) {
        const props = sliceCalculator(this, start, end)
        props.iterable = this.iterable
        return Object.create(SliceArrayLikeIterable.prototype,
            descriptorsFactory(props))
    }

    * [Symbol.iterator] () {
        const iterable = this.iterable
        const end = Math.min(iterable.length, this.end)
        for (let i = this.start; i < end; ++i) {
            yield iterable[i]
        }
    }
}

module.exports = SliceArrayLikeIterable
