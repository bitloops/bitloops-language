import { FileUtil } from '../../../../../src/utils/file.js';
import { ConfigInvocationBuilder } from '../../builders/configInvocationBuilder.js';

export const VALID_CONFIG_INVOCATIONS = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/configInvocation/configInvocationJava.bl',
    ),
    description: 'Config Language Java',
    fileId: 'setup.bl',
    configInvocation: new ConfigInvocationBuilder().withLanguage('Java').build(),
  },
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/configInvocation/configInvocationTypescript.bl',
    ),
    description: 'Config Language TypeScript',
    fileId: 'setup.bl',
    configInvocation: new ConfigInvocationBuilder().withLanguage('TypeScript').build(),
  },
];
