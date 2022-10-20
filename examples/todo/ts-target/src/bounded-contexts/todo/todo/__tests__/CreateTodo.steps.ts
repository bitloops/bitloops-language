import { defineFeature, loadFeature } from 'jest-cucumber';
import { TodoCreateUseCase } from '../application/TodoCreateUseCase';
import { TodoCreateRequestDTO } from '../dtos/TodoCreateRequestDTO';
import { MockTodoWriteRepo } from '../repos/concretions/MockTodoRepo';
import { DomainErrors } from '../domain/DomainErrors';

const feature = loadFeature('src/bounded-contexts/todo/todo/__tests__/CreateTodo.feature');

defineFeature(feature, (test) => {
  let title: string;

  const mockRepo = new MockTodoWriteRepo();

  test('Valid Todo Created', ({ when, then }) => {
    when(/^I create a todo with (.*)$/, (arg0) => {
      title = arg0;
    });

    then('I should get an OK result', async () => {
      const dto: TodoCreateRequestDTO = {
        title,
      };
      const useCase = new TodoCreateUseCase(mockRepo);
      const result = await useCase.execute(dto);
      expect(result.value instanceof DomainErrors.TitleOutOfBoundsError).toBeFalse();
    });
  });

  test('Invalid todo title during creation', ({ when, then }) => {
    when(/^I try to create a todo with invalid (.*)$/, (arg0) => {
      title = arg0;
    });

    then('I should get a DomainErrors.TitleOutOfBoundsError error', async () => {
      const dto: TodoCreateRequestDTO = {
        title,
      };
      const useCase = new TodoCreateUseCase(mockRepo);
      const result = await useCase.execute(dto);
      expect(result.value instanceof DomainErrors.TitleOutOfBoundsError).toBeTrue();
    });
  });
});
