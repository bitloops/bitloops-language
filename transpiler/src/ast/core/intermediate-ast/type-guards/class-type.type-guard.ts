import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ClassTypeNode } from '../nodes/ClassTypeNode.js';
import { CommandHandlerNode } from '../nodes/command/CommandHandlerNode.js';

export class ClassTypeNodeTypeGuards {
  static isCommandHandler(node: ClassTypeNode): node is CommandHandlerNode {
    return node.getNodeType() === BitloopsTypesMapping.TCommandHandler;
  }
}
