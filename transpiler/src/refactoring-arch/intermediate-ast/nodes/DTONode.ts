import { TDTO, TVariables } from '../../../types.js';
import { DTOBuilder } from '../builders/DTO.js';
import { IntermediateASTNode } from './intermediateASTNode.js';

export class DTONode extends IntermediateASTNode {
  private builder: DTOBuilder;
  private _value: TDTO;

  constructor() {
    super();
    this.builder = new DTOBuilder();
  }

  get value(): TDTO {
    return this._value;
  }

  public buildDTO(identifier: string, fields: TVariables) {
    this._value = this.builder.withIdentifier(identifier).withVariables(fields).build();
  }
}
