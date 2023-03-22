import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { SwitchRegularCaseNode } from '../../../nodes/statements/SwitchStatement/SwitchCase.js';
import { SwitchCasesNode } from '../../../nodes/statements/SwitchStatement/SwitchCases.js';
import { IBuilder } from '../../IBuilder.js';

export class SwitchCasesBuilder implements IBuilder<SwitchCasesNode> {
  private switchCasesNode: SwitchCasesNode;
  private regularCases: SwitchRegularCaseNode[];

  constructor(metadata: TNodeMetadata) {
    this.switchCasesNode = new SwitchCasesNode(metadata);
  }

  public withRegularCases(cases: SwitchRegularCaseNode[]): SwitchCasesBuilder {
    this.regularCases = cases;
    return this;
  }

  public build(): SwitchCasesNode {
    for (const switchCase of this.regularCases) {
      this.switchCasesNode.addChild(switchCase);
    }
    this.switchCasesNode.buildArrayValue();

    return this.switchCasesNode;
  }
}
