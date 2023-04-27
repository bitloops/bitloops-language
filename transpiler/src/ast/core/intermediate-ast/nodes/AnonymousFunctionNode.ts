import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ArrowFunctionBodyNode } from './ArrowFunctionBodyNode.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';

export class AnonymousFunctionNode extends IntermediateASTNode {
  private static classNodeName = 'anonymousFunction';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TAnonymousFunction, metadata, AnonymousFunctionNode.classNodeName);
  }

  getArrowFunctionBody(): ArrowFunctionBodyNode {
    return this.getChildNodeByType<ArrowFunctionBodyNode>(BitloopsTypesMapping.TArrowFunctionBody);
  }
}
