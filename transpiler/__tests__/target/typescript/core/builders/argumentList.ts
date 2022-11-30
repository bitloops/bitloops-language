import { ArgumentListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentListNodeBuilder.js';
import { ArgumentListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { ArgumentNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentNode.js';

export class ArgumentListDirector {
  buildArgumentListWithArgs(argumentNode: ArgumentNode[]): ArgumentListNode {
    const argumentListNode = new ArgumentListNodeBuilder().withArguments(argumentNode).build();
    return argumentListNode;
  }
}
