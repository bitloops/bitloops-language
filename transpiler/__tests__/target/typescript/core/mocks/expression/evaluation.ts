import { ArgumentNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentNodeBuilder.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFIeld.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { EvaluationFieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { EntityEvaluationBuilderDirector } from '../../builders/domainEvaluation/entityEvaluation.js';

import { EvaluationBuilderDirector } from '../../builders/evaluation.js';
import { ValueObjectEvaluationBuilderDirector } from '../../builders/domainEvaluation/valueObjectEvaluation.js';
import { DTOIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/DTO/DTOIdentifierNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';

export const VALID_EVALUATION_TEST_CASES = [
  {
    description: 'Simple struct expression with one field',
    evaluation: new EvaluationBuilderDirector().buildStructEvaluation('PersonStruct', [
      new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
        'message',
        'Hello, World!',
      ),
    ]),
    output: "{ message:'Hello, World!'} ",
  },
  {
    description: 'Nested Struct expression with one field',
    evaluation: new EvaluationBuilderDirector().buildStructEvaluation('OuterStruct', [
      new EvaluationFieldBuilderDirector().buildEvaluationField(
        'outer',

        new ExpressionBuilderDirector().buildEvaluationExpression(
          new EvaluationBuilderDirector().buildStructEvaluation('MessageStruct', [
            new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
              'message',
              'Hello, World!',
            ),
          ]),
        ),
      ),
    ]),
    output: "{ outer: { message:'Hello, World!'} }",
  },
  {
    description: 'Entity evaluation with one argument',
    evaluation: new EvaluationBuilderDirector().buildEntityEvaluation(
      'TodoEntity',
      new EvaluationFieldListNodeBuilder()
        .withEvaluationFields([
          new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
            'name',
            'superMarketList',
          ),
        ])
        .build(),
    ),
    output: "TodoEntity.create({name: 'superMarketList'})",
  },
  {
    description: 'Value object evaluation with identifier expression',
    evaluation: new EvaluationBuilderDirector().buildValueObjectEvaluation(
      'AddressVO',
      new ExpressionBuilderDirector().buildIdentifierExpression('addressProps'),
    ),
    output: 'AddressVO.create(addressProps)',
  },
  {
    description: 'Command evaluation',
    evaluation: new EvaluationBuilderDirector().buildCommandEvaluation(
      new IdentifierNodeBuilder().withName('AddCourseCommand').build(),
      new EvaluationFieldListNodeBuilder()
        .withEvaluationFields([
          new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField('course', 'Math'),
        ])
        .build(),
    ),
    output: "new AddCourseCommand({course: 'Math'})",
  },
  {
    description: 'Query evaluation with args',
    evaluation: new EvaluationBuilderDirector().buildQueryEvaluation(
      new IdentifierNodeBuilder().withName('GetTodoQuery').build(),
      new EvaluationFieldListNodeBuilder()
        .withEvaluationFields([
          new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField('type', 'task'),
        ])
        .build(),
    ),
    output: "new GetTodoQuery({type: 'task'})",
  },
  {
    description: 'Query evaluation without args',
    evaluation: new EvaluationBuilderDirector().buildQueryEvaluation(
      new IdentifierNodeBuilder().withName('GetTodoQuery').build(),
    ),
    output: 'new GetTodoQuery()',
  },
  {
    description: 'Integration event evaluation with one argument',
    evaluation: new EvaluationBuilderDirector().buildIntegrationEventEvaluation(
      'TodoCreatedIntegrationEvent',
      new EvaluationFieldListNodeBuilder()
        .withEvaluationFields([
          new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
            'name',
            'superMarketList',
          ),
        ])
        .build(),
    ),
    output: "TodoCreatedIntegrationEvent.create({name: 'superMarketList'})",
  },
  {
    description: 'Entity constructor evaluation with identifier expression',
    evaluation: new EvaluationBuilderDirector().buildEntityConstructorEvaluationWithExpression(
      'TodoEntity',
      new ExpressionBuilderDirector().buildIdentifierExpression('todoProps'),
    ),
    output: 'new TodoEntity(todoProps)',
  },
];

export const VALID_ERROR_EVALUATION_TEST_CASES = [
  {
    description: 'Error evaluation with no arguments',
    evaluation: new EvaluationBuilderDirector().buildErrorEvaluation(
      'DomainErrors.InvalidTitleError',
    ),
    output: 'new DomainErrors.InvalidTitleError()',
  },
  {
    description: 'Error evaluation with arguments',
    evaluation: new EvaluationBuilderDirector().buildErrorEvaluation(
      'DomainErrors.InvalidTitleError',
      new ArgumentListDirector().buildArgumentListWithArgs([
        new ArgumentNodeBuilder()
          .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression('response'))
          .build(),
        new ArgumentNodeBuilder()
          .withExpression(
            new ExpressionBuilderDirector().buildMemberDotExpression(
              new ExpressionBuilderDirector().buildIdentifierExpression('result'),
              'message',
            ),
          )
          .build(),
      ]),
    ),
    output: 'new DomainErrors.InvalidTitleError(response,result.message)',
  },
  {
    description: 'Application Error evaluation with one argument',
    evaluation: new EvaluationBuilderDirector().buildErrorEvaluation(
      'ApplicationErrors.InvalidTitleError',
      new ArgumentListDirector().buildArgumentListWithArgs([
        new ArgumentNodeBuilder()
          .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression('title'))
          .build(),
      ]),
    ),
    output: 'new ApplicationErrors.InvalidTitleError(title) ',
  },
];

