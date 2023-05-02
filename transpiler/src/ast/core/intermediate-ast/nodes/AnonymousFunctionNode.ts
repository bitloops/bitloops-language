import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ArrowFunctionBodyNode } from './ArrowFunctionBodyNode.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';
import { ParameterListNode } from './ParameterList/ParameterListNode.js';
import { ParameterNode } from './ParameterList/ParameterNode.js';

export class AnonymousFunctionNode extends IntermediateASTNode {
  private static classNodeName = 'anonymousFunction';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TAnonymousFunction, metadata, AnonymousFunctionNode.classNodeName);
  }

  getArrowFunctionBody(): ArrowFunctionBodyNode {
    return this.getChildNodeByType<ArrowFunctionBodyNode>(BitloopsTypesMapping.TArrowFunctionBody);
  }

  getParameters(): ParameterNode[] {
    const parameterListNode = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    if (!parameterListNode) {
      return [];
    }
    return parameterListNode.getParameters();
  }
}
