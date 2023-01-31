import { PINHasLengthOfFourRule } from './PINHasLengthOfFourRule.js';
import { PINIsPositiveNumberRule } from './PinIsPositiveNumberRule.js';
import { ValidEmailRule } from './ValidEmailRule';
import { AmountOutOfBoundsRule } from './AmountOutOfBoundsRule.js';
import { AmountIsPositiveNumberRule } from './AmountIsPositiveNumberRule.js';

export namespace Rules {
  export class ValidEmail extends ValidEmailRule {}
  export class PINHasLengthOfFour extends PINHasLengthOfFourRule {}
  export class PINIsPositiveNumber extends PINIsPositiveNumberRule {}
  export class BalanceAmountOutOfBounds extends AmountOutOfBoundsRule {}
  export class AmountIsPositiveNumber extends AmountIsPositiveNumberRule {}
}
