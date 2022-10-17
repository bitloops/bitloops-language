import { getNextTypesChildren, getNextTypesSubtree, getNextTypesValue } from '../../utils/index.js';
import { TRepoPort } from '../../../types.js';
import { getBitloopsModel } from '../BitloopsParser.js';

const repoPortDeclaration = (subtree: any): { key: string; subModel: TRepoPort } => {
  const repoPortName = getNextTypesValue('repoPortIdentifier', subtree);
  const repoPortExtendableIdentifierList = getNextTypesChildren(
    'repoPortExtendableIdentifierList',
    subtree,
  );
  const extendedRepoPorts = repoPortExtendableIdentifierList
    .filter((listItem) => listItem !== 'repoPortExtendableIdentifier')
    .map((listItem) => listItem.value); // TODO Handle Identifier with < > if we want to extend a repoPort with a generic type

  const methodsTree = getNextTypesSubtree('methodDefinitionList', subtree);

  let definitionMethods = {};
  if (methodsTree) {
    const methods = getBitloopsModel(methodsTree);
    definitionMethods = methods.definitionMethods;
  }
  const subModel: TRepoPort = {
    aggregateRootName: getNextTypesValue('aggregateRootIdentifier', subtree),
    extendedRepoPorts,
    // TODO definitions

    definitionMethods,
  };

  return {
    key: repoPortName,
    subModel,
  };
};

export { repoPortDeclaration };
