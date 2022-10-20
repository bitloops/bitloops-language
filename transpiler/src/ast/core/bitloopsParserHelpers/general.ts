import { getBitloopsModel } from '../BitloopsParser.js';

export const typeAnnotation = (children: any) => {
  return {
    type: children[1].value,
    typeAnnotation: children[0].value,
  };
};

export const expression = (children: any[]) => {
  return getBitloopsModel(children[0]);
};

export const evaluation = (children: any[]) => {
  return getBitloopsModel(children[0]);
};
