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
import { ArgumentNode } from './nodes/ArgumentList/ArgumentNode.js';
import { BitloopsIdentifierTypeNode } from './nodes/BitloopsPrimaryType/BitloopsIdentifierTypeNode.js';
import { GraphQLControllerExecuteReturnTypeNode } from './nodes/controllers/graphql/GraphQLControllerExecuteReturnTypeNode.js';
import { GraphQLControllerIdentifierNode } from './nodes/controllers/graphql/GraphQLControllerIdentifierNode.js';
import { GraphQLControllerNode } from './nodes/controllers/graphql/GraphQLControllerNode.js';
import { RESTControllerIdentifierNode } from './nodes/controllers/restController/RESTControllerIdentifierNode.js';
import { RESTControllerNode } from './nodes/controllers/restController/RESTControllerNode.js';
import { DomainCreateParameterTypeNode } from './nodes/Domain/DomainCreateParameterTypeNode.js';
import { DomainRuleIdentifierNode } from './nodes/DomainRule/DomainRuleIdentifierNode.js';
import { DomainRuleNode } from './nodes/DomainRule/DomainRuleNode.js';
import { DTONode } from './nodes/DTO/DTONode.js';
import { EntityDeclarationNode } from './nodes/Entity/EntityDeclarationNode.js';
import { EntityIdentifierNode } from './nodes/Entity/EntityIdentifierNode.js';
import { ApplicationErrorNode } from './nodes/Error/ApplicationError.js';
import { DomainErrorNode } from './nodes/Error/DomainErrorNode.js';
import { ErrorIdentifierNode } from './nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import {
  IntermediateASTNodeValidationError,
  IntermediateASTNode,
} from './nodes/IntermediateASTNode.js';
import { PackageConcretionNode } from './nodes/package/PackageConcretionNode.js';
import { PackagePortIdentifierNode } from './nodes/package/packagePort/PackagePortIdentifierNode.js';
import { PackagePortNode } from './nodes/package/packagePort/PackagePortNode.js';
import { PropsNode } from './nodes/Props/PropsNode.js';
import { ReadModelNode } from './nodes/readModel/ReadModel.js';
import { ReadModelIdentifierNode } from './nodes/readModel/ReadModelIdentifierNode.js';
import { RepoPortNode } from './nodes/repo-port/RepoPortNode.js';
import { RootEntityDeclarationNode } from './nodes/RootEntity/RootEntityDeclarationNode.js';
import { BoundedContextModuleNode } from './nodes/setup/BoundedContextModuleNode.js';
import { ConcretedRepoPortNode } from './nodes/setup/repo/ConcretedRepoPortNode.js';
import { RepoAdapterOptionsNode } from './nodes/setup/repo/RepoAdapterOptionsNode.js';
import { RepoConnectionDefinitionNode } from './nodes/setup/repo/RepoConnectionDefinitionNode.js';
import { SetupRepoAdapterDefinitionNode } from './nodes/setup/repo/SetupRepoAdapterDefinitionNode.js';
import { RouterDefinitionNode } from './nodes/setup/RouterDefinitionNode.js';
import { ServerRouteNode } from './nodes/setup/ServerRouteNode.js';
import { UseCaseDefinitionNode } from './nodes/setup/UseCaseDefinitionNode.js';
import { StructNode } from './nodes/struct/StructNode.js';
import { UseCaseIdentifierNode } from './nodes/UseCase/UseCaseIdentifierNode.js';
import { ValueObjectDeclarationNode } from './nodes/valueObject/ValueObjectDeclarationNode.js';
import {
  bitloopsIdentifierError,
  concretedRepoPortError,
  domainCreateParameterTypeError,
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
} from './validators/index.js';

export class IntermediateASTValidator implements IIntermediateASTValidator {
  private symbolTableCore: Record<string, Set<string>>;
  private symbolTableSetup: Record<string, Set<string>>;

  constructor() {
    this.symbolTableCore = {};
    this.symbolTableSetup = {};
  }

  validate(ast: IntermediateAST): void | IntermediateASTValidationError[] {
    this.createSymbolTablesCore(ast.core);
    const errors: IntermediateASTValidationError[] = [];
    errors.push(...this.validateCore(ast.core));
    // if (errors.length > 0) return errors;
    this.createSymbolTablesSetup(ast.setup);
    errors.push(...this.validateSetup(ast.setup));
    if (errors.length > 0) return errors;
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
          errors.push(
            ...bitloopsIdentifierError(
              node as BitloopsIdentifierTypeNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TEntityIdentifier:
          errors.push(
            ...entityIdentifierError(
              node as EntityIdentifierNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TReadModelIdentifier:
          errors.push(
            ...readModelIdentifierError(
              node as ReadModelIdentifierNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TDomainCreateParameterType:
          errors.push(
            ...domainCreateParameterTypeError(
              node as DomainCreateParameterTypeNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TErrorIdentifier:
          errors.push(
            ...errorIdentifierError(
              node as ErrorIdentifierNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TGraphQLControllerExecuteReturnType:
          errors.push(
            ...graphQLControllerExecuteReturnTypeError(
              node as GraphQLControllerExecuteReturnTypeNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TDomainRuleIdentifier:
          errors.push(
            ...domainRuleIdentifierError(
              node as DomainRuleIdentifierNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TUseCaseIdentifier: {
          errors.push(
            ...useCaseIdentifierCoreError(
              node as UseCaseIdentifierNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;
        }
      }
    });
    return errors;
  }

  private validateClassTypeNodesSetup(
    ASTTree: IntermediateASTTree,
    fileId: string,
  ): IntermediateASTNodeValidationError[] {
    const errors: IntermediateASTNodeValidationError[] = [];
    ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
      switch (node.getNodeType()) {
        case BitloopsTypesMapping.TConcretedRepoPort:
          errors.push(
            ...concretedRepoPortError(node as ConcretedRepoPortNode, this.symbolTableCore),
          );
          break;

        case BitloopsTypesMapping.TRepoAdapterOptions:
          errors.push(
            ...repoAdapterOptionsError(
              node as RepoAdapterOptionsNode,
              this.symbolTableSetup[fileId],
            ),
          );
          break;

        case BitloopsTypesMapping.TUseCaseIdentifier: {
          errors.push(
            ...useCaseIdentifierSetupError(node as UseCaseIdentifierNode, this.symbolTableCore),
          );
          break;
        }
        case BitloopsTypesMapping.TRESTControllerIdentifier: {
          errors.push(
            ...restControllerIdentifierError(
              node as RESTControllerIdentifierNode,
              this.symbolTableCore,
            ),
          );
          break;
        }
        case BitloopsTypesMapping.TGraphQLControllerIdentifier: {
          errors.push(
            ...graphQLControllerIdentifierError(
              node as GraphQLControllerIdentifierNode,
              this.symbolTableCore,
            ),
          );
          break;
        }

        case BitloopsTypesMapping.TPackagePortIdentifier: {
          errors.push(
            ...packagePortIdentifierError(node as PackagePortIdentifierNode, this.symbolTableCore),
          );
          break;
        }
        case BitloopsTypesMapping.TRestServerInstanceRouter: {
          errors.push(
            ...restServerInstanceRouterError(
              node as ServerRouteNode,
              this.symbolTableSetup[fileId],
            ),
          );
          break;
        }
        case BitloopsTypesMapping.TArgument:
          errors.push(...argumentError(node as ArgumentNode, this.symbolTableSetup[fileId]));
          break;
      }
    });
    return errors;
  }
}
