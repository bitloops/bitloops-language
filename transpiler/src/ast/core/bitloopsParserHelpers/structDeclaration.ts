import { getBitloopsModel } from '../BitloopsParser.js';
// import { isUndefined } from '../../../helpers/typeGuards.js';

export const structDeclaration = (children: any[]): any => {
  const structIdentifier = children[1].value;
  const structFields = getBitloopsModel(children[3]);
  //console.log(structFields);
  // if (isUndefined(structFields)) {
  //   throw new Error('Fields of DTO are not defined');;
  // }
  return { key: structIdentifier, subModel: { fields: structFields } };
};
