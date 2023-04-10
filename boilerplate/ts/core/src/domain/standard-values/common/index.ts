const STANDARD_BL_ERROR_PREFIX = 'BL';
const STANDARD_VALUE_ERROR_PREFIX = 'SV';
const DELIMITER = '_';

export class StandardErrorUtils {
  public static getBLStandardValueError(errorId: string) {
    return `${StandardErrorUtils.getBLStandardValueErrorPrefix()}${errorId}`;
  }

  private static getStandardBLErrorPrefix() {
    return `${STANDARD_BL_ERROR_PREFIX}${DELIMITER}`;
  }

  private static getBLStandardValueErrorPrefix() {
    return `${StandardErrorUtils.getStandardBLErrorPrefix()}${STANDARD_VALUE_ERROR_PREFIX}${DELIMITER}`;
  }
}
