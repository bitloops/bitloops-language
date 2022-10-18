/**
 *  Bitloops Language CLI
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */

import BitloopsParser from '../../../parser/core/grammar/BitloopsParser.js';
import BitloopsParserVisitor from '../../../parser/core/grammar/BitloopsParserVisitor.js';
import { TBoundedContexts } from '../../../types.js';

import { BitloopsIntermediateASTParserError } from '../index.js';

import {
  functionBodyVisitor,
  jestTestDeclarationVisitor,
  argumentListVisitor,
  argumentVisitor,
  regularVariableEvaluationORliteralORexpressionVisitor,
  structEvaluationVisitor,
  evaluationFieldListVisitor,
  thisVariableMethodEvaluationVisitor,
  regularVariableMethodEvaluationVisitor,
  methodArgumentsVisitor,
  evaluationFieldVisitor,
  regularStructEvaluationVisitor,
  stringEvaluation,
  booleanEvaluation,
  integerEvaluation,
  decimalEvaluation,
} from './helpers/index.js';

export default class BitloopsVisitor extends BitloopsParserVisitor {
  [x: string]: any;
  private _result: TBoundedContexts | BitloopsIntermediateASTParserError;
  constructor() {
    super();
  }

  get result(): TBoundedContexts | BitloopsIntermediateASTParserError {
    return this._result;
  }

  visitEqualityExpression(ctx: BitloopsParser.EqualityExpressionContext) {
    // console.log('EqualityExpression');
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    const operator = ctx.op.text;
    const returnObject = {
      expression: {
        equalityExpression: {
          left: left.expression,
          right: right.expression,
          operator: operator,
        },
      },
    };
    return returnObject;
  }

  visitIdentifierName(ctx: BitloopsParser.IdentifierNameContext) {
    // console.log('IdentifierName');
    const identifier = ctx.Identifier().getText();
    // console.log('identifier:', identifier, typeof identifier);
    return identifier;
  }

  visitIdentifier(ctx: BitloopsParser.IdentifierContext) {
    // console.log('Identifier');
    const identifier = ctx.Identifier().getText();
    // console.log('identifier:', identifier, typeof identifier);
    return identifier;
  }

  visitRelationalExpression(ctx: BitloopsParser.RelationalExpressionContext) {
    // const left: string = this.visit(ctx.expression(0));
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    const operator = ctx.op.text;
    const returnObject = {
      expression: {
        relationalExpression: {
          left: left.expression,
          right: right.expression,
          operator: operator,
        },
      },
    };
    return returnObject;
  }

  visitLogicalAndExpression(ctx: BitloopsParser.LogicalAndExpressionContext) {
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    const returnObject = {
      expression: {
        logicalExpression: {
          andExpression: {
            left: left.expression,
            right: right.expression,
          },
        },
      },
    };
    return returnObject;
  }

  visitLogicalOrExpression(ctx: BitloopsParser.LogicalOrExpressionContext) {
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    const returnObject = {
      expression: {
        logicalExpression: {
          orExpression: {
            left: left.expression,
            right: right.expression,
          },
        },
      },
    };
    return returnObject;
  }

  visitLogicalXorExpression(ctx: BitloopsParser.LogicalXorExpressionContext) {
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    const returnObject = {
      expression: {
        logicalExpression: {
          xorExpression: {
            left: left.expression,
            right: right.expression,
          },
        },
      },
    };
    return returnObject;
  }

  visitNotExpression(ctx: BitloopsParser.NotExpressionContext) {
    const expression = this.visit(ctx.expression());
    const returnObject = {
      expression: {
        logicalExpression: { notExpression: expression.expression },
      },
    };
    return returnObject;
  }

  visitMultiplicativeExpression(ctx: BitloopsParser.MultiplicativeExpressionContext) {
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    const operator = ctx.op.text;
    const returnObject = {
      expression: {
        multiplicativeExpression: {
          left: left.expression,
          right: right.expression,
          operator: operator,
        },
      },
    };
    return returnObject;
  }

