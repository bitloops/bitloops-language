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
import { ClassTypes } from '../../../helpers/mappings.js';

const BOUNDED_CONTEXTS = 'bounded-contexts';

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
  console.log('Checking classType', classType);
  switch (classType) {
    case ClassTypes.RootEntities:
    case ClassTypes.Entities:
    case ClassTypes.ReadModels:
    case ClassTypes.ValueObjects:
      result.path = `./src/${BOUNDED_CONTEXTS}/${BOUNDED_CONTEXT.kebabCase}/${MODULE.kebabCase}/domain/`;
      result.filename = className + getLanguageFileExtension(targetLanguage);
      break;
    case ClassTypes.DomainErrors:
      result.path = `./src/${BOUNDED_CONTEXTS}/${BOUNDED_CONTEXT.kebabCase}/${MODULE.kebabCase}/domain/`;
      result.filename = 'errors' + getLanguageFileExtension(targetLanguage);
      break;
    case ClassTypes.Props:
      result.path = `./src/${BOUNDED_CONTEXTS}/${BOUNDED_CONTEXT.kebabCase}/${MODULE.kebabCase}/domain/`;
      result.filename = className + getLanguageFileExtension(targetLanguage);
      break;
    case ClassTypes.Controllers:
      result.path = `./src/${BOUNDED_CONTEXTS}/${BOUNDED_CONTEXT.kebabCase}/${MODULE.kebabCase}/driving-adapters/`;
      result.filename = className + getLanguageFileExtension(targetLanguage);
      break;
    case ClassTypes.UseCases:
      result.path = `./src/${BOUNDED_CONTEXTS}/${BOUNDED_CONTEXT.kebabCase}/${MODULE.kebabCase}/application/`;
      result.filename = className + getLanguageFileExtension(targetLanguage);
      break;
    case ClassTypes.DTOs:
      result.path = `./src/${BOUNDED_CONTEXTS}/${BOUNDED_CONTEXT.kebabCase}/${MODULE.kebabCase}/dtos/`;
      result.filename = className + getLanguageFileExtension(targetLanguage);
      break;
    case ClassTypes.Packages:
      result.path = `./src/${BOUNDED_CONTEXTS}/${BOUNDED_CONTEXT.kebabCase}/${MODULE.kebabCase}/packages`;
      result.filename = className + getLanguageFileExtension(targetLanguage);
      break;
    case ClassTypes.RepoPorts:
      result.path = `./src/${BOUNDED_CONTEXTS}/${BOUNDED_CONTEXT.kebabCase}/${MODULE.kebabCase}/domain/`;
      result.filename = className + getLanguageFileExtension(targetLanguage);
      break;
    case ClassTypes.RepoAdapters:
      result.path = `./src/${BOUNDED_CONTEXTS}/${BOUNDED_CONTEXT.kebabCase}/${MODULE.kebabCase}/infra/repos/`;
      result.filename = className + getLanguageFileExtension(targetLanguage);
      break;
    case ClassTypes.Rules:
      result.path = `./src/${BOUNDED_CONTEXTS}/${BOUNDED_CONTEXT.kebabCase}/${MODULE.kebabCase}/domain/`;
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
    case ClassTypes.ReadModels:
    case ClassTypes.RootEntities:
    case ClassTypes.ValueObjects:
      result.path = 'domain/';
      result.filename = className;
      break;
    case ClassTypes.DomainErrors:
      result.path = 'domain/';
      result.filename = 'errors';
      break;
    case ClassTypes.Controllers:
      result.path = 'driving-adapters/';
      result.filename = className;
      break;
    case ClassTypes.UseCases:
      result.path = 'application/';
      result.filename = className;
      break;
    case ClassTypes.DTOs:
      result.path = 'dtos/';
      result.filename = className;
      break;
    case ClassTypes.Packages:
      result.path = 'packages/';
      result.filename = className;
      break;
    default:
      throw new Error(`Class type ${classType} is not supported`);
  }
  result.extension = getLanguageFileExtension(targetLanguage);
  return result;
};

export { getTargetFileDestination, getFilePathRelativeToModule };
