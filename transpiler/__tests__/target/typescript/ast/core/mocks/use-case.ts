import { UseCaseBuilderDirector } from '../../../core/builders/useCase.js';

export const USE_CASE_TEST_CASES = [
  {
    description: 'use case that has 2 dependency calls that need await',
    useCase: new UseCaseBuilderDirector().buildUseCaseWithTwoRepoCalls('CreateTodoUseCase'),
    expectedOutput: new UseCaseBuilderDirector().buildUseCaseWithTwoRepoCalls('CreateTodoUseCase', {
      await: true,
    }),
  },
  {
    description: 'check append dotValue in a single value object evaluation',
    useCase: new UseCaseBuilderDirector().buildUseCaseWithOneValueObjectEvaluation(
      'CreateTodoUseCase',
    ),
    expectedOutput: new UseCaseBuilderDirector().buildUseCaseWithOneValueObjectEvaluation(
      'CreateTodoUseCase',
      { dotValue: true },
    ),
  },
  {
    description: 'check append dotValue with a value object and an entity evaluation',
    useCase: new UseCaseBuilderDirector().buildUseCaseWithTwoDomainEvaluations('CreateTodoUseCase'),
    expectedOutput: new UseCaseBuilderDirector().buildUseCaseWithTwoDomainEvaluations(
      'CreateTodoUseCase',
      { dotValue: true },
    ),
  },
  {
    description: 'Combining the need for await and dotValue',
    useCase: new UseCaseBuilderDirector().buildUseCaseEntityEvaluationAndRepoSaveOfTheEntity(
      'CreateTodoUseCase',
    ),
    expectedOutput: new UseCaseBuilderDirector().buildUseCaseEntityEvaluationAndRepoSaveOfTheEntity(
      'CreateTodoUseCase',
      { await: true, dotValue: true },
    ),
  },
];
