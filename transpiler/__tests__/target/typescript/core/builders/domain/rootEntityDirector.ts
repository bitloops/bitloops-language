import { IntermediateASTTree } from '../../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { ConstDeclarationListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ConstDeclarationListBuilder.js';
import { DomainCreateNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/Domain/DomainCreateBuilder.js';
import { EntityIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/Entity/EntityIdentifierBuilder.js';
import { EntityValuesNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/Entity/EntityValuesBuilder.js';
import { ErrorIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifierBuilder.js';
import { ErrorIdentifiersNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { RootEntityDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/RootEntity/RootEntityDeclarationBuilder.js';
import { PrivateMethodDeclarationListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PrivateMethodDeclarationListNodeBuilder.js';
import { PublicMethodDeclarationListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PublicMethodDeclarationListNodeBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { ConstDeclarationListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/ConstDeclarationListNode.js';
import { DomainCreateNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { EntityDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Entity/EntityDeclarationNode.js';
import { IntermediateASTRootNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { PrivateMethodDeclarationListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/methods/PrivateMethodDeclarationListNode.js';
import { PrivateMethodDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/methods/PrivateMethodDeclarationNode.js';
import { PublicMethodDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/methods/PublicMethodDeclarationNode.js';
import { ReturnOkErrorTypeNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ConstDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { StatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { BitloopsPrimaryTypeDirector } from '../bitloopsPrimaryTypeDirector.js';
import { DomainCreateParameterNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Domain/DomainCreateParameterNode.js';
import { DomainCreateParameterNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/Domain/DomainCreateParameterNodeBuilder.js';
import { DomainCreateParameterTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/Domain/DomainCreateParameterTypeNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';

type TReturnType = {
  ok: string;
  errors: string[];
};

type TConstructorParam = {
  propIdentifier: string;
  propClassName: string;
};

export class RootEntityBuilderDirector {
  buildRootEntity(
    identifier: string,
    params: {
      constantNodes: ConstDeclarationNode[];
      constructorParameterNode: TConstructorParam;
      returnTypeParams: TReturnType;
      statements: StatementNode[];
      publicMethods: PublicMethodDeclarationNode[];
      privateMethods: PrivateMethodDeclarationNode[];
    },
  ): EntityDeclarationNode {
    const {
      constantNodes,
      constructorParameterNode,
      returnTypeParams,
      statements,
      publicMethods,
      privateMethods,
    } = params;
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());

    const parameterNode = new DomainCreateParameterNodeBuilder(null)
      .withIdentifierNode(
        new IdentifierNodeBuilder(null).withName(constructorParameterNode.propIdentifier).build(),
      )
      .withTypeNode(
        new DomainCreateParameterTypeNodeBuilder()
          .withValue(constructorParameterNode.propClassName)
          .build(),
      )
      .build();

    return new RootEntityDeclarationNodeBuilder(tree)
      .withIdentifier(new EntityIdentifierNodeBuilder().withName(identifier).build())
      .withValues(
        new EntityValuesNodeBuilder()
          .withConstants(this.buildConstants(constantNodes))
          .withCreate(this.buildCreate(parameterNode, returnTypeParams, statements))
          .withPublicMethods(
            new PublicMethodDeclarationListNodeBuilder().withMethods(publicMethods).build(),
          )
          .withPrivateMethods(this.buildPrivateMethods(privateMethods))
          .build(),
      )
      .build();
  }

  private buildConstants(constantNodes: ConstDeclarationNode[]): ConstDeclarationListNode {
    return new ConstDeclarationListNodeBuilder().withConstants(constantNodes).build();
  }

  private buildCreate(
    parameterNode: DomainCreateParameterNode,
    returnTypeParams: TReturnType,
    statements: StatementNode[],
  ): DomainCreateNode {
    return new DomainCreateNodeBuilder()
      .withParameter(parameterNode)
      .withReturnType(this.buildReturnType(returnTypeParams))
      .withStatements(new StatementListNodeBuilder().withStatements(statements).build())
      .build();
  }

  private buildReturnType(params: TReturnType): ReturnOkErrorTypeNode {
    const { ok, errors } = params;
    return new ReturnOkErrorTypeNodeBuilder()
      .withOk(
        new ReturnOkTypeNodeBuilder()
          .withType(new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(ok))
          .build(),
      )
      .withErrors(
        new ErrorIdentifiersNodeBuilder()
          .withErrors(
            errors.map((errorName) => new ErrorIdentifierNodeBuilder().withName(errorName).build()),
          )
          .build(),
      )
      .build();
  }

  private buildPrivateMethods(
    params?: PrivateMethodDeclarationNode[],
  ): PrivateMethodDeclarationListNode {
    const privateMethodList = new PrivateMethodDeclarationListNodeBuilder();
    if (params) {
      privateMethodList.withMethods(params);
    }
    return privateMethodList.build();
  }
}
