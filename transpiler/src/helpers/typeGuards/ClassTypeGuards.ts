export class ClassTypeGuards {
  static isVO(name: string): boolean {
    return name.endsWith('VO');
  }

  static isEntity(name: string): boolean {
    return name.endsWith('Entity');
  }

  static isProps(name: string): boolean {
    return name.endsWith('Props');
  }

  static isRepoPort(name: string): boolean {
    return name.endsWith('RepoPort');
  }

  static isDTO(name: string): boolean {
    return name.endsWith('DTO');
  }

  static isPackagePort(name: string): boolean {
    return name.endsWith('PackagePort');
  }

  static isDomainRule(name: string): boolean {
    return name.endsWith('Rule');
  }

  static isCommand(name: string): boolean {
    return name.endsWith('Command');
  }

  static isQuery(name: string): boolean {
    return name.endsWith('Query');
  }

  static isCommandHandler(name: string): boolean {
    return name.endsWith('CommandHandler');
  }

  static isQueryHandler(name: string): boolean {
    return name.endsWith('QueryHandler');
  }

  static isReadModel(name: string): boolean {
    return name.endsWith('ReadModel');
  }

  static isDomainEvent(name: string): boolean {
    return name.endsWith('DomainEvent');
  }

  static isIntegrationEvent(name: string): boolean {
    return name.endsWith('IntegrationEvent');
  }

  static isServicePort(name: string): boolean {
    return name.endsWith('ServicePort');
  }

  static isDomainService(name: string): boolean {
    return name.endsWith('DomainService');
  }

  static isStruct(name: string): boolean {
    return name.charAt(0)?.toUpperCase() === name.charAt(0);
  }

  static isInjectionToken(name: string): boolean {
    return name.endsWith('Token');
  }

  static isDomainError(name: string): boolean {
    return name.endsWith('Error') && name.startsWith('DomainErrors');
  }

  static isApplicationError(name: string): boolean {
    return name.endsWith('Error') && name.startsWith('ApplicationErrors');
  }
}
