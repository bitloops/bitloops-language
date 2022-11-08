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
  TEntityValues,
  TModule,
  TUseCase,
  TStructs,
  TReadModels,
  TBuiltInClassEvaluation,
} from '../../../types.js';

import { aggregateDeclarationVisitor } from './helpers/aggregateDeclarationVisitor.js';
import { entityBodyVisitor } from './helpers/entityBodyVisitor.js';

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
  getClassEvaluationVisitor,
  useCaseDeclarationVisitor,
  equalityExpressionVisitor,
  relationalExpressionVisitor,
  logicalAndExpressionVisitor,
  logicalOrExpressionVisitor,
  logicalXorExpressionVisitor,
  logicalNotExpressionVisitor,
  multiplicativeExpressionVisitor,
  additiveExpressionVisitor,
  parenthesizedExpressionVisitor,
  ifStatementVisitor,
  statementListVisitor,
  constDeclarationVisitor,
  variableDeclarationVisitor,
  thisDeclarationVisitor,
  switchStatementVisitor,
  caseBlockVisitor,
  caseClauseVisitor,
  defaultClauseVisitor,
  useCaseExecuteDeclarationVisitor,
  structDeclarationVisitor,
  packagePortDeclarationVisitor,
  repoPortDeclarationVisitor,
  repoPortExtendableIdentifierVisitor,
  readModelDeclarationVisitor,
  domainErrorDeclarationVisitor,
  applicationErrorDeclarationVisitor,
  builtInClassEvaluationVisitor,
  primitivePrimTypeVisitor,
  arrayBitloopsPrimTypeVisitor,
  arrayLiteralVisitor,
} from './helpers/index.js';

export default class BitloopsVisitor extends BitloopsParserVisitor {
  [x: string]: any;

  constructor() {
    super();
  }

  visitProgram(ctx: BitloopsParser.ProgramContext): any {
    const children = this.visitChildren(ctx);
    const result = this.mergeSourceElements(children);
    return result;
  }

  private mergeSourceElements(children: any): TModule {
    const sourceElementsResult = children.map((c) => c[0]);
    return sourceElementsResult.reduce((acc, sourceElement) => {
      const classType = Object.keys(sourceElement)[0];
      if (acc[classType]) {
        acc[classType] = {
          ...acc[classType],
          ...sourceElement[classType],
        };
      } else {
        acc[classType] = sourceElement[classType];
      }
      return acc;
    }, {});
  }

  visitEqualityExpression(ctx: BitloopsParser.EqualityExpressionContext) {
    return equalityExpressionVisitor(this, ctx);
  }

  visitIdentifierName(ctx: BitloopsParser.IdentifierNameContext) {
    return ctx.Identifier().getText();
  }

  visitIdentifier(ctx: BitloopsParser.IdentifierContext) {
    return ctx.Identifier().getText();
  }

  visitRelationalExpression(ctx: BitloopsParser.RelationalExpressionContext) {
    return relationalExpressionVisitor(this, ctx);
  }

  visitLogicalAndExpression(ctx: BitloopsParser.LogicalAndExpressionContext) {
    return logicalAndExpressionVisitor(this, ctx);
  }

  visitLogicalOrExpression(ctx: BitloopsParser.LogicalOrExpressionContext) {
    return logicalOrExpressionVisitor(this, ctx);
  }

  visitLogicalXorExpression(ctx: BitloopsParser.LogicalXorExpressionContext) {
    return logicalXorExpressionVisitor(this, ctx);
  }

  visitNotExpression(ctx: BitloopsParser.NotExpressionContext) {
    return logicalNotExpressionVisitor(this, ctx);
  }

  visitMultiplicativeExpression(ctx: BitloopsParser.MultiplicativeExpressionContext) {
    return multiplicativeExpressionVisitor(this, ctx);
  }

  visitAdditiveExpression(ctx: BitloopsParser.AdditiveExpressionContext) {
    return additiveExpressionVisitor(this, ctx);
  }

  visitParenthesizedExpression(ctx: BitloopsParser.ParenthesizedExpressionContext) {
    return parenthesizedExpressionVisitor(this, ctx);
  }

  visitEvaluationExpression(ctx: BitloopsParser.EvaluationExpressionContext) {
    const evaluation = this.visit(ctx.evaluation());
    return {
      expression: {
        ...evaluation,
      },
    };
  }

  visitArrayLiteralExpression(ctx: BitloopsParser.ArrayLiteralExpressionContext) {
    const arrayLiteral = this.visit(ctx.arrayLiteral());
    return {
      expression: {
        ...arrayLiteral,
      },
    };
  }

