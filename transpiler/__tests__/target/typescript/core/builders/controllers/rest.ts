import { RESTControllerExecuteDependenciesNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTControllerDependenciesNodeBuilder.js';
import { RESTControllerExecuteNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTControllerExecuteNodeBuilder.js';
import { RESTControllerIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTControllerIdentifierNodeBuilder.js';
import { RESTControllerNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTControllerNodeBuilder.js';
import { RESTMethodNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/controllers/restController/RESTMethodNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { RESTControllerExecuteDependenciesNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerExecuteDependenciesNode.js';
import { RESTControllerNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerNode.js';
import { IntermediateASTRootNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { StatementBuilderDirector } from '../statement/rest.js';

export class RestControllerBuilderDirector {
  buildRestControllerWithThisUseCaseExecute(identifier: string): RESTControllerNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    return new RESTControllerNodeBuilder(tree)
      .withIdentifier(new RESTControllerIdentifierNodeBuilder(null).withName(identifier).build())
      .withParameterList(new ParameterListNodeBuilder(null).withParameters([]).build())
      .withRESTMethod(new RESTMethodNodeBuilder(null).withMethod('GET').build())
      .withExecuteNode(
        new RESTControllerExecuteNodeBuilder(null)
          .withDependencies(this.reqReplyExecuteDependencies())
          .withStatementList(
            new StatementListNodeBuilder(null)
              .withStatements([
                new StatementBuilderDirector().buildConstDeclarationThisUseCaseExecute('result'),
              ])
              .build(),
          )
          .build(),
      )
      .build();
  }

  buildRestControllerWithAwaitThisUseCaseExecute(identifier: string): RESTControllerNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    return new RESTControllerNodeBuilder(tree)
      .withIdentifier(new RESTControllerIdentifierNodeBuilder(null).withName(identifier).build())
      .withParameterList(new ParameterListNodeBuilder(null).withParameters([]).build())
      .withRESTMethod(new RESTMethodNodeBuilder(null).withMethod('GET').build())
      .withExecuteNode(
        new RESTControllerExecuteNodeBuilder(null)
          .withDependencies(this.reqReplyExecuteDependencies())
          .withStatementList(
            new StatementListNodeBuilder(null)
              .withStatements([
                new StatementBuilderDirector().buildConstDeclarationWithAwaitThisUseCaseExecute(
                  'result',
                ),
              ])
              .build(),
          )
          .build(),
      )
      .build();
  }

  private reqReplyExecuteDependencies(): RESTControllerExecuteDependenciesNode {
    return new RESTControllerExecuteDependenciesNodeBuilder(null)
      .withDependencies('request', 'reply')
      .build();
  }
}
