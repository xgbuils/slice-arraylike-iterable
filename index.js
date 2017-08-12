function* generator () {
    const iterable = this.iterable
    const end = this.end
    for (let i = this.start; i < end; ++i) {
        yield iterable[i]
    }
}

function slice (start, end) {
    start = Math.max(start, 0)
    const oldEnd = this.end
    const newEnd = Math.min(this.start + end, oldEnd)
    if (start === 0 && newEnd === oldEnd) {
        return this
    }
    return {
        start: this.start + start,
        end: newEnd,
        iterable: this.iterable,
        slice,
        [Symbol.iterator]: generator
    }
}

function SliceArrayLikeIterable (iterable) {
    return {
        start: 0,
        end: iterable.length,
        iterable,
        slice,
        [Symbol.iterator]: generator
    }
}

module.exports = SliceArrayLikeIterable
