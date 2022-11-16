import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTNode } from './intermediateASTNode.js';

export class DTOIdentifierNode extends IntermediateASTNode {
  private _value: string;

  constructor(lines?: string) {
    super(BitloopsTypesMapping.TDTOIdentifier, lines);
  }

  get value(): string {
    return this._value;
  }

  buildDTOIdentifier(identifier: string) {
    this._value = identifier;
  }
}
