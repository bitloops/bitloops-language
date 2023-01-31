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
  private symbolTable: Record<string, boolean>; //it must be different for each bounded context

  constructor() {
    this.symbolTable = {};
  }

  createSymbolTable(ast: IntermediateAST): void {
    for (const boundedContext of Object.values(ast.core)) {
      for (const ASTTree of Object.values(boundedContext)) {
        ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTIdentifierNode) => {
          switch (true) {
            case node.getClassNodeName() === 'entityIdentifier' &&
              node.getParent().getClassNodeName() === 'RootEntity':
              this.symbolTable[node.getIdentifierName()] = true;
              break;
            case node.getClassNodeName() === 'propsIdentifier' &&
              node.getParent().getClassNodeName() === 'Props':
              this.symbolTable[node.getIdentifierName()] = true;
              break;
            case node.getClassNodeName() === 'valueObjectIdentifier' &&
              node.getParent().getClassNodeName() === 'ValueObject':
              this.symbolTable[node.getIdentifierName()] = true;
              break;
            case node.getClassNodeName() === 'identifier' &&
              node.getParent().getClassNodeName() === 'DomainError':
              this.symbolTable['DomainErrors.' + node.getIdentifierName()] = true;
              break;
            case node.getClassNodeName() === 'identifier' &&
              node.getParent().getClassNodeName() === 'ApplicationError':
              this.symbolTable['ApplicationErrors.' + node.getIdentifierName()] = true;
              break;
            case node.getClassNodeName() === 'DTOIdentifier' &&
              node.getParent().getClassNodeName() === 'DTO':
              this.symbolTable[node.getIdentifierName()] = true;
              break;
            case node.getClassNodeName() === 'repoPortIdentifier' &&
              node.getParent().getClassNodeName() === 'RepoPort':
              this.symbolTable[node.getIdentifierName()] = true;
              break;
            case node.getClassNodeName() === 'UseCaseIdentifier' &&
              node.getParent().getClassNodeName() === 'UseCase':
              this.symbolTable[node.getIdentifierName()] = true;
              break;
            case node.getClassNodeName() == 'RESTControllerIdentifier' &&
              node.getParent().getClassNodeName() === 'RESTController':
              this.symbolTable[node.getIdentifierName()] = true;
              break;
            case node.getClassNodeName() === 'StructIdentifier' &&
              node.getParent().getClassNodeName() === 'Struct':
              this.symbolTable[node.getIdentifierName()] = true;
              break;
            case node.getClassNodeName() === 'graphQLControllerIdentifier' &&
              node.getParent().getClassNodeName() === 'GraphQLController':
              this.symbolTable[node.getIdentifierName()] = true;
              break;
            case node.getClassNodeName() === 'readModelIdentifier' &&
              node.getParent().getClassNodeName() === 'ReadModel':
              this.symbolTable[node.getIdentifierName()] = true;
              break;
            case node.getClassNodeName() === 'domainRuleIdentifier' &&
              node.getParent().getClassNodeName() === 'DomainRule':
              this.symbolTable[node.getIdentifierName()] = true;
              break;
          }
        });
      }
    }
  }

  validate(ast: IntermediateAST): void | IntermediateASTValidationError[] {
    const errors: IntermediateASTValidationError[] = [];
    for (const boundedContext of Object.values(ast.core)) {
      for (const ASTTree of Object.values(boundedContext)) {
        errors.push(...this.validateNodes(ASTTree, this.symbolTable));

        errors.push(...this.validateClassTypeNodes(ASTTree, this.symbolTable));
      }
    }
    // TODO validate setup

    if (errors.length > 0) return errors;
  }

  private validateNodes(
    ASTTree: IntermediateASTTree,
    symbolTable: Record<string, boolean>,
  ): IntermediateASTNodeValidationError[] {
    const errors: IntermediateASTNodeValidationError[] = [];
    ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
      const validationRes = node.validate(symbolTable);
      if (IntermediateASTNode.isIntermediateASTNodeValidationError(validationRes))
        errors.push(validationRes);
    });
    return errors;
  }

  private validateClassTypeNodes(
    ASTTree: IntermediateASTTree,
    symbolTable: Record<string, boolean>,
  ): IntermediateASTNodeValidationError[] {
    const errors: IntermediateASTNodeValidationError[] = [];
    ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
      switch (node.getNodeType()) {
        //improvement: to check parent node and do not check avoid checking of the declaration node
        case BitloopsTypesMapping.TBitloopsIdentifier:
          if (!symbolTable[node.getValue().bitloopsIdentifierType]) {
            errors.push(
              new IntermediateASTValidationError(
                `Type ${node.getValue().bitloopsIdentifierType} not found from ${
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
          if (!symbolTable[node.getValue().entityIdentifier]) {
            errors.push(
              new IntermediateASTValidationError(
                `Entity ${node.getValue().entityIdentifier} not found at from ${
                  node.getMetadata().start.line
                }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
                  node.getMetadata().end.column
                } of file ${node.getMetadata().fileId}`,
                node.getMetadata(),
              ),
            );
          }
          break; //add metadata

        case BitloopsTypesMapping.TDomainCreateParameterType:
          if (!symbolTable[node.getValue().parameterType]) {
            errors.push(
              new IntermediateASTValidationError(
                `Type ${node.getValue().parameterType} not found from ${
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
          if (!symbolTable[node.getValue().error]) {
            errors.push(
              new IntermediateASTValidationError(
                `Error ${node.getValue().error} not found from ${node.getMetadata().start.line}:${
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
          if (!symbolTable[node.getValue().returnType]) {
            errors.push(
              new IntermediateASTValidationError(
                `Type ${node.getValue().returnType} not found from ${
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
          if (!symbolTable[node.getValue().domainRuleIdentifier]) {
            errors.push(
              new IntermediateASTValidationError(
                `DomainRule ${node.getValue().domainRuleIdentifier} not found from ${
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
