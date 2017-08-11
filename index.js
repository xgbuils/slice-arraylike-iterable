const sliceCalculator = require('slice-calculator')

class SliceArrayLikeIterable {
    constructor (iterable) {
        this.iterable = iterable
        this.start = 0
        this.end = iterable.length
    }

    slice (start, end) {
        const props = sliceCalculator(this, start, end)
        const obj = Object.create(SliceArrayLikeIterable.prototype)
        obj.iterable = this.iterable
        obj.start = props.start
        obj.end = props.end
        return obj
    }

    * [Symbol.iterator] () {
        const iterable = this.iterable
        const end = this.end
        for (let i = this.start; i < end; ++i) {
            yield iterable[i]
        }
    }
}

module.exports = SliceArrayLikeIterable
