/**
 * ISC License
 * Copyright (c) 2019, [Khalil Stemmler](https://khalilstemmler.com)
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
export type Either<A, L> = Fail<A, L> | Ok<A, L>;

export class Fail<A, L> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isFail(): this is Fail<A, L> {
    return true;
  }

  isOk(): this is Ok<A, L> {
    return false;
  }
}

export class Ok<A, L> {
  readonly value: A;

  constructor(value?: A) {
    this.value = value || (undefined as unknown as A);
  }

  isFail(): this is Fail<A, L> {
    return false;
  }

  isOk(): this is Ok<A, L> {
    return true;
  }
}

export const fail = <A, L>(l: L): Either<A, L> => {
  return new Fail(l);
};

export const ok = <A, L>(a?: A): Either<A, L> => {
  return new Ok<A, L>(a);
};
