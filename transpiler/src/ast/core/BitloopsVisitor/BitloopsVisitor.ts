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
import {
  TBoundedContexts,
  TEvaluationFields,
  TParameterDependency,
  TRegularEvaluation,
  TRESTControllerDependencies,
  TRESTControllerExecute,
  TGraphQLControllerExecute,
  TGraphQLOperation,
  TDefinitionMethods,
  TOkErrorReturnType,
  TVariables,
  TVariable,
  TDTO,
  TEntityCreate,
  TValueObjectValues,
  TValueObjectMethods,
  TReturnType,
  TDomainPrivateMethod,
  TConstDeclaration,
  TConstDeclarationValue,
  TReturnStatement,
  TEntities,
  TDomainPublicMethod,
  TRules,
  TBuildInFunction,
} from '../../../types.js';

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
  dtoEvaluationVisitor,
  evaluationVisitor,
  propsEvaluationVisitor,
  valueObjectEvaluationVisitor,
  formalParameterListVisitor,
  entityEvaluationVisitor,
  restControllerMethodDeclarationVisitor,
  restControllerExecuteDeclarationVisitor,
  restControllerDeclarationVisitor,
  graphQLControllerDeclarationVisitor,
  graphQLResolverOptionsVisitor,
  graphQLControllerExecuteVisitor,
  methodDefinitionVisitor,
  methodDefinitionListVisitor,
  returnErrorsTypeVisitor,
  returnOkErrorTypeVisitor,
  errorIdentifiersVisitor,
  fieldListVisitor,
  fieldVisitor,
  dtoDeclarationVisitor,
  propsDeclarationVisitor,
  domainConstructorDeclarationVisitor,
  valueObjectDeclarationVisitor,
  privateMethodDeclarationVisitor,
  privateMethodDeclarationListVisitor,
  returnPrivateMethodTypeVisitor,
  domainConstDeclarationListVisitor,
  entityDeclarationVisitor,
  publicMethodDeclarationVisitor,
  publicMethodDeclarationListVisitor,
  domainRuleDeclarationVisitor,
  domainRuleBodyVisitor,
  applyRulesStatementVisitor,
  applyRuleStatementRulesListVisitor,
  applyRulesRuleVisitor,
  isInstanceOfVisitor,
  regularGetClassEvaluationVisitor,
} from './helpers/index.js';

