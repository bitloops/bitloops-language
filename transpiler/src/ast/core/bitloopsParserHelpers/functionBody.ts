import { getBitloopsModel, TSourceElementContext } from '../BitloopsParser.js';

export const functionBody = (children: any[], contextSourceElement?: TSourceElementContext) => {
  if (children) {
    return getBitloopsModel(children[0], contextSourceElement);
  } else return null;
};
