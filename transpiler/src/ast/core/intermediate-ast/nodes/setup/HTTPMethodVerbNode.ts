import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class HTTPMethodVerbNode extends IntermediateASTNode {
  private static classNodeName = 'httpMethodVerb';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.THTTPMethodVerb, metadata, HTTPMethodVerbNode.classNodeName);
  }
}
