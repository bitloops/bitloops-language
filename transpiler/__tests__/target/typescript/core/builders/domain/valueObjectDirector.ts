import { IntermediateASTTree } from '../../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { ConstDeclarationListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ConstDeclarationListBuilder.js';
import { DomainCreateNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/Domain/DomainCreateBuilder.js';
import { ErrorIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifierBuilder.js';
import { ErrorIdentifiersNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { ParameterIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterIdentifierNodeBuilder.js';
import { PrivateMethodDeclarationListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PrivateMethodDeclarationListNodeBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { ValueObjectDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/valueObject/ValueObjectDeclarationNodeBuilder.js';
import { ValueObjectIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/valueObject/ValueObjectIdentifierNodeBuilder.js';
import { ConstDeclarationListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/ConstDeclarationListNode.js';
import { DomainCreateNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { IntermediateASTRootNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { PrivateMethodDeclarationListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/methods/PrivateMethodDeclarationListNode.js';
import { PrivateMethodDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/methods/PrivateMethodDeclarationNode.js';
import { ReturnOkErrorTypeNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ConstDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { StatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { ValueObjectDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/valueObject/ValueObjectDeclarationNode.js';
import { BitloopsPrimaryTypeDirector } from '../bitloopsPrimaryTypeDirector.js';
import { DomainCreateParameterNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Domain/DomainCreateParameterNode.js';
import { DomainCreateParameterNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/Domain/DomainCreateParameterNodeBuilder.js';
import { PropsIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/Props/PropsIdentifierNodeBuilder.js';

type TReturnType = {
  ok: string;
  errors: string[];
};

type TConstructorParam = {
  propIdentifier: string;
  propClassName: string;
};

export class ValueObjectBuilderDirector {
  buildValueObject(
    identifier: string,
    params: {
      constantNodes: ConstDeclarationNode[];
      constructorParameterNode: TConstructorParam;
      returnTypeParams: TReturnType;
      statements: StatementNode[];
      privateMethods?: PrivateMethodDeclarationNode[];
    },
  ): ValueObjectDeclarationNode {
    const {
      constantNodes,
      constructorParameterNode,
      returnTypeParams,
      statements,
      privateMethods,
    } = params;
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());

    const parameterNode = new DomainCreateParameterNodeBuilder(null)
      .withIdentifierNode(
        new ParameterIdentifierNodeBuilder(null)
          .withIdentifier(constructorParameterNode.propIdentifier)
          .build(),
      )
      .withTypeNode(
        new PropsIdentifierNodeBuilder().withName(constructorParameterNode.propClassName).build(),
      )
      .build();

    return new ValueObjectDeclarationNodeBuilder(tree)
      .withIdentifier(new ValueObjectIdentifierNodeBuilder().withName(identifier).build())
      .withConstants(this.buildConstants(constantNodes))
      .withCreate(this.buildCreate(parameterNode, returnTypeParams, statements))
      .withPrivateMethods(this.buildPrivateMethods(privateMethods))
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

  buildReturnType(params: TReturnType): ReturnOkErrorTypeNode {
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
