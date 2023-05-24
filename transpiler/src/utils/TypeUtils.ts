export class TypeUtils {
  public static hasObjectType(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  public static hasArrayType(value: any): boolean {
    return Array.isArray(value);
  }

  public static isString(value: any): value is string {
    return typeof value === 'string';
  }
}