  visitArrayLiteral(ctx: BitloopsParser.ArrayLiteralContext) {
    return arrayLiteralVisitor(this, ctx);
  }

  visitRegularEvaluation(ctx: BitloopsParser.RegularEvaluationContext) {
    const regularEvaluation: string = this.visitChildren(ctx)[0];
    return {
      regularEvaluation,
    };
  }
  visitTemplateStringLiteral(ctx: BitloopsParser.TemplateStringLiteralContext) {
    const stringChars: any = ctx.templateStringAtom(null);
    const value = stringChars.map((sc) => sc.getText()).join('');
    return {
      type: 'backTickString',
      value: value,
    };
  }

  visitThisVariableEvaluationString(ctx: BitloopsParser.ThisVariableEvaluationStringContext) {
    const value = ctx.ThisVariableEvaluation().getText();
    return {
      type: 'variable',
      value: value,
    };
  }

  visitErrorEvaluation(ctx: BitloopsParser.ErrorEvaluationContext) {
    const identifier = ctx.ErrorIdentifier().getText();
    const argumentDependencies = this.visit(ctx.methodArguments()) || [];

    return {
      errorEvaluation: {
        name: identifier,
        argumentDependencies,
      },
    };
  }

  visitRegularVariableEvaluationString(ctx: BitloopsParser.RegularVariableEvaluationStringContext) {
    const value = ctx.RegularVariableEvaluation().getText();
    return {
      type: 'variable',
      value: value,
    };
  }

  visitRegularErrorTypeEvaluation(ctx: BitloopsParser.RegularErrorTypeEvaluationContext) {
    const value = ctx.errorIdentifier().getText();
    return {
      type: value, // 'variable',
      value: value,
    };
  }

  visitIdentifierString(ctx: BitloopsParser.IdentifierStringContext) {
    return {
      type: 'variable',
      value: ctx.Identifier().getText(),
    };
  }

  visitRegularIntegerEvaluation(ctx: BitloopsParser.RegularIntegerEvaluationContext) {
    return integerEvaluation(ctx.IntegerLiteral().getText());
  }

  visitRegularDecimalEvaluation(ctx: BitloopsParser.RegularDecimalEvaluationContext) {
    return decimalEvaluation(ctx.DecimalLiteral().getText());
  }

  visitRegularBooleanEvaluation(ctx: BitloopsParser.RegularBooleanEvaluationContext) {
    return booleanEvaluation(ctx.BooleanLiteral().getText());
  }

  visitRegularStringEvaluation(ctx: BitloopsParser.RegularStringEvaluationContext) {
    return stringEvaluation(ctx.StringLiteral().getText());
  }

  visitCondition(ctx: BitloopsParser.ConditionContext) {
    const condition = this.visit(ctx.expression());
    return {
      condition,
    };
  }

  visitIfStatement(ctx: BitloopsParser.IfStatementContext) {
    return ifStatementVisitor(this, ctx);
  }

  visitStatement(ctx: BitloopsParser.StatementContext) {
    return this.visitChildren(ctx)[0];
  }

  visitStatementList(ctx: BitloopsParser.StatementListContext) {
    return statementListVisitor(this, ctx);
  }

  visitBlock(ctx: BitloopsParser.BlockContext) {
    return this.visit(ctx.statementList());
  }
  visitConstDeclaration(ctx: BitloopsParser.ConstDeclarationContext) {
    return constDeclarationVisitor(this, ctx);
  }

  visitVariableDeclaration(ctx: BitloopsParser.VariableDeclarationContext) {
    return variableDeclarationVisitor(this, ctx);
  }

  visitTypeAnnotation(ctx: BitloopsParser.TypeAnnotationContext) {
    return this.visit(ctx.bitloopsPrimaryType());
  }

  visitThisDeclaration(ctx: BitloopsParser.ThisDeclarationContext) {
    return thisDeclarationVisitor(this, ctx);
  }

  visitSwitchStatement(ctx: BitloopsParser.SwitchStatementContext) {
    return switchStatementVisitor(this, ctx);
  }

  visitCaseBlock(ctx: BitloopsParser.CaseBlockContext) {
    return caseBlockVisitor(this, ctx);
  }

  visitCaseClauses(ctx: BitloopsParser.CaseClausesContext) {
    return this.visitChildren(ctx);
  }

  visitCaseClause(ctx: BitloopsParser.CaseClauseContext) {
    return caseClauseVisitor(this, ctx);
  }

  visitDefaultClause(ctx: BitloopsParser.DefaultClauseContext) {
    return defaultClauseVisitor(this, ctx);
  }

