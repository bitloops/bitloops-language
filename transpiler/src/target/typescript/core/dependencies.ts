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
import { isBitloopsPrimitive } from '../../../helpers/isBitloopsPrimitive.js';
import { ClassTypes, TClassTypesValues } from '../../../helpers/mappings.js';
import { TDependencyChildTypescript, TDependencyParentTypescript } from '../../../types.js';
import { getFilePathRelativeToModule } from '../helpers/getTargetFileDestination.js';
import { findRelativeDiffForImport } from '../utils/findRelativeDiff.js';

export const getParentDependencies = (
  dependencies: TDependencyChildTypescript[],
  { classType, className }: { classType: TClassTypesValues; className: string },
): TDependencyParentTypescript[] => {
  const parentPathObj = getFilePathRelativeToModule(classType, className);
  const parentPath = parentPathObj.path;
  const parentDependecies: TDependencyParentTypescript[] = [];
  for (const dependency of dependencies) {
    const { type, value, classType, className } = dependency;
    const childPathObj = getFilePathRelativeToModule(classType, className);
    const childPath = childPathObj.path;
    const importString = findRelativeDiffForImport(parentPath, childPath, className);
    parentDependecies.push({
      type,
      default: dependency.default,
      value,
      from: importString,
    });
  }
  return parentDependecies;
};

export const getChildDependencies = (args: string | string[]): TDependencyChildTypescript[] => {
  let dependencyStrings = args;
  if (typeof args === 'string') {
    dependencyStrings = [args];
  }

  const result: TDependencyChildTypescript[] = [];
  for (const dependencyString of dependencyStrings) {
    // for void etc
    if (isBitloopsPrimitive(dependencyString)) {
      continue;
    }
    const { classType } = getClassTypeFromIdentifier(dependencyString);
    result.push({
      type: 'relative',
      default: false,
      value: dependencyString,
      classType,
      className: dependencyString, // If file name is different from class name, this will be changed
    });
  }
  return result;
};

const getClassTypeFromIdentifier = (
  dependencyName: string,
): {
  classType: TClassTypesValues;
} => {
  if (dependencyName.endsWith('DTO')) {
    return {
      classType: ClassTypes.DTOs,
    };
  } else if (dependencyName.endsWith('Entity')) {
    return {
      classType: ClassTypes.Entities,
    };
  } else if (dependencyName.endsWith('VO')) {
    return {
      classType: ClassTypes.ValueObjects,
    };
  } else if (dependencyName.endsWith('Props')) {
    return {
      classType: ClassTypes.Props,
    };
  } else if (dependencyName.endsWith('Controller')) {
    return {
      classType: ClassTypes.Controllers,
    };
  } else if (dependencyName.endsWith('UseCase')) {
    return {
      classType: ClassTypes.UseCases,
    };
  } else if (dependencyName.endsWith('Error')) {
    if (dependencyName.startsWith('DomainErrors'))
      return {
        classType: ClassTypes.DomainErrors,
      };
    else if (dependencyName.startsWith('ApplicationErrors')) {
      return {
        classType: ClassTypes.ApplicationErrors,
      };
    }
    throw new Error('Error class must start with DomainErrors or ApplicationErrors');
  } // TODO check Repo Adapter?
  else if (dependencyName.endsWith('PackagePort')) {
    return {
      classType: ClassTypes.Packages,
    };
  } else if (dependencyName.endsWith('RepoPort')) {
    return {
      classType: ClassTypes.RepoPorts,
    };
  } else if (dependencyName.endsWith('Rule')) {
    return {
      classType: ClassTypes.Rules,
    };
  } else if (dependencyName.endsWith('ReadModel')) {
    return {
      classType: ClassTypes.ReadModels,
    };
  }
  //  else if (dependencyName.charAt(0)?.toUpperCase() === dependencyName.charAt(0)) {
  //   return {
  //     classType: ClassTypes.Structs,
  //   };
  // }

  throw new Error(`Unknown class type for ${dependencyName}`);
};
