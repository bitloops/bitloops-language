// import { getBitloopsModel } from '../BitloopsParser.js';
// import { getNextTypesSubtree } from '../../utils/index.js';
// TODO implement rule declaration
export const ruleDeclaration = (subtree: any): any => {
  const value = subtree.value;
  console.log('[ruleDeclaration]:', subtree);
  console.log('value', value);
  // const domainRuleIdentifier = getNextTypesSubtree('domainRuleIdentifier', subtree);

  // console.log('domainRuleIdentifier', domainRuleIdentifier);
  // const dtoTree = getNextTypesSubtree('dtoEvaluation', subtree);
  // if (dtoTree) {
  //   value = getBitloopsModel(dtoTree);
  // }
  // return { type: 'dto', value: value };
};
