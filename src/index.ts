export class Success<const T> {
  constructor(readonly value: T) {}

  readonly error?: never

  readonly isSuccess = true
  readonly isFailure = false

  map<T2, E>(f: (value: T) => T2, g: (_: never) => E): Success<T2> {
    return new Success(f(this.value))
  }

  flatMap<T2, E>(f: (value: T) => Result<T2, E>): Result<T2, E> {
    return f(this.value)
  }
}

export class Failure<const E> {
  constructor(readonly error: E) {}

  readonly value?: never

  readonly isSuccess = false
  readonly isFailure = true

  map<T, E2>(f: (_: never) => T, g: (value: E) => E2): Failure<E2> {
    return new Failure(g(this.error))
  }

  flatMap<T, E2>(f: (_: never) => Result<T, E2>): Failure<E> {
    return this
  }
}

export type Result<T, E = unknown> = Success<T> | Failure<E>

export namespace Result {
  export function tryCatch<T>(f: () => T): Result<T> {
    try {
      return new Success(f())
    } catch (error) {
      return new Failure(error)
    }
  }
}
