function SliceArrayLikeIterable (iterable) {
    this.iterable = iterable
    this.start = 0
    this.length = iterable.length
}

Object.defineProperties(SliceArrayLikeIterable.prototype, {
    slice: {
        value: methodDecorator(slice)
    },
    [Symbol.iterator]: {
        * value () {
            const iterable = this.iterable
            const end = this.start + this.length
            for (let i = this.start; i < end; ++i) {
                yield iterable[i]
            }
        }
    }
})

module.exports = SliceArrayLikeIterable

function methodDecorator (fn) {
    return function (...args) {
        if (this.length === 0) {
            return this
        }
        return fn.apply(this, args)
    }
}

function iterableCreator (fn, ...args) {
    const obj = Object.create(this.constructor.prototype)
    fn.call(this, obj, ...args)
    obj.iterable = this.iterable
    return obj
}

function drop (n) {
    if (n <= 0) {
        return this
    }
    return iterableCreator.call(this, dropTransform, n)
}

function take (n) {
    if (n >= this.length) {
        return this
    }
    return iterableCreator.call(this, takeTransform, n)
}

function slice (start, end) {
    if (start <= 0) {
        return take.call(this, end)
    }
    if (end >= this.length) {
        return drop.call(this, start)
    }
    return iterableCreator.call(this, sliceTransform, start, end)
}

function dropTransform (obj, n) {
    obj.start = this.start + n
    obj.length = this.length - n
}

function takeTransform (obj, n) {
    obj.start = this.start
    obj.length = n
}

function sliceTransform (obj, start, end) {
    obj.start = this.start + start
    obj.length = end - start
}
