import { TPackage } from '../../../../src/types.js';
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
          .withDefinitionMethod({})
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
          .withDefinitionMethod({})
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
            .withDefinitionMethod({})
            .build(),
        )
        .build(),
      new PackageBuilder()
        .withPort(
          new PackagePortBuilder()
            .withIdentifier('ExamplePackagePort')
            .withDefinitionMethod({})
            .build(),
        )
        .build(),
    ],
  },
];
