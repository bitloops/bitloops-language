import { TRepoSupportedTypes } from '../../../../types.js';
import { StringUtils } from '../../../../utils/StringUtils.js';

export const getRepoAdapterClassName = (repoPort: string, dbType: TRepoSupportedTypes): string => {
  return `${repoPort}${StringUtils.upperCaseFirstLetter(dbType)}Adapter`;
};
