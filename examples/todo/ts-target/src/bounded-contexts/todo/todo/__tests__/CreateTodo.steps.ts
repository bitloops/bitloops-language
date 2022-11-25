import { defineFeature, loadFeature } from 'jest-cucumber';
import { CreateTodoUseCase } from '../application/CreateTodoUseCase';
import { CreateTodoRequestDTO } from '../dtos/CreateTodoRequestDTO';
import { MockTodoWriteRepo } from '../repos/concretions/MockTodoWriteRepo';
import { DomainErrors } from '../domain/errors';

const feature = loadFeature('src/bounded-contexts/todo/todo/__tests__/CreateTodo.feature');

defineFeature(feature, (test) => {
  let title: string;

  const mockRepo = new MockTodoWriteRepo();

  test('Valid Todo Created', ({ when, then }) => {
    when(/^I create a todo with (.*)$/, (arg0) => {
      title = arg0;
    });

    then('I should get an OK result', async () => {
      const dto: CreateTodoRequestDTO = {
        title,
      };
      const useCase = new CreateTodoUseCase(mockRepo);
      const result = await useCase.execute(dto);
      expect(result.value instanceof DomainErrors.TitleOutOfBounds).toBeFalse();
    });
  });

  test('Invalid todo title during creation', ({ when, then }) => {
    when(/^I try to create a todo with invalid (.*)$/, (arg0) => {
      title = arg0;
    });

    then('I should get a DomainErrors.TitleOutOfBoundsError error', async () => {
      const dto: CreateTodoRequestDTO = {
        title,
      };
      const useCase = new CreateTodoUseCase(mockRepo);
      const result = await useCase.execute(dto);
      expect(result.value instanceof DomainErrors.TitleOutOfBounds).toBeTrue();
    });
  });
});
