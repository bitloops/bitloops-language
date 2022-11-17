import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { TVariables } from '../../../types.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

export class FieldListNode extends IntermediateASTNode {
  private _value: TVariables;

  constructor(lines?: string) {
    super(BitloopsTypesMapping.TVariables, lines);
  }

  get value(): TVariables {
    return this._value;
  }

  public setValue(variables: TVariables) {
    this._value = variables;
  }
}
