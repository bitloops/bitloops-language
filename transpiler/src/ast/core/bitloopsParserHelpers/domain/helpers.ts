import { getBitloopsModel } from '../../BitloopsParser.js';

const getPrivateMethodsObject = (privateMethodTrees: any) => {
  let privateMethodDeclarations = {};
  for (const privateMethodTree of privateMethodTrees) {
    const privateMethodModel = getBitloopsModel(privateMethodTree);
    privateMethodDeclarations = { ...privateMethodDeclarations, ...privateMethodModel };
  }
  return privateMethodDeclarations;
};

export { getPrivateMethodsObject };
