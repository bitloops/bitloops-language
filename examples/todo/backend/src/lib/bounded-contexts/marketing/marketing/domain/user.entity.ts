import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { UserProps } from './user.props';
import {
  CompletedTodosVO,
  TCompletedTodosVOPrimitives,
} from './completed-todos.value-object';
import { EmailVO, TEmailVOPrimitives } from './email.value-object';
import { TodoCompletionsIncrementedDomainEvent } from './events/todo-completions-incremented.domain-event';
import { DomainErrors } from './errors/index';
export type TUserEntityPrimitives = {
  id?: string;
  completedTodos: TCompletedTodosVOPrimitives;
  email: TEmailVOPrimitives;
};
export class UserEntity extends Domain.Aggregate<UserProps> {
  private constructor(props: UserProps) {
    super(props, props.id);
  }
  public static create(props: UserProps): Either<UserEntity, never> {
    const userEntity = new UserEntity(props);
    return ok(userEntity);
  }
  get id() {
    return this._id;
  }
  get completedTodos(): CompletedTodosVO {
    return this.props.completedTodos;
  }
  get email(): EmailVO {
    return this.props.email;
  }
  public incrementCompletedTodos(): Either<
    void,
    DomainErrors.InvalidTodosCounterError
  > {
    const incrementedCompletedTodos = this.props.completedTodos.counter + 1;
    const completedTodos = CompletedTodosVO.create({
      counter: incrementedCompletedTodos,
    });
    if (completedTodos.isFail()) {
      return fail(completedTodos.value);
    }
    this.props.completedTodos = completedTodos.value;
    const event = new TodoCompletionsIncrementedDomainEvent({
      completedTodos: this.props.completedTodos.counter,
      aggregateId: this.props.id.toString(),
    });
    this.addDomainEvent(event);
    return ok();
  }
  public isFirstTodo(): boolean {
    return this.props.completedTodos.counter === 1;
  }
  public changeEmail(
    email: string
  ): Either<void, DomainErrors.InvalidEmailDomainError> {
    const newEmail = EmailVO.create({ email: email });
    if (newEmail.isFail()) {
      return fail(newEmail.value);
    }
    this.props.email = newEmail.value;
    return ok();
  }
  public static fromPrimitives(data: TUserEntityPrimitives): UserEntity {
    const UserEntityProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      completedTodos: CompletedTodosVO.fromPrimitives(data.completedTodos),
      email: EmailVO.fromPrimitives(data.email),
    };
    return new UserEntity(UserEntityProps);
  }
  public toPrimitives(): TUserEntityPrimitives {
    return {
      id: this.id.toString(),
      completedTodos: this.completedTodos.toPrimitives(),
      email: this.email.toPrimitives(),
    };
  }
}
