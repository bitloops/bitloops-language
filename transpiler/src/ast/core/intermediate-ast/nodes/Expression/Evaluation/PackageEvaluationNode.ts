import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class PackageEvaluationNode extends EvaluationNode {
  private static nodeName = 'packageEvaluation';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TPackageEvaluation;
    this.classNodeName = PackageEvaluationNode.nodeName;
  }
}
