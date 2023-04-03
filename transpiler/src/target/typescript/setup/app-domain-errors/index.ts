/**
 *  Bitloops Language
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
//import path from 'path';
import {
  TDomainError,
  TApplicationError,
  DomainErrorKey,
  DomainErrorIdentifier,
  ApplicationErrorKey,
  ApplicationErrorIdentifier,
  TDomainErrorValue,
  TApplicationErrorValue,
} from '../../../../types.js';

import { TBoundedContexts } from '../../../../ast/core/types.js';

import { getTargetFileDestination } from '../../helpers/getTargetFileDestination.js';
import { TSetupOutput } from '../setup-typescript.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../helpers/mappings.js';

interface IAppAndDomainErrorsAggregator {
  generateAppDomainErrors(model: TBoundedContexts): TSetupOutput[];
}

// const esmEnabled = false;

export class AppAndDomainErrorsAggregator implements IAppAndDomainErrorsAggregator {
  generateAppDomainErrors(model: TBoundedContexts): TSetupOutput[] {
    const output = [];
    for (const [boundedContextName, boundedContext] of Object.entries(model)) {
      for (const [moduleName, module] of Object.entries(boundedContext)) {
        const domainErrors = module.getRootChildrenNodesValueByType<TDomainError>(
          BitloopsTypesMapping.TDomainError,
        );
        const applicationErrors = module.getRootChildrenNodesValueByType<TApplicationError>(
          BitloopsTypesMapping.TApplicationError,
        );
        const domainRes = this.handleDomainApplicationError(
          {
            classType: ClassTypes.DomainError,
            errorModels: domainErrors,
          },
          boundedContextName,
          moduleName,
        );
        const appRes = this.handleDomainApplicationError(
          {
            classType: ClassTypes.ApplicationError,
            errorModels: applicationErrors,
          },
          boundedContextName,
          moduleName,
        );
        output.push(...domainRes, ...appRes);
      }
    }
    return output;
  }

  private handleDomainApplicationError(
    params:
      | { classType: 'DomainError'; errorModels: TDomainError[] } // ClassTypes.DomainErrors || ClassTypes.ApplicationError
      | { classType: 'ApplicationError'; errorModels: TApplicationError[] },
    boundedContextName: string,
    moduleName: string,
  ): TSetupOutput[] {
    const result: TSetupOutput[] = [];

    const { classType, errorModels } = params;
    const namespaceName = `${classType}s`;
    let imports = '';
    let content = `export namespace ${namespaceName} {`;

    const filePathObj = getTargetFileDestination(
      boundedContextName,
      moduleName,
      classType,
      namespaceName,
    );

    for (const errorModel of errorModels) {
      const className = this.getErrorName(errorModel, classType);
      const classNameWithoutError = className.split('Error')[0];
      imports += `import { ${className} as ${classNameWithoutError} } from './${className}';`;
      content += `export class ${className} extends ${classNameWithoutError} {}`;
    }
    content += '}';
    const finalContent = imports + content;
    result.push({
      fileType: classType,
      fileId: `${filePathObj.path}/index.ts`,
      content: finalContent,
    });

    return result;
  }

  // Get Error name Depending on the classType
  private getErrorName(
    errorModel: TDomainError | TApplicationError,
    classTypeName: 'DomainError' | 'ApplicationError',
  ): string {
    if (classTypeName === 'DomainError') {
      const error = errorModel[DomainErrorKey] as TDomainErrorValue;
      return error[DomainErrorIdentifier];
    } else {
      const error = errorModel[ApplicationErrorKey] as TApplicationErrorValue;
      return error[ApplicationErrorIdentifier];
    }
  }
}
