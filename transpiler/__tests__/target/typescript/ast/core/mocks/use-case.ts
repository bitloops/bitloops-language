import { UseCaseBuilderDirector } from '../../../core/builders/useCase.js';

export const USE_CASE_TEST_CASES = [
  {
    description: 'use case that has 2 dependency calls that need await',
    controller: new UseCaseBuilderDirector().buildUseCaseWithTwoRepoCalls('CreateTodoUseCase'),
    expectedOutput: new UseCaseBuilderDirector().buildUseCaseWithTwoRepoCalls('CreateTodoUseCase', {
      await: true,
    }),
  },
];
