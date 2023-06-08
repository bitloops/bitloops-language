import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ParameterListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import { StatementListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/StatementList.js';
import { ExpressionBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/expressionNodeBuilderDirector.js';
import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { ParameterListNodeBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/parameterListNodeBuilderDirector.js';
import { StatementListBuilderDirector } from '../../builders/statement/statementListDirector.js';
import { ArgumentListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { ArgumentListDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/argumentList.js';

type TTestType = {
  description: string;
  identifier: string;
  parameterList: ParameterListNode;
  isBrokenIfCondition: ExpressionNode;
  statements?: StatementListNode;
  errorArguments?: ArgumentListNode;
  errorIdentifier: string;
  output: string;
};

export const VALID_DOMAIN_RULES: TTestType[] = [
  {
    description: 'valid domain rule with statements',
    identifier: 'validDomainRule',
    parameterList: new ParameterListNodeBuilderDirector().buildParams(
      new ParameterBuilderDirector().buildPrimitiveParameter('param1', 'string'),
      new ParameterBuilderDirector().buildPrimitiveParameter('param2', 'string'),
    ),
    statements: new StatementListBuilderDirector().buildConstDeclarationOfIdentifierExpression(
      'x',
      'param1',
    ),
    isBrokenIfCondition: new ExpressionBuilderDirector().buildEqualityExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('param1'),
      new ExpressionBuilderDirector().buildIdentifierExpression('param2'),
    ),
    errorArguments: new ArgumentListDirector().buildArgumentListWithIdentifiers('param1', 'param2'),
    errorIdentifier: 'DomainErrors.errIdError',
    output: `
    import { Domain } from '@bitloops/bl-boilerplate-core';
    import { DomainErrors } from '../errors/index';
    export class validDomainRule implements Domain.IRule {
      constructor(private param1: string, private param2: string) {}

      public Error: DomainErrors.errIdError;

      public isBrokenIf(): boolean {
        const x = this.param1;

        this.Error = new DomainErrors.errIdError(this.param1, this.param2);
        return this.param1 === this.param2;
      }
    }`,
  },
  {
    description: 'valid domain rule without statements',
    identifier: 'validDomainRule',
    parameterList: new ParameterListNodeBuilderDirector().buildParams(
      new ParameterBuilderDirector().buildPrimitiveParameter('param1', 'string'),
      new ParameterBuilderDirector().buildPrimitiveParameter('param2', 'string'),
    ),
    isBrokenIfCondition: new ExpressionBuilderDirector().buildEqualityExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('param1'),
      new ExpressionBuilderDirector().buildIdentifierExpression('param2'),
    ),
    errorArguments: new ArgumentListDirector().buildArgumentListWithIdentifiers('param1', 'param2'),

    errorIdentifier: 'DomainErrors.errIdError',
    output: `
    import { Domain } from '@bitloops/bl-boilerplate-core';
    import { DomainErrors } from '../errors/index';
    export class validDomainRule implements Domain.IRule {
      constructor(private param1: string, private param2: string) {}

      public Error: DomainErrors.errIdError;

      public isBrokenIf(): boolean {
        this.Error = new DomainErrors.errIdError(this.param1, this.param2);
        return this.param1 === this.param2;
      }
    }`,
  },
  {
    description:
      'valid domain rule with statements, and 2 error arguments, one is rule parameter and the other a local const variable',
    identifier: 'validDomainRule',
    parameterList: new ParameterListNodeBuilderDirector().buildParams(
      new ParameterBuilderDirector().buildPrimitiveParameter('param1', 'string'),
      new ParameterBuilderDirector().buildPrimitiveParameter('param2', 'string'),
    ),
    statements: new StatementListBuilderDirector().buildConstDeclarationOfIdentifierExpression(
      'constVar',
      'param2',
    ),
    isBrokenIfCondition: new ExpressionBuilderDirector().buildEqualityExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('param1'),
      new ExpressionBuilderDirector().buildIdentifierExpression('constVar'),
    ),
    errorArguments: new ArgumentListDirector().buildArgumentListWithIdentifiers(
      'param1',
      'constVar',
    ),
    errorIdentifier: 'DomainErrors.errIdError',
    output: `
    import { Domain } from '@bitloops/bl-boilerplate-core';
    import { DomainErrors } from '../errors/index';
    export class validDomainRule implements Domain.IRule {
      constructor(private param1: string, private param2: string) {}

      public Error: DomainErrors.errIdError;

      public isBrokenIf(): boolean {
        const constVar = this.param2;

        this.Error = new DomainErrors.errIdError(this.param1, constVar);
        return this.param1 === constVar;
      }
    }`,
  },
];
