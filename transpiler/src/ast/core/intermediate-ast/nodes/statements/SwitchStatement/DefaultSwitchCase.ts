import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class DefaultSwitchCaseNode extends IntermediateASTNode {
  private static classNodeName = 'defaultCase';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDefaultCase, metadata, DefaultSwitchCaseNode.classNodeName);
  }
}
