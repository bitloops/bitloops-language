import { TPackagePort } from '../../../../src/types.js';
import { MethodDefinitionBuilderDirector } from '../builders/methodDefinitionDirector.js';
import { PackagePortBuilder } from '../builders/package/packagePortBuilder.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  expected: TPackagePort;
};

type MultiplePackagesTestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  expected: TPackagePort[];
};

export const validPackagePortDeclarationCases: Array<TestCase> = [
  {
    description: 'should parse a package port declaration with a single method',
    fileId: 'testFile.bl',
    inputBLString: 'PackagePort GherkinPackagePort { encode(value: string): bytes; }',
    expected: new PackagePortBuilder()
      .withIdentifier('GherkinPackagePort')
      .withDefinitionMethod(
        new MethodDefinitionBuilderDirector().buildMethodWithPrimitiveParamsAndReturn({
          methodName: 'encode',
          params: [{ name: 'value', type: 'string' }],
          returnType: 'bytes',
        }),
      )
      .build(),
  },
  {
    description: 'should parse a package port declaration with multiple methods',
    fileId: 'testFile.bl',
    inputBLString:
      'PackagePort GherkinPackagePort { encode(value: string): bytes; decode(value: string): string; }',
    expected: new PackagePortBuilder()
      .withIdentifier('GherkinPackagePort')
      .withDefinitionMethod(
        new MethodDefinitionBuilderDirector().buildMethodWithPrimitiveParamsAndReturn({
          methodName: 'encode',
          params: [{ name: 'value', type: 'string' }],
          returnType: 'bytes',
        }),
      )
      .withDefinitionMethod(
        new MethodDefinitionBuilderDirector().buildMethodWithPrimitiveParamsAndReturn({
          methodName: 'decode',
          params: [{ name: 'value', type: 'string' }],
          returnType: 'string',
        }),
      )
      .build(),
  },
];

export const multiplePackagePortDeclarationCases: Array<MultiplePackagesTestCase> = [
  {
    description: 'should parse two multiline package port declarations',
    fileId: 'testFile.bl',
    inputBLString: `PackagePort GherkinPackagePort { 
      encode(value: string): bytes; 
    } 
    PackagePort ExamplePackagePort { 
      example(value: string): string; 
    }`,
    expected: [
      new PackagePortBuilder()
        .withIdentifier('GherkinPackagePort')
        .withDefinitionMethod(
          new MethodDefinitionBuilderDirector().buildMethodWithPrimitiveParamsAndReturn({
            methodName: 'encode',
            params: [{ name: 'value', type: 'string' }],
            returnType: 'bytes',
          }),
        )
        .build(),
      new PackagePortBuilder()
        .withIdentifier('ExamplePackagePort')
        .withDefinitionMethod(
          new MethodDefinitionBuilderDirector().buildMethodWithPrimitiveParamsAndReturn({
            methodName: 'example',
            params: [{ name: 'value', type: 'string' }],
            returnType: 'string',
          }),
        )
        .build(),
    ],
  },
];
