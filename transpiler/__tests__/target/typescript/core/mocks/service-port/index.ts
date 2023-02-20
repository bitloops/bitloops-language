import { FileUtil } from '../../../../../../src/utils/file.js';
import { MethodDefinitionNodeBuilderDirector } from '../../builders/methodDefinitionNodeBuilderDirector.js';
import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { BitloopsPrimaryTypeNodeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';
import { ServicePortNodeBuilderDirector } from '../../builders/servicePortNodeBuilderDirector.js';

export const VALID_SERVICE_PORT_TEST_CASES = [
  {
    description: 'Package port with two method definitions',
    servicePort: new ServicePortNodeBuilderDirector().buildServicePort({
      packagePortName: 'TestServicePort',
      methodDefinitions: [
        new MethodDefinitionNodeBuilderDirector().buildMethodDefinitionNode({
          methodName: 'getTestData',
          parameters: [new ParameterBuilderDirector().buildPrimitiveParameter('value', 'string')],
          type: new BitloopsPrimaryTypeNodeDirector().buildIdentifierPrimaryType('TestDataSchema'),
        }),
        new MethodDefinitionNodeBuilderDirector().buildMethodDefinitionNode({
          methodName: 'sendTestData',
          parameters: [
            new ParameterBuilderDirector().buildIdentifierParameter('value', 'TestDataSchema'),
            new ParameterBuilderDirector().buildPrimitiveParameter('value2', 'string'),
          ],
          type: new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('void'),
        }),
      ],
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/service-port/servicePortTwoDefinitions.mock.ts',
    ),
  },
];
