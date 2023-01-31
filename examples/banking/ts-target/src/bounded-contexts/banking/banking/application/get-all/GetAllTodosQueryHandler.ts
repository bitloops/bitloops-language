import { Application, Either, okWithpublish as okResp } from '@bitloops/bl-boilerplate-core';
import { TodoReadModel } from '../../domain/TodoReadModel';
import { GetAllTodosQuery } from './GetAllTodosQuery';

type GetAllTodoResponse = Either<TodoReadModel[], never>;

export class GetAllTodosQueryHandler
  implements Application.IUseCase<GetAllTodosQuery, Promise<GetAllTodoResponse>>
{
  constructor(private todoRepo: Application.Repo.ICRUDReadPort<TodoReadModel>) {}

  async execute(query: GetAllTodosQuery): Promise<GetAllTodoResponse> {
    const todos = await this.todoRepo.getAll();

    return await okResp(query.metadata)(todos);
  }
}
