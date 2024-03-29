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
import { normalize } from 'path';
import {
  getLanguageFileExtension,
  isLanguageSupported,
  SupportedLanguages,
} from '../../supportedLanguages.js';
import { camelCase, pascalCase, kebabCase } from '../../../utils/caseStyles.js';
import { ClassTypes, TClassTypesValues } from '../../../helpers/mappings.js';
import { TContextData } from '../../../types.js';

const BOUNDED_CONTEXTS = 'bounded-contexts';

export const ROOT_FOLDER = 'lib'; //'lib';

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
  COMMANDS = 'commands/',
  QUERIES = 'queries/',
  QUERY_HANDLERS = 'application/query-handlers/',
  COMMAND_HANDLERS = 'application/command-handlers/',
  DOMAIN_EVENTS = 'domain/events/',
  DOMAIN_EVENT_HANDLERS = 'application/event-handlers/domain/',
  INTEGRATION_EVENTS = 'contracts/integration-events/',
  INTEGRATION_EVENT_HANDLERS = 'application/event-handlers/integration/',
  DOMAIN_SERVICE = 'domain/services/',
  INJECTION_TOKENS = '',
}

export const ClassTypesPaths: Record<TClassTypesValues, string> = {
  [ClassTypes.Props]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.ReadModel]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.RootEntity]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.Entity]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.ValueObject]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.DomainError]: PROJECT_RELATIVE_PATHS.DOMAIN_ERRORS,
  [ClassTypes.DomainRule]: PROJECT_RELATIVE_PATHS.DOMAIN_RULES,
  [ClassTypes.DTO]: PROJECT_RELATIVE_PATHS.DTOs,
  [ClassTypes.PackagePort]: PROJECT_RELATIVE_PATHS.PACKAGES,
  [ClassTypes.RepoPort]: PROJECT_RELATIVE_PATHS.PORTS,
  [ClassTypes.ApplicationError]: PROJECT_RELATIVE_PATHS.APPLICATION_ERRORS,
  [ClassTypes.Struct]: PROJECT_RELATIVE_PATHS.STRUCTS,
  [ClassTypes.Command]: PROJECT_RELATIVE_PATHS.COMMANDS,
  [ClassTypes.Query]: PROJECT_RELATIVE_PATHS.QUERIES,
  [ClassTypes.QueryHandler]: PROJECT_RELATIVE_PATHS.QUERY_HANDLERS,
  [ClassTypes.CommandHandler]: PROJECT_RELATIVE_PATHS.COMMAND_HANDLERS,
  [ClassTypes.DomainEvent]: PROJECT_RELATIVE_PATHS.DOMAIN_EVENTS,
  [ClassTypes.DomainEventHandler]: PROJECT_RELATIVE_PATHS.DOMAIN_EVENT_HANDLERS,
  [ClassTypes.IntegrationEvent]: PROJECT_RELATIVE_PATHS.INTEGRATION_EVENTS,
  [ClassTypes.IntegrationEventHandler]: PROJECT_RELATIVE_PATHS.INTEGRATION_EVENT_HANDLERS,
  [ClassTypes.ServicePort]: PROJECT_RELATIVE_PATHS.PORTS,
  [ClassTypes.DomainService]: PROJECT_RELATIVE_PATHS.DOMAIN_SERVICE,
  [ClassTypes.InjectionToken]: PROJECT_RELATIVE_PATHS.INJECTION_TOKENS,
};

