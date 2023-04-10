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
import { BitloopsTypesMapping } from '../helpers/mappings.js';
import {
  IIntermediateASTValidator,
  IntermediateAST,
  IntermediateASTSetup,
  IntermediateASTValidationError,
  TBoundedContexts,
} from '../ast/core/types.js';
import { IntermediateASTTree } from '../ast/core/intermediate-ast/IntermediateASTTree.js';
import { ArgumentNode } from '../ast/core/intermediate-ast/nodes/ArgumentList/ArgumentNode.js';
import { BitloopsIdentifierTypeNode } from '../ast/core/intermediate-ast/nodes/BitloopsPrimaryType/BitloopsIdentifierTypeNode.js';
import { CommandDeclarationNode } from '../ast/core/intermediate-ast/nodes/command/CommandDeclarationNode.js';
import { GraphQLControllerExecuteReturnTypeNode } from '../ast/core/intermediate-ast/nodes/controllers/graphql/GraphQLControllerExecuteReturnTypeNode.js';
import { GraphQLControllerIdentifierNode } from '../ast/core/intermediate-ast/nodes/controllers/graphql/GraphQLControllerIdentifierNode.js';
import { GraphQLControllerNode } from '../ast/core/intermediate-ast/nodes/controllers/graphql/GraphQLControllerNode.js';
import { RESTControllerIdentifierNode } from '../ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerIdentifierNode.js';
import { RESTControllerNode } from '../ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerNode.js';
import { DomainServiceNode } from '../ast/core/intermediate-ast/nodes/domain-service/DomainServiceNode.js';
import { DomainEventDeclarationNode } from '../ast/core/intermediate-ast/nodes/DomainEvent/DomainEventDeclarationNode.js';
import { DomainRuleIdentifierNode } from '../ast/core/intermediate-ast/nodes/DomainRule/DomainRuleIdentifierNode.js';
import { DomainRuleNode } from '../ast/core/intermediate-ast/nodes/DomainRule/DomainRuleNode.js';
import { DTONode } from '../ast/core/intermediate-ast/nodes/DTO/DTONode.js';
import { EntityDeclarationNode } from '../ast/core/intermediate-ast/nodes/Entity/EntityDeclarationNode.js';
import { EntityIdentifierNode } from '../ast/core/intermediate-ast/nodes/Entity/EntityIdentifierNode.js';
import { ApplicationErrorNode } from '../ast/core/intermediate-ast/nodes/Error/ApplicationError.js';
import { DomainErrorNode } from '../ast/core/intermediate-ast/nodes/Error/DomainErrorNode.js';
import { ErrorIdentifierNode } from '../ast/core/intermediate-ast/nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import { DomainServiceEvaluationNode } from '../ast/core/intermediate-ast/nodes/Expression/Evaluation/DomainServiceEvaluationNode.js';
import { IntegrationEventNode } from '../ast/core/intermediate-ast/nodes/integration-event/IntegrationEventNode.js';
import { IntermediateASTNode } from '../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { PackageConcretionNode } from '../ast/core/intermediate-ast/nodes/package/PackageConcretionNode.js';
import { PackagePortIdentifierNode } from '../ast/core/intermediate-ast/nodes/package/packagePort/PackagePortIdentifierNode.js';
import { PackagePortNode } from '../ast/core/intermediate-ast/nodes/package/packagePort/PackagePortNode.js';
import { PropsNode } from '../ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { QueryDeclarationNode } from '../ast/core/intermediate-ast/nodes/query/QueryDeclarationNode.js';
import { ReadModelIdentifierNode } from '../ast/core/intermediate-ast/nodes/readModel/ReadModelIdentifierNode.js';
import { ReadModelNode } from '../ast/core/intermediate-ast/nodes/readModel/ReadModelNode.js';
import { RepoPortNode } from '../ast/core/intermediate-ast/nodes/repo-port/RepoPortNode.js';
import { RootEntityDeclarationNode } from '../ast/core/intermediate-ast/nodes/RootEntity/RootEntityDeclarationNode.js';
import { ServicePortNode } from '../ast/core/intermediate-ast/nodes/service-port/ServicePortNode.js';
import { BoundedContextModuleNode } from '../ast/core/intermediate-ast/nodes/setup/BoundedContextModuleNode.js';
import { ConcretedRepoPortNode } from '../ast/core/intermediate-ast/nodes/setup/repo/ConcretedRepoPortNode.js';
import { RepoAdapterOptionsNode } from '../ast/core/intermediate-ast/nodes/setup/repo/RepoAdapterOptionsNode.js';
import { RepoConnectionDefinitionNode } from '../ast/core/intermediate-ast/nodes/setup/repo/RepoConnectionDefinitionNode.js';
import { SetupRepoAdapterDefinitionNode } from '../ast/core/intermediate-ast/nodes/setup/repo/SetupRepoAdapterDefinitionNode.js';
import { RouterDefinitionNode } from '../ast/core/intermediate-ast/nodes/setup/RouterDefinitionNode.js';
import { ServerRouteNode } from '../ast/core/intermediate-ast/nodes/setup/ServerRouteNode.js';
import { UseCaseDefinitionNode } from '../ast/core/intermediate-ast/nodes/setup/UseCaseDefinitionNode.js';
import { StructNode } from '../ast/core/intermediate-ast/nodes/struct/StructNode.js';
import { UseCaseIdentifierNode } from '../ast/core/intermediate-ast/nodes/UseCase/UseCaseIdentifierNode.js';
import { ValueObjectDeclarationNode } from '../ast/core/intermediate-ast/nodes/valueObject/ValueObjectDeclarationNode.js';
import {
  bitloopsIdentifierError,
  concretedRepoPortError,
  domainRuleIdentifierError,
  entityIdentifierError,
  errorIdentifierError,
  graphQLControllerExecuteReturnTypeError,
  useCaseIdentifierCoreError,
  repoAdapterOptionsError,
  useCaseIdentifierSetupError,
  argumentError,
  packagePortIdentifierError,
  restControllerIdentifierError,
  restServerInstanceRouterError,
  graphQLControllerIdentifierError,
  readModelIdentifierError,
  boundedContextValidationError,
  domainServiceEvaluationError,
} from './validators/index.js';

