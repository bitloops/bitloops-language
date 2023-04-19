import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterListNode } from '../ParameterList/ParameterListNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';
import { StatementNode } from '../statements/Statement.js';
import { StatementListNode } from '../statements/StatementList.js';
import { DomainRuleIdentifierNode } from './DomainRuleIdentifierNode.js';
import { IsBrokenConditionNode } from './IsBrokenConditionNode.js';

export class DomainRuleNode extends ClassTypeNode {
  private static classType = ClassTypes.DomainRule;
  private static classNodeName = 'DomainRule';

  constructor(metadata: TNodeMetadata) {
    super({
      classType: DomainRuleNode.classType,
      nodeType: BitloopsTypesMapping.TDomainRule,
      metadata,
      classNodeName: DomainRuleNode.classNodeName,
    });
  }
  public getIdentifier(): DomainRuleIdentifierNode {
    const identifier = this.getChildNodeByType(
      BitloopsTypesMapping.TDomainRuleIdentifier,
    ) as DomainRuleIdentifierNode;
    return identifier;
  }

  public getParameters(): ParameterNode[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterList.getParameters();
  }

  public getStatements(): StatementNode[] {
    const statementList = this.getChildNodeByType<StatementListNode>(
      BitloopsTypesMapping.TStatements,
    );
    return statementList.statements;
  }

  public getIsBrokenCondition(): IsBrokenConditionNode {
    const isBrokenCondition = this.getChildNodeByType(
      BitloopsTypesMapping.TIsBrokenIfCondition,
    ) as IsBrokenConditionNode;
    return isBrokenCondition;
  }
}
