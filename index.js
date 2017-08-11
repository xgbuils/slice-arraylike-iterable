const vdf = require('value-descriptors-factory')

class SliceArrayLikeIterable {
    constructor (iterable) {
        Object.defineProperties(this, vdf({
            iterable,
            start: 0,
            length: iterable.length
        }))
    }

    slice (start, end) {
        const thisLength = this.length
        if (thisLength <= 0) {
            return this
        }
        const newStart = start <= 0 ? 0 : start
        const newLength = end >= thisLength ? thisLength : end
        if (newStart === 0 && newLength === thisLength) {
            return this
        }
        return Object.create(SliceArrayLikeIterable.prototype, vdf({
            start: this.start + newStart,
            length: newLength - newStart,
            iterable: this.iterable
        }))
    }

    * [Symbol.iterator] () {
        const iterable = this.iterable
        const end = this.start + this.length
        for (let i = this.start; i < end; ++i) {
            yield iterable[i]
        }
    }
}

module.exports = SliceArrayLikeIterable
