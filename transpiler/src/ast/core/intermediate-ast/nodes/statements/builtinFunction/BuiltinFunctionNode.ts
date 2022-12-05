import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { StatementNode } from '../Statement.js';

export class BuiltInFunctionNode extends StatementNode {
  private static classNodeName = 'builtInFunction';
  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TBuildInFunction, metadata, BuiltInFunctionNode.classNodeName);
  }
}
