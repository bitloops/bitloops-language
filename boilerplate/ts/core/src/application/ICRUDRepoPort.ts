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

import { Either } from '../Either';
import { ConcurrencyError } from '../errors/repository/ConcurrencyError';
import { NotFoundError } from '../errors/repository/NotFoundError';
import { UnexpectedError } from '../errors/repository/UnexpectedError';

export type UpdateOptions = {
  occ?: boolean;
};

export interface CRUDWriteRepoPort<Aggregate, AggregateId> {
  getById(
    aggregateRootId: AggregateId,
  ): Promise<Either<Aggregate | null, UnexpectedError | NotFoundError>>;
  create(aggregate: Aggregate): Promise<Either<void, UnexpectedError>>;
  update(
    aggregate: Aggregate,
    options?: UpdateOptions,
  ): Promise<Either<void, UnexpectedError | ConcurrencyError>>;
  delete(aggregate: Aggregate): Promise<Either<void, UnexpectedError>>;
}

export interface CRUDReadRepoPort<ReadModel> {
  getAll(): Promise<Either<ReadModel[] | null, UnexpectedError>>;
  getById(id: string): Promise<Either<ReadModel | null, UnexpectedError>>;
}
