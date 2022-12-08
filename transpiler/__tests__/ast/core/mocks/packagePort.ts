import { TPackage } from '../../../../src/types.js';
import { MethodDefinitionBuilderDirector } from '../builders/methodDefinitionDirector.js';
import { PackageBuilder } from '../builders/package/packageBuilder.js';
import { PackagePortBuilder } from '../builders/package/packagePortBuilder.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  expected: TPackage;
};

type MultiplePackagesTestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  expected: TPackage[];
};

export const validPackagePortDeclarationCases: Array<TestCase> = [
  {
    description: 'should parse a package port declaration with a single method',
    fileId: 'testFile.bl',
    inputBLString: 'PackagePort GherkinPackagePort { encode(value: string): bytes; }',
    expected: new PackageBuilder()
      .withPort(
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
      )
      .build(),
  },
  {
    description: 'should parse a package port declaration with multiple methods',
    fileId: 'testFile.bl',
    inputBLString:
      'PackagePort GherkinPackagePort { encode(value: string): bytes; decode(value: string): string; }',
    expected: new PackageBuilder()
      .withPort(
        new PackagePortBuilder()
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
      new PackageBuilder()
        .withPort(
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
        )
        .build(),
      new PackageBuilder()
        .withPort(
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
        )
        .build(),
    ],
  },
];
