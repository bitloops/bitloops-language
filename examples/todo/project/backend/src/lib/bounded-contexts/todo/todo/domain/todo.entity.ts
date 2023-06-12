import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { TodoProps } from './todo.props';
import { TUserIdVOPrimitives, UserIdVO } from './user-id.value-object';
import { TTitleVOPrimitives, TitleVO } from './title.value-object';
import { TodoAddedDomainEvent } from './events/todo-added.domain-event';
import { DomainRules } from './rules/index';
import { TodoCompletedDomainEvent } from './events/todo-completed.domain-event';
import { DomainErrors } from './errors/index';
import { TodoUncompletedDomainEvent } from './events/todo-uncompleted.domain-event';
import { TodoTitleModifiedDomainEvent } from './events/todo-title-modified.domain-event';
import { TodoDeletedDomainEvent } from './events/todo-deleted.domain-event';
export type TTodoEntityPrimitives = {
  id?: string;
  userId: TUserIdVOPrimitives;
  title: TTitleVOPrimitives;
  completed: boolean;
};
export class TodoEntity extends Domain.Aggregate<TodoProps> {
  private constructor(props: TodoProps) {
    super(props, props.id);
  }
  public static create(props: TodoProps): Either<TodoEntity, never> {
    const todo = new TodoEntity(props);
    const isNew = props.id !== null;
    if (isNew) {
      const event = new TodoAddedDomainEvent({
        aggregateId: todo.id.toString(),
        userId: todo.userId.id.toString(),
        title: todo.title.title,
        completed: todo.completed,
      });
      todo.addDomainEvent(event);
    }
    return ok(todo);
  }
  get id() {
    return this._id;
  }
  get userId(): UserIdVO {
    return this.props.userId;
  }
  get title(): TitleVO {
    return this.props.title;
  }
  get completed(): boolean {
    return this.props.completed;
  }
  public complete(): Either<void, DomainErrors.TodoAlreadyCompletedError> {
    const res = Domain.applyRules([
      new DomainRules.TodoAlreadyCompletedRule(
        this.props.completed,
        this.props.id.toString()
      ),
    ]);
    if (res) return fail(res);
    this.props.completed = true;
    const event = new TodoCompletedDomainEvent({
      aggregateId: this.props.id.toString(),
      userId: this.props.userId.id.toString(),
      title: this.props.title.title,
      completed: this.props.completed,
    });
    this.addDomainEvent(event);
    return ok();
  }
  public uncomplete(): Either<void, DomainErrors.TodoAlreadyUncompletedError> {
    const res = Domain.applyRules([
      new DomainRules.TodoAlreadyUncompletedRule(
        this.props.completed,
        this.props.id.toString()
      ),
    ]);
    if (res) return fail(res);
    this.props.completed = false;
    const event = new TodoUncompletedDomainEvent({
      aggregateId: this.props.id.toString(),
      userId: this.props.userId.id.toString(),
      title: this.props.title.title,
      completed: this.props.completed,
    });
    this.addDomainEvent(event);
    return ok();
  }
  public modifyTitle(title: TitleVO): Either<void, never> {
    this.props.title = title;
    const event = new TodoTitleModifiedDomainEvent({
      aggregateId: this.props.id.toString(),
      userId: this.props.userId.id.toString(),
      title: this.props.title.title,
      completed: this.props.completed,
    });
    this.addDomainEvent(event);
    return ok();
  }
  public delete(): Either<void, never> {
    const event = new TodoDeletedDomainEvent({
      aggregateId: this.props.id.toString(),
      userId: this.props.userId.id.toString(),
      title: this.props.title.title,
      completed: this.props.completed,
    });
    this.addDomainEvent(event);
    return ok();
  }
  public static fromPrimitives(data: TTodoEntityPrimitives): TodoEntity {
    const TodoEntityProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      userId: UserIdVO.fromPrimitives(data.userId),
      title: TitleVO.fromPrimitives(data.title),
      completed: data.completed,
    };
    return new TodoEntity(TodoEntityProps);
  }
  public toPrimitives(): TTodoEntityPrimitives {
    return {
      id: this.id.toString(),
      userId: this.userId.toPrimitives(),
      title: this.title.toPrimitives(),
      completed: this.completed,
    };
  }
}
