import { FileUtil } from '../../../../../src/utils/file.js';
import { UseCaseDefinitionBuilderDirector } from '../../builders/useCaseDefinitionBuilderDirector.js';

export const VALID_USE_CASE_DEFINITION_CASES = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/useCaseDefinition/useCaseWithoutDependency.bl',
    ),
    description: 'UseCase without dependency',
    fileId: 'setup.bl',
    useCaseDefinition:
      new UseCaseDefinitionBuilderDirector().buildUseCaseDefinitionWithoutDependencies({
        constIdentifier: 'myUseCase',
        useCaseIdentifier: 'HelloWorldUseCase',
        boundedContextName: 'Hello World',
        moduleName: 'Core',
      }),
  },
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/useCaseDefinition/useCaseWithDependency.bl',
    ),
    description: 'UseCase with dependency',
    fileId: 'setup.bl',
    useCaseDefinition:
      new UseCaseDefinitionBuilderDirector().buildUseCaseDefinitionWithDependencies({
        constIdentifier: 'myUseCase',
        useCaseIdentifier: 'CreateTodoUseCase',
        boundedContextName: 'Bounded Context',
        moduleName: 'Module',
        dependencies: ['myRepo'],
      }),
  },
];

export const VALID_MULTIPLE_USE_CASE_DEFINITIONS = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/useCaseDefinition/multipleUseCases.bl',
    ),
    description: 'Multiple use case definitions',
    fileId: 'setup.bl',
    useCaseDefinitions: [
      new UseCaseDefinitionBuilderDirector().buildUseCaseDefinitionWithDependencies({
        constIdentifier: 'myUseCase',
        useCaseIdentifier: 'HelloWorldUseCase',
        boundedContextName: 'Bounded Context 1',
        moduleName: 'Module 2',
        dependencies: ['myRepo'],
      }),
      new UseCaseDefinitionBuilderDirector().buildUseCaseDefinitionWithoutDependencies({
        constIdentifier: 'myUseCaseTodo',
        useCaseIdentifier: 'CreateTodoUseCase',
        boundedContextName: 'other BC',
        moduleName: 'other module',
      }),
    ],
  },
];
