import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

export class DTOIdentifierNode extends IntermediateASTNode {
  // private _value: string;
  public readonly NAME = 'DTOIdentifier';

  constructor(name: string, lines?: string) {
    super(BitloopsTypesMapping.TDTOIdentifier, lines);
    this.setName(this.NAME);
    this.setValue(name);
  }

  // get value(): string {
  //   return this._value;
  // }

  // setValue(identifier: string) {
  //   this._value = identifier;
  // }
}
