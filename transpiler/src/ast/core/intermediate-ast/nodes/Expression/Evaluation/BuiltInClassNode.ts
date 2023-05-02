import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { ClassNameNode } from '../../ClassNameNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

const NAME = 'builtInClass';
export class BuiltInClassEvaluationNode extends EvaluationNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TDTOEvaluation;
    this.classNodeName = NAME;
  }

  getClassNameNode(): ClassNameNode {
    return this.getChildNodeByType<ClassNameNode>(BitloopsTypesMapping.TClassName);
  }

  getInferredType(): string {
    const classNameNode = this.getClassNameNode().getValue().className;
    return classNameNode;
  }
}
