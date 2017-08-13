const slice = require('slice-iterable-method')

function SliceArrayLikeIterable (iterable) {
    this.iterable = iterable
    this.start = 0
    this.end = iterable.length
}

Object.defineProperties(SliceArrayLikeIterable.prototype, {
    slice: {
        value: slice
    },
    [Symbol.iterator]: {
        * value () {
            const iterable = this.iterable
            const end = this.end
            for (let i = this.start; i < end; ++i) {
                yield iterable[i]
            }
        }
    }
})

module.exports = SliceArrayLikeIterable
