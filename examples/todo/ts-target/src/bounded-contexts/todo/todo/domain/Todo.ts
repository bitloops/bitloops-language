import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { TitleVO } from './Title';
import { DomainErrors } from './DomainErrors';

export type UpdateTitleResult = Either<void, DomainErrors.TitleOutOfBoundsError>;

export interface TodoProps {
  id?: Domain.UUIDv4;
  title: TitleVO;
  completed: boolean;
}

export class Todo extends Domain.Aggregate<TodoProps> {
  private constructor(props: TodoProps) {
    super(props, props.id);
  }

  public static create(props: TodoProps): Either<Todo, never> {
    const todo = new Todo(props);

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

  public updateTitle(title: string): UpdateTitleResult {
    const titleVO = TitleVO.create({ title: title });
    if (titleVO.isFail()) {
      return fail(titleVO.value);
    }

    this.props.title = titleVO.value;
    return ok();
  }
}
