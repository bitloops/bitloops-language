import { getBitloopsModel } from '../../BitloopsParser.js';

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
    // console.log(
    //   'constantVariableModel',
    //   constantVariableModel.constDeclaration.expression.evaluation,
    // );
    constantDeclarations.push(constantVariableModel.constDeclaration);
  }
  return constantDeclarations;
};

export { getPrivateMethodsObject, getConstantDeclarations };
