import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterNode } from './ParameterNode.js';

const NAME = 'parameters';

export class ParameterListNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TParameterList, metadata, NAME);
  }

  getIdentifiers(): string[] {
    return this.getChildren().map((child: ParameterNode) => child.getIdentifier());
  }

  getParameters(): ParameterNode[] {
    return this.getChildren() as ParameterNode[];
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const params = this.getParameters();
    let position = 0;
    params.forEach((paramNode) => {
      paramNode.addToSymbolTable(symbolTableManager, position);
      position++;
    });
  }

  getParameterNodeType(identifier: string): string {
    const parameterNodes = this.getParameters();
    for (const parameterNode of parameterNodes) {
      const parameterIdentifier = parameterNode.getIdentifier();
      if (parameterIdentifier === identifier) {
        const typeNode = parameterNode.getType();
        return typeNode.getInferredType();
      }
    }
    return SymbolTableManager.UNKNOWN_TYPE;
  }

  addClassTypeParametersToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const params = this.getParameters();
    params.forEach((paramNode) => {
      paramNode.addClassTypeParameterToSymbolTable(symbolTableManager);
    });
  }
}
