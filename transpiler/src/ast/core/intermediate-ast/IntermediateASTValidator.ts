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
  IntermediateASTSetup,
  IntermediateASTValidationError,
  TBoundedContexts,
} from '../types.js';
import { IntermediateASTTree } from './IntermediateASTTree.js';
import { IntermediateASTIdentifierNode } from './nodes/IntermediateASTIdentifierNode.js';
import {
  IntermediateASTNodeValidationError,
  IntermediateASTNode,
} from './nodes/IntermediateASTNode.js';
import { BoundedContextModuleNode } from './nodes/setup/BoundedContextModuleNode.js';
import { BoundedContextNameNode } from './nodes/setup/BoundedContextNameNode.js';

export class IntermediateASTValidator implements IIntermediateASTValidator {
  private symbolTableCore: Record<string, Set<string>>; //it must be different for each bounded context
  private symbolTableSetup: Record<string, Set<string>>; //it must be different for each setup file

  constructor() {
    this.symbolTableCore = {};
    this.symbolTableSetup = {};
  }

  validate(ast: IntermediateAST): void | IntermediateASTValidationError[] {
    this.createSymbolTablesCore(ast.core);
    const errors: IntermediateASTValidationError[] = [];
    errors.push(...this.validateCore(ast.core));
    // if (errors.length > 0) return errors; //maybe no return
    this.createSymbolTablesSetup(ast.setup);
    errors.push(...this.validateSetup(ast.setup));
    if (errors.length > 0) return errors;
  }

