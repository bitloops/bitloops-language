import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TBitloopsBuiltInClasses, bitloopsPrimaryTypeKey } from '../../../../../types.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';

export class BuiltInClassTypeNode extends BitloopsPrimaryTypeNode {
  private static buildInClassNodeName = 'builtInClassType';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = BuiltInClassTypeNode.buildInClassNodeName;
    this.nodeType = BitloopsTypesMapping.TBitloopsBuiltInClasses;
  }

  public getInferredType(): string {
    const builtInClassType = (this.getValue() as TBitloopsBuiltInClasses)[bitloopsPrimaryTypeKey];
    return builtInClassType;
  }
}
