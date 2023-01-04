import { FileUtil } from '../../../../../src/utils/file.js';
import { PackageConcretionBuilder } from '../../builders/packageConcretionBuilder.js';

export const VALID_PACKAGE_CONCRETIONS = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/packageConcretion/packageConcretion.bl',
    ),
    description: 'Valid Package Concretion',
    fileId: 'setup.bl',
    packageConcretion: new PackageConcretionBuilder()
      .withBoundedContextModule({ boundedContextName: 'Bounded Context', moduleName: 'Module' })
      .withPackageAdapterClassName({
        packageAdapterIdentifier: 'LodashUtilitiesPackageAdapter',
      })
      .withPackageAdapterIdentifier('UtilitiesPackageAdapter')
      .build(),
  },
];
