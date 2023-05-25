import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ArrowFunctionBodyNode } from './ArrowFunctionBodyNode.js';
import { ExpressionNode } from './Expression/ExpressionNode.js';
import { TNodeMetadata } from './IntermediateASTNode.js';
import { ParameterListNode } from './ParameterList/ParameterListNode.js';
import { ParameterNode } from './ParameterList/ParameterNode.js';

const classNodeName = 'anonymousFunction';
export class AnonymousFunctionNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = classNodeName;
    this.nodeType = BitloopsTypesMapping.TAnonymousFunction;
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
