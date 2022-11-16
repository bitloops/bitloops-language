import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { TVariable, TBitloopsPrimaryType } from '../../../types.js';
import { VariableBuilderDirector } from '../builders/VariableBuilder.js';
import { IntermediateASTNode } from './intermediateASTNode.js';

export class FieldNode extends IntermediateASTNode {
  private builderDirector: VariableBuilderDirector;
  private _value: TVariable;

  constructor(lines?: string) {
    super(BitloopsTypesMapping.TVariable, lines);
    this.builderDirector = new VariableBuilderDirector();
  }

  get value(): TVariable {
    return this._value;
  }

  public buildVariable(type: TBitloopsPrimaryType, name: string) {
    this._value = this.builderDirector.buildVariable(type, name);
  }

  public buildOptionalVariable(type: TBitloopsPrimaryType, name: string) {
    this._value = this.builderDirector.buildOptionalVariable(type, name);
  }
}
