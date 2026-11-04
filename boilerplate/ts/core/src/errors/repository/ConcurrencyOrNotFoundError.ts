import { RepoError } from '../../application/RepoError';

export class ConcurrencyOrNotFoundError extends RepoError {
  static errorId = '1d87b9f1-e926-42ff-bf87-f70aa2bb369f';

  constructor(id: string) {
    super(
      `Object with id: ${id} was not found or there was a concurrency error`,
      ConcurrencyOrNotFoundError.errorId,
    );
  }
}
