import { FileUtil } from '../../../../../src/utils/file.js';
import { UseCaseDefinitionBuilderDirector } from '../../builders/useCaseDefinitionBuilderDirector.js';

export const VALID_ROUTER_DEFINITION_CASES = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/routerDefinition/routerWithoutDependency.bl',
    ),
    description: 'Router without dependency',
    fileId: 'setup.bl',
    routerDefinition:
      new UseCaseDefinitionBuilderDirector().buildUseCaseDefinitionWithoutDependencies({
        constIdentifier: 'myUseCase',
        useCaseIdentifier: 'HelloWorldUseCase',
        boundedContextName: 'Hello World',
        moduleName: 'Core',
      }),
  },
];
