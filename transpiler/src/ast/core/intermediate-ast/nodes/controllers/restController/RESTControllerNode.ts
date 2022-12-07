import { BitloopsTypesMapping, ClassTypes } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ControllerNode } from '../ControllerNode.js';

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
}