export const VALID_BUILTIN_CLASS_EVALUATION_TEST_CASES = [
  {
    description: 'UUID with an id argument',
    evaluation: new EvaluationBuilderDirector().buildBuiltInClassEvaluation(
      'UUIDv4',
      new ArgumentListDirector().buildArgumentListWithArgs([
        new ArgumentNodeBuilder()
          .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression('id'))
          .build(),
      ]),
    ),
    output: 'new Domain.UUIDv4(id)',
  },
  {
    description: 'UUID with a member dot expression argument',
    evaluation: new EvaluationBuilderDirector().buildBuiltInClassEvaluation(
      'UUIDv4',
      new ArgumentListDirector().buildArgumentListWithArgs([
        new ArgumentNodeBuilder()
          .withExpression(
            new ExpressionBuilderDirector().buildMemberDotExpression(
              new ExpressionBuilderDirector().buildIdentifierExpression('whatever'),
              'id',
            ),
          )
          .build(),
      ]),
    ),
    output: 'new Domain.UUIDv4(whatever.id)',
  },
];

export const VALID_ENTITY_EVALUATION_TEST_CASES = [
  {
    description: 'Entity evaluation with field list',
    entityEvaluation: new EntityEvaluationBuilderDirector().buildEntityEvaluationWithFieldList(
      'TodoEntity',
      new EvaluationFieldListNodeBuilder()
        .withEvaluationFields([
          new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
            'name',
            'superMarketList',
          ),
        ])
        .build(),
    ),
    output: "TodoEntity.create({name: 'superMarketList'})",
  },
  {
    description: 'Entity evaluation with field list multilpe arguments',
    entityEvaluation: new EntityEvaluationBuilderDirector().buildEntityEvaluationWithFieldList(
      'TodoEntity',
      new EvaluationFieldListNodeBuilder()
        .withEvaluationFields([
          new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
            'name',
            'superMarketList',
          ),
          new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
            'description',
            'todo super list',
          ),
        ])
        .build(),
    ),
    output: "TodoEntity.create({name: 'superMarketList', description: 'todo super list'})",
  },
  {
    description: 'Entity evaluation with identifier expression',
    entityEvaluation: new EntityEvaluationBuilderDirector().buildEntityEvaluationWithExpression(
      'TodoEntity',
      new ExpressionBuilderDirector().buildIdentifierExpression('todoProps'),
    ),
    output: 'TodoEntity.create(todoProps)',
  },
];

export const VALID_DTO_EVALUATION_TEST_CASES = [
  {
    description: 'DTO evaluation',
    evaluation: new EvaluationBuilderDirector().buildDTOEvaluation(
      new DTOIdentifierNodeBuilder().withName('AddCourseDTO').build(),
      new EvaluationFieldListNodeBuilder()
        .withEvaluationFields([
          new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField('course', 'Math'),
        ])
        .build(),
    ),
    output: "{course: 'Math'}",
  },
];

export const VALID_VALUE_OBJECT_EVALUATION_TEST_CASES = [
  {
    description: 'Value object evaluation with field list',
    valueObjectEvaluation:
      new ValueObjectEvaluationBuilderDirector().buildValueObjectEvaluationWithFieldList(
        'AddressVO',
        new EvaluationFieldListNodeBuilder()
          .withEvaluationFields([
            new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
              'street',
              'Thessalias',
            ),
          ])
          .build(),
      ),
    output: "AddressVO.create({street: 'Thessalias'})",
  },
  {
    description: 'Value object evaluation with field list multilpe arguments',
    valueObjectEvaluation:
      new ValueObjectEvaluationBuilderDirector().buildValueObjectEvaluationWithFieldList(
        'AddressVO',
        new EvaluationFieldListNodeBuilder()
          .withEvaluationFields([
            new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
              'street',
              'Thessalias',
            ),
            new EvaluationFieldBuilderDirector().buildInt32LiteralEvaluationField('number', 4),
          ])
          .build(),
      ),
    output: "AddressVO.create({street: 'Thessalias', number: 4})",
  },
  {
    description: 'Value object evaluation with identifier expression',
    valueObjectEvaluation:
      new ValueObjectEvaluationBuilderDirector().buildValueObjectEvaluationWithExpression(
        'AddressVO',
        new ExpressionBuilderDirector().buildIdentifierExpression('addressProps'),
      ),
    output: 'AddressVO.create(addressProps)',
  },
];

export const VALID_STANDARD_VO_EVALUATION_TEST_CASES = [
  {
    description: 'Currency Standard Value Object evaluation',
    evaluation: new EvaluationBuilderDirector().buildStandardVOEvaluation(
      new IdentifierNodeBuilder().withName('Currency').build(),
      new EvaluationFieldListNodeBuilder()
        .withEvaluationFields([
          new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
            'currencyCode',
            'EUR',
          ),
        ])
        .build(),
    ),
    output: "Domain.StandardVO.Currency.Value.create({ currencyCode: 'EUR' })",
  },
];

export const VALID_DOMAIN_SERVICE_EVALUATION_TEST_CASES = [
  {
    description: 'Valid domain service evaluation',
    evaluation: new EvaluationBuilderDirector().buildDomainServiceEvaluation(
      'MarketingNotificationDomainService',
      new ArgumentListDirector().buildArgumentListWithArgs([
        new ArgumentNodeBuilder()
          .withExpression(new ExpressionBuilderDirector().buildThisMemberDotExpression('repo'))
          .build(),
      ]),
    ),
    output: 'new MarketingNotificationDomainService(this.repo)',
  },
];
