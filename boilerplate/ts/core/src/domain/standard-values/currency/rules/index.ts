import { IRule } from '../../../IRule.js';
import { AVAILABLE_CURRENCY_STANDARDS, ISO_4217_CURRENCY_CODES } from '../Currency';
import { CurrencyCodeDoesNotExistError, CurrencyStandardDoesNotExistError } from '../errors';

export class CurrencyShouldExistRule implements IRule {
  constructor(private currencyCode: string) {}

  public Error = new CurrencyCodeDoesNotExistError(this.currencyCode);

  public isBrokenIf(): boolean {
    if (!ISO_4217_CURRENCY_CODES[this.currencyCode]) return true;
    return false;
  }
}

export class ISOShouldBeSupportedRule implements IRule {
  constructor(private standard: string) {}

  public Error = new CurrencyStandardDoesNotExistError(this.standard);

  public isBrokenIf(): boolean {
    if (!AVAILABLE_CURRENCY_STANDARDS[this.standard]) return true;
    return false;
  }
}
