import { TBoundedContexts } from '../../../types.js';
import { IIntermediateASTValidator, IntermediateASTValidationError } from '../types.js';
import { IntermediateASTTree } from './IntermediateASTTree.js';
import {
  IntermediateASTNodeValidationError,
  IntermediateASTNode,
} from './nodes/IntermediateASTNode.js';

export class IntermediateASTValidator implements IIntermediateASTValidator {
  validate(ast: TBoundedContexts): void | IntermediateASTValidationError[] {
    const errors: IntermediateASTValidationError[] = [];
    for (const boundedContext of Object.values(ast)) {
      for (const ASTTree of Object.values(boundedContext)) {
        errors.push(...this.validateNodes(ASTTree));

        errors.push(...this.validateClassTypeNodes(ASTTree));
      }
    }

    if (errors.length > 0) return errors;
  }

  private validateNodes(ASTTree: IntermediateASTTree): IntermediateASTNodeValidationError[] {
    const errors: IntermediateASTNodeValidationError[] = [];
    ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
      const validationRes = node.validate();
      if (IntermediateASTNode.isIntermediateASTNodeValidationError(validationRes))
        errors.push(validationRes);
    });
    return errors;
  }

  private validateClassTypeNodes(_ASTTree: IntermediateASTTree) {
    const errors: IntermediateASTNodeValidationError[] = [];
    // ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
    //   switch (node.getNodeType()) {
    //     case BitloopsTypesMapping.TValueObjects:
    //      // privateMethod check should be in validate method of node
    //         const { create, privateMethod } = node.getComponents();
    //         const valueObjectEvaluation: VOEvaluationNode[] = ASTTree.getValueObjectEvaluations(node);
    //         for(const evaluation of valueObjectEvaluation) {
    //             // check with create method types
    //             for(const check of semanticChecks) {
    //                 ...checkMismsatchedTypes()
    //             }
    //         }
    //      case BitloopsTypesMapping.TEntities:
    //          const { publicMethod } = node.getComponents();
    //         const publicMethodEvaluations  = node.getEntityRegularMethodEvaluation();
    //         for(const evaluation of publicMethodEvaluations) {
    //             // check with privateMethod types
    //             for(const check of semanticChecks) {
    //                     ...checkMismsatchedTypes()
    //             }
    //         }
    //   }
    // });
    return errors;
  }
}
