import { getBitloopsModel, TSourceElementContext } from '../BitloopsParser.js';

export const statement = (children: any[], contextSourceElement?: TSourceElementContext) => {
  return getBitloopsModel(children[0], contextSourceElement);
};