  visitBreakStatement(ctx: BitloopsParser.BreakStatementContext) {
    return ctx.Break().getText();
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

  visitFormalParameterList(ctx: BitloopsParser.FormalParameterListContext): TParameterDependency[] {
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
    return this.visit(ctx.bitloopsPrimaryType()); // ctx.type_().getText();
  }

  visitBuiltInClassEvaluation(
    ctx: BitloopsParser.BuiltInClassEvaluationContext,
  ): TBuiltInClassEvaluation {
    return builtInClassEvaluationVisitor(this, ctx);
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
    return valueObjectDeclarationVisitor(this, ctx);
  }

  visitEntityDeclaration(ctx: BitloopsParser.EntityDeclarationContext): { Entities: TEntities } {
    return entityDeclarationVisitor(this, ctx);
  }
  visitAggregateDeclaration(ctx: BitloopsParser.AggregateDeclarationContext) {
    return aggregateDeclarationVisitor(this, ctx);
  }
  visitEntityBody(ctx: BitloopsParser.EntityBodyContext): TEntityValues {
    return entityBodyVisitor(this, ctx);
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
   * Errors
   */
  visitDomainErrorDeclaration(ctx: BitloopsParser.DomainErrorDeclarationContext) {
    return domainErrorDeclarationVisitor(this, ctx);
  }

  visitApplicationErrorDeclaration(ctx: BitloopsParser.ApplicationErrorDeclarationContext) {
    return applicationErrorDeclarationVisitor(this, ctx);
  }

  /**
   * Domain Rule
   */
  visitDomainRuleDeclaration(ctx: BitloopsParser.DomainRuleDeclarationContext): { Rules: TRules } {
    return domainRuleDeclarationVisitor(this, ctx);
  }

  visitDomainRuleBody(ctx: BitloopsParser.DomainRuleBodyContext): any {
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

  visitGetClassEvaluation(ctx: BitloopsParser.GetClassEvaluationContext): any {
    return getClassEvaluationVisitor(this, ctx);
  }

  /**
   * UseCase Declaration
   */
  visitUseCaseDeclaration(ctx: BitloopsParser.UseCaseDeclarationContext): { UseCases: TUseCase } {
    return useCaseDeclarationVisitor(this, ctx);
  }
  visitUseCaseExecuteDeclaration(ctx: BitloopsParser.UseCaseExecuteDeclarationContext): any {
    return useCaseExecuteDeclarationVisitor(this, ctx);
  }

  visitStructDeclaration(ctx: BitloopsParser.StructDeclarationContext): { Structs: TStructs } {
    return structDeclarationVisitor(this, ctx);
  }

  visitPackagePortDeclaration(ctx: BitloopsParser.PackagePortDeclarationContext) {
    return packagePortDeclarationVisitor(this, ctx);
  }

  visitRepoPortDeclaration(ctx: BitloopsParser.RepoPortDeclarationContext) {
    return repoPortDeclarationVisitor(this, ctx);
  }

  visitRepoExtendsList(ctx: BitloopsParser.RepoExtendsListContext) {
    return this.visitChildren(ctx).filter((listItem) => listItem !== undefined);
  }

  visitRepoPortExtendableIdentifierList(
    ctx: BitloopsParser.RepoPortExtendableIdentifierListContext,
  ) {
    return this.visitChildren(ctx)[0];
  }

  visitRepoPortExtendableIdentifier(ctx: BitloopsParser.RepoPortExtendableIdentifierContext) {
    return repoPortExtendableIdentifierVisitor(this, ctx);
  }

  visitRepoPortMethodDefinitions(ctx: BitloopsParser.RepoPortMethodDefinitionsContext) {
    return this.visit(ctx.methodDefinitionList());
  }
  /**
   * Read model
   */
  visitReadModelDeclaration(ctx: BitloopsParser.ReadModelDeclarationContext): {
    ReadModels: TReadModels;
  } {
    return readModelDeclarationVisitor(this, ctx);
  }

  visitPrimitivePrimType(ctx: BitloopsParser.PrimitivePrimTypeContext) {
    return primitivePrimTypeVisitor(this, ctx);
  }

  visitArrayBitloopsPrimType(ctx: BitloopsParser.ArrayBitloopsPrimTypeContext) {
    return arrayBitloopsPrimTypeVisitor(this, ctx);
  }

  visitBitloopsBuiltInClassPrimType(ctx: BitloopsParser.BitloopsBuiltInClassPrimTypeContext) {
    return ctx.bitloopsBuiltInClass().getText();
  }
  visitBitloopsIdentifierPrimType(ctx: BitloopsParser.BitloopsIdentifierPrimTypeContext) {
    return ctx.bitloopsIdentifiers().getText();
  }
}
