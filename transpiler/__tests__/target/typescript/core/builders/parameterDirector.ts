import { ParameterIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterIdentifierNodeBuilder.js';
import { ParameterNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterNodeBuilder.js';
import { ParameterIdentifierNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterIdentifierNode.js';
import { ParameterNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterNode.js';
import {
  TBitloopsBuiltInClasses,
  TBitloopsIdentifier,
  TBitloopsPrimitives,
} from '../../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from './bitloopsPrimaryTypeDirector.js';

export class ParameterBuilderDirector {
  private builder: ParameterNodeBuilder;

  constructor() {
    this.builder = new ParameterNodeBuilder(null);
  }

  buildPrimitiveParameter(
    parameterName: string,
    primitiveType: TBitloopsPrimitives,
  ): ParameterNode {
    return this.builder
      .withIdentifier(this.parameterIdentifier(parameterName))
      .withType(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType(primitiveType))
      .build();
  }

  buildIdentifierParameter(
    parameterName: string,
    identifierType: TBitloopsIdentifier,
  ): ParameterNode {
    return this.builder
      .withIdentifier(this.parameterIdentifier(parameterName))
      .withType(new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(identifierType))
      .build();
  }

  buildIdentifierArrayParameter(
    parameterName: string,
    identifierType: TBitloopsIdentifier,
  ): ParameterNode {
    return this.builder
      .withIdentifier(this.parameterIdentifier(parameterName))
      .withType(new BitloopsPrimaryTypeDirector().buildArrayIdentifierPrimaryType(identifierType))
      .build();
  }

  buildBuiltInClassParameter(
    parameterName: string,
    builtInType: TBitloopsBuiltInClasses,
  ): ParameterNode {
    return this.builder
      .withIdentifier(this.parameterIdentifier(parameterName))
      .withType(new BitloopsPrimaryTypeDirector().buildBuiltinClassPrimaryType(builtInType))
      .build();
  }

  private parameterIdentifier(parameterName: string): ParameterIdentifierNode {
    return new ParameterIdentifierNodeBuilder(null).withIdentifier(parameterName).build();
  }
}
