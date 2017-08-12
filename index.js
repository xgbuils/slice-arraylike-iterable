function slice (start, end) {
    start = Math.max(start, 0)
    const newEnd = Math.min(this.start + end, this.end)
    if (start === 0 && newEnd === this.end) {
        return this
    }
    const obj = Object.create(SliceArrayLikeIterable.prototype)
    obj.start = this.start + start
    obj.end = newEnd
    obj.iterable = this.iterable
    return obj
}

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