  visitAdditiveExpression(ctx: BitloopsParser.AdditiveExpressionContext) {
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    const operator = ctx.op.text;
    const returnObject = {
      expression: {
        additiveExpression: {
          left: left.expression,
          right: right.expression,
          operator: operator,
        },
      },
    };
    return returnObject;
  }

  visitThisExpression(ctx: BitloopsParser.ThisExpressionContext) {
    // console.log('ThisExpression');
    const thisExpression: string = ctx.This().getText();
    return thisExpression;
  }

  visitParenthesizedExpression(ctx: BitloopsParser.ParenthesizedExpressionContext) {
    // console.log('ParenthesizedExpression');
    const expression = this.visit(ctx.expression());
    const returnObject = {
      expression: {
        parenthesizedExpression: expression.expression,
      },
    };
    return returnObject;
  }

  visitEvaluationExpression(ctx: BitloopsParser.EvaluationExpressionContext) {
    // console.log('EvaluationExpression');
    const evaluation = this.visit(ctx.evaluation())[0];
    const returnObject = {
      expression: {
        evaluation: evaluation,
      },
    };
    return returnObject;
  }

  visitRegularEvaluation(ctx: BitloopsParser.RegularEvaluationContext) {
    // console.log('RegularEvaluation');
    const regularEvaluation: string = this.visitChildren(ctx)[0];
    const returnObject = {
      regularEvaluation: regularEvaluation,
    };
    return returnObject;
  }

  visitThisVariableEvaluationString(ctx: BitloopsParser.ThisVariableEvaluationStringContext) {
    // console.log('ThisVariableEvaluationString');
    const value = ctx.ThisVariableEvaluation().getText();
    const returnObject = {
      type: 'variable',
      value: value,
    };
    return returnObject;
  }

  visitRegularVariableEvaluationString(ctx: BitloopsParser.RegularVariableEvaluationStringContext) {
    // console.log('RegularVariableEvaluationString');
    const value = ctx.RegularVariableEvaluation().getText();
    const returnObject = {
      type: 'variable',
      value: value,
    };
    return returnObject;
  }

  visitIdentifierString(ctx: BitloopsParser.IdentifierStringContext) {
    // console.log('IdentifierString');
    const returnObject = {
      type: 'variable',
      value: ctx.Identifier().getText(),
    };
    return returnObject;
  }

  visitRegularIntegerEvaluation(ctx: BitloopsParser.RegularIntegerEvaluationContext) {
    // console.log('RegularIntegerEvaluation');
    const returnObject = integerEvaluation(ctx.IntegerLiteral().getText());
    return returnObject;
  }

  visitRegularDecimalEvaluation(ctx: BitloopsParser.RegularDecimalEvaluationContext) {
    // console.log('RegularDecimalEvaluation');
    const returnObject = decimalEvaluation(ctx.DecimalLiteral().getText());
    return returnObject;
  }

  visitRegularBooleanEvaluation(ctx: BitloopsParser.RegularBooleanEvaluationContext) {
    // console.log('RegularBooleanEvaluation');
    const returnObject = booleanEvaluation(ctx.BooleanLiteral().getText());
    return returnObject;
  }

  visitRegularStringEvaluation(ctx: BitloopsParser.RegularStringEvaluationContext) {
    // console.log('RegularStringEvaluation');
    const returnObject = stringEvaluation(ctx.StringLiteral().getText());
    return returnObject;
  }

  visitCondition(ctx: BitloopsParser.ConditionContext) {
    // console.log('Condition');
    const condition = this.visit(ctx.expression());
    const returnObject = {
      condition: condition,
    };
    return returnObject;
  }

