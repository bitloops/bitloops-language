import { InvalidEmailError } from './InvalidEmailError';
import { PINIsNotPositiveNumberError } from './PINIsNotPositiveNumberError';
import { InvalidCurrencyError } from './InvalidCurrencyError';
import { InvalidMonetaryValueError } from './InvalidMonetaryValueError';
import { InvalidAmountError } from './InvalidAmountError';
import { InvalidCustomerPINError } from './InvalidCustomerPINError';
import { PINLengthError } from './PINLengthError';
import { IncompatibleCurrenciesError } from './IncompatibleCurrenciesError';
import { InsufficientBalanceError } from './InsufficientBalanceError';

export namespace DomainErrors {
  export class InvalidEmail extends InvalidEmailError {}
  export class PINIsNotPositiveNumber extends PINIsNotPositiveNumberError {}
  export class PINLength extends PINLengthError {}
  export class InvalidCurrency extends InvalidCurrencyError {}
  export class InvalidMonetaryValue extends InvalidMonetaryValueError {}
  export class InvalidAmount extends InvalidAmountError {}
  export class InvalidCustomerPIN extends InvalidCustomerPINError {}
  export class IncompatibleCurrencies extends IncompatibleCurrenciesError {}
  export class InsufficientBalance extends InsufficientBalanceError {}
}
