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
        if (this.length <= 0) {
            return this
        }
        const newStart = Math.max(start, 0)
        const newLength = Math.min(end, this.length)
        if (newStart === 0 && newLength === this.length) {
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
