import { RepoError } from '../../application/RepoError';

export class UnexpectedError extends RepoError {
  static errorId = 'UNEXPECTED_ERROR';

  constructor(msg?: string) {
    super(msg ?? 'An unexpected error occurred', UnexpectedError.errorId);
  }
}
