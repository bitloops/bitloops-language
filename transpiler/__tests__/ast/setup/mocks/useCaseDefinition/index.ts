import { FileUtil } from '../../../../../src/utils/file.js';
import { UseCaseDefinitionNodeDirector } from '../../builders/useCaseDefinitionBuilder.js';

export const VALID_USE_CASE_DEFINITION_CASES = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/useCaseDefinition/useCaseSetup.bl',
    ),
    description: 'Valid use case',
    fileId: 'setup.bl',
    useCaseDefinition: new UseCaseDefinitionNodeDirector().build(),
  },
];
