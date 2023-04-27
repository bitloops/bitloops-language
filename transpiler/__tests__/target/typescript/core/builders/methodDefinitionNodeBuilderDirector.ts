import { IdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { MethodDefinitionNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/methodDefinition/methodDefinitionNodeBuilder.js';
import { BitloopsPrimaryTypeNode } from '../../../../../src/ast/core/intermediate-ast/nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { MethodDefinitionNode } from '../../../../../src/ast/core/intermediate-ast/nodes/method-definitions/MethodDefinitionNode.js';
import { ParameterNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { ReturnOkErrorTypeNode } from '../../../../../src/ast/core/intermediate-ast/nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ParameterListBuilderDirector } from '../../../../../src/ast/core/intermediate-ast/directors/parameterListDirector.js';

export class MethodDefinitionNodeBuilderDirector {
  private builder: MethodDefinitionNodeBuilder;

  constructor() {
    this.builder = new MethodDefinitionNodeBuilder();
  }

  buildMethodDefinitionNode({
    methodName,
    parameters,
    type,
  }: {
    methodName: string;
    parameters: ParameterNode[];
    type: BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode;
  }): MethodDefinitionNode {
    const identifierNode = new IdentifierNodeBuilder().withName(methodName).build();
    const parameterListNode = new ParameterListBuilderDirector().buildParams(...parameters);

    return this.builder
      .withIdentifier(identifierNode)
      .withParameterList(parameterListNode)
      .withType(type)
      .build();
  }
}
