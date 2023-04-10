import { RepoError } from '../../application/RepoError';

export class ConflictError extends RepoError {
  static errorId = 'CONFLICT_ERROR';

  constructor(id: string) {
    super(`${id} already exists`, ConflictError.errorId);
  }
}
