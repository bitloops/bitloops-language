import { Application, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../domain/errors/index';
import { TodoWriteRepoPort } from '../ports/TodoWriteRepoPort';
import { CreateTodoRequestDTO } from '../dtos/CreateTodoRequestDTO';
import { TitleVO } from '../domain/TitleVO';
import { TodoEntity } from '../domain/TodoEntity';
type CreateTodoUseCaseResponse = Either<void, DomainErrors.TitleOutOfBoundsError>;
export class CreateTodoUseCase
  implements Application.IUseCase<CreateTodoRequestDTO, Promise<CreateTodoUseCaseResponse>>
{
  constructor(private todoRepo: TodoWriteRepoPort) {}
  async execute(requestDTO: CreateTodoRequestDTO): Promise<CreateTodoUseCaseResponse> {
    const title = TitleVO.create({ title: requestDTO.title });
    if (!title.isFail()) {
      const todo = TodoEntity.create({ title: title.value, completed: false });
      if (!todo.isFail()) {
        await this.todoRepo.save(todo.value);
        return ok();
      } else {
        return fail(todo.value);
      }
    } else {
      return fail(title.value);
    }
  }
}
