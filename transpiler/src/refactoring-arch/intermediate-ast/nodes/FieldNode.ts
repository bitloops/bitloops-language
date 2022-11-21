import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
// import { TVariable } from '../../../types.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

export class FieldNode extends IntermediateASTNode {
  // private _value: TVariable;
  public readonly NAME = 'field';

  constructor(lines?: string) {
    super(BitloopsTypesMapping.TVariable, lines);
    // this.setValue(name);
    this.setName(this.NAME);
  }

  // get value(): TVariable {
  //   return this._value;
  // }

  // public setValue({ type, name, optional }: TVariable) {
  //   const variable: TVariable = {
  //     name,
  //     type,
  //   };
  //   if (optional) {
  //     variable.optional = optional;
  //   }
  //   this._value = variable;
  // }
}
