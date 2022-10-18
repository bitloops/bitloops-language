import {
  getNextTypesChildren,
  getNextTypesSubtree,
  getAllNextTypesSubtree,
} from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';
import { getConstantDeclarations } from '../domain/helpers.js';

const valueObjectDeclaration = (subtree: any): any => {
  const valueObjectIdentifier = getNextTypesChildren('valueObjectIdentifier', subtree);
  const valueObjectName = valueObjectIdentifier[0].value;

  const domainConstructortree = getNextTypesSubtree('domainConstructorDeclaration', subtree);
  const domainConstructorDeclaration = getBitloopsModel(domainConstructortree);

  const privateMethodTrees = getAllNextTypesSubtree('privateMethodDeclaration', subtree);

  const privateMethodDeclarations = getPrivateMethodsObject(privateMethodTrees);

  const result = {
    ...domainConstructorDeclaration,
    methods: privateMethodDeclarations,
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
    key: valueObjectName,
    subModel: result,
  };
};

const getPrivateMethodsObject = (privateMethodTrees: any) => {
  let privateMethodDeclarations = {};
  for (const privateMethodTree of privateMethodTrees) {
    const privateMethodModel = getBitloopsModel(privateMethodTree);
    privateMethodDeclarations = { ...privateMethodDeclarations, ...privateMethodModel };
  }
  return privateMethodDeclarations;
};

export { valueObjectDeclaration };
