import { CasingUtils } from '../../../../utils/casing.js';
import { RepoConcretion, ServiceConcretion } from './concretions.js';

const Suffixes = {
  TOKEN: 'Token',
  PORT: 'Port',
  WRITE_PORT: 'WriteRepoPort',
  READ_PORT: 'ReadRepoPort',
  SERVICE_PORT: 'ServicePort',
};

export const getNameFromToken = (str: string): string => {
  if (!str.endsWith(Suffixes.TOKEN)) throw new Error(str + ' is not a Token');

  let value = str;

  // Remove token suffix
  value = str.slice(0, -Suffixes.TOKEN.length);

  if (value.endsWith(Suffixes.PORT)) {
    return value.slice(0, -Suffixes.PORT.length);
  }
  return value;
};

export const getNameFromPort = (str: string): string => {
  if (!str.endsWith(Suffixes.PORT)) throw new Error(str + ' is not a Port');

  // Remove port suffix
  return str.slice(0, -Suffixes.PORT.length);
};
export const getPubSubHandlerNameFromIntegrationEvent = (str: string): string => {
  const initialSuffix = 'IntegrationEvent';
  const finalSuffix = 'PubSubIntegrationEventHandler';
  if (!str.endsWith(initialSuffix)) throw new Error(str + ' is not an IntegrationEvent');

  // Remove IntegrationEvent suffix
  const stripped = str.slice(0, -initialSuffix.length);

  // Add PubSubIntegrationEventHandler suffix

  return stripped + finalSuffix;
};

export class FileNameToClassName {
  static service(name: string, type: ServiceConcretion): string {
    // the fileName will be something like 'user-email.service-port.ts
    // If type === "Mock", the target result should be MockUserEmailService

    const nameWithoutPortSuffix = name.replace('.service-port.ts', '');

    const nameInCamelCase = CasingUtils.kebabCaseToPascalCase(nameWithoutPortSuffix);
    return type + nameInCamelCase + 'Service';
  }

  static repository(name: string, type: RepoConcretion): string {
    // the fileName will be something like 'user-write.repo-port.ts
    // (For type=Mongo), The target result should be MongoUserWriteRepository

    const nameWithoutPortSuffix = name.replace('.repo-port.ts', '');

    const nameInCamelCase = CasingUtils.kebabCaseToPascalCase(nameWithoutPortSuffix);
    return type + nameInCamelCase + 'Repository';
  }

  /**
   * @param name: e.g. todo-modified-title.integration-event.ts
   * @Returns TodoModifiedTitleIntegrationEvent
   */
  static integrationEvent(name: string): string {
    const nameWithoutSuffix = name.replace('.integration-event.ts', '');

    const nameInCamelCase = CasingUtils.kebabCaseToPascalCase(nameWithoutSuffix);
    return nameInCamelCase + 'IntegrationEvent';
  }
}

export class ClassNameToTargetFileName {
  /**
   * @name - e.g. UserAddedPubSubIntegrationEventHandler
   */
  static pubsubHandler(name: string): string {
    const suffix = 'PubSubIntegrationEventHandler';

    const nameWithoutSuffix = name.replace(suffix, '');

    const nameInKebabCase = CasingUtils.pascalCaseToKebabCase(nameWithoutSuffix);
    return `${nameInKebabCase}.integration-handler.ts`;
  }

  /**
   * TBI
   * @param name - e.g. MongoUserWriteRepository
   */
  static repository(name: string): string {
    const suffix = 'Repository';

    // Replace last occurrence of suffix
    const lastIndex = name.lastIndexOf(suffix);
    const nameWithoutSuffix = name.slice(0, lastIndex);

    const nameInKebabCase = CasingUtils.pascalCaseToKebabCase(nameWithoutSuffix);
    return `${nameInKebabCase}.repository.ts`;
  }

  static service(name: string): string {
    const suffix = 'Service';

    const lastIndex = name.lastIndexOf(suffix);
    const nameWithoutSuffix = name.slice(0, lastIndex);

    const nameInKebabCase = CasingUtils.pascalCaseToKebabCase(nameWithoutSuffix);
    return `${nameInKebabCase}.service.ts`;
  }
}
