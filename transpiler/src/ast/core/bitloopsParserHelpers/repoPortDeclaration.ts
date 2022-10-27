import { getNextTypesChildren, getNextTypesSubtree, getNextTypesValue } from '../../utils/index.js';
import {
  TAggregateRepoPort,
  TDefinitionMethods,
  TReadModelRepoPort,
  TRepoPort,
} from '../../../types.js';
import { getBitloopsModel } from '../BitloopsParser.js';

const repoPortDeclaration = (subtree: any): { key: string; subModel: TRepoPort } => {
  const repoPortName = getNextTypesValue('repoPortIdentifier', subtree);
  const repoPortExtendableIdentifierList = getNextTypesChildren(
    'repoPortExtendableIdentifierList',
    subtree,
  );
  const extendedRepoPorts: string[] = repoPortExtendableIdentifierList
    .filter((listItem) => listItem !== 'repoPortExtendableIdentifier')
    .map((listItem) => listItem.value); // TODO Handle Identifier with < > if we want to extend a repoPort with a generic type

  const methodsTree = getNextTypesSubtree('methodDefinitionList', subtree);

  let definitionMethods: TDefinitionMethods;
  if (methodsTree) {
    const methods = getBitloopsModel(methodsTree);
    definitionMethods = methods.definitionMethods;
  }

  let subModel: TRepoPort;

  const aggregateRootName: string = getNextTypesValue('aggregateRootIdentifier', subtree);
  const readModelName = getNextTypesValue('ReadModelIdentifier', subtree);
  console.log('aggregateRootName', aggregateRootName);
  console.log('readModelName', readModelName);

  if (aggregateRootName) {
    const subModelAggregate: TAggregateRepoPort = {
      extendedRepoPorts,
      definitionMethods,
      aggregateRootName,
    };
    subModel = subModelAggregate;
  } else if (readModelName) {
    const subModelReadModel: TReadModelRepoPort = {
      extendedRepoPorts,
      definitionMethods,
      readModelName,
    };
    subModel = subModelReadModel;
  }

  return {
    key: repoPortName,
    subModel,
  };
};

export { repoPortDeclaration };
