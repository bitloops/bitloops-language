import { TDomainPrivateMethod } from '../../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from '../bitloopsPrimaryTypeDirector.js';
import { IdentifierBuilder } from '../identifier.js';
import { ParameterListBuilderDirector } from '../parameterListBuilderDirector.js';
import { StatementListDirector } from '../statement/statementListDirector.js';
import { PrivateMethodBuilder } from './PrivateMethodBuilder.js';

export class PrivateMethodBuilderDirector {
  private builder: PrivateMethodBuilder;

  constructor() {
    this.builder = new PrivateMethodBuilder();
  }

  buildMethodWithStringParamsAndBooleanReturnType({
    booleanValue,
    methodName,
    paramName,
  }: {
    booleanValue: boolean;
    methodName: string;
    paramName: string;
  }): TDomainPrivateMethod {
    return this.builder
      .withIdentifier(new IdentifierBuilder().withName(methodName).build())
      .withParameters(new ParameterListBuilderDirector().buildStringParams(paramName))
      .withReturnType(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('bool'))
      .withStatements(new StatementListDirector().buildOneBooleanReturnStatement(booleanValue))
      .build();
  }
}
