import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { TodoProps } from './TodoProps';
import { TitleVO } from './TitleVO';
export class TodoEntity extends Domain.Aggregate<TodoProps> {
  private constructor(props: TodoProps) {
    super(props, props.id);
  }

  public static create(props: TodoProps): Either<TodoEntity, never> {
    return ok(new TodoEntity(props));
  }

  get id() {
    return this._id;
  }
  public check(title: TitleVOs): Either<void, never> {
    this.props.title = title;
    return ok();
  }
}
