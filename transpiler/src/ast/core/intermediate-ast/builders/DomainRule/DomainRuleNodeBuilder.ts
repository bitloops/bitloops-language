import { StatementListNode } from './../../nodes/statements/StatementList.js';
import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { DomainRuleIdentifierNode } from '../../nodes/DomainRule/DomainRuleIdentifierNode.js';
import { DomainRuleNode } from '../../nodes/DomainRule/DomainRuleNode.js';
import { IsBrokenConditionNode } from '../../nodes/DomainRule/IsBrokenConditionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterListNode } from './../../nodes/ParameterList/ParameterListNode.js';
import { IBuilder } from '../IBuilder.js';
import { ErrorIdentifierNode } from '../../nodes/ErrorIdentifiers/ErrorIdentifierNode.js';

export class DomainRuleNodeBuilder implements IBuilder<DomainRuleNode> {
  private domainRuleNode: DomainRuleNode;
  private domainRuleIdentifier: DomainRuleIdentifierNode;

  private parameters?: ParameterListNode;
  private errorThrown: ErrorIdentifierNode;
  private statementList: StatementListNode;
  private isBrokenConditionNode: IsBrokenConditionNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.domainRuleNode = new DomainRuleNode(metadata);
  }

  public withIdentifier(domainRuleIdentifierNode: DomainRuleIdentifierNode): DomainRuleNodeBuilder {
    this.domainRuleIdentifier = domainRuleIdentifierNode;
    const domainRuleName = domainRuleIdentifierNode.getIdentifierName();
    this.domainRuleNode.setClassName(domainRuleName);
    return this;
  }

  withParameters(parameters: ParameterListNode): DomainRuleNodeBuilder {
    this.parameters = parameters;
    return this;
  }

  withErrorThrown(errorThrown: ErrorIdentifierNode): DomainRuleNodeBuilder {
    this.errorThrown = errorThrown;
    return this;
  }

  withStatements(statementList: StatementListNode): DomainRuleNodeBuilder {
    this.statementList = statementList;
    return this;
  }

  public withIsBrokenCondition(condition: IsBrokenConditionNode): DomainRuleNodeBuilder {
    this.isBrokenConditionNode = condition;
    return this;
  }

  public build(): DomainRuleNode {
    this.intermediateASTTree.insertChild(this.domainRuleNode);
    this.intermediateASTTree.insertChild(this.domainRuleIdentifier);
    if (this.parameters) {
      this.intermediateASTTree.insertSibling(this.parameters);
    }
    this.intermediateASTTree.insertSibling(this.errorThrown);
    this.intermediateASTTree.insertSibling(this.statementList);
    this.intermediateASTTree.insertSibling(this.isBrokenConditionNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.domainRuleNode.buildObjectValue();

    return this.domainRuleNode;
  }
}
