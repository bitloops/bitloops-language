import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { TitleVO } from './TitleVO';

export interface TodoProps {
  id?: Domain.UUIDv4;
  title: TitleVO;
  completed: boolean;
}

export class TodoEntity extends Domain.Aggregate<TodoProps> {
  private constructor(props: TodoProps) {
    super(props, props.id);
  }

  public static create(props: TodoProps): Either<TodoEntity, never> {
    const todo = new TodoEntity(props);

    return ok(todo);
  }

  get completed(): boolean {
    return this.props.completed;
  }

  get id() {
    return this._id;
  }

  get title(): TitleVO {
    return this.props.title;
  }

  public complete(): Either<void, never> {
    this.props.completed = true;
    return ok();
  }

  public uncomplete(): Either<void, never> {
    this.props.completed = false;
    return ok();
  }

  public updateTitle(title: TitleVO): Either<void, never> {
    this.props.title = title;
    return ok();
  }
}
