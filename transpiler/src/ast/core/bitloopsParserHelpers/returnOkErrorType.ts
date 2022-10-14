import { getNextTypesChildren, getNextTypesSubtree, getNextTypesValue } from '../../utils/index.js';

export const returnOkErrorType = (subtree: any): any => {
  const okTree = getNextTypesSubtree('returnOkType', subtree);
  const errorTree = getNextTypesSubtree('returnErrorsType', subtree);

  const ok = buildOk(okTree);

  const errors = getNextTypesChildren('errorIdentifiers', errorTree)
    ? getNextTypesChildren('errorIdentifiers', errorTree)
        .filter((child: any) => child.type === 'errorIdentifier')
        .map((child: any) => child.value)
    : [];
  return { ok, errors };
};

const buildOk = (tree: any): any => {
  const blsIdentifier = getNextTypesValue('bitloopsIdentifiers', tree);
  const primitive = getNextTypesValue('unionOrIntersectionOrPrimaryType', tree);

  let ok;
  if (blsIdentifier) {
    ok = blsIdentifier;
  } else if (primitive) {
    ok = primitive;
  } else {
    throw new Error('Return ok type must be primitive or bitloops identifier');
  }
  return ok;
};
