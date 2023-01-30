import { ArgumentListNode } from '../../../../nodes/ArgumentList/ArgumentListNode.js';
import { DomainRuleIdentifierNode } from '../../../../nodes/DomainRule/DomainRuleIdentifierNode.js';
import { AppliedRuleNode } from '../../../../nodes/statements/builtinFunction/AppliedRuleNode.js';
import { TNodeMetadata } from '../../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../../IBuilder.js';

export class AppliedRuleNodeBuilder implements IBuilder<AppliedRuleNode> {
  private appliedRuleNode: AppliedRuleNode;
  private domainRuleIdentifier: DomainRuleIdentifierNode;
  private argumentListNode: ArgumentListNode;

  constructor(metadata: TNodeMetadata) {
    this.appliedRuleNode = new AppliedRuleNode(metadata);
  }

  withDomainRuleIdentifier(domainRuleIdentifier: DomainRuleIdentifierNode): AppliedRuleNodeBuilder {
    this.domainRuleIdentifier = domainRuleIdentifier;
    return this;
  }

  withArgumentListNode(argumentListNode: ArgumentListNode): AppliedRuleNodeBuilder {
    this.argumentListNode = argumentListNode;
    return this;
  }

  public build(): AppliedRuleNode {
    this.appliedRuleNode.addChild(this.domainRuleIdentifier);
    this.appliedRuleNode.addChild(this.argumentListNode);
    this.appliedRuleNode.buildObjectValue();

    return this.appliedRuleNode;
  }
}
