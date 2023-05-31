import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { TodoProps } from './todo.props';
import { TTitleVOPrimitives, TitleVO } from './title.value-object';
import { LanguageVO, TLanguageVOPrimitives } from './language.value-object';
import { DomainErrors } from './errors/index';
export type TTodoEntityPrimitives = {
  id?: string;
  completed: boolean;
  title: TTitleVOPrimitives;
  todoLanguage: TLanguageVOPrimitives;
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
      title: TitleVO.fromPrimitives(data.title),
      todoLanguage: LanguageVO.fromPrimitives(data.todoLanguage),
    };
    return new TodoEntity(TodoEntityProps);
  }
  public toPrimitives(): TTodoEntityPrimitives {
    return {
      id: this.id.toString(),
      completed: this.completed,
      title: this.title.toPrimitives(),
      todoLanguage: this.todoLanguage.toPrimitives(),
    };
  }
}
