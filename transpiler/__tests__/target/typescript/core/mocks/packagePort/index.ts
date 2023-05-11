import { BitloopsPrimaryTypeNodeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { PackagePortNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/package/packagePort/PackagePortNode.js';
import { PackagePortNodeDirector } from '../../builders/packagePortNodeDirector.js';
import { MethodDefinitionNodeBuilderDirector } from '../../builders/methodDefinitionNodeBuilderDirector.js';
import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';

type PackagePortTestCase = {
  description: string;
  packagePort: PackagePortNode;
  output: string;
};

export const VALID_PACKAGE_PORT_TEST_CASES: PackagePortTestCase[] = [
  {
    description: 'an aggregate repo port with no definitions',
    packagePort: new PackagePortNodeDirector().buildPortWithMethodDefinitions(
      'GherkinPackagePort',
      [
        new MethodDefinitionNodeBuilderDirector().buildMethodDefinitionNode({
          methodName: 'encode',
          parameters: [new ParameterBuilderDirector().buildPrimitiveParameter('value', 'string')],
          type: new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('bytes'),
        }),
      ],
    ),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/packagePort/packagePort.mock.ts',
    ),
  },
];
