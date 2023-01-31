import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { CustomerCreated } from './events/TodoCreated';
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
}
