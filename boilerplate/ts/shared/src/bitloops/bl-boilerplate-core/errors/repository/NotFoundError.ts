import { RepoError } from '../../application/RepoError';

export class NotFoundError extends RepoError {
  static errorId = '1bd7e576-df32-4cc2-a2ab-8d77915da70f';

  constructor(id: string) {
    super(`${id} was not found`, NotFoundError.errorId);
  }
}
