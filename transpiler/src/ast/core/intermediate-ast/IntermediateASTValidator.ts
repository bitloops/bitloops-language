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
  private symbolTable: Record<string, boolean> = {}; //it must be different for each bounded context

  createSymbolTable(ast: IntermediateAST): void {
    const identifiers = ['entityIdentifier', 'propsIdentifier', 'valueObjectIdentifier']; // metadata too, maybe switch?
    for (const boundedContext of Object.values(ast.core)) {
      for (const ASTTree of Object.values(boundedContext)) {
        ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTIdentifierNode) => {
          if (identifiers.includes(node.getClassNodeName())) {
            this.symbolTable[node.getIdentifierName()] = true;
          }
        });
      }
    }
    console.log('SymbolTable', this.symbolTable);
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
        // case BitloopsTypesMapping.TValueObject:
        //   // privateMethod check should be in validate method of node
        //   const { create, privateMethod } = node.getComponents();
        //   const valueObjectEvaluation: VOEvaluationNode[] = ASTTree.getValueObjectEvaluations(node);
        //   for (const evaluation of valueObjectEvaluation) {
        // check with create method types
        // for(const check of semanticChecks) {
        //     ...checkMismsatchedTypes()
        // }
        // }
        case BitloopsTypesMapping.TBitloopsIdentifier:
          if (!symbolTable[node.getValue().bitloopsIdentifierType]) {
            // console.log('ERROR TO PUSH', node.getValue().bitloopsIdentifierType);
            errors.push(
              new IntermediateASTValidationError(
                `Type ${node.getValue().bitloopsIdentifierType} not found`,
              ),
            );
          }
          break; //add metadata

        case BitloopsTypesMapping.TDomainCreateParameterType:
          if (!symbolTable[node.getValue().parameterType]) {
            // console.log('ERROR TO PUSH', node.getValue().parameterType);
            errors.push(
              new IntermediateASTValidationError(`Type ${node.getValue().parameterType} not found`),
            );
          }
          break; //add metadata

        // case BitloopsTypesMapping.TEntity:
        // const { publicMethod } = node.getComponents();
        // const publicMethodEvaluations = node.getEntityRegularMethodEvaluation();
        // for (const evaluation of publicMethodEvaluations) {
        // check with privateMethod types
        // for(const check of semanticChecks) {
        //         ...checkMismsatchedTypes()
        // }
        // }
      }
    });
    return errors;
  }
}
