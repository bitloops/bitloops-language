import {
  getNextTypesChildren,
  getNextTypesSubtree,
  getAllNextTypesSubtree,
} from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';

const valueObjectDeclaration = (subtree: any): any => {
  const valueObjectIdentifier = getNextTypesChildren('valueObjectIdentifier', subtree);
  const valueObjectName = valueObjectIdentifier[0].value;

  const domainConstructortree = getNextTypesSubtree('domainConstructorDeclaration', subtree);
  const domainConstructorDeclaration = getBitloopsModel(domainConstructortree);

  const privateMethodTrees = getAllNextTypesSubtree('privateMethodDeclaration', subtree);

  const privateMethodDeclarations = getPrivateMethodsObject(privateMethodTrees);
  const constantVariablesTrees = getAllNextTypesSubtree('constDeclaration', subtree);
  const constantVariableDeclarations = getConstantDeclarations(constantVariablesTrees);
  // const domainFieldTrees = getAllNextTypesSubtree('domainFieldDeclaration', subtree);
  // console.log('domainFieldTrees', domainFieldTrees);
  // const domainFieldDeclaration = getBitloopsModel(domainFieldTrees[0]);
  // console.log('domainFieldDeclaration', domainFieldDeclaration);
  return {
    key: valueObjectName,
    subModel: {
      constantVars: constantVariableDeclarations,
      ...domainConstructorDeclaration,
      methods: privateMethodDeclarations,
    },
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

const getConstantDeclarations = (constantVariablesTrees: any) => {
  const constantDeclarations = [];
  for (const constantVariablesTree of constantVariablesTrees) {
    const constantVariableModel = getBitloopsModel(constantVariablesTree);
    console.log(
      'constantVariableModel',
      constantVariableModel.constDeclaration.expression.evaluation,
    );
    constantDeclarations.push(constantVariableModel.constDeclaration);
  }
  return constantDeclarations;
};

export { valueObjectDeclaration };
