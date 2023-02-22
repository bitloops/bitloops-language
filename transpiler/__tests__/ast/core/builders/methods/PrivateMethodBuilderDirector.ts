import {
  TBitloopsIdentifier,
  TBitloopsPrimaryType,
  TBitloopsPrimitives,
  TDomainPrivateMethod,
  TStatements,
} from '../../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from '../bitloopsPrimaryTypeDirector.js';
import { IdentifierBuilder } from '../identifier.js';
import { ParameterListBuilderDirector } from '../parameterListBuilderDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from '../returnOkErrorTypeBuilderDirector.js';
import { StatementDirector } from '../statement/statementDirector.js';
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
      .withPrimaryReturnType(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('bool'))
      .withStatements(new StatementListDirector().buildOneBooleanReturnStatement(booleanValue))
      .build();
  }

  buildStaticMethodWithInputPropsAndPrimitiveReturnType({
    propsType,
    methodName,
    returnType,
    statements,
  }: {
    propsType: TBitloopsIdentifier;
    methodName: string;
    returnType: TBitloopsPrimitives;
    statements: TStatements;
  }): TDomainPrivateMethod {
    return this.builder
      .withIdentifier(new IdentifierBuilder().withName(methodName).build())
      .withParameters(
        new ParameterListBuilderDirector().buildParameterListWithOneParameter({
          parameterIdentifier: 'props',
          parameterType: propsType,
        }),
      )
      .withPrimaryReturnType(
        new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType(returnType),
      )
      .withStatements(statements)
      .withStatic(true)
      .build();
  }

  buildMethodOkErrorReturnTypeWithNoStatements(methodName: string): TDomainPrivateMethod {
    return this.builder
      .withIdentifier(new IdentifierBuilder().withName(methodName).build())
      .withParameters({ parameters: [] })
      .withOkErrorReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithPrimitiveOkAndNoErrors('void'),
      )
      .withStatements([new StatementDirector().buildEmptyReturnOK()])
      .build();
  }

  buildMethodWithStringParamsPrimaryReturnTypeAndStatements({
    methodName,
    paramName,
    statements,
    primaryReturnType,
  }: {
    methodName: string;
    paramName: string;
    statements: TStatements;
    primaryReturnType: TBitloopsPrimaryType;
  }): TDomainPrivateMethod {
    return this.builder
      .withIdentifier(new IdentifierBuilder().withName(methodName).build())
      .withParameters(new ParameterListBuilderDirector().buildStringParams(paramName))
      .withPrimaryReturnType(primaryReturnType)
      .withStatements(statements)
      .build();
  }
}
