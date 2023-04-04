// import { ErrorIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifierBuilder.js';
// import { ErrorIdentifiersNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
// import { IdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { MethodDefinitionListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/methodDefinition/methodDefinitionListNodeBuilder.js';
// import { MethodDefinitionNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/methodDefinition/methodDefinitionNodeBuilder.js';
// import { ParameterIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterIdentifierNodeBuilder.js';
// import { ParameterListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
// import { ParameterNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterNodeBuilder.js';
// import { ReturnOkErrorTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
// import { ReturnOkTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { ServicePortIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/service-port/ServicePortIdentifierNodeBuilder.js';
import { ServicePortNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/service-port/ServicePortNodeBuilder.js';
// import { ErrorIdentifiersNodeBuilderDirector } from '../../../../../src/ast/core/intermediate-ast/directors/ErrorIdentifiersNodeBuilderDirector.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { MethodDefinitionNode } from '../../../../../src/ast/core/intermediate-ast/nodes/method-definitions/MethodDefinitionNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { ServicePortNode } from '../../../../../src/ast/core/intermediate-ast/nodes/service-port/ServicePortNode.js';
// import { BitloopsPrimaryTypeNodeDirector } from './bitloopsPrimaryTypeDirector.js';

export class ServicePortNodeBuilderDirector {
  private builder: ServicePortNodeBuilder;

  constructor() {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    this.builder = new ServicePortNodeBuilder(tree);
  }

  buildServicePort({
    packagePortName,
    methodDefinitions,
  }: {
    packagePortName: string;
    methodDefinitions: MethodDefinitionNode[];
  }): ServicePortNode {
    const identifierNode = new ServicePortIdentifierNodeBuilder().withName(packagePortName).build();
    const methodDefinitionListNode = new MethodDefinitionListNodeBuilder()
      .withMethodDefinitions(methodDefinitions)
      .build();
    return this.builder
      .withIdentifier(identifierNode)
      .withMethodDefinitions(methodDefinitionListNode)
      .build();
  }

  // buildServicePortWithMethodDefinitions({
  //   packagePortName,
  // }: {
  //   packagePortName: string;
  // }): ServicePortNode {
  //   const identifierNode = new ServicePortIdentifierNodeBuilder().withName(packagePortName).build();
  //   return this.builder
  //     .withIdentifier(identifierNode)
  //     .withMethodDefinitions(
  //       new MethodDefinitionListNodeBuilder()
  //         .withMethodDefinitions([
  //           new MethodDefinitionNodeBuilder()
  //             .withIdentifier(new IdentifierNodeBuilder().withName('updateTodoTitle').build())
  //             .withParameterList(
  //               new ParameterListNodeBuilder()
  //                 .withParameters([
  //                   new ParameterNodeBuilder()
  //                     .withIdentifier(
  //                       new ParameterIdentifierNodeBuilder().withIdentifier('id').build(),
  //                     )
  //                     .withType(
  //                       new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('string'),
  //                     )
  //                     .build(),
  //                   new ParameterNodeBuilder()
  //                     .withIdentifier(
  //                       new ParameterIdentifierNodeBuilder().withIdentifier('title').build(),
  //                     )
  //                     .withType(
  //                       new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('string'),
  //                     )
  //                     .build(),
  //                 ])
  //                 .build(),
  //             )
  //             .withType(
  //               new ReturnOkErrorTypeNodeBuilder()
  //                 .withOk(
  //                   new ReturnOkTypeNodeBuilder()
  //                     .withType(
  //                       new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('void'),
  //                     )
  //                     .build(),
  //                 )
  //                 .withErrors(
  //                   new ErrorIdentifiersNodeBuilder()
  //                     .withErrors([
  //                       new ErrorIdentifierNodeBuilder()
  //                         .withName(ErrorIdentifiersNodeBuilderDirector.unexpectedRepoErrorName)
  //                         .build(),
  //                     ])
  //                     .build(),
  //                 )
  //                 .build(),
  //             )
  //             .build(),
  //         ])
  //         .build(),
  //     )
  //     .build();
  // }
}
