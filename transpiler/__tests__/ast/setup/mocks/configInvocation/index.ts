import { SupportedLanguages } from '../../../../../src/target/supportedLanguages.js';
import { TLanguage } from '../../../../../src/types.js';
import { FileUtil } from '../../../../../src/utils/file.js';
import { ConfigInvocationBuilder } from '../../builders/configInvocationBuilder.js';

export const VALID_CONFIG_INVOCATIONS = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/configInvocation/configInvocationTypescriptNest.bl',
    ),
    description: 'Config Language TypeScript-Nest',
    fileId: 'setup.bl',
    configInvocation: new ConfigInvocationBuilder()
      .withLanguage(SupportedLanguages.TypeScriptNest as TLanguage)
      .build(),
  },
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/configInvocation/configInvocationTypescript.bl',
    ),
    description: 'Config Language TypeScript',
    fileId: 'setup.bl',
    configInvocation: new ConfigInvocationBuilder()
      .withLanguage(SupportedLanguages.TypeScriptNest as TLanguage)
      .build(),
  },
];
