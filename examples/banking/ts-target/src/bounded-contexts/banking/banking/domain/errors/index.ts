import { InvalidEmailError } from './InvalidEmailError.js';
import { PINIsNotPositiveNumberError } from './PINIsNotPositiveNumberError.js';
import { InvalidCurrencyError } from './InvalidCurrencyError.js';
import { InvalidMonetaryValueError } from './InvalidMonetaryValueError.js';
import { InvalidAmountError } from './InvalidAmountError.js';
import { InvalidCustomerPINError } from './InvalidCustomerPINError.js';

export namespace DomainErrors {
  export class InvalidEmail extends InvalidEmailError {}
  export class PINIsNotPositiveNumber extends PINIsNotPositiveNumberError {}
  export class InvalidCurrency extends InvalidCurrencyError {}
  export class InvalidMonetaryValue extends InvalidMonetaryValueError {}
  export class InvalidAmount extends InvalidAmountError {}
  export class InvalidCustomerPIN extends InvalidCustomerPINError {}
}
