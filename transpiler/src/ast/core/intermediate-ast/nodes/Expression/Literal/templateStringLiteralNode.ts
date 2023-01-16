import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { LiteralNode } from './LiteralNode.js';

const NAME = 'templateStringLiteral';
export class TemplateStringLiteralNode extends LiteralNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TTemplateStringLiteral;
    this.classNodeName = NAME;
  }
}
