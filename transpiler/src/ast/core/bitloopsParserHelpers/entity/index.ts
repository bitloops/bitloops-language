import {
  getNextTypesChildren,
  getNextTypesSubtree,
  getAllNextTypesSubtree,
} from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';
import { getPrivateMethodsObject } from '../domain/helpers.js';

const entityDeclaration = (subtree: any): any => {
  // const valueObjectDeclaration = getNextTypesChildren('valueObjectDeclaration', subtree);

  const entityIdentifier = getNextTypesChildren('entityIdentifier', subtree);
  console.log('entity entityIdentifier', entityIdentifier);
  const entityName = entityIdentifier[0].value;

  //TODO group this to a function for every domain declaration
  const createMethodTree = getNextTypesSubtree('domainConstructorDeclaration', subtree);
  const createMethodDeclaration = getBitloopsModel(createMethodTree);
  console.log('entity createMethodDeclaration', createMethodDeclaration);

  const privateMethodTrees = getAllNextTypesSubtree('privateMethodDeclaration', subtree);
  const privateMethodDeclarations = getPrivateMethodsObject(privateMethodTrees);
  console.log('entity privateMethodDeclarations', privateMethodDeclarations);

  const publicMethodTrees = getAllNextTypesSubtree('publicMethodDeclaration', subtree);
  const publicMethodDeclarations = getPrivateMethodsObject(publicMethodTrees);
  console.log('entity publicMethodDeclarations', publicMethodDeclarations);

  const constantVariablesTrees = getAllNextTypesSubtree('constDeclaration', subtree);
  console.log('entity constantVariablesTrees', constantVariablesTrees);
  // const constantVariableDeclarations = getConstantDeclarations(constantVariablesTrees);

  return {
    key: entityName,
    subModel: {
      // constantVars: constantVariableDeclarations,
      ...createMethodDeclaration,
      methods: { ...privateMethodDeclarations, ...publicMethodDeclarations },
    },
  };
};

export { entityDeclaration };
