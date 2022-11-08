import { BitloopsPrimTypeIdentifiers } from './../core/type-identifiers/bitloopsPrimType.js';
import { TBitloopsPrimaryType } from '../../../types.js';

export const extractBaseTypeOfPrimaryType = (primaryType: TBitloopsPrimaryType): string => {
  if (BitloopsPrimTypeIdentifiers.isArrayPrimType(primaryType)) {
    const { value } = primaryType.arrayType;
    return extractBaseTypeOfPrimaryType(value);
  }

  return primaryType;
};
