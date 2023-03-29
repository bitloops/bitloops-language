import { DomainServiceEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/DomainServiceEvaluationBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { ArgumentListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { DomainServiceEvaluationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/DomainServiceEvaluationNode.js';

export class DomainServiceEvaluationBuilderDirector {
  private builder: DomainServiceEvaluationNodeBuilder;

  constructor() {
    this.builder = new DomainServiceEvaluationNodeBuilder();
  }

  buildDomainServiceEvaluationWithArgumentList(
    domainServiceName: string,
    argumentList: ArgumentListNode,
  ): DomainServiceEvaluationNode {
    const identifierNode = new IdentifierNodeBuilder().withName(domainServiceName).build();
    return this.builder.withIdentifier(identifierNode).withArgumentsList(argumentList).build();
  }
}
