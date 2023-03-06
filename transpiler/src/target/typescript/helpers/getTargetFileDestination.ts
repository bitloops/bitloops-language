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
import { TContextData } from '../../../types.js';

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
  COMMANDS = 'application/commands',
  QUERIES = 'application/queries',
  QUERY_HANDLERS = 'application/queryHandlers',
  COMMAND_HANDLERS = 'application/commandHandlers',
  DOMAIN_EVENTS = 'domain/events/',
  DOMAIN_EVENT_HANDLERS = 'application/handlers/domain/',
  INTEGRATION_EVENTS = 'contracts/integration-events/',
  INTEGRATION_EVENT_HANDLERS = 'application/handlers/integration/',
}

const ClassTypesPaths: Record<TClassTypesValues, string> = {
  [ClassTypes.Props]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.ReadModel]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.RootEntity]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.Entity]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.ValueObject]: PROJECT_RELATIVE_PATHS.DOMAIN,
  [ClassTypes.DomainError]: PROJECT_RELATIVE_PATHS.DOMAIN_ERRORS,
  [ClassTypes.DomainRule]: PROJECT_RELATIVE_PATHS.DOMAIN_RULES,
  [ClassTypes.Controller]: PROJECT_RELATIVE_PATHS.DRIVING_ADAPTERS,
  [ClassTypes.UseCase]: PROJECT_RELATIVE_PATHS.APPLICATION,
  [ClassTypes.DTO]: PROJECT_RELATIVE_PATHS.DTOs,
  [ClassTypes.Package]: PROJECT_RELATIVE_PATHS.PACKAGES,
  [ClassTypes.RepoPort]: PROJECT_RELATIVE_PATHS.PORTS,
  [ClassTypes.ApplicationError]: PROJECT_RELATIVE_PATHS.APPLICATION_ERRORS,
  [ClassTypes.RepoAdapter]: PROJECT_RELATIVE_PATHS.REPO_ADAPTERS,
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
    case ClassTypes.DomainError:
    case ClassTypes.ApplicationError:
    case ClassTypes.Props:
    case ClassTypes.Controller:
    case ClassTypes.UseCase:
    case ClassTypes.DTO:
    case ClassTypes.Package:
    case ClassTypes.RepoPort:
    case ClassTypes.RepoAdapter:
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
      result.path = `./src/${BOUNDED_CONTEXTS}/${BOUNDED_CONTEXT.kebabCase}/${MODULE.kebabCase}/${ClassTypesPaths[classType]}`;
      result.filename = className + getLanguageFileExtension(targetLanguage);
      break;
    default:
      throw new Error(`Class type ${classType} is not supported`);
  }
  return result;
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
    case ClassTypes.Controller:
    case ClassTypes.UseCase:
    case ClassTypes.DTO:
    case ClassTypes.Package:
    case ClassTypes.RepoAdapter:
    case ClassTypes.RepoPort:
    case ClassTypes.Command:
    case ClassTypes.Query:
    case ClassTypes.DomainEvent:
    case ClassTypes.DomainEventHandler:
    case ClassTypes.CommandHandler:
    case ClassTypes.QueryHandler:
    case ClassTypes.Struct:
    case ClassTypes.ServicePort:
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
    default:
      throw new Error(`Class type ${classType} is not supported`);
  }
  result.extension = getLanguageFileExtension(targetLanguage);
  return result;
};

export { getTargetFileDestination, getFilePathRelativeToModule };
