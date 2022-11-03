import { Application, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { TodoReadModel } from '../domain/TodoReadModel';
import { GetByIdTodoRequestDTO } from '../dtos/GetByIdTodoRequestDTO';
import { ApplicationErrors } from './errors';

type GetByIdTodoResponse = Either<TodoReadModel, ApplicationErrors.ToDoNotFound>;

export class GetByIdTodoUseCase
  implements Application.IUseCase<GetByIdTodoRequestDTO, Promise<GetByIdTodoResponse>>
{
  private todoRepo: Application.Repo.ICRUDReadPort<TodoReadModel>;

  constructor(todoRepo: Application.Repo.ICRUDReadPort<TodoReadModel>) {
    this.todoRepo = todoRepo;
  }

  async execute(request: GetByIdTodoRequestDTO): Promise<GetByIdTodoResponse> {
    const todo = await this.todoRepo.getById(request.id);

    if (!todo) {
      return fail(new ApplicationErrors.ToDoNotFound(request.id));
    }

    return ok(todo);
  }
}
