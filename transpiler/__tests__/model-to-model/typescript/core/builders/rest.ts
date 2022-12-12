import { RESTControllerNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTControllerNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { RESTControllerNode } from '../../../../../src/ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';

export class RestControllerBuilderDirector {
  buildRestControllerWithThisUseCaseExecute(): RESTControllerNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    return new RESTControllerNodeBuilder(tree).build();
  }
}
