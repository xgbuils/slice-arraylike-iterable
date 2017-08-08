const sliceCalculator = require('slice-calculator')
const vdf = require('value-descriptors-factory')

class SliceArrayLikeIterable {
    constructor (iterable) {
        Object.defineProperties(this, vdf({
            iterable,
            start: 0,
            end: iterable.length
        }))
    }

    slice (start, end) {
        const props = sliceCalculator(this, start, end)
        props.iterable = this.iterable
        return Object.create(SliceArrayLikeIterable.prototype, vdf(props))
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
