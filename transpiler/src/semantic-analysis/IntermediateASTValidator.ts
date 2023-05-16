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
  TBoundedContexts,
  ValidationError,
} from '../ast/core/types.js';
import { IntermediateASTTree } from '../ast/core/intermediate-ast/IntermediateASTTree.js';
import { ArgumentNode } from '../ast/core/intermediate-ast/nodes/ArgumentList/ArgumentNode.js';
import { BitloopsIdentifierTypeNode } from '../ast/core/intermediate-ast/nodes/BitloopsPrimaryType/BitloopsIdentifierTypeNode.js';
import { DomainRuleIdentifierNode } from '../ast/core/intermediate-ast/nodes/DomainRule/DomainRuleIdentifierNode.js';
import { EntityIdentifierNode } from '../ast/core/intermediate-ast/nodes/Entity/EntityIdentifierNode.js';
import { ApplicationErrorNode } from '../ast/core/intermediate-ast/nodes/Error/ApplicationError.js';
import { DomainErrorNode } from '../ast/core/intermediate-ast/nodes/Error/DomainErrorNode.js';
import { ErrorIdentifierNode } from '../ast/core/intermediate-ast/nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import { DomainServiceEvaluationNode } from '../ast/core/intermediate-ast/nodes/Expression/Evaluation/DomainServiceEvaluationNode.js';
import { IntegrationEventNode } from '../ast/core/intermediate-ast/nodes/integration-event/IntegrationEventNode.js';
import { IntermediateASTNode } from '../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { PackagePortNode } from '../ast/core/intermediate-ast/nodes/package/packagePort/PackagePortNode.js';
import { PropsNode } from '../ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { ReadModelIdentifierNode } from '../ast/core/intermediate-ast/nodes/readModel/ReadModelIdentifierNode.js';
import {
  bitloopsIdentifierError,
  domainRuleIdentifierError,
  errorIdentifierError,
  argumentError,
  readModelIdentifierError,
  domainServiceEvaluationError,
  entityIdentifierError,
} from './validators/index.js';
import { ClassTypeNode } from '../ast/core/intermediate-ast/nodes/ClassTypeNode.js';
import { TypeInferenceValidator } from './type-inference/TypeInferenceValidator.js';
// import { isIntermediateASTValidationErrors } from '../index.js';
import { TSymbolTableSemantics } from './type-inference/types.js';

const isIntermediateASTValidationErrors = (
  value: void | ValidationError[],
): value is ValidationError[] => {
  if (Array.isArray(value)) {
    for (const err of value) {
      if (!(err instanceof ValidationError)) {
        return false;
      }
    }
    return true;
  }
  return false;
};

export class SemanticAnalyzer implements IIntermediateASTValidator {
  private symbolTableCore: Record<string, Set<string>>;
  private symbolTableSetup: Record<string, Set<string>>;
  private errors: ValidationError[] = [];
  private typeInference: TypeInferenceValidator;

  constructor() {
    this.symbolTableCore = {};
    this.symbolTableSetup = {};
    this.typeInference = new TypeInferenceValidator();
  }

  validate(ast: IntermediateAST): void | ValidationError[] {
    this.createSymbolTablesCore(ast.core);
    this.validateCore(ast.core);
    this.validateSetup(ast.setup);

    const validationErrors: ValidationError[] = [];
    validationErrors.push(...this.errors);

    const typeInferenceValidation = this.typeInference.validate(ast);
    if (isIntermediateASTValidationErrors(typeInferenceValidation)) {
      validationErrors.push(...typeInferenceValidation);
    }
    if (validationErrors.length > 0) return validationErrors;
  }

  public getSymbolTable(ast: IntermediateAST): TSymbolTableSemantics {
    const validationResult = this.validate(ast);

    const semanticErrors: ValidationError[] = [];
    if (isIntermediateASTValidationErrors(validationResult)) {
      semanticErrors.push(...validationResult);
    }
    return {
      symbolTables: this.typeInference.getSymbolTable(ast),
      semanticErrors,
    };
  }

  private addError(...errors: ValidationError[]): void {
    this.errors.push(...errors);
  }

  private createSymbolTablesCore(core: TBoundedContexts): void {
    for (const [boundedContextName, boundedContext] of Object.entries(core)) {
      this.symbolTableCore[boundedContextName] = new Set();
      for (const ASTTree of Object.values(boundedContext)) {
        const classTypeNodes = ASTTree.getClassTypeNodes();

        for (const node of classTypeNodes) {
          switch (node.getNodeType()) {
            case BitloopsTypesMapping.TProps: {
              const identifierNode = (node as PropsNode).getPropsIdentifierNode();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
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
            case BitloopsTypesMapping.TPackagePort: {
              const identifier = (node as PackagePortNode).identifier;
              this.symbolTableCore[boundedContextName].add(identifier);
              break;
            }
            case BitloopsTypesMapping.TIntegrationEvent: {
              const identifier = (node as IntegrationEventNode).getIntegrationEventIdentifier();
              this.symbolTableCore[boundedContextName].add(identifier);
              break;
            }
            default: {
              const identifierNode = (node as ClassTypeNode).getIdentifier();
              this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
              break;
            }
          }
        }
      }
    }
  }

  private validateCore(core: TBoundedContexts): void {
    for (const [boundedContextName, boundedContext] of Object.entries(core)) {
      for (const ASTTree of Object.values(boundedContext)) {
        // this.validateNodes(ASTTree, boundedContextName);

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
  //   private validateNodes(ASTTree: IntermediateASTTree, boundedContextName: string): void {
  //     ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
  //       const validationRes = node.validate(this.symbolTableCore[boundedContextName]);
  //       if (IntermediateASTNode.isIntermediateASTNodeValidationError(validationRes))
  //         this.addError(validationRes);
  //     });
  //   }

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

        case BitloopsTypesMapping.TDomainRuleIdentifier:
          this.addError(
            ...domainRuleIdentifierError(
              node as DomainRuleIdentifierNode,
              this.symbolTableCore[boundedContext],
            ),
          );
          break;
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
        case BitloopsTypesMapping.TArgument:
          this.addError(...argumentError(node as ArgumentNode, this.symbolTableSetup[fileId]));
          break;
      }
    });
  }
}
