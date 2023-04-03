import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { TitleVO } from './TitleVO';
import { UserIdVO } from './UserIdVO';
import { DomainErrors } from './errors';
import { TodoAddedDomainEvent } from './events/todo-added.event';
import { TodoModifiedTitleDomainEvent } from './events/todo-modified-title.event';
import { TodoCompletedDomainEvent } from './events/todo-completed.event';
import { TodoUncompletedDomainEvent } from './events/todo-uncompleted.event';
import { Rules } from './rules';
import { TodoDeletedDomainEvent } from './events/todo-deleted.event';

export interface TodoProps {
  userId: UserIdVO;
  id?: Domain.UUIDv4;
  title: TitleVO;
  completed: boolean;
}

type TTodoEntityPrimitives = {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
};

export class TodoEntity extends Domain.Aggregate<TodoProps> {
  private constructor(props: TodoProps) {
    super(props, props.id);
  }

  public static create(props: TodoProps): Either<TodoEntity, never> {
    const todo = new TodoEntity(props);

    const isNew = !props.id;
    if (isNew) {
      todo.addDomainEvent(new TodoAddedDomainEvent(todo));
    }
    // add domain event todo created
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

  get userId(): UserIdVO {
    return this.props.userId;
  }

  public complete(): Either<void, DomainErrors.TodoAlreadyCompletedError> {
    const res = Domain.applyRules([
      new Rules.TodoAlreadyCompleted(this.props.completed, this.id.toString()),
    ]);
    if (res) return fail(res);

    this.props.completed = true;
    this.addDomainEvent(new TodoCompletedDomainEvent(this));
    return ok();
  }

  public uncomplete(): Either<void, DomainErrors.TodoAlreadyUncompletedError> {
    const res = Domain.applyRules([
      new Rules.TodoAlreadyUncompleted(
        this.props.completed,
        this.id.toString(),
      ),
    ]);
    if (res) return fail(res);
    this.props.completed = false;
    this.addDomainEvent(new TodoUncompletedDomainEvent(this));
    return ok();
  }

  public delete(): Either<void, void> {
    this.addDomainEvent(new TodoDeletedDomainEvent(this));
    return ok();
  }

  public modifyTitle(title: TitleVO): Either<void, never> {
    this.props.title = title;
    this.addDomainEvent(new TodoModifiedTitleDomainEvent(this));
    return ok();
  }

  public static fromPrimitives(data: TTodoEntityPrimitives): TodoEntity {
    const TodoEntityProps: TodoProps = {
      userId: UserIdVO.create({ id: new Domain.UUIDv4(data.userId) })
        .value as UserIdVO,
      id: new Domain.UUIDv4(data.id),
      title: TitleVO.create({
        title: data.title,
      }).value as TitleVO,
      completed: data.completed,
    };
    return new TodoEntity(TodoEntityProps);
  }

  public toPrimitives(): TTodoEntityPrimitives {
    return {
      userId: this.props.userId.id.toString(),
      id: this._id.toString(),
      title: this.props.title.title,
      completed: this.props.completed,
    };
  }
}
