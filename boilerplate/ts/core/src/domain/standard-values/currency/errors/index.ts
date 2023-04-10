import { DomainError } from '../../../DomainError';
import { StandardErrorUtils } from '../../common';

export class CurrencyStandardDoesNotExistError extends DomainError {
  static readonly errorId = StandardErrorUtils.getBLStandardValueError(
    'CURRENCY_STANDARD_DOES_NOT_EXIST',
  );

  constructor(standard: string) {
    super(`standard ${standard} does not exist`, CurrencyStandardDoesNotExistError.errorId);
  }
}

export class CurrencyCodeDoesNotExistError extends DomainError {
  static readonly errorId = StandardErrorUtils.getBLStandardValueError('CURRENCY_DOES_NOT_EXIST');

  constructor(currencyCode: string) {
    super(`Currency code ${currencyCode} does not exist`, CurrencyCodeDoesNotExistError.errorId);
  }
}