  private createSymbolTablesCore(core: TBoundedContexts): void {
    for (const [boundedContextName, boundedContext] of Object.entries(core)) {
      this.symbolTableCore[boundedContextName] = new Set();
      for (const ASTTree of Object.values(boundedContext)) {
        ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTIdentifierNode) => {
          switch (true) {
            case node.getClassNodeName() === 'entityIdentifier' &&
              node.getParent().getClassNodeName() === 'RootEntity':
              this.symbolTableCore[boundedContextName].add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'propsIdentifier' &&
              node.getParent().getClassNodeName() === 'Props':
              this.symbolTableCore[boundedContextName].add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'valueObjectIdentifier' &&
              node.getParent().getClassNodeName() === 'ValueObject':
              this.symbolTableCore[boundedContextName].add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'identifier' &&
              node.getParent().getClassNodeName() === 'DomainError':
              this.symbolTableCore[boundedContextName].add(
                'DomainErrors.' + node.getIdentifierName(),
              );
              break;
            case node.getClassNodeName() === 'identifier' &&
              node.getParent().getClassNodeName() === 'ApplicationError':
              this.symbolTableCore[boundedContextName].add(
                'ApplicationErrors.' + node.getIdentifierName(),
              );
              break;
            case node.getClassNodeName() === 'DTOIdentifier' &&
              node.getParent().getClassNodeName() === 'DTO':
              this.symbolTableCore[boundedContextName].add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'repoPortIdentifier' &&
              node.getParent().getClassNodeName() === 'RepoPort':
              this.symbolTableCore[boundedContextName].add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'UseCaseIdentifier' &&
              node.getParent().getClassNodeName() === 'UseCase':
              this.symbolTableCore[boundedContextName].add(node.getIdentifierName());
              break;
            case node.getClassNodeName() == 'RESTControllerIdentifier' &&
              node.getParent().getClassNodeName() === 'RESTController':
              this.symbolTableCore[boundedContextName].add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'StructIdentifier' &&
              node.getParent().getClassNodeName() === 'Struct':
              this.symbolTableCore[boundedContextName].add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'graphQLControllerIdentifier' &&
              node.getParent().getClassNodeName() === 'GraphQLController':
              this.symbolTableCore[boundedContextName].add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'readModelIdentifier' &&
              node.getParent().getClassNodeName() === 'ReadModel':
              this.symbolTableCore[boundedContextName].add(node.getIdentifierName());
              break;
            case node.getClassNodeName() === 'domainRuleIdentifier' &&
              node.getParent().getClassNodeName() === 'DomainRule':
              this.symbolTableCore[boundedContextName].add(node.getIdentifierName());
              break;
          }
        });
      }
    }
  }

  private createSymbolTablesSetup(setup: IntermediateASTSetup): void {
    for (const [fileId, ASTTree] of Object.entries(setup)) {
      this.symbolTableSetup[fileId] = new Set();
      ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTIdentifierNode) => {
        switch (true) {
          case node.getClassNodeName() === 'identifier' &&
            node.getParent().getClassNodeName() === 'RepoConnectionDefinition':
            this.symbolTableSetup[fileId].add(node.getIdentifierName());
            break;
          case node.getClassNodeName() === 'identifier' &&
            node.getParent().getClassNodeName() === 'setupRepoAdapterDefinition': {
            this.symbolTableSetup[fileId].add(node.getIdentifierName());
            break;
          }
        }
      });
    }
  }

  private validateCore(core: TBoundedContexts): IntermediateASTValidationError[] {
    const coreErrors: IntermediateASTValidationError[] = [];
    for (const [boundedContextName, boundedContext] of Object.entries(core)) {
      for (const ASTTree of Object.values(boundedContext)) {
        coreErrors.push(...this.validateNodes(ASTTree, boundedContextName));

        coreErrors.push(...this.validateClassTypeNodesCore(ASTTree, boundedContextName));
      }
    }
    return coreErrors;
  }

  private validateSetup(setup: IntermediateASTSetup): IntermediateASTValidationError[] {
    const setupErrors: IntermediateASTValidationError[] = [];
    for (const [fileId, ASTTree] of Object.entries(setup)) {
      setupErrors.push(...this.validateClassTypeNodesSetup(ASTTree, fileId));
    }
    return setupErrors;
  }

  //isn't being used right now
  private validateNodes(
    ASTTree: IntermediateASTTree,
    boundedContextName: string,
  ): IntermediateASTNodeValidationError[] {
    const errors: IntermediateASTNodeValidationError[] = [];
    ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
      const validationRes = node.validate(this.symbolTableCore[boundedContextName]);
      if (IntermediateASTNode.isIntermediateASTNodeValidationError(validationRes))
        errors.push(validationRes);
    });
    return errors;
  }

  private validateClassTypeNodesCore(
    ASTTree: IntermediateASTTree,
    boundedContext: string,
  ): IntermediateASTNodeValidationError[] {
    const errors: IntermediateASTNodeValidationError[] = [];
    ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
      switch (node.getNodeType()) {
        case BitloopsTypesMapping.TBitloopsIdentifier:
          if (!this.symbolTableCore[boundedContext].has(node.getValue().bitloopsIdentifierType)) {
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
          if (!this.symbolTableCore[boundedContext].has(node.getValue().entityIdentifier)) {
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
          if (!this.symbolTableCore[boundedContext].has(node.getValue().parameterType)) {
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
          if (!this.symbolTableCore[boundedContext].has(node.getValue().error)) {
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
          if (!this.symbolTableCore[boundedContext].has(node.getValue().returnType)) {
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
          if (!this.symbolTableCore[boundedContext].has(node.getValue().domainRuleIdentifier)) {
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

        case BitloopsTypesMapping.TUseCaseIdentifier: {
          if (!this.symbolTableCore[boundedContext].has(node.getValue().UseCaseIdentifier)) {
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
        }
      }
    });
    return errors;
  }

  private bcError(boundedContextNode: BoundedContextNameNode): IntermediateASTNodeValidationError {
    return new IntermediateASTValidationError(
      `Bounded Context ${boundedContextNode.getName()} not found: from ${
        boundedContextNode.getMetadata().start.line
      }:${boundedContextNode.getMetadata().start.column} to ${
        boundedContextNode.getMetadata().end.line
      }:${boundedContextNode.getMetadata().end.column} of file ${
        boundedContextNode.getMetadata().fileId
      }`,
      boundedContextNode.getMetadata(),
    );
  }

  private validateClassTypeNodesSetup(
    ASTTree: IntermediateASTTree,
    fileId: string,
  ): IntermediateASTNodeValidationError[] {
    const errors: IntermediateASTNodeValidationError[] = [];
    ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
      switch (node.getNodeType()) {
        //fix nodes
        case BitloopsTypesMapping.TConcretedRepoPort:
          {
            const boundedContextNode = (
              node
                .getParent()
                .getParent()
                .getChildren()[1]
                .getFirstChild() as BoundedContextModuleNode
            ).getBoundedContext();

            const boundedContext = boundedContextNode.getName();
            if (!(boundedContext in this.symbolTableCore)) {
              errors.push(this.bcError(boundedContextNode));
              break;
            }
            if (!this.symbolTableCore[boundedContext].has(node.getValue().concretedRepoPort)) {
              errors.push(
                new IntermediateASTValidationError(
                  `Repo port ${
                    node.getValue().concretedRepoPort
                  } not found in bounded context ${boundedContext}: from ${
                    node.getMetadata().start.line
                  }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
                    node.getMetadata().end.column
                  } of file ${node.getMetadata().fileId}`,
                  node.getMetadata(),
                ),
              );
            }
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

            if (!this.symbolTableSetup[fileId].has(expressionNode.getValue().identifier)) {
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
            if (!this.symbolTableSetup[fileId].has(node.getValue().identifier)) {
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

        case BitloopsTypesMapping.TUseCaseIdentifier: {
          const boundedContextNode = (
            node.getParent().getFirstChild() as BoundedContextModuleNode
          ).getBoundedContext();
          const boundedContext = boundedContextNode.getName();
          if (!(boundedContext in this.symbolTableCore)) {
            errors.push(this.bcError(boundedContextNode));
            break;
          }
          if (!this.symbolTableCore[boundedContext].has(node.getValue().UseCaseIdentifier)) {
            errors.push(
              new IntermediateASTValidationError(
                `Use Case ${
                  node.getValue().UseCaseIdentifier
                } not found in bounded context ${boundedContext}: from ${
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
        case BitloopsTypesMapping.TRESTControllerIdentifier: {
          const boundedContextNode = (
            node.getParent().getChildren()[2] as BoundedContextModuleNode
          ).getBoundedContext();
          const boundedContext = boundedContextNode.getName();
          if (!(boundedContext in this.symbolTableCore)) {
            errors.push(this.bcError(boundedContextNode));
            break;
          }
          if (!this.symbolTableCore[boundedContext].has(node.getValue().RESTControllerIdentifier)) {
            errors.push(
              new IntermediateASTValidationError(
                `Controller ${
                  node.getValue().RESTControllerIdentifier
                } not found in bounded context ${boundedContext}: from ${
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
      }
    });
    return errors;
  }
}
