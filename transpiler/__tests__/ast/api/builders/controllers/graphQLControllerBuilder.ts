import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  GraphQLControllerIdentifier,
  TGraphQLController,
  TGraphQLControllerExecute,
  TGraphQLOperation,
  TParameterList,
} from '../../../../../src/types.js';

export class GraphQLControllerBuilder implements IBuilder<TGraphQLController> {
  private identifierName: GraphQLControllerIdentifier;

  private inputType: null | string;

  private operationType: TGraphQLOperation;
  private execute: TGraphQLControllerExecute;
  private parameters: TParameterList;

  public withIdentifier(identifierName: GraphQLControllerIdentifier): GraphQLControllerBuilder {
    this.identifierName = identifierName;
    return this;
  }

  withInputType(inputType: null | string): GraphQLControllerBuilder {
    this.inputType = inputType;
    return this;
  }

  withOperationType(operationType: TGraphQLOperation): GraphQLControllerBuilder {
    this.operationType = operationType;
    return this;
  }

  public withExecute(execute: TGraphQLControllerExecute): GraphQLControllerBuilder {
    this.execute = execute;
    return this;
  }

  public withParameterList(parameters: TParameterList): GraphQLControllerBuilder {
    this.parameters = parameters;
    return this;
  }

  public build(): TGraphQLController {
    return {
      GraphQLController: {
        graphQLControllerIdentifier: this.identifierName,
        inputType: this.inputType,
        operationType: this.operationType,
        execute: this.execute,
        ...this.parameters,
        operationName: this.getOperationName(this.identifierName),
      },
    };
  }

  // Operation name is auto-generated from the controller name
  private getOperationName = (controllerName: string): string => {
    const suffixLength = 'Controller'.length;
    const operationNamePascal = controllerName.substring(0, controllerName.length - suffixLength);
    const operationName =
      operationNamePascal.charAt(0).toLowerCase() + operationNamePascal.slice(1);
    return operationName;
  };
}
