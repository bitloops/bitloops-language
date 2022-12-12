import { UseCaseNode } from '../nodes/UseCase/UseCaseNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class ReturnOKErrorNodeTransformer extends NodeModelToTargetASTTransformer<UseCaseNode> {
  run(): void {
    this.modifyReturnOKErrorStatements();
    this.addReturnOkVoidStatement();
  }

  private modifyReturnOKErrorStatements(): void {
    console.log(this.node);
  }

  private addReturnOkVoidStatement(): void {
    console.log(this.node);
  }
}
