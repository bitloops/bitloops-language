export class TypeUtils {
  public static hasObjectType(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }
}
