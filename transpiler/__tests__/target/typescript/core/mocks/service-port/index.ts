import { FileUtil } from '../../../../../../src/utils/file.js';
import { MethodDefinitionNodeBuilderDirector } from '../../builders/methodDefinitionNodeBuilderDirector.js';
import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { ServicePortNodeBuilderDirector } from '../../builders/servicePortNodeBuilderDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from '../../builders/returnOkErrorTypeBuilderDirector.js';
import { ErrorIdentifiersNodeBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/ErrorIdentifiersNodeBuilderDirector.js';

export const VALID_SERVICE_PORT_TEST_CASES = [
  {
    description: 'Package port with two method definitions',
    servicePort: new ServicePortNodeBuilderDirector().buildServicePort({
      packagePortName: 'TestServicePort',
      methodDefinitions: [
        new MethodDefinitionNodeBuilderDirector().buildMethodDefinitionNode({
          methodName: 'getTestData',
          parameters: [new ParameterBuilderDirector().buildPrimitiveParameter('value', 'string')],
          type: new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorTypeBitloopsIdentifier(
            'TestDataSchema',
            [ErrorIdentifiersNodeBuilderDirector.unexpectedRepoErrorName],
          ),
        }),
        new MethodDefinitionNodeBuilderDirector().buildMethodDefinitionNode({
          methodName: 'sendTestData',
          parameters: [
            new ParameterBuilderDirector().buildIdentifierParameter('value', 'TestDataSchema'),
            new ParameterBuilderDirector().buildPrimitiveParameter('value2', 'string'),
          ],
          type: new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorTypePrimitiveType('void', [
            ErrorIdentifiersNodeBuilderDirector.unexpectedRepoErrorName,
          ]),
        }),
        new MethodDefinitionNodeBuilderDirector().buildMethodDefinitionNode({
          methodName: 'sendTestDataEither',
          parameters: [
            new ParameterBuilderDirector().buildIdentifierParameter('value', 'TestDataSchema'),
          ],
          type: new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorTypePrimitiveType('void', [
            ErrorIdentifiersNodeBuilderDirector.unexpectedRepoErrorName,
          ]),
        }),
      ],
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/service-port/servicePortTwoDefinitions.mock.ts',
    ),
  },
];
