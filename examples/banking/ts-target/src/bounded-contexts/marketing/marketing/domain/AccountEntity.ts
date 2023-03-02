import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { DepositsCounterVO } from './DepositsCounterVO';
import { DepositsIncrementedDomainEvent } from './events/DepositsIncrementedDomainEvent';
import { DomainErrors } from './errors';

export interface AccountProps {
  id?: Domain.UUIDv4;
  deposits: DepositsCounterVO;
}

type TAccountSnapshot = {
  id: string;
  deposits: number;
};

export class AccountEntity extends Domain.Aggregate<AccountProps> {
  static notificationContentFirstDeposit = 'Congrats, you have made your first deposit!';
  static notificationContentMilestoneDeposit = (depositsCounter: number) =>
    `Congrats, you have made ${depositsCounter} deposits!`;

  private constructor(props: AccountProps) {
    super(props, props.id);
  }

  public static create(props: AccountProps): Either<AccountEntity, never> {
    const account = new AccountEntity(props);
    return ok(account);
  }

  get id() {
    return this._id;
  }

  get deposits() {
    return this.props.deposits;
  }

  public isFirstDeposit(): boolean {
    return this.props.deposits.counter === 1;
  }

  public hasReachedMilestoneDeposits(): boolean {
    return this.props.deposits.counter % 10 === 0;
  }

  public incrementDeposits(): Either<void, DomainErrors.InvalidNumberOfTransactions> {
    const newDepositsCount = this.props.deposits.increment();
    if (newDepositsCount.isFail()) {
      return fail(newDepositsCount.value);
    }
    this.props.deposits = newDepositsCount.value;
    this.addDomainEvent(new DepositsIncrementedDomainEvent(this));
    return ok();
  }

  public toPrimitives(): TAccountSnapshot {
    return {
      id: this.id.toString(),
      deposits: this.deposits.counter,
    };
  }

  public static fromPrimitives(data: TAccountSnapshot): AccountEntity {
    return new AccountEntity({
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      deposits: DepositsCounterVO.create({ counter: data.deposits }).value as DepositsCounterVO,
    });
  }
}
