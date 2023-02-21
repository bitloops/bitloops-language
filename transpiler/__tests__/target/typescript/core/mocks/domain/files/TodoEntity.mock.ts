import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { TodoProps } from './TodoProps';
import { DomainErrors } from './errors/index';

type TTodoEntityPrimitives = {
  id: string;
  title: {
    title: string;
  };
  completed: boolean;
};
export class TodoEntity extends Domain.Entity<TodoProps> {
  private constructor(props: TodoProps) {
    super(props, props.id);
  }
  public static create(props: TodoProps): Either<TodoEntity, DomainErrors.InvalidTitleError> {
    const id = 7;
    return ok(new TodoEntity(props));
  }
  get id() {
    return this._id;
  }
  get completed(): boolean {
    return this.props.completed;
  }
  private isValidName(name: string): boolean {
    return true;
  }
  public complete(): Either<TodoEntity, never> {
    return 'hey';
  }
  public toPrimitives(): TTodoEntityPrimitives {
    return {
      id: this.id.toString(),
      title: {
        title: this.props.title.title,
      },
      completed: this.props.completed,
    };
  }
  public static fromPrimitives(data: TTodoEntityPrimitives): TodoEntity {
    const todoProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      title: TitleVO.create({
        title: data.title.title,
      }).value as TitleVO,
      completed: data.completed,
    };
    return new TodoEntity(todoProps);
  }
}
