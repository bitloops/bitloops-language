import { DomainServiceNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/DomainServiceNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PrivateMethodDeclarationListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/methods/PrivateMethodDeclarationListNodeBuilder.js';
import { PublicMethodDeclarationListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/methods/PublicMethodDeclarationListNodeBuilder.js';
import { ParameterIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterIdentifierNodeBuilder.js';
import { ParameterNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { DomainServiceNode } from '../../../../../src/ast/core/intermediate-ast/nodes/domain-service/DomainServiceNode.js';
import { PublicMethodDeclarationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/methods/PublicMethodDeclarationNode.js';
import { ParameterListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import {
  bitloopsIdentifiersTypeKey,
  bitloopsPrimaryTypeKey,
  TParameter,
  TPrivateMethods,
  TPublicMethods,
} from '../../../../../src/types.js';
import { BitloopsPrimaryTypeNodeDirector } from './bitloopsPrimaryTypeDirector.js';
import { PrivateMethodBuilderDirector } from './methods/privateMethodBuilderDirector.js';
import { PublicMethodBuilderDirector } from './methods/publicMethodBuilderDirector.js';
import { ParameterListNodeBuilderDirector } from '../../../../../src/ast/core/intermediate-ast/directors/parameterListNodeBuilderDirector.js';

export class DomainServiceNodeBuilderDirector {
  private builder: DomainServiceNodeBuilder;

  constructor() {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    this.builder = new DomainServiceNodeBuilder(tree);
  }

  buildDomainService(
    domainServiceIdentifier: string,
    parameters: TParameter[],
    publicMethodNodes: PublicMethodDeclarationNode[],
  ): DomainServiceNode {
    const identifierNode = new IdentifierNodeBuilder().withName(domainServiceIdentifier).build();

    const parameterNodes = parameters.map((parameter) => {
      return new ParameterNodeBuilder()
        .withIdentifier(
          new ParameterIdentifierNodeBuilder().withIdentifier(parameter.parameter.value).build(),
        )
        .withType(
          new BitloopsPrimaryTypeNodeDirector().buildIdentifierPrimaryType(
            parameter.parameter[bitloopsPrimaryTypeKey][bitloopsIdentifiersTypeKey],
          ),
        )
        .build();
    });
    const parameterListNode: ParameterListNode = new ParameterListNodeBuilderDirector().buildParams(
      ...parameterNodes,
    );

    const publicMethodListNode = new PublicMethodDeclarationListNodeBuilder()
      .withMethods(publicMethodNodes)
      .build();

    return this.builder
      .withIdentifier(identifierNode)
      .withParameters(parameterListNode)
      .withPublicMethods(publicMethodListNode)
      .build();
  }

  buildDomainServiceWithoutPrivateMethods(
    domainServiceIdentifier: string,
    parameters: TParameter[],
    publicMethods: TPublicMethods,
  ): DomainServiceNode {
    const identifierNode = new IdentifierNodeBuilder().withName(domainServiceIdentifier).build();

    const parameterNodes = parameters.map((parameter) => {
      return new ParameterNodeBuilder()
        .withIdentifier(
          new ParameterIdentifierNodeBuilder().withIdentifier(parameter.parameter.value).build(),
        )
        .withType(
          new BitloopsPrimaryTypeNodeDirector().buildIdentifierPrimaryType(
            parameter.parameter[bitloopsPrimaryTypeKey][bitloopsIdentifiersTypeKey],
          ),
        )
        .build();
    });
    const parameterListNode: ParameterListNode = new ParameterListNodeBuilderDirector().buildParams(
      ...parameterNodes,
    );

    const publicMethodsNodes = publicMethods.map((method) => {
      const publicMethod = method.publicMethod;
      return new PublicMethodBuilderDirector().buildMethodWithSimpleReturnExpression({
        methodName: publicMethod.identifier,
        parameters: publicMethod.parameters,
        returnType: { returnType: publicMethod.returnType },
      });
    });

    const publicMethodListNode = new PublicMethodDeclarationListNodeBuilder()
      .withMethods(publicMethodsNodes)
      .build();

    return this.builder
      .withIdentifier(identifierNode)
      .withParameters(parameterListNode)
      .withPublicMethods(publicMethodListNode)
      .build();
  }

  buildDomainServiceWithPublicPrivateMethods(
    domainServiceIdentifier: string,
    parameters: TParameter[],
    publicMethods: TPublicMethods,
    privateMethods: TPrivateMethods,
  ): DomainServiceNode {
    const identifierNode = new IdentifierNodeBuilder().withName(domainServiceIdentifier).build();

    const parameterNodes = parameters.map((parameter) => {
      return new ParameterNodeBuilder()
        .withIdentifier(
          new ParameterIdentifierNodeBuilder().withIdentifier(parameter.parameter.value).build(),
        )
        .withType(
          new BitloopsPrimaryTypeNodeDirector().buildIdentifierPrimaryType(
            parameter.parameter[bitloopsPrimaryTypeKey][bitloopsIdentifiersTypeKey],
          ),
        )
        .build();
    });
    const parameterListNode: ParameterListNode = new ParameterListNodeBuilderDirector().buildParams(
      ...parameterNodes,
    );

    const publicMethodsNodes = publicMethods.map((method) => {
      const publicMethod = method.publicMethod;
      return new PublicMethodBuilderDirector().buildMethodWithSimpleReturnExpression({
        methodName: publicMethod.identifier,
        parameters: publicMethod.parameters,
        returnType: { returnType: publicMethod.returnType },
      });
    });

    const publicMethodListNode = new PublicMethodDeclarationListNodeBuilder()
      .withMethods(publicMethodsNodes)
      .build();

    const privateMethodsNodes = privateMethods.map((method) => {
      const privateMethod = method.privateMethod;
      return new PrivateMethodBuilderDirector().buildMethodWithBooleanExpression({
        methodName: privateMethod.identifier,
        booleanLiteral: true,
      });
    });

    const privateMethodListNode = new PrivateMethodDeclarationListNodeBuilder()
      .withMethods(privateMethodsNodes)
      .build();

    return this.builder
      .withIdentifier(identifierNode)
      .withParameters(parameterListNode)
      .withPublicMethods(publicMethodListNode)
      .withPrivateMethods(privateMethodListNode)
      .build();
  }
}
