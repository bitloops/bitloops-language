import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { TodoProps } from './TodoProps';
import { DomainErrors } from './errors/index';
import { LanguageVO } from './LanguageVO';
import { TitleVO } from './TitleVO';
type TTodoEntityPrimitives = {
  id: string;
  completed: boolean;
  title: {
    title: string;
    language: {
      code: string;
    };
  };
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
  get title(): TitleVO {
    return this.props.title;
  }
  private isValidName(name: string): boolean {
    return true;
  }
  public complete(): Either<TodoEntity, never> {
    const title = TitleVO.create({ title: requestDTO.title });
    if (!title.isFail()) {
      this.props.title = title.value;
      return 'hey';
    } else {
      return fail(title.value);
    }
  }
  public static fromPrimitives(data: TTodoEntityPrimitives): TodoEntity {
    const TodoEntityProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      completed: data.completed,
      title: TitleVO.create({
        title: data.title.title,
        language: LanguageVO.create({
          code: data.title.language.code,
        }).value as LanguageVO,
      }).value as TitleVO,
    };
    return new TodoEntity(TodoEntityProps);
  }
  public toPrimitives(): TTodoEntityPrimitives {
    return {
      id: this.id.toString(),
      completed: this.props.completed,
      title: {
        title: this.props.title.title,
        language: {
          code: this.props.title.language.code,
        },
      },
    };
  }
}
