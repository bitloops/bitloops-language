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
import { ArchitectureLayers } from '../../../helpers/architectureLayers.js';
import { isBitloopsBuiltInClass } from '../../../helpers/isBitloopsBuiltInClass.js';
import { isBitloopsPrimitive } from '../../../helpers/isBitloopsPrimitive.js';
import { isBitloopsStandardApplicationError } from '../../../helpers/isBitloopsStandardApplicationError.js';
import {
  ClassTypes,
  mappingBitloopsBuiltInClassToLayer,
  TClassTypesValues,
} from '../../../helpers/mappings.js';
import {
  TContextData,
  TDependencyChildTypescript,
  TDependencyParentTypescript,
} from '../../../types.js';
import { deepClone } from '../../../utils/deepClone.js';
import { getFilePathRelativeToModule } from '../helpers/getTargetFileDestination.js';
import { findRelativeDiffForImport } from '../utils/findRelativeDiff.js';

export const getParentDependencies = (
  dependencies: TDependencyChildTypescript[],
  {
    classType,
    className,
    contextData,
  }: { classType: TClassTypesValues; className: string; contextData?: TContextData },
): TDependencyParentTypescript[] => {
  const parentPathObj = getFilePathRelativeToModule(classType, className);
  const parentPath = parentPathObj.path;
  const parentPathObjContext = getFilePathRelativeToModule(classType, className, contextData);
  const parentPathContext = parentPathObjContext.path;
  const parentDependencies: TDependencyParentTypescript[] = [];
  const clonedDependencies = deepClone(dependencies);
  for (const dependency of clonedDependencies) {
    const { type, value, classType, className, contextInfo } = dependency;
    if (type === 'absolute') {
      parentDependencies.push(dependency as TDependencyParentTypescript);
      continue;
    }
    const childPathObj = getFilePathRelativeToModule(classType, className, contextInfo);
    const childPath = childPathObj.path;
    const finalParentPath = contextInfo ? parentPathContext : parentPath;
    const importString = findRelativeDiffForImport(finalParentPath, childPath, className);
    parentDependencies.push({
      type,
      default: dependency.default,
      value,
      from: importString,
    });
  }
  let finalParentDependencies = removeParentDuplicates(parentDependencies, className);
  finalParentDependencies = mergeDependencies(finalParentDependencies);
  return finalParentDependencies;
};

const mergeDependencies = (parentDependecies): TDependencyParentTypescript[] => {
  // const sources = [];
  const delimeter = ',';
  const mergedDependenciesMap: { [key: string]: TDependencyParentTypescript } = {};
  for (const parentDependency of parentDependecies) {
    const key = parentDependency.from;
    const sources = Object.keys(mergedDependenciesMap);
    if (!sources.includes(key)) {
      mergedDependenciesMap[key] = parentDependency;
      continue;
    }
    if (mergedDependenciesMap[key].value.includes(parentDependency.value)) {
      continue;
    }
    const dependencies = [mergedDependenciesMap[key].value, parentDependency.value].sort();
    mergedDependenciesMap[key].value = dependencies.join(delimeter);
  }
  return Object.values(mergedDependenciesMap);
};
const removeParentDuplicates = (
  parentDependecies: TDependencyParentTypescript[],
  className: string,
) => {
  const isAlreadySet = [];
  const parentDependenciesRemovedDuplicates: TDependencyParentTypescript[] = [];
  for (const parentDependency of parentDependecies) {
    const key = `${parentDependency.value}${parentDependency.from}`;
    if (!isAlreadySet.includes(key) && parentDependency.value !== className) {
      isAlreadySet.push(key);
      parentDependenciesRemovedDuplicates.push(parentDependency);
    }
  }
  return parentDependenciesRemovedDuplicates;
};

