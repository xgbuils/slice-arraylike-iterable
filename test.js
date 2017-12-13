const test = require('tape')
const tapSpec = require('tap-spec')

const SliceArrayLikeIterable = require('./')

const array = Object.freeze([1, 2, 3, 4, 5])
const string = 'abcd'

test('constructor', function (t) {
    t.test('empty array', function (st) {
        const iterable = new SliceArrayLikeIterable([])
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('non-empty array', function (st) {
        const iterable = new SliceArrayLikeIterable(array)
        st.deepEqual([...iterable], array,
            'must return an iterable with the same values')
        st.end()
    })

    t.test('empty string', function (st) {
        const iterable = new SliceArrayLikeIterable('')
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('non-empty string', function (st) {
        const iterable = new SliceArrayLikeIterable(string)
        st.deepEqual([...iterable], [...string],
            'must return an iterable with the same values')
        st.end()
    })

    t.end()
})

test('slice', function (t) {
    t.test('empty array', function (st) {
        const iterable = new SliceArrayLikeIterable([]).slice(0, 6)
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('negative start', function (st) {
        const iterable = new SliceArrayLikeIterable(string).slice(-3, 6)
        st.deepEqual([...iterable], [...string],
            'must be equivalent to start to 0')
        st.end()
    })
    t.test('negative end', function (st) {
        const iterable = new SliceArrayLikeIterable(array).slice(0, -6)
        st.deepEqual([...iterable], [],
            'must return empty iterable')
        st.end()
    })
    t.test('out of boundaries: start negative', function (st) {
        const iterable = new SliceArrayLikeIterable(array)
        const result = iterable.slice(-1, 8)
        st.equal(iterable, result,
            'must return the same iterable reference')
        st.end()
    })
    t.test('out of boundaries: start greater than this.length', function (st) {
        const result = new SliceArrayLikeIterable(array).slice(6, 3)
        const expected = array.slice(6, 3)
        st.deepEqual([...result], expected,
            'must return an empty iterable')
        st.end()
    })
    t.test('out of boundaries: start & length greater than this.length', function (st) {
        const result = new SliceArrayLikeIterable(array).slice(6, 8)
        const expected = array.slice(6, 8)
        st.deepEqual([...result], expected,
            'must return an empty iterable')
        st.end()
    })
    t.test('the same boundaries', function (st) {
        const iterable = new SliceArrayLikeIterable(array)
        const result = iterable.slice(0, array.length)
        st.equal(iterable, result,
            'must return the same iterable reference')
        st.end()
    })
    t.test('positive start and end', function (st) {
        const iterable = new SliceArrayLikeIterable(array).slice(2, 3)
        st.deepEqual([...iterable], array.slice(2, 3),
            'must behave like array slice')
        st.end()
    })
    t.test('chaining', function (st) {
        const iterable = new SliceArrayLikeIterable(array) // (1 2 3 4 5)
            .slice(1, 4) // (2 3 4)
            .slice(0, 2) // (2 3)
            .slice(1, 6) // (3)
        const expected = array
            .slice(1, 4)
            .slice(0, 2)
            .slice(1, 6)
        st.deepEqual([...iterable], expected,
            'must behave like slice with positive starts and ends')
        st.end()
    })

    t.test('using intermediate iterables', function (st) {
        const intermediate = new SliceArrayLikeIterable(array)
            .slice(0, 4) // (1 2 3 4)
        const first = intermediate.slice(1, 3) // (2 3)
        const second = intermediate.slice(0, 1) // (1)
        const firstExpected = array.slice(0, 4).slice(1, 3)
        const secondExpected = array.slice(0, 4).slice(0, 1)
        st.deepEqual([...first], firstExpected,
            'first result must be correct')
        st.deepEqual([...second], secondExpected,
            'second result must be correct')
        st.end()
    })
    t.end()
})

test.createStream()
    .pipe(tapSpec())
    .pipe(process.stdout)
