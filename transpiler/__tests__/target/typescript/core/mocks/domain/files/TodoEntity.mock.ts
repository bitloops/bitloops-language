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
      id: string;
    };
  };
  todoLanguage: {
    code: string;
    id: string;
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
  get todoLanguage(): LanguageVO {
    return this.props.todoLanguage;
  }
  private isValidName(name: string, title: TitleVO): boolean {
    this.props.title = title;
    return true;
  }
  public complete(): Either<TodoEntity, never> {
    const title = TitleVO.create({ title: requestDTO.title });
    if (title.isFail()) {
      return fail(title.value);
    }
    this.props.title = title.value;
    return 'hey';
  }
  public static fromPrimitives(data: TTodoEntityPrimitives): TodoEntity {
    const TodoEntityProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      completed: data.completed,
      title: TitleVO.create({
        title: data.title.title,
        language: LanguageVO.create({
          code: data.title.language.code,
          id: new Domain.UUIDv4(data.title.language.id) as Domain.UUIDv4,
        }).value as LanguageVO,
      }).value as TitleVO,
      todoLanguage: LanguageVO.create({
        code: data.todoLanguage.code,
        id: new Domain.UUIDv4(data.todoLanguage.id) as Domain.UUIDv4,
      }).value as LanguageVO,
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
          id: this.props.title.language.id.toString(),
        },
      },
      todoLanguage: {
        code: this.props.todoLanguage.code,
        id: this.props.todoLanguage.id.toString(),
      },
    };
  }
}
