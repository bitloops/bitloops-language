import { Either, fail, ok } from '../../../Either';
import { ValueObject } from '../../ValueObject';
import { IRule } from '../../IRule';
import { applyRules } from '../../applyRule';
import { CurrencyCodeDoesNotExistError, CurrencyStandardDoesNotExistError } from './errors';
import { CurrencyShouldExistRule, ISOShouldBeSupportedRule } from './rules';

const ISO_4217 = 'ISO_4217';

type AvailableCurrencyStandard = {
  name: string;
};
type AvailableCurrencyStandards = Record<string, AvailableCurrencyStandard>;

type ISO4217CurrencyCodeType = {
  NUMBER: string;
  CURRENCY_NAME: string;
  CURRENCY_SYMBOL: string;
  NUMBER_OF_DIGITS_AFTER_DECIMAL: number;
};

type ISO4217CurrencyCodesType = Record<string, ISO4217CurrencyCodeType>;

export const ISO_4217_CURRENCY_CODES: ISO4217CurrencyCodesType = {
  EUR: {
    NUMBER: '978',
    CURRENCY_NAME: 'Euro',
    CURRENCY_SYMBOL: '€',
    NUMBER_OF_DIGITS_AFTER_DECIMAL: 2,
  },
  USD: {
    NUMBER: '840',
    CURRENCY_NAME: 'United States dollar',
    CURRENCY_SYMBOL: '$',
    NUMBER_OF_DIGITS_AFTER_DECIMAL: 2,
  },
};

export const AVAILABLE_CURRENCY_STANDARDS: AvailableCurrencyStandards = {
  [ISO_4217]: {
    name: ISO_4217,
  },
};

interface CurrencyProps {
  currencyCode: string;
  standard?: string;
}

export type ErrorTypes = CurrencyStandardDoesNotExistError | CurrencyCodeDoesNotExistError;

export class CurrencyVO extends ValueObject<CurrencyProps> {
  private code: string;
  private ISO4217CurrencyCodes: ISO4217CurrencyCodesType;
  private availableCurrencyStandards: AvailableCurrencyStandards;
  private standard;
  public static readonly Errors = {
    CurrencyStandardDoesNotExistError,
    CurrencyCodeDoesNotExistError,
  };

  get currencyCode(): string {
    return this.code;
  }

  get symbol(): string {
    return this.ISO4217CurrencyCodes[this.code].CURRENCY_SYMBOL;
  }

  get name(): string {
    return this.ISO4217CurrencyCodes[this.code].CURRENCY_NAME;
  }

  get availableStandards(): string[] {
    return Object.keys(this.availableCurrencyStandards);
  }
  // TODO find a way to export the VO class using private keyword
  protected constructor(props: CurrencyProps) {
    super(props);
    this.code = this.props.currencyCode.toUpperCase();
    this.ISO4217CurrencyCodes = ISO_4217_CURRENCY_CODES;
    this.availableCurrencyStandards = AVAILABLE_CURRENCY_STANDARDS;
    if (props.standard) this.standard = props.standard;
    else this.standard = ISO_4217;
  }

  public static create(props: CurrencyProps): Either<CurrencyVO, ErrorTypes> {
    const rules: IRule[] = [new CurrencyShouldExistRule(props.currencyCode.toUpperCase())];
    if (props.standard) rules.push(new ISOShouldBeSupportedRule(props.standard));
    const res = applyRules(rules);
    if (res) return fail(res);
    return ok(new CurrencyVO(props));
  }
}
