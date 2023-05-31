import { DomainRuleIdentifierBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/DomainRule/DomainRuleIdentifierBuilder.js';
import { DomainRuleNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/DomainRule/DomainRuleNodeBuilder.js';
import { IsBrokenConditionNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/DomainRule/IsBrokenConditionNodeBuilder.js';
import { ErrorIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifierBuilder.js';
import { ConditionNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/ConditionBuilder.js';
import { IntermediateASTTree } from '../../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { ArgumentListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { DomainRuleNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/DomainRule/DomainRuleNode.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ParameterListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import { IntermediateASTRootNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { StatementListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/StatementList.js';

export class DomainRuleBuilderDirector {
  buildDomainRule(params: {
    identifier: string;
    parameterList: ParameterListNode;
    statements?: StatementListNode;
    isBrokenIfCondition: ExpressionNode;
    errorIdentifier: string;
    errorArguments?: ArgumentListNode;
  }): DomainRuleNode {
    const {
      identifier,
      parameterList,
      statements,
      isBrokenIfCondition,
      errorIdentifier,
      errorArguments,
    } = params;
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    const identifierNode = new DomainRuleIdentifierBuilder().withName(identifier).build();
    const conditionNode = new ConditionNodeBuilder().withExpression(isBrokenIfCondition).build();

    const isBrokenConditionBuilder = new IsBrokenConditionNodeBuilder().withExpression(
      conditionNode,
    );

    if (errorArguments) {
      isBrokenConditionBuilder.withArgumentList(errorArguments);
    }

    const builder = new DomainRuleNodeBuilder(tree)
      .withIdentifier(identifierNode)
      .withParameters(parameterList)
      .withIsBrokenCondition(isBrokenConditionBuilder.build())
      .withErrorThrown(new ErrorIdentifierNodeBuilder().withName(errorIdentifier).build());

    if (statements) {
      builder.withStatements(statements);
    }
    return builder.build();
  }
}
