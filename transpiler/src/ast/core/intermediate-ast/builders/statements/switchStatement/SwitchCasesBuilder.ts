import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { SwitchRegularCaseNode } from '../../../nodes/statements/SwitchStatement/SwitchCase.js';
import { SwitchCaseListNode } from '../../../nodes/statements/SwitchStatement/SwitchCases.js';
import { IBuilder } from '../../IBuilder.js';

export class SwitchCasesBuilder implements IBuilder<SwitchCaseListNode> {
  private switchCasesNode: SwitchCaseListNode;
  private regularCases: SwitchRegularCaseNode[];

  constructor(metadata: TNodeMetadata) {
    this.switchCasesNode = new SwitchCaseListNode(metadata);
  }

  public withRegularCases(cases: SwitchRegularCaseNode[]): SwitchCasesBuilder {
    this.regularCases = cases;
    return this;
  }

  public build(): SwitchCaseListNode {
    for (const switchCase of this.regularCases) {
      this.switchCasesNode.addChild(switchCase);
    }
    this.switchCasesNode.buildArrayValue();

    return this.switchCasesNode;
  }
}
