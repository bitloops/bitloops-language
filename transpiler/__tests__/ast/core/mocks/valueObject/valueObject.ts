import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { DomainCreateBuilderDirector } from '../../builders/DomainCreateBuilderDirector.js';
import { PrivateMethodBuilderDirector } from '../../builders/methods/PrivateMethodBuilderDirector.js';
import { ValueObjectDeclarationBuilder } from '../../builders/valueObject/ValueObjectBuilder.js';
import { BitloopsPrimaryTypeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';
import { StatementListDirector } from '../../builders/statement/statementListDirector.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclarationDirector.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const validValueObjectTestCases = [
  {
    description: 'Value Object with private method',
    fileId: 'testFile.bl',
    inputBLString: fs.readFileSync(`${__dirname}/valueObjectWithPrivateMethod.bl`).toString(),
    expected: new ValueObjectDeclarationBuilder()
      .withIdentifier('NameVO')
      .withConstants([
        new ConstDeclarationBuilderDirector().buildConstDeclarationWithStringLiteralExpressionAndType(
          {
            name: 'nameOrigin',
            stringLiteralExpression: 'Greece',
            type: 'string',
          },
        ),
      ])
      .withCreate(
        new DomainCreateBuilderDirector().buildEmptyCreateValueObjectWithError({
          voName: 'NameVO',
          voPropsName: 'NameProps',
          voPropsIdentifier: 'props',
          errorName: 'DomainErrors.InvalidName',
        }),
      )
      .withPrivateMethods([
        new PrivateMethodBuilderDirector().buildMethodWithStringParamsPrimaryReturnTypeAndStatements(
          {
            methodName: 'isValidName',
            statements: new StatementListDirector().buildOneReturnStatementWithMethodCallExpression(
              {
                identifierExpressionName: 'regName',
                methodName: 'test',
                argument: 'name',
              },
            ),
            paramName: 'name',
            primaryReturnType: new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('bool'),
          },
        ),
      ])
      .build(),
  },
  {
    description: 'Value Object with apply rules',
    fileId: 'testFile.bl',
    inputBLString: fs.readFileSync(`${__dirname}/valueObjectApplyRules.bl`).toString(),
    expected: new ValueObjectDeclarationBuilder()
      .withIdentifier('TitleVO')
      .withCreate(
        new DomainCreateBuilderDirector().buildCreateValueObjectWithApplyRules({
          voName: 'TitleVO',
          voPropsName: 'TitleProps',
          voPropsIdentifier: 'props',
          errorName: 'DomainErrors.InvalidTitleError',
          appliedRules: [
            {
              name: 'InvalidTitleRule',
              args: [['props', 'title']],
            },
          ],
        }),
      )
      // .withPrivateMethods([])
      .build(),
  },
];
