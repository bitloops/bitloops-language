import { IntermediateASTNode } from './intermediateASTNode.js';

export class IdentifierNode extends IntermediateASTNode {
  private _value: string;

  get value(): string {
    return this._value;
  }

  buildIdentifier(identifier: string) {
    this._value = identifier;
  }
}
