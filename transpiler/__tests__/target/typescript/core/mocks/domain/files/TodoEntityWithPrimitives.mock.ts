import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { TodoProps } from './todo.props';
type TTodoEntityPrimitives = {
  id: string;
  completed: boolean;
};
export class TodoEntity extends Domain.Entity<TodoProps> {
  private constructor(props: TodoProps) {
    super(props, props.id);
  }
  public static create(props: TodoProps): Either<TodoEntity, never> {
    props.completed = false;
    return ok(new TodoEntity(props));
  }
  get id() {
    return this._id;
  }
  get completed(): boolean {
    return this.props.completed;
  }
  public uncomplete(): Either<void, never> {
    this.props.completed = false;
    return ok();
  }
  public complete(): Either<boolean, never> {
    return ok(true);
  }
  public static fromPrimitives(data: TTodoEntityPrimitives): TodoEntity {
    const TodoEntityProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      completed: data.completed,
    };
    return new TodoEntity(TodoEntityProps);
  }
  public toPrimitives(): TTodoEntityPrimitives {
    return {
      id: this.id.toString(),
      completed: this.completed,
    };
  }
}
