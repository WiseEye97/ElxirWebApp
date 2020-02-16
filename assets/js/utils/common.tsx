export module Common {
    export type First<T> = { tag : "first", value : T}
    export type Second<T> = { tag : "second", value : T}

    export type Either<L,R> = First<L> | Second<R>
}
//export {}