  visitIfStatement(ctx: BitloopsParser.IfStatementContext) {
    // console.log('IfStatement');
    const condition = this.visit(ctx.expression());
    const thenStatements = this.visit(ctx.statement(0));
    const returnObject = {
      ifStatement: {
        condition: condition,
        thenStatements: thenStatements.statements,
      },
    };
    if (ctx.statement(1)) {
      const elseStatements = this.visit(ctx.statement(1));
      returnObject.ifStatement['elseStatements'] = elseStatements.statements;
    }
    return returnObject;
  }

  visitStatement(ctx: BitloopsParser.StatementContext) {
    // console.log('Statement');
    const statement = this.visitChildren(ctx)[0];
    return statement;
  }

  visitStatementList(ctx: BitloopsParser.StatementListContext) {
    // console.log('StatementList');
    const statementList = this.visitChildren(ctx);
    const returnStatementList = [];
    for (let i = 0; i < statementList.length; i++) {
      if (Array.isArray(statementList[i])) {
        if (statementList[i][0] !== undefined) {
          returnStatementList.push(statementList[i]);
        }
      } else if (statementList[i] !== undefined) {
        returnStatementList.push(statementList[i]);
      }
    }
    const returnObject = {
      statements: returnStatementList,
    };
    return returnObject;
  }

  visitBlock(ctx: BitloopsParser.BlockContext) {
    // console.log('Block');
    const block = this.visitChildren(ctx)[1];
    return block;
  }
  visitConstDeclaration(ctx: BitloopsParser.ConstDeclarationContext) {
    // console.log('ConstDeclaration');
    const left = this.visit(ctx.identifier());
    const right = this.visit(ctx.expression());
    const returnObject = {
      constDeclaration: {
        name: left,
        expression: right.expression,
      },
    };
    if (ctx.typeAnnotation()) {
      const typeAnnotation = this.visit(ctx.typeAnnotation());
      returnObject.constDeclaration['type'] = typeAnnotation;
    }
    return returnObject;
  }

  visitVariableDeclaration(ctx: BitloopsParser.VariableDeclarationContext) {
    // console.log('VariableDeclaration');
    const left = this.visit(ctx.identifier());
    const right = this.visit(ctx.expression());
    const typeAnnotation = this.visit(ctx.typeAnnotation());
    const returnObject = {
      variableDeclaration: {
        name: left,
        expression: right.expression,
        type: typeAnnotation,
      },
    };
    return returnObject;
  }

  visitTypeAnnotation(ctx: BitloopsParser.TypeAnnotationContext) {
    // console.log('TypeAnnotation');
    const type = ctx.type_().getText();
    return type;
  }

  visitThisDeclaration(ctx: BitloopsParser.ThisDeclarationContext) {
    // console.log('ThisDeclaration');
    const thisDeclaration = ctx.ThisVariableEvaluation().getText();
    const expression = this.visit(ctx.expression());
    const returnObject = {
      thisDeclaration: {
        name: thisDeclaration,
        expression: expression.expression,
      },
    };
    return returnObject;
  }

  visitSwitchStatement(ctx: BitloopsParser.SwitchStatementContext) {
    // console.log('SwitchStatement');
    const expressionObject = this.visit(ctx.expression());
    const caseObject = this.visit(ctx.caseBlock());
    const returnObject = {
      switchStatement: {
        expression: expressionObject.expression,
        cases: caseObject.cases,
        defaultCase: caseObject.defaultCase,
      },
    };
    return returnObject;
  }

  visitCaseBlock(ctx: BitloopsParser.CaseBlockContext) {
    // console.log('CaseBlock');
    const caseClauses = this.visit(ctx.caseClauses(0));
    if (ctx.caseClauses(1)) {
      caseClauses.push(this.visit(ctx.caseClauses(1)));
    }
    const defaultClause = this.visit(ctx.defaultClause());
    const returnObject = {
      cases: caseClauses,
      defaultCase: defaultClause,
    };
    return returnObject;
  }

  visitCaseClauses(ctx: BitloopsParser.CaseClausesContext) {
    const caseClauses = this.visitChildren(ctx);
    return caseClauses;
  }