export class SemanticAnalyzer implements IIntermediateASTValidator {
  private symbolTableCore: Record<string, Set<string>>;
  private symbolTableSetup: Record<string, Set<string>>;
  private errors: IntermediateASTValidationError[] = [];

  constructor() {
    this.symbolTableCore = {};
    this.symbolTableSetup = {};
  }

  validate(ast: IntermediateAST): void | IntermediateASTValidationError[] {
    this.createSymbolTablesCore(ast.core);
    this.validateCore(ast.core);
    // if (errors.length > 0) return errors;
    this.createSymbolTablesSetup(ast.setup);
    this.validateSetup(ast.setup);
    if (this.errors.length > 0) return this.errors;
  }

  private addError(...errors: IntermediateASTValidationError[]): void {
    this.errors.push(...errors);
  }

  private createSymbolTablesCore(core: TBoundedContexts): void {
    for (const [boundedContextName, boundedContext] of Object.entries(core)) {
      this.symbolTableCore[boundedContextName] = new Set();
      for (const ASTTree of Object.values(boundedContext)) {
        ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
          switch (node.getNodeType()) {
            case BitloopsTypesMapping.TRootEntity: {
              const identifierNode = (node as RootEntityDeclarationNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TEntity: {
              const identifierNode = (node as EntityDeclarationNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TProps: {
              const identifierNode = (node as PropsNode).getPropsIdentifierNode();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TValueObject: {
              const identifier = (node as ValueObjectDeclarationNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifier);
              break;
            }
            case BitloopsTypesMapping.TDomainError: {
              const identifierNode = (node as DomainErrorNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(
                'DomainErrors.' + identifierNode.getIdentifierName(),
              );
              break;
            }
            case BitloopsTypesMapping.TApplicationError: {
              const identifierNode = (node as ApplicationErrorNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(
                'ApplicationErrors.' + identifierNode.getIdentifierName(),
              );
              break;
            }
            case BitloopsTypesMapping.TDTO: {
              const identifierNode = (node as DTONode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TRepoPort: {
              const identifierNode = (node as RepoPortNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TUseCase: {
              const identifierNode = (node as UseCaseDefinitionNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TRESTController: {
              const identifierNode = (node as RESTControllerNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TStruct: {
              const identifierNode = (node as StructNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TGraphQLController: {
              const identifierNode = (node as GraphQLControllerNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TReadModel: {
              const identifierNode = (node as ReadModelNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TDomainRule: {
              const identifierNode = (node as DomainRuleNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TPackagePort: {
              const identifier = (node as PackagePortNode).identifier;
              this.symbolTableCore[boundedContextName].add(identifier);
              break;
            }
            case BitloopsTypesMapping.TCommand: {
              const identifierNode = (node as CommandDeclarationNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TQuery: {
              const identifierNode = (node as QueryDeclarationNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TDomainEvent: {
              const identifierNode = (node as DomainEventDeclarationNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TIntegrationEvent: {
              const identifier = (node as IntegrationEventNode).getIntegrationEventIdentifier();
              this.symbolTableCore[boundedContextName].add(identifier);
              break;
            }
            case BitloopsTypesMapping.TServicePort: {
              const identifierNode = (node as ServicePortNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
            case BitloopsTypesMapping.TDomainService: {
              const identifierNode = (node as DomainServiceNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
          }
        });
      }
    }
  }

  private createSymbolTablesSetup(
    setup: IntermediateASTSetup,
  ): void | IntermediateASTValidationError[] {
    for (const [fileId, ASTTree] of Object.entries(setup)) {
      this.symbolTableSetup[fileId] = new Set();
      ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
        switch (node.getNodeType()) {
          case BitloopsTypesMapping.TRepoConnectionDefinition: {
            const identifierNode = (node as RepoConnectionDefinitionNode).getIdentifier();
            this.symbolTableSetup[fileId].add(identifierNode.getIdentifierName());
            break;
          }
          case BitloopsTypesMapping.TSetupRepoAdapterDefinition: {
            const identifierNode = (node as SetupRepoAdapterDefinitionNode).getIdentifier();
            this.symbolTableSetup[fileId].add(identifierNode.getIdentifierName());
            break;
          }
          case BitloopsTypesMapping.TRouterDefinition: {
            const identifierNode = (node as RouterDefinitionNode).getIdentifier();
            this.symbolTableSetup[fileId].add(identifierNode.getIdentifierName());
            break;
          }
          case BitloopsTypesMapping.TUseCaseDefinition: {
            const identifierNode = (node as UseCaseDefinitionNode).getIdentifier();
            this.symbolTableSetup[fileId].add(identifierNode.getIdentifierName());
            break;
          }
          case BitloopsTypesMapping.TPackageConcretion: {
            const boundedContextModule = (node as PackageConcretionNode).getBoundedContextModule();
            const boundedContextNode = (
              boundedContextModule as BoundedContextModuleNode
            ).getBoundedContext();
            const boundedContext = boundedContextNode.getName();
            if (!(boundedContext in this.symbolTableCore)) {
              new boundedContextValidationError(boundedContextNode);
              break;
            }
            const identifierNode = (node as PackageConcretionNode).getPackageAdapterIdentifier();
            this.symbolTableSetup[fileId].add(identifierNode.getIdentifierName());
            break;
          }
        }
      });
    }
  }

  private validateCore(core: TBoundedContexts): void {
    for (const [boundedContextName, boundedContext] of Object.entries(core)) {
      for (const ASTTree of Object.values(boundedContext)) {
        this.validateNodes(ASTTree, boundedContextName);

        this.validateClassTypeNodesCore(ASTTree, boundedContextName);
      }
    }
  }

  private validateSetup(setup: IntermediateASTSetup): void {
    for (const [fileId, ASTTree] of Object.entries(setup)) {
      this.validateClassTypeNodesSetup(ASTTree, fileId);
    }
  }

  //isn't being used right now
  private validateNodes(ASTTree: IntermediateASTTree, boundedContextName: string): void {
    ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
      const validationRes = node.validate(this.symbolTableCore[boundedContextName]);
      if (IntermediateASTNode.isIntermediateASTNodeValidationError(validationRes))
        this.addError(validationRes);
    });
  }

  private validateClassTypeNodesCore(ASTTree: IntermediateASTTree, boundedContext: string): void {
    ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
      switch (node.getNodeType()) {
        case BitloopsTypesMapping.TBitloopsIdentifier:
          this.addError(
            ...bitloopsIdentifierError(
              node as BitloopsIdentifierTypeNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TEntityIdentifier:
          this.addError(
            ...entityIdentifierError(
              node as EntityIdentifierNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TReadModelIdentifier:
          this.addError(
            ...readModelIdentifierError(
              node as ReadModelIdentifierNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TErrorIdentifier:
          this.addError(
            ...errorIdentifierError(
              node as ErrorIdentifierNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TGraphQLControllerExecuteReturnType:
          this.addError(
            ...graphQLControllerExecuteReturnTypeError(
              node as GraphQLControllerExecuteReturnTypeNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TDomainRuleIdentifier:
          this.addError(
            ...domainRuleIdentifierError(
              node as DomainRuleIdentifierNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TUseCaseIdentifier: {
          this.addError(
            ...useCaseIdentifierCoreError(
              node as UseCaseIdentifierNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;
        }
        case BitloopsTypesMapping.TDomainServiceEvaluation: {
          this.addError(
            ...domainServiceEvaluationError(
              node as DomainServiceEvaluationNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;
        }
      }
    });
  }

  private validateClassTypeNodesSetup(ASTTree: IntermediateASTTree, fileId: string): void {
    ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
      switch (node.getNodeType()) {
        case BitloopsTypesMapping.TConcretedRepoPort:
          this.addError(
            ...concretedRepoPortError(node as ConcretedRepoPortNode, this.symbolTableCore),
          );
          break;

        case BitloopsTypesMapping.TRepoAdapterOptions:
          this.addError(
            ...repoAdapterOptionsError(
              node as RepoAdapterOptionsNode,
              this.symbolTableSetup[fileId],
            ),
          );
          break;

        case BitloopsTypesMapping.TUseCaseIdentifier: {
          this.addError(
            ...useCaseIdentifierSetupError(node as UseCaseIdentifierNode, this.symbolTableCore),
          );
          break;
        }
        case BitloopsTypesMapping.TRESTControllerIdentifier: {
          this.addError(
            ...restControllerIdentifierError(
              node as RESTControllerIdentifierNode,
              this.symbolTableCore,
            ),
          );
          break;
        }
        case BitloopsTypesMapping.TGraphQLControllerIdentifier: {
          this.addError(
            ...graphQLControllerIdentifierError(
              node as GraphQLControllerIdentifierNode,
              this.symbolTableCore,
            ),
          );
          break;
        }

        case BitloopsTypesMapping.TPackagePortIdentifier: {
          this.addError(
            ...packagePortIdentifierError(node as PackagePortIdentifierNode, this.symbolTableCore),
          );
          break;
        }
        case BitloopsTypesMapping.TRestServerInstanceRouter: {
          this.addError(
            ...restServerInstanceRouterError(
              node as ServerRouteNode,
              this.symbolTableSetup[fileId],
            ),
          );
          break;
        }
        case BitloopsTypesMapping.TArgument:
          this.addError(...argumentError(node as ArgumentNode, this.symbolTableSetup[fileId]));
          break;
      }
    });
  }
}
