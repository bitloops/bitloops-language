import { PINHasLengthOfFourRule } from './PINHasLengthOfFourRule';
import { PINIsPositiveNumberRule } from './PINIsPositiveNumberRule';
import { ValidEmailRule } from './ValidEmailRule';
import { AmountOutOfBoundsRule } from './AmountOutOfBoundsRule';
import { AmountIsPositiveNumberRule } from './AmountIsPositiveNumberRule';

export namespace Rules {
  export class ValidEmail extends ValidEmailRule {}
  export class PINHasLengthOfFour extends PINHasLengthOfFourRule {}
  export class PINIsPositiveNumber extends PINIsPositiveNumberRule {}
  export class BalanceAmountOutOfBounds extends AmountOutOfBoundsRule {}
  export class AmountIsPositiveNumber extends AmountIsPositiveNumberRule {}
}