export default class BitloopsVisitor extends BitloopsParserVisitor {
  [x: string]: any;
  private _result: TBoundedContexts | BitloopsIntermediateASTParserError;
  // TODO aggregate all individual results (.e.g controllers, props..)
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
    const evaluation = this.visit(ctx.evaluation());
    const returnObject = {
      expression: {
        ...evaluation,
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
    const condition = this.visit(ctx.condition());
    const thenStatements = this.visit(ctx.statement(0));
    const returnObject = {
      ifStatement: {
        ...condition,
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
    const expressionObject = this.visit(ctx.condition());
    const caseObject = this.visit(ctx.caseBlock());
    const returnObject = {
      switchStatement: {
        expression: expressionObject.condition.expression,
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

  visitDtoEvaluation(ctx: BitloopsParser.DtoEvaluationContext) {
    return dtoEvaluationVisitor(this, ctx);
  }
  visitEvaluation(ctx: BitloopsParser.EvaluationContext) {
    return evaluationVisitor(this, ctx);
  }
  visitPropsEvaluation(ctx: BitloopsParser.PropsEvaluationContext): any {
    return propsEvaluationVisitor(this, ctx);
  }

  visitValueObjectEvaluation(ctx: BitloopsParser.ValueObjectEvaluationContext): any {
    return valueObjectEvaluationVisitor(this, ctx);
  }

  visitEntityEvaluation(ctx: BitloopsParser.EntityEvaluationContext): any {
    return entityEvaluationVisitor(this, ctx);
  }

  visitDomainEvaluationInputFieldList(
    ctx: BitloopsParser.DomainEvaluationInputFieldListContext,
  ): TEvaluationFields {
    return this.visit(ctx.evaluationFieldList());
  }

  visitDomainEvaluationInputRegular(
    ctx: BitloopsParser.DomainEvaluationInputRegularContext,
  ): TRegularEvaluation {
    return this.visit(ctx.regularEvaluation());
  }

  visitFormalParameterArg(ctx: BitloopsParser.FormalParameterArgContext): TParameterDependency {
    return {
      value: ctx.identifierOrKeyWord().getText(),
      type: this.visit(ctx.typeAnnotation()),
    } as TParameterDependency;
  }

  visitFormalParameterList(ctx: BitloopsParser.FormalParameterListContext): any {
    return formalParameterListVisitor(this, ctx);
  }

  visitRestControllerExecuteDeclaration(
    ctx: BitloopsParser.RestControllerExecuteDeclarationContext,
  ): { execute: TRESTControllerExecute } {
    return restControllerExecuteDeclarationVisitor(this, ctx);
  }

  visitRestControllerMethodDeclaration(ctx: BitloopsParser.RestControllerMethodDeclarationContext) {
    return restControllerMethodDeclarationVisitor(this, ctx);
  }

  visitRestControllerParameters(ctx: BitloopsParser.RestControllerParametersContext): {
    dependencies: TRESTControllerDependencies;
  } {
    return {
      dependencies: [ctx.Identifier(0).getText(), ctx.Identifier(1).getText()],
    };
  }

  // GraphQLControllerDeclaration
  visitGraphQLControllerDeclaration(ctx: BitloopsParser.GraphQLControllerDeclarationContext): any {
    return graphQLControllerDeclarationVisitor(this, ctx);
  }

  visitRESTControllerDeclaration(ctx: BitloopsParser.RESTControllerDeclarationContext): any {
    return restControllerDeclarationVisitor(this, ctx);
  }

  visitGraphQLResolverOptions(ctx: BitloopsParser.GraphQLResolverOptionsContext): any {
    return graphQLResolverOptionsVisitor(this, ctx);
  }

  visitGraphQLControllerExecuteDeclaration(
    ctx: BitloopsParser.GraphQLControllerExecuteDeclarationContext,
  ): TGraphQLControllerExecute {
    return graphQLControllerExecuteVisitor(this, ctx);
  }

  visitGraphQLOperationTypeAssignment(
    ctx: BitloopsParser.GraphQLOperationTypeAssignmentContext,
  ): TGraphQLOperation {
    return ctx.graphQLOperation().getText();
  }

  visitGraphQLOperationInputTypeAssignment(
    ctx: BitloopsParser.GraphQLOperationInputTypeAssignmentContext,
  ): string {
    return ctx.graphQLResolverInputType().getText();
  }

  visitMethodDefinitionList(ctx: BitloopsParser.MethodDefinitionListContext): {
    definitionMethods: TDefinitionMethods;
  } {
    return methodDefinitionListVisitor(this, ctx);
  }

  visitMethodDefinition(ctx: BitloopsParser.MethodDefinitionContext) {
    return methodDefinitionVisitor(this, ctx);
  }

  visitErrorIdentifier(ctx: BitloopsParser.ErrorIdentifierContext) {
    return ctx.ErrorIdentifier().getText();
  }

  visitReturnOkType(ctx: BitloopsParser.ReturnOkTypeContext): string {
    return ctx.type_().getText();
  }

  visitErrorIdentifiers(ctx: BitloopsParser.ErrorIdentifiersContext): string[] {
    return errorIdentifiersVisitor(this, ctx);
  }

  visitReturnErrorsType(ctx: BitloopsParser.ReturnErrorsTypeContext): string[] {
    return returnErrorsTypeVisitor(this, ctx);
  }

  visitReturnOkErrorType(ctx: BitloopsParser.ReturnOkErrorTypeContext): TOkErrorReturnType {
    return returnOkErrorTypeVisitor(this, ctx);
  }

  visitFieldList(ctx: BitloopsParser.FieldListContext): TVariables {
    return fieldListVisitor(this, ctx);
  }

  visitField(ctx: BitloopsParser.FieldContext): TVariable {
    return fieldVisitor(this, ctx);
  }

  visitDtoDeclaration(ctx: BitloopsParser.DtoDeclarationContext): { DTOs: TDTO } {
    return dtoDeclarationVisitor(this, ctx);
  }
  visitPropsDeclaration(ctx: BitloopsParser.PropsDeclarationContext): any {
    return propsDeclarationVisitor(this, ctx);
  }

  visitDomainConstructorDeclaration(
    ctx: BitloopsParser.DomainConstructorDeclarationContext,
  ): TEntityCreate {
    return domainConstructorDeclarationVisitor(this, ctx);
  }

  visitValueObjectDeclaration(ctx: BitloopsParser.ValueObjectDeclarationContext): {
    ValueObjects: { [id: string]: TValueObjectValues };
  } {
    // console.log('visitValueObjectDeclaration');
    return valueObjectDeclarationVisitor(this, ctx);
  }

  visitEntityDeclaration(ctx: BitloopsParser.EntityDeclarationContext): { Entities: TEntities } {
    return entityDeclarationVisitor(this, ctx);
  }

  visitDomainConstDeclarationList(
    ctx: BitloopsParser.DomainConstDeclarationListContext,
  ): TConstDeclarationValue[] {
    return domainConstDeclarationListVisitor(this, ctx);
  }

  visitDomainConstDeclaration(
    ctx: BitloopsParser.DomainConstDeclarationContext,
  ): TConstDeclaration {
    return this.visit(ctx.constDeclaration());
  }

  // Public method declaration
  visitPublicMethodDeclarationList(
    ctx: BitloopsParser.PublicMethodDeclarationListContext,
  ): Record<string, TDomainPublicMethod> {
    return publicMethodDeclarationListVisitor(this, ctx);
  }

  visitPublicMethodDeclaration(ctx: BitloopsParser.PublicMethodDeclarationContext): {
    methodName: string;
    methodInfo: TDomainPublicMethod;
  } {
    return publicMethodDeclarationVisitor(this, ctx);
  }

  // Private method declaration

  visitPrivateMethodDeclarationList(
    ctx: BitloopsParser.PrivateMethodDeclarationListContext,
  ): TValueObjectMethods {
    return privateMethodDeclarationListVisitor(this, ctx);
  }

  visitPrivateMethodDeclaration(ctx: BitloopsParser.PrivateMethodDeclarationContext): {
    methodName: string;
    methodInfo: TDomainPrivateMethod;
  } {
    return privateMethodDeclarationVisitor(this, ctx);
  }

  visitReturnPrivateMethodType(
    ctx: BitloopsParser.ReturnPrivateMethodTypeContext,
  ): TReturnType | TOkErrorReturnType {
    return returnPrivateMethodTypeVisitor(this, ctx);
  }

  visitReturnStatement(ctx: BitloopsParser.ReturnStatementContext): TReturnStatement {
    const expression = this.visit(ctx.expression());
    return {
      return: expression,
    };
  }

  /**
   * Domain Rule
   */
  visitDomainRuleDeclaration(ctx: BitloopsParser.DomainRuleDeclarationContext): { Rules: TRules } {
    // console.log('visitDomainRuleDeclaration');
    return domainRuleDeclarationVisitor(this, ctx);
  }

  visitDomainRuleBody(ctx: BitloopsParser.DomainRuleBodyContext): any {
    // console.log('visitDomainRuleBody');
    return domainRuleBodyVisitor(this, ctx);
  }

  visitApplyRulesStatement(ctx: BitloopsParser.ApplyRulesStatementContext): TBuildInFunction {
    return applyRulesStatementVisitor(this, ctx);
  }

  visitApplyRuleStatementRulesList(ctx: BitloopsParser.ApplyRuleStatementRulesListContext): any {
    return applyRuleStatementRulesListVisitor(this, ctx);
  }
  visitApplyRulesRule(ctx: BitloopsParser.ApplyRulesRuleContext): any {
    return applyRulesRuleVisitor(this, ctx);
  }

  visitIsInstanceOf(ctx: BitloopsParser.IsInstanceOfContext): any {
    return isInstanceOfVisitor(this, ctx);
  }

  visitClassTypes(ctx: BitloopsParser.ClassTypesContext): any {
    return ctx.ErrorClass().getText();
  }

  visitRegularGetClassEvaluation(ctx: BitloopsParser.RegularGetClassEvaluationContext): any {
    return regularGetClassEvaluationVisitor(this, ctx);
  }
}
