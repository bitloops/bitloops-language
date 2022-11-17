import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

export class DTOIdentifierNode extends IntermediateASTNode {
  private _value: string;

  constructor(lines?: string) {
    super(BitloopsTypesMapping.TDTOIdentifier, lines);
  }

  get value(): string {
    return this._value;
  }

  setValue(identifier: string) {
    this._value = identifier;
  }
}
