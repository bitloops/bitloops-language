import { getNextTypesSubtree, getNextTypesChildren } from '../../utils/index.js';
import { getBitloopsModel } from '../BitloopsParser.js';

const packagePortDeclaration = (subtree: any): any => {
  const packagePortIdentifier = getNextTypesChildren('packagePortIdentifier', subtree);
  const packagePortName = packagePortIdentifier[0].value;
  const packageName = packagePortName.replace('Port', '');
  const methodsTree = getNextTypesSubtree('methodDefinitionList', subtree);
  const methods = getBitloopsModel(methodsTree);

  return {
    key: packageName,
    subModel: {
      port: {
        name: packagePortName,
        ...methods,
      },
      adapters: [],
    },
  };
};

export { packagePortDeclaration };
