import { ErrorParametersNode } from '../../nodes/Error/parameters.js';
import { ParameterListNode } from '../../nodes/ParameterList/ParameterListNode.js';
import { IBuilder } from '../IBuilder.js';

// THis type will change to something like = { evaluationField: { name: string } & TExpression }
// export type TEvaluationField = ({ name: string } & TExpression)[];

export class ErrorParametersNodeBuilder implements IBuilder<ErrorParametersNode> {
  private parametersNode: ErrorParametersNode;
  private parameters: ParameterListNode;
  constructor() {
    this.parametersNode = new ErrorParametersNode();
  }
  withParameterList(parameters: ParameterListNode): ErrorParametersNodeBuilder {
    this.parameters = parameters;
    return this;
  }
  build(): ErrorParametersNode {
    this.parametersNode.addChild(this.parameters);
    this.parametersNode.buildObjectValue();
    return this.parametersNode;
  }
}
