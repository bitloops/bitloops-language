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

export class FileNameToClassName {
  static service(name: string, type: ServiceConcretion): string {
    // the fileName will be something like 'user-email.service-port.ts
    // If type === "Mock", the target result should be MockUserEmailService

    const nameWithoutPortSuffix = name.replace('-port.ts', '');
    const nameInKebabCase = nameWithoutPortSuffix.replace('.', '-');

    const nameInCamelCase = CasingUtils.kebabCaseToCamelCase(nameInKebabCase);
    return type + nameInCamelCase;
  }

  static repository(name: string, type: RepoConcretion): string {
    // the fileName will be something like 'user-write.repo-port.ts
    // (For type=Mongo), The target result should be MongoUserWriteRepository

    const nameWithoutPortSuffix = name.replace('repo-port.ts', '');
    const nameInKebabCase = nameWithoutPortSuffix.replace('.', '-');

    const nameInCamelCase = CasingUtils.kebabCaseToCamelCase(nameInKebabCase);
    return type + nameInCamelCase + 'Repository';
  }
}
