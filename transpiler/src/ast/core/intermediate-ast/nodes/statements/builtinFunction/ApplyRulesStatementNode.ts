import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { bitloopsPrimitivesObj } from '../../../../../../types.js';
import { ArgumentListNode } from '../../ArgumentList/ArgumentListNode.js';
import { ArgumentNode } from '../../ArgumentList/ArgumentNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { AppliedRuleNode } from './AppliedRuleNode.js';
import { BuiltInFunctionNode } from './BuiltinFunctionNode.js';

const classNodeName = 'applyRules';
export class ApplyRulesNode extends BuiltInFunctionNode {
  constructor(metadata: TNodeMetadata) {
    super(metadata);
    this.setClassNodeName(classNodeName);
    this.setNodeType(BitloopsTypesMapping.TApplyRules);
  }

  getArguments(): ArgumentNode[] {
    const argumentNode = this.getArgumentList();
    return argumentNode.arguments;
  }

  getArgumentList(): ArgumentListNode {
    const aplliedRuleNode = this.getChildren()[0] as AppliedRuleNode;
    const argumentNode = aplliedRuleNode
      .getChildren()
      .find(
        (node) => node.getNodeType() === BitloopsTypesMapping.TArgumentList,
      ) as ArgumentListNode;
    return argumentNode;
  }

  getInferredType(): string {
    return bitloopsPrimitivesObj.void;
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const argumentListNode = this.getArgumentList();
    argumentListNode.addToSymbolTable(symbolTableManager);
  }
}
