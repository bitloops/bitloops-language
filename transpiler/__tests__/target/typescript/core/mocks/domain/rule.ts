import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ParameterListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import { StatementListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/StatementList.js';
import { ExpressionBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/expressionNodeBuilderDirector.js';
import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { ParameterListBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/parameterListDirector.js';
import { StatementListBuilderDirector } from '../../builders/statement/statementListDirector.js';

type TTestType = {
  description: string;
  identifier: string;
  parameterList: ParameterListNode;
  isBrokenIfCondition: ExpressionNode;
  statements?: StatementListNode;
  errorIdentifier: string;
  output: string;
};

export const VALID_DOMAIN_RULES: TTestType[] = [
  {
    description: 'valid domain rule with statements',
    identifier: 'validDomainRule',
    parameterList: new ParameterListBuilderDirector().buildParams(
      new ParameterBuilderDirector().buildPrimitiveParameter('param1', 'string'),
      new ParameterBuilderDirector().buildPrimitiveParameter('param2', 'string'),
    ),
    statements: new StatementListBuilderDirector().buildThisAssignmentExpression('x'),
    isBrokenIfCondition: new ExpressionBuilderDirector().buildEqualityExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('param1'),
      new ExpressionBuilderDirector().buildIdentifierExpression('param2'),
    ),
    errorIdentifier: 'DomainErrors.errIdError',
    output: `import { Domain } from '@bitloops/bl-boilerplate-core';
            import { DomainErrors } from '../errors/index';
            export class validDomainRule implements Domain.IRule {
            constructor(private param1: string, private param2: string) {}
            public Error = new DomainErrors.errIdError(this.param1, this.param2);
            public isBrokenIf(): boolean {
            this.x = x;
            return this.param1 === this.param2;
            }}`,
  },
  {
    description: 'valid domain rule without statements',
    identifier: 'validDomainRule',
    parameterList: new ParameterListBuilderDirector().buildParams(
      new ParameterBuilderDirector().buildPrimitiveParameter('param1', 'string'),
      new ParameterBuilderDirector().buildPrimitiveParameter('param2', 'string'),
    ),
    isBrokenIfCondition: new ExpressionBuilderDirector().buildEqualityExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('param1'),
      new ExpressionBuilderDirector().buildIdentifierExpression('param2'),
    ),
    errorIdentifier: 'DomainErrors.errIdError',
    output: `import { Domain } from '@bitloops/bl-boilerplate-core';
            import { DomainErrors } from '../errors/index';
            export class validDomainRule implements Domain.IRule {
            constructor(private param1: string, private param2: string) {}
            public Error = new DomainErrors.errIdError(this.param1, this.param2);
            public isBrokenIf(): boolean {
            return this.param1 === this.param2;
            }}`,
  },
];
