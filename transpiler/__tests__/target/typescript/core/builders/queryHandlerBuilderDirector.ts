import { ParameterListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { ExecuteNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ExecuteNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { ParameterNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { ReturnOkErrorTypeNode } from '../../../../../src/ast/core/intermediate-ast/nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { StatementNode } from '../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { IdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { QueryHandlerNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/query/QueryHandlerNodeBuilder.js';
import { QueryHandlerNode } from '../../../../../src/ast/core/intermediate-ast/nodes/query/QueryHandlerNode.js';

export class QueryHandlerBuilderDirector {
  buildQuery({
    identifier,
    parameters,
    returnType,
    executeParameter,
    statements,
  }: {
    identifier: string;
    parameters: ParameterNode[];
    returnType: ReturnOkErrorTypeNode;
    executeParameter?: ParameterNode;
    statements: StatementNode[];
  }): QueryHandlerNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    const executeBuilder = new ExecuteNodeBuilder(null)
      .withReturnType(returnType)
      .withParameter(executeParameter)
      .withStatementList(new StatementListNodeBuilder(null).withStatements(statements).build());
    if (executeParameter) executeBuilder.withParameter(executeParameter);
    return new QueryHandlerNodeBuilder(tree)
      .withIdentifier(new IdentifierNodeBuilder(null).withName(identifier).build())
      .withParameterList(new ParameterListNodeBuilder(null).withParameters(parameters).build())
      .withExecute(executeBuilder.build())
      .build();
  }
}
