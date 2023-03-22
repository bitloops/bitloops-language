import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class SwitchCasesNode extends IntermediateASTNode {
  private static classNodeName = 'cases';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TSwitchCases, metadata, SwitchCasesNode.classNodeName);
  }
}