  visitCaseClause(ctx: BitloopsParser.CaseClauseContext) {
    // console.log('CaseClause');
    const caseValue = ctx.expression().getText();
    const caseStatement = this.visit(ctx.statementList());
    const returnObject = {
      statements: caseStatement.statements[0].statements,
      caseValue: caseValue,
    };
    return returnObject;
  }

  visitDefaultClause(ctx: BitloopsParser.DefaultClauseContext) {
    // console.log('DefaultClause');
    const defaultStatement = this.visit(ctx.statementList());
    // const returnObject = {
    //   statements: defaultStatement.statements[0].statements,
    // };
    return defaultStatement.statements[0];
  }

  visitBreakStatement() {
    // console.log('BreakStatement');
  }

  visitFunctionBody(ctx: BitloopsParser.FunctionBodyContext) {
    return functionBodyVisitor(this, ctx);
  }

  visitJestTestDeclaration(ctx: BitloopsParser.JestTestDeclarationContext) {
    return jestTestDeclarationVisitor(this, ctx);
  }

  visitArgumentList(ctx: BitloopsParser.ArgumentListContext) {
    return argumentListVisitor(this, ctx);
  }

  visitRegularVariableEvaluationORliteralORexpression(
    ctx: BitloopsParser.RegularVariableEvaluationORliteralORexpressionContext,
  ) {
    return regularVariableEvaluationORliteralORexpressionVisitor(this, ctx);
  }

  visitArgument(ctx: BitloopsParser.ArgumentContext): any {
    return argumentVisitor(this, ctx);
  }

  visitStructEvaluation(ctx: BitloopsParser.StructEvaluationContext): any {
    return structEvaluationVisitor(this, ctx);
  }

  visitThisVariableMethodEvaluation(ctx: BitloopsParser.ThisVariableMethodEvaluationContext): any {
    return thisVariableMethodEvaluationVisitor(this, ctx);
  }

  visitMethodArguments(ctx: BitloopsParser.MethodArgumentsContext): any {
    return methodArgumentsVisitor(this, ctx);
  }

  visitRegularVariableMethodEvaluation(
    ctx: BitloopsParser.RegularVariableMethodEvaluationContext,
  ): any {
    // console.log('visitRegularMethodEvaluation');
    return regularVariableMethodEvaluationVisitor(this, ctx);
  }

  visitEvaluationField(ctx: BitloopsParser.EvaluationFieldContext): any {
    return evaluationFieldVisitor(this, ctx);
  }

  visitEvaluationFieldList(ctx: BitloopsParser.EvaluationFieldListContext): any {
    return evaluationFieldListVisitor(this, ctx);
  }

  visitRegularStructEvaluation(ctx: BitloopsParser.RegularStructEvaluationContext): any {
    return regularStructEvaluationVisitor(this, ctx);
  }

  visitStringLiteral(ctx: BitloopsParser.StringLiteralContext): any {
    return stringEvaluation(ctx.StringLiteral().getText());
  }

  visitNullLiteral(_ctx: BitloopsParser.NullLiteralContext): any {
    return {
      type: 'NullValue',
      value: 'null',
    };
  }

  visitBooleanLiteral(ctx: BitloopsParser.BooleanLiteralContext) {
    return booleanEvaluation(ctx.BooleanLiteral().getText());
  }

  visitRegularExpressionLiteral(ctx: BitloopsParser.RegularExpressionLiteralContext) {
    return {
      type: 'regex',
      value: ctx.RegularExpressionLiteral().getText(),
    };
  }

  visitIntegerLiteral(ctx: BitloopsParser.IntegerLiteralContext) {
    return integerEvaluation(ctx.IntegerLiteral().getText());
  }

  visitDecimalLiteral(ctx: BitloopsParser.DecimalLiteralContext) {
    return decimalEvaluation(ctx.DecimalLiteral().getText());
  }
}
