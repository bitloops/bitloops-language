import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { CustomerCreated } from './events/CustomerCreated';
import { EmailVO } from './EmailVO';
import { PINVO } from './PINVO';
import { AccountIdVO } from './AccountIdVO';
import { DomainErrors } from './errors/index';
import { fail } from '@bitloops/bl-boilerplate-core';

export interface CustomerProps {
  id?: Domain.UUIDv4;
  email: EmailVO;
  pin: PINVO;
  accountId: AccountIdVO;
}

type TCustomerEntitySnapshot = {
  id: string;
  email: string;
  pin: string;
  accountId: string;
};

export class CustomerEntity extends Domain.Aggregate<CustomerProps> {
  private constructor(props: CustomerProps) {
    super(props, props.id);
  }

  public static create(props: CustomerProps): Either<CustomerEntity, never> {
    const todo = new CustomerEntity(props);
    const isNew = !props.id;
    if (isNew) {
      todo.addDomainEvent(new CustomerCreated(todo));
    }
    return ok(todo);
  }

  get id() {
    return this._id;
  }

  get email(): EmailVO {
    return this.props.email;
  }

  get pin(): PINVO {
    return this.props.pin;
  }

  get accountId(): AccountIdVO {
    return this.props.accountId;
  }

  validatePIN(pin: PINVO): Either<void, DomainErrors.InvalidCustomerPIN> {
    if (this.props.pin.equals(pin)) {
      return ok();
    }
    return fail(new DomainErrors.InvalidCustomerPIN(pin.pin));
  }

  public toPrimitives(): TCustomerEntitySnapshot {
    return {
      id: this.id.toString(),
      email: this.email.email,
      pin: this.pin.pin,
      accountId: this.accountId.id,
    };
  }

  public static fromPrimitives(data: TCustomerEntitySnapshot): CustomerEntity {
    const customerProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      email: EmailVO.create({ email: data.email }).value as EmailVO,
      pin: PINVO.create({ pin: data.pin }).value as PINVO,
      accountId: AccountIdVO.create({ id: data.accountId }).value as AccountIdVO,
    };
    return new CustomerEntity(customerProps);
  }
}
