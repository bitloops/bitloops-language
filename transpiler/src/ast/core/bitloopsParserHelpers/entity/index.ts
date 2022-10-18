import {
  getNextTypesChildren,
  getNextTypesSubtree,
  getAllNextTypesSubtree,
} from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';
import { getConstantDeclarations, getPrivateMethodsObject } from '../domain/helpers.js';

const entityDeclaration = (subtree: any): any => {
  const entityIdentifier = getNextTypesChildren('entityIdentifier', subtree);
  const entityName = entityIdentifier[0].value;

  //TODO group this to a function for every domain declaration
  const createMethodTree = getNextTypesSubtree('domainConstructorDeclaration', subtree);
  const createMethodDeclaration = getBitloopsModel(createMethodTree);

  const privateMethodTrees = getAllNextTypesSubtree('privateMethodDeclaration', subtree);
  const privateMethodDeclarations = getPrivateMethodsObject(privateMethodTrees);

  const publicMethodTrees = getAllNextTypesSubtree('publicMethodDeclaration', subtree);
  const publicMethodDeclarations = getPrivateMethodsObject(publicMethodTrees);

  const result = {
    ...createMethodDeclaration,
    methods: { ...privateMethodDeclarations, ...publicMethodDeclarations },
  };

  const domainConstantVariablesTree = getNextTypesSubtree('domainConstDeclaration', subtree);
  if (domainConstantVariablesTree) {
    const constantVariablesTrees = getAllNextTypesSubtree(
      'constDeclaration',
      domainConstantVariablesTree,
    );
    const constantVariableDeclarations = getConstantDeclarations(constantVariablesTrees);
    result.constantVars = constantVariableDeclarations;
  }

  return {
    key: entityName,
    subModel: result,
  };
};

export { entityDeclaration };