const getTargetFileDestination = (
  boundedContext: string,
  moduleName: string,
  classType: TClassTypesValues,
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

  const result = {
    path: '',
    filename: '',
  };
  switch (classType) {
    case ClassTypes.RootEntity:
    case ClassTypes.Entity:
    case ClassTypes.ReadModel:
    case ClassTypes.ValueObject:
    case ClassTypes.DomainError:
    case ClassTypes.ApplicationError:
    case ClassTypes.Props:
    case ClassTypes.DTO:
    case ClassTypes.PackagePort:
    case ClassTypes.RepoPort:
    case ClassTypes.DomainRule:
    case ClassTypes.DomainEvent:
    case ClassTypes.DomainEventHandler:
    case ClassTypes.IntegrationEvent:
    case ClassTypes.IntegrationEventHandler:
    case ClassTypes.Command:
    case ClassTypes.CommandHandler:
    case ClassTypes.Query:
    case ClassTypes.QueryHandler:
    case ClassTypes.Struct:
    case ClassTypes.ServicePort:
    case ClassTypes.DomainService: {
      result.path = normalize(
        `./${ROOT_FOLDER}/${BOUNDED_CONTEXTS}/${BOUNDED_CONTEXT.kebabCase}/${MODULE.kebabCase}/${ClassTypesPaths[classType]}`,
      );
      const fileName = getTargetFileName(className, classType);
      result.filename = fileName + getLanguageFileExtension(targetLanguage);
      break;
    }
    default:
      throw new Error(`Class type ${classType} is not supported`);
  }
  return result;
};

export const getTargetFileName = (className: string, classType: TClassTypesValues): string => {
  let classNameWithoutClassType: string;
  let classTypeFileSuffix: string;
  // console.log({ className, classType });

  switch (classType) {
    case ClassTypes.ValueObject:
      classNameWithoutClassType = className.replace('VO', '');
      break;
    case ClassTypes.DomainError:
    case ClassTypes.ApplicationError:
      classNameWithoutClassType = className.replace('Error', '');
      break;
    case ClassTypes.DomainRule:
      classNameWithoutClassType = className.replace('Rule', '');
      break;
    case ClassTypes.RootEntity:
      classNameWithoutClassType = className.replace(ClassTypes.Entity, '');
      classTypeFileSuffix = kebabCase(ClassTypes.Entity);
      break;
    default:
      classNameWithoutClassType = className.replace(classType, '');
  }
  const classNameKebabCase = kebabCase(classNameWithoutClassType);
  const classTypeKebabCase = classTypeFileSuffix ?? kebabCase(classType);
  return `${classNameKebabCase}.${classTypeKebabCase}`;
};

/**
 *
 * @param packageAdapter ends with Package
 * @returns destination file name where the package adapter should be.
 * @used Used for imports of package adapters
 */
export const getPackageAdapterFileName = (packageAdapter: string): string => {
  const name = packageAdapter.replace('Package', '');
  return `${kebabCase(name)}.package`;
};

// TODO maybe this should change name and remove integrationEvent case to other function
const getFilePathRelativeToModule = (
  classType: TClassTypesValues,
  className: string,
  contextInfo?: TContextData,
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
    case ClassTypes.DTO:
    case ClassTypes.PackagePort:
    case ClassTypes.RepoPort:
    case ClassTypes.Command:
    case ClassTypes.Query:
    case ClassTypes.DomainEvent:
    case ClassTypes.DomainEventHandler:
    case ClassTypes.CommandHandler:
    case ClassTypes.QueryHandler:
    case ClassTypes.Struct:
    case ClassTypes.ServicePort:
    case ClassTypes.DomainService:
      result.path = ClassTypesPaths[classType];
      result.filename = className;
      break;
    case ClassTypes.DomainError:
    case ClassTypes.ApplicationError:
    case ClassTypes.DomainRule:
      result.path = ClassTypesPaths[classType];
      result.filename = 'index';
      break;
    case ClassTypes.IntegrationEvent:
    case ClassTypes.IntegrationEventHandler:
      if (!contextInfo) {
        result.path = ClassTypesPaths[classType];
      } else {
        result.path = `${kebabCase(contextInfo.boundedContext)}/${kebabCase(contextInfo.module)}/${
          ClassTypesPaths[classType]
        }`;
      }
      result.filename = className;
      break;
    case ClassTypes.InjectionToken:
      result.path = ClassTypesPaths[classType];
      result.filename = 'constants';
      break;
    default:
      throw new Error(`Class type ${classType} is not supported`);
  }
  result.extension = getLanguageFileExtension(targetLanguage);
  return result;
};

export { getTargetFileDestination, getFilePathRelativeToModule };
