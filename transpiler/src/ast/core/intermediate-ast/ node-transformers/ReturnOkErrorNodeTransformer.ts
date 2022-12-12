import { ReturnOkErrorTypeNode } from '../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class ReturnOKErrorNodeTransformer extends NodeModelToTargetASTTransformer<ReturnOkErrorTypeNode> {
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
