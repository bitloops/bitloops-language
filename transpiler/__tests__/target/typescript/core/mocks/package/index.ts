import { PackageNodeBuilderDirector } from '../../builders/packageNodeBuilderDirector.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { MethodDefinitionNodeBuilderDirector } from '../../builders/methodDefinitionNodeBuilderDirector.js';
import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { BitloopsPrimaryTypeNodeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';

export const VALID_PACKAGE_TEST_CASES = [
  {
    description: 'Package port with two method definitions',
    package: new PackageNodeBuilderDirector().buildPackageNode({
      packagePortName: 'TestPackagePort',
      methodDefinitions: [
        new MethodDefinitionNodeBuilderDirector().buildMethodDefinitionNode({
          methodName: 'encode',
          parameters: [new ParameterBuilderDirector().buildPrimitiveParameter('value', 'string')],
          type: new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('bytes'),
        }),
        new MethodDefinitionNodeBuilderDirector().buildMethodDefinitionNode({
          methodName: 'decode',
          parameters: [
            new ParameterBuilderDirector().buildPrimitiveParameter('value', 'string'),
            new ParameterBuilderDirector().buildPrimitiveParameter('value2', 'string'),
          ],
          type: new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('bytes'),
        }),
      ],
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/package/packagePort.ts',
    ),
  },
];
