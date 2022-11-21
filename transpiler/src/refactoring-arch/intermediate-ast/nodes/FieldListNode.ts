import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

export class FieldListNode extends IntermediateASTNode {
  // private _value: TVariables;
  public readonly NAME = 'fieldList';

  constructor(lines?: string) {
    super(BitloopsTypesMapping.TVariables, lines);
    this.setName(this.NAME);
  }

  // get value(): TVariables {
  //   return this._value;
  // }

  // public buildValue() {
  //   const children = this.getChildren();
  //   children.forEach((child) => {
  //     this.value.push(child.value);
  //   });
  // }
}
