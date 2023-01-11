import { BitloopsTypesMapping, ClassTypes } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ControllerNode } from '../ControllerNode.js';
import { RESTControllerIdentifierNode } from './RESTControllerIdentifierNode.js';

export class RESTControllerNode extends ControllerNode {
  private static classNodeName = 'RESTController';
  constructor(metadata?: TNodeMetadata) {
    super({
      classType: ClassTypes.Controller,
      nodeType: BitloopsTypesMapping.TRESTController,
      metadata,
      classNodeName: RESTControllerNode.classNodeName,
    });
  }

  public getIdentifier(): RESTControllerIdentifierNode {
    const restServerIdentifier = this.getChildNodeByType(
      BitloopsTypesMapping.TRESTControllerIdentifier,
    ) as RESTControllerIdentifierNode;
    return restServerIdentifier;
  }
}
