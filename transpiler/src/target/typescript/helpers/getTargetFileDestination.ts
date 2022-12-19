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
import {
  getLanguageFileExtension,
  isLanguageSupported,
  SupportedLanguages,
} from '../../supportedLanguages.js';
import { camelCase, pascalCase, kebabCase } from '../../../utils/caseStyles.js';
import { ClassTypes, TClassTypesValues } from '../../../helpers/mappings.js';

const BOUNDED_CONTEXTS = 'bounded-contexts';

enum PROJECT_RELATIVE_PATHS {
  DOMAIN = 'domain/',
  DOMAIN_ERRORS = 'domain/errors/',
  APPLICATION_ERRORS = 'application/errors/',
  DRIVING_ADAPTERS = 'driving-adapters/',
  APPLICATION = 'application/',
  DTOs = 'dtos/',
  PACKAGES = 'packages/',
  REPO_ADAPTERS = 'repos/concretions',
  DOMAIN_RULES = 'domain/rules/',
  PORTS = 'ports/',
  STRUCTS = 'structs/',
}

const ClassTypesPaths: Record<TClassTypesValues, string> = {
  [ClassTypes.Props]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.ReadModel]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.RootEntity]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.Entity]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.ValueObject]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.DomainErrors]: PROJECT_RELATIVE_PATHS.DOMAIN_ERRORS,
  [ClassTypes.DomainRule]: PROJECT_RELATIVE_PATHS.DOMAIN_RULES,
  [ClassTypes.Controller]: PROJECT_RELATIVE_PATHS.DRIVING_ADAPTERS,
  [ClassTypes.UseCases]: PROJECT_RELATIVE_PATHS.APPLICATION,
  [ClassTypes.DTOs]: PROJECT_RELATIVE_PATHS.DTOs,
  [ClassTypes.Package]: PROJECT_RELATIVE_PATHS.PACKAGES,
  [ClassTypes.RepoPort]: PROJECT_RELATIVE_PATHS.PORTS,
  [ClassTypes.ApplicationError]: PROJECT_RELATIVE_PATHS.APPLICATION_ERRORS,
  [ClassTypes.RepoAdapters]: PROJECT_RELATIVE_PATHS.REPO_ADAPTERS,
  [ClassTypes.Struct]: PROJECT_RELATIVE_PATHS.STRUCTS,
};

const getTargetFileDestination = (
  boundedContext: string,
  moduleName: string,
  classType: string,
  className: string,
  targetLanguage = SupportedLanguages.TypeScript as string,
): { path: string; filename: string } => {
  if (!boundedContext || boundedContext.trim() === '') {
    throw new Error('Bounded context is required');
  }
  if (!moduleName || moduleName.trim() === '') {
    throw new Error('Module is required');
  }
  if (!isLanguageSupported(targetLanguage)) {
    throw new Error(`Language ${targetLanguage} is not supported`);
  }
  const BOUNDED_CONTEXT = {
    name: boundedContext,
    pascalCase: pascalCase(boundedContext),
    camelCase: camelCase(boundedContext),
    kebabCase: kebabCase(boundedContext),
  };
  const MODULE = {
    name: moduleName,
    pascalCase: pascalCase(moduleName),
    camelCase: camelCase(moduleName),
    kebabCase: kebabCase(moduleName),
  };
  // const USE_CASE = {
  //   name: useCase,
  //   pascalCase: useCase ? pascalCase(useCase) : undefined,
  //   camelCase: useCase ? camelCase(useCase) : undefined,
  //   kebabCase: useCase ? kebabCase(useCase) : undefined,
  // };
  const result = {
    path: '',
    filename: '',
  };
  // console.log('Checking classType', classType);
  switch (classType) {
    case ClassTypes.RootEntity:
    case ClassTypes.Entity:
    case ClassTypes.ReadModel:
    case ClassTypes.ValueObject:
    case ClassTypes.DomainErrors:
    case ClassTypes.ApplicationError:
    case ClassTypes.Props:
    case ClassTypes.Controller:
    case ClassTypes.UseCases:
    case ClassTypes.DTOs:
    case ClassTypes.Package:
    case ClassTypes.RepoPort:
    case ClassTypes.RepoAdapters:
    case ClassTypes.DomainRule:
      result.path = `./src/${BOUNDED_CONTEXTS}/${BOUNDED_CONTEXT.kebabCase}/${MODULE.kebabCase}/${ClassTypesPaths[classType]}`;
      result.filename = className + getLanguageFileExtension(targetLanguage);
      break;
    default:
      throw new Error(`Class type ${classType} is not supported`);
  }
  return result;
};

const getFilePathRelativeToModule = (
  classType: string,
  className: string,
  targetLanguage = SupportedLanguages.TypeScript as string,
): { path: string; filename: string; extension: string } => {
  const result = {
    path: '',
    filename: '',
    extension: '',
  };
  switch (classType) {
    case ClassTypes.Props:
    case ClassTypes.ReadModel:
    case ClassTypes.RootEntity:
    case ClassTypes.Entity:
    case ClassTypes.ValueObject:
    case ClassTypes.Controller:
    case ClassTypes.UseCases:
    case ClassTypes.DTOs:
    case ClassTypes.Package:
    case ClassTypes.RepoAdapters:
    case ClassTypes.RepoPort:
      result.path = ClassTypesPaths[classType];
      result.filename = className;
      break;
    case ClassTypes.DomainErrors:
    case ClassTypes.ApplicationError:
    case ClassTypes.DomainRule:
      result.path = ClassTypesPaths[classType];
      result.filename = 'index';
      break;
    default:
      throw new Error(`Class type ${classType} is not supported`);
  }
  result.extension = getLanguageFileExtension(targetLanguage);
  return result;
};

export { getTargetFileDestination, getFilePathRelativeToModule };
