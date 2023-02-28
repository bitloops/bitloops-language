import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { TodoProps } from './TodoProps';
import { TitleVO } from './TitleVO';
type TTodoRootEntityPrimitives = {
  id: string;
  completed: boolean;
  title: {
    title: string;
    language: string;
  };
};
export class TodoRootEntity extends Domain.Aggregate<TodoProps> {
  private constructor(props: TodoProps) {
    super(props, props.id);
  }
  public static create(props: TodoProps): Either<TodoRootEntity, never> {
    props.completed = false;
    return ok(new TodoRootEntity(props));
  }
  get id() {
    return this._id;
  }
  get completed(): boolean {
    return this.props.completed;
  }
  get title(): TitleVO {
    return this.props.title;
  }
  public uncomplete(): Either<void, never> {
    this.props.completed = false;
    return ok();
  }
  public static complete(): Either<boolean, never> {
    return true;
  }
  public static fromPrimitives(data: TTodoRootEntityPrimitives): TodoRootEntity {
    const TodoRootEntityProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      completed: data.completed,
      title: TitleVO.create({
        title: data.title.title,
        language: data.title.language,
      }).value as TitleVO,
    };
    return new TodoRootEntity(TodoRootEntityProps);
  }
  public toPrimitives(): TTodoRootEntityPrimitives {
    return {
      id: this.id.toString(),
      completed: this.props.completed,
      title: {
        title: this.props.title.title,
        language: this.props.title.language,
      },
    };
  }
}