export const getChildDependencies = (
  args: string | string[],
  contextData?: TContextData,
): TDependencyChildTypescript[] => {
  let dependencyStrings = args;
  if (typeof args === 'string') {
    dependencyStrings = [args];
  }
  const result: TDependencyChildTypescript[] = [];
  for (const dependencyString of dependencyStrings) {
    if (isBitloopsPrimitive(dependencyString)) {
      continue;
    }
    if (isBitloopsBuiltInClass(dependencyString)) {
      result.push({
        type: 'absolute',
        default: false,
        value: mappingBitloopsBuiltInClassToLayer[dependencyString],
        from: '@bitloops/bl-boilerplate-core',
      });
      continue;
    }
    if (isBitloopsStandardApplicationError(dependencyString)) {
      result.push({
        type: 'absolute',
        default: false,
        value: ArchitectureLayers.Application,
        from: '@bitloops/bl-boilerplate-core',
      });
      continue;
    }
    const { classType } = getClassTypeFromIdentifier(dependencyString);
    if (classType === undefined) {
      continue;
    }
    const { value, fileName } = getValueAndFileNameOfImport(dependencyString, classType);
    result.push({
      type: 'relative',
      default: false,
      value,
      classType,
      className: fileName,
      contextInfo: contextData,
    });
  }
  return result;
};

/**
 * Gets the file name from [class name/=/dependency String]
 * Value dictates name of import
 */
export const getValueAndFileNameOfImport = (
  dependencyString: string,
  classType?: TClassTypesValues,
): { value: string; fileName: string } => {
  if (classType === ClassTypes.DomainError) {
    return {
      value: 'DomainErrors',
      fileName: 'index',
    };
  }
  if (classType === ClassTypes.ApplicationError) {
    return {
      value: 'ApplicationErrors',
      fileName: 'index',
    };
  }
  if (classType === ClassTypes.DomainRule) {
    return {
      value: 'DomainRules',
      fileName: 'index',
    };
  }
  return {
    value: dependencyString,
    fileName: dependencyString,
  };
};

const getClassTypeFromIdentifier = (
  dependencyName: string,
): {
  classType: TClassTypesValues;
} => {
  if (dependencyName.endsWith('DTO')) {
    return {
      classType: ClassTypes.DTO,
    };
  } else if (dependencyName.endsWith('Entity')) {
    return {
      classType: ClassTypes.Entity,
    };
  } else if (dependencyName.endsWith('VO')) {
    return {
      classType: ClassTypes.ValueObject,
    };
  } else if (dependencyName.endsWith('Props')) {
    return {
      classType: ClassTypes.Props,
    };
  } else if (dependencyName.endsWith('Controller')) {
    return {
      classType: ClassTypes.Controller,
    };
  } else if (dependencyName.endsWith('UseCase')) {
    return {
      classType: ClassTypes.UseCase,
    };
  } else if (dependencyName.endsWith('Error')) {
    if (dependencyName.startsWith('DomainErrors'))
      return {
        classType: ClassTypes.DomainError,
      };
    else if (dependencyName.startsWith('ApplicationErrors')) {
      return {
        classType: ClassTypes.ApplicationError,
      };
    }
    throw new Error('Error class must start with DomainErrors or ApplicationErrors');
  } // TODO check Repo Adapter?
  else if (dependencyName.endsWith('PackagePort')) {
    return {
      classType: ClassTypes.Package,
    };
  } else if (dependencyName.endsWith('RepoPort')) {
    return {
      classType: ClassTypes.RepoPort,
    };
  } else if (dependencyName.endsWith('Rule')) {
    return {
      classType: ClassTypes.DomainRule,
    };
  } else if (dependencyName.endsWith('ReadModel')) {
    return {
      classType: ClassTypes.ReadModel,
    };
  } else if (dependencyName.endsWith('Command')) {
    return {
      classType: ClassTypes.Command,
    };
  } else if (dependencyName.endsWith('Query')) {
    return {
      classType: ClassTypes.Query,
    };
  } else if (dependencyName.endsWith('CommandHandler')) {
    return {
      classType: ClassTypes.Command,
    };
  } else if (dependencyName.endsWith('QueryHandler')) {
    return {
      classType: ClassTypes.Query,
    };
  } else if (dependencyName.endsWith('DomainEvent')) {
    return {
      classType: ClassTypes.DomainEvent,
    };
  } else if (dependencyName.endsWith('IntegrationEvent')) {
    return {
      classType: ClassTypes.IntegrationEvent,
    };
  } else if (dependencyName.endsWith('ServicePort')) {
    return {
      classType: ClassTypes.ServicePort,
    };
  } else if (dependencyName.charAt(0)?.toUpperCase() === dependencyName.charAt(0)) {
    return {
      classType: ClassTypes.Struct,
    };
  }

  // TODO We are not throwing because of structs
  // console.error(`Unknown class type for ${dependencyName}`)
  // throw new Error(`Unknown class type for ${dependencyName}`);
  return {
    classType: undefined,
  };
};
