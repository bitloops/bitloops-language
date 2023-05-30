export class CasingUtils {
  static kebabCaseToCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  static kebabCaseToPascalCase(str: string): string {
    const camelCase = CasingUtils.kebabCaseToCamelCase(str);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  }

  static camelCaseToKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  static camelCaseToSnakeCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }

  static pascalCaseToCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  static pascalCaseToKebabCase(str: string): string {
    return CasingUtils.camelCaseToKebabCase(CasingUtils.pascalCaseToCamelCase(str));
  }

  static anyCaseToPascalCase(str: string): string {
    return str
      .replace(/[-_]/g, ' ') // replace hyphens and underscores with spaces
      .split(/(?=[A-Z])|\s+/) // split on uppercase (for camelCase) or spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }
}
