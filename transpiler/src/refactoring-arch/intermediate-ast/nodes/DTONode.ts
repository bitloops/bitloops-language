import { BitloopsTypesMapping, ClassTypes } from '../../../helpers/mappings.js';
// import { TDTO, TVariables } from '../../../types.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

export class DTONode extends IntermediateASTNode {
  // private _value: TDTO;
  public readonly NAME = 'DTO';

  constructor(lines?: string) {
    super(BitloopsTypesMapping.TDTO, lines);
    this.setName(this.NAME);
    this.setClassType(ClassTypes.DTOs);
  }

  // get value(): TDTO {
  //   return this._value;
  // }

  // public setValue(identifier: string, fields: TVariables) {
  //   this._value = {
  //     [identifier]: {
  //       fields: fields,
  //     },
  //   };
  // }
}
