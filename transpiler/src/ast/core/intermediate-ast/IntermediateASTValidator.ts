/**
 *  Bitloops Language CLI
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import {
  IIntermediateASTValidator,
  IntermediateAST,
  IntermediateASTValidationError,
} from '../types.js';
import { IntermediateASTTree } from './IntermediateASTTree.js';
import { IntermediateASTIdentifierNode } from './nodes/IntermediateASTIdentifierNode.js';
import {
  IntermediateASTNodeValidationError,
  IntermediateASTNode,
} from './nodes/IntermediateASTNode.js';

export class IntermediateASTValidator implements IIntermediateASTValidator {
  private symbolTable: Set<string>; //it must be different for each bounded context

  constructor() {
    this.symbolTable = new Set();
  }

  createSymbolTable(ast: IntermediateAST): void {
    for (const boundedContext of Object.values(ast.core)) {
      for (const ASTTree of Object.values(boundedContext)) {
        ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTIdentifierNode) => {
          switch (true) {
            case node.getClassNodeName() === 'entityIdentifier' &&
              node.getParent().getClassNodeName() === 'RootEntity':
              this.symbolTable.add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'propsIdentifier' &&
              node.getParent().getClassNodeName() === 'Props':
              this.symbolTable.add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'valueObjectIdentifier' &&
              node.getParent().getClassNodeName() === 'ValueObject':
              this.symbolTable.add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'identifier' &&
              node.getParent().getClassNodeName() === 'DomainError':
              this.symbolTable.add('DomainErrors.' + node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'identifier' &&
              node.getParent().getClassNodeName() === 'ApplicationError':
              this.symbolTable.add('ApplicationErrors.' + node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'DTOIdentifier' &&
              node.getParent().getClassNodeName() === 'DTO':
              this.symbolTable.add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'repoPortIdentifier' &&
              node.getParent().getClassNodeName() === 'RepoPort':
              this.symbolTable.add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'UseCaseIdentifier' &&
              node.getParent().getClassNodeName() === 'UseCase':
              this.symbolTable.add(node.getIdentifierName());
              break;
            case node.getClassNodeName() == 'RESTControllerIdentifier' &&
              node.getParent().getClassNodeName() === 'RESTController':
              this.symbolTable.add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'StructIdentifier' &&
              node.getParent().getClassNodeName() === 'Struct':
              this.symbolTable.add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'graphQLControllerIdentifier' &&
              node.getParent().getClassNodeName() === 'GraphQLController':
              this.symbolTable.add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'readModelIdentifier' &&
              node.getParent().getClassNodeName() === 'ReadModel':
              this.symbolTable.add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'domainRuleIdentifier' &&
              node.getParent().getClassNodeName() === 'DomainRule':
              this.symbolTable.add(node.getIdentifierName());
              break;
          }
        });
      }
    }
    if (ast.setup)
      for (const ASTTree of Object.values(ast.setup)) {
        ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTIdentifierNode) => {
          switch (true) {
            case node.getClassNodeName() === 'identifier' &&
              node.getParent().getClassNodeName() === 'RepoConnectionDefinition':
              this.symbolTable.add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'identifier' &&
              node.getParent().getClassNodeName() === 'setupRepoAdapterDefinition':
              this.symbolTable.add(node.getIdentifierName());
              break;
          }
        });
      }
  }

  validate(ast: IntermediateAST): void | IntermediateASTValidationError[] {
    const errors: IntermediateASTValidationError[] = [];
    for (const boundedContext of Object.values(ast.core)) {
      for (const ASTTree of Object.values(boundedContext)) {
        errors.push(...this.validateNodes(ASTTree));

        errors.push(...this.validateClassTypeNodes(ASTTree));
      }
    }
    if (ast.setup)
      for (const ASTTree of Object.values(ast.setup)) {
        errors.push(...this.validateNodes(ASTTree));

        errors.push(...this.validateClassTypeNodes(ASTTree));
      }
    // TODO validate setup

    if (errors.length > 0) return errors;
  }

  private validateNodes(ASTTree: IntermediateASTTree): IntermediateASTNodeValidationError[] {
    const errors: IntermediateASTNodeValidationError[] = [];
    ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
      const validationRes = node.validate(this.symbolTable);
      if (IntermediateASTNode.isIntermediateASTNodeValidationError(validationRes))
        errors.push(validationRes);
    });
    return errors;
  }

  private validateClassTypeNodes(
    ASTTree: IntermediateASTTree,
  ): IntermediateASTNodeValidationError[] {
    const errors: IntermediateASTNodeValidationError[] = [];
    ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
      switch (node.getNodeType()) {
        case BitloopsTypesMapping.TBitloopsIdentifier:
          if (!this.symbolTable.has(node.getValue().bitloopsIdentifierType)) {
            errors.push(
              new IntermediateASTValidationError(
                `Type ${node.getValue().bitloopsIdentifierType} not found: from ${
                  node.getMetadata().start.line
                }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
                  node.getMetadata().end.column
                } of file ${node.getMetadata().fileId}`,
                node.getMetadata(),
              ),
            );
          }
          break;

        case BitloopsTypesMapping.TEntityIdentifier:
          if (!this.symbolTable.has(node.getValue().entityIdentifier)) {
            errors.push(
              new IntermediateASTValidationError(
                `Entity ${node.getValue().entityIdentifier} not found: from ${
                  node.getMetadata().start.line
                }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
                  node.getMetadata().end.column
                } of file ${node.getMetadata().fileId}`,
                node.getMetadata(),
              ),
            );
          }
          break;

        case BitloopsTypesMapping.TDomainCreateParameterType:
          if (!this.symbolTable.has(node.getValue().parameterType)) {
            errors.push(
              new IntermediateASTValidationError(
                `Type ${node.getValue().parameterType} not found: from ${
                  node.getMetadata().start.line
                }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
                  node.getMetadata().end.column
                } of file ${node.getMetadata().fileId}`,
                node.getMetadata(),
              ),
            );
          }
          break;

        case BitloopsTypesMapping.TErrorIdentifier:
          if (!this.symbolTable.has(node.getValue().error)) {
            errors.push(
              new IntermediateASTValidationError(
                `Error ${node.getValue().error} not found: from ${node.getMetadata().start.line}:${
                  node.getMetadata().start.column
                } to ${node.getMetadata().end.line}:${node.getMetadata().end.column} of file ${
                  node.getMetadata().fileId
                }`,
                node.getMetadata(),
              ),
            );
          }
          break;

        case BitloopsTypesMapping.TGraphQLControllerExecuteReturnType:
          if (!this.symbolTable.has(node.getValue().returnType)) {
            errors.push(
              new IntermediateASTValidationError(
                `Type ${node.getValue().returnType} not found: from ${
                  node.getMetadata().start.line
                }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
                  node.getMetadata().end.column
                } of file ${node.getMetadata().fileId}`,
                node.getMetadata(),
              ),
            );
          }
          break;

        case BitloopsTypesMapping.TDomainRuleIdentifier:
          if (!this.symbolTable.has(node.getValue().domainRuleIdentifier)) {
            errors.push(
              new IntermediateASTValidationError(
                `DomainRule ${node.getValue().domainRuleIdentifier} not found: from ${
                  node.getMetadata().start.line
                }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
                  node.getMetadata().end.column
                } of file ${node.getMetadata().fileId}`,
                node.getMetadata(),
              ),
            );
          }
          break;

        case BitloopsTypesMapping.TUseCaseIdentifier:
          if (!this.symbolTable.has(node.getValue().UseCaseIdentifier)) {
            errors.push(
              new IntermediateASTValidationError(
                `Use Case ${node.getValue().UseCaseIdentifier} not found: from ${
                  node.getMetadata().start.line
                }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
                  node.getMetadata().end.column
                } of file ${node.getMetadata().fileId}`,
                node.getMetadata(),
              ),
            );
          }
          break;

        case BitloopsTypesMapping.TRESTControllerIdentifier:
          if (!this.symbolTable.has(node.getValue().RESTControllerIdentifier)) {
            errors.push(
              new IntermediateASTValidationError(
                `Controller ${node.getValue().RESTControllerIdentifier} not found: from ${
                  node.getMetadata().start.line
                }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
                  node.getMetadata().end.column
                } of file ${node.getMetadata().fileId}`,
                node.getMetadata(),
              ),
            );
          }
          break;

        case BitloopsTypesMapping.TConcretedRepoPort:
          if (!this.symbolTable.has(node.getValue().concretedRepoPort)) {
            errors.push(
              new IntermediateASTValidationError(
                `Repo port ${node.getValue().concretedRepoPort} not found: from ${
                  node.getMetadata().start.line
                }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
                  node.getMetadata().end.column
                } of file ${node.getMetadata().fileId}`,
                node.getMetadata(),
              ),
            );
          }
          break;

        case BitloopsTypesMapping.TRepoAdapterOptions:
          if (
            node.getFirstChild().getFirstChild().getFirstChild().getValue().identifier ===
            'connection'
          ) {
            const expressionNode = node
              .getFirstChild()
              .getFirstChild()
              .getFirstChild()
              .getNextSibling()
              .getFirstChild();
            if (!this.symbolTable.has(expressionNode.getValue().identifier)) {
              // const
              errors.push(
                new IntermediateASTValidationError(
                  `Connection ${expressionNode.getValue().identifier} not found: from ${
                    expressionNode.getMetadata().start.line
                  }:${expressionNode.getMetadata().start.column} to ${
                    expressionNode.getMetadata().end.line
                  }:${expressionNode.getMetadata().end.column} of file ${
                    expressionNode.getMetadata().fileId
                  }`,
                  expressionNode.getMetadata(),
                ),
              );
            }
          }
          break;

        //write it with getFirstChild() etc
        case BitloopsTypesMapping.TIdentifierExpression:
          if (
            node.getParent().getParent().getParent().getParent().getNodeType() ===
            BitloopsTypesMapping.TUseCaseExpression
          )
            if (!this.symbolTable.has(node.getValue().identifier)) {
              errors.push(
                new IntermediateASTValidationError(
                  `Adapter ${node.getValue().identifier} not found: from ${
                    node.getMetadata().start.line
                  }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
                    node.getMetadata().end.column
                  } of file ${node.getMetadata().fileId}`,
                  node.getMetadata(),
                ),
              );
            }
          break;
      }
    });
    return errors;
  }
}
