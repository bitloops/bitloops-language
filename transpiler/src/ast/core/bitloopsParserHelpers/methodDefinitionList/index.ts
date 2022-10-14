import { getNextTypesChildren } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';

export const methodDefinitionList = (subtree: any): any => {
  let definitionMethods = {};
  const methodDefinitionListChildren = getNextTypesChildren('methodDefinitionList', subtree);
  if (!methodDefinitionListChildren) {
    return {
      definitionMethods,
    };
  }

  for (const method of methodDefinitionListChildren) {
    const methodDefinition = getBitloopsModel(method);
    definitionMethods = {
      ...definitionMethods,
      ...methodDefinition,
    };
  }

  return {
    definitionMethods,
  };
};
