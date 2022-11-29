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
import { BitloopsIdentifierTypeBuilder } from '../../../refactoring-arch/intermediate-ast/builders/BitloopsPrimaryType/BitloopsIdentifierTypeBuilder.js';
import { BuildInClassTypeBuilder } from '../../../refactoring-arch/intermediate-ast/builders/BitloopsPrimaryType/BuildInClassTypeBuilder.js';
import { DTOIdentifierNodeBuilder } from '../../../refactoring-arch/intermediate-ast/builders/DTO/DTOIdentifierNodeBuilder.js';
import { ExpressionBuilder } from '../../../refactoring-arch/intermediate-ast/builders/expressions/ExpressionBuilder.js';
import { ThisExpressionNodeBuilder } from '../../../refactoring-arch/intermediate-ast/builders/expressions/thisExpressionBuilder.js';
import { IdentifierBuilder } from '../../../refactoring-arch/intermediate-ast/builders/IdentifierBuilder.js';
import { IntermediateASTTree } from '../../../refactoring-arch/intermediate-ast/IntermediateASTTree.js';
import { DTONode } from '../../../refactoring-arch/intermediate-ast/nodes/DTO/DTONode.js';
import { FieldListNode } from '../../../refactoring-arch/intermediate-ast/nodes/FieldList/FieldListNode.js';
import { FieldNode } from '../../../refactoring-arch/intermediate-ast/nodes/FieldList/FieldNode.js';
import { IntermediateASTRootNode } from '../../../refactoring-arch/intermediate-ast/nodes/RootNode.js';
import {
  TParameterDependency,
  TRESTControllerDependencies,
  TRESTControllerExecute,
  TGraphQLControllerExecute,
  TGraphQLOperation,
  TDefinitionMethods,
  TOkErrorReturnType,
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
  // TModule,
  TUseCase,
  TStructs,
  TReadModels,
} from '../../../types.js';
import { NumericLiteralBuilder } from './../../../refactoring-arch/intermediate-ast/builders/expressions/literal/NumericLiteral/NumericLiteralBuilder.js';

import { aggregateDeclarationVisitor } from './helpers/aggregateDeclarationVisitor.js';
import { bitloopsPrimaryTypeVisitor } from './helpers/bitloopsPrimaryType.js';
import { entityBodyVisitor } from './helpers/entityBodyVisitor.js';
import { LiteralExpressionVisitor } from './helpers/expressions.js';

import {
  functionBodyVisitor,
  jestTestDeclarationVisitor,
  argumentListVisitor,
  argumentVisitor,
  regularVariableEvaluationORliteralORexpressionVisitor,
  structEvaluationVisitor,
  evaluationFieldListVisitor,
  // thisVariableMethodEvaluationVisitor,
  // regularVariableMethodEvaluationVisitor,
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
  // getClassEvaluationVisitor,
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
  // thisDeclarationVisitor,
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
  memberDotExpressionVisitor,
  methodCallExpressionVisitor,
  getClassExpressionVisitor,
  toStringExpressionVisitor,
  assignmentExpressionVisitor,
  identifierExpressionVisitor,
  domainEvaluationInputRegularVisitor,
  domainEvaluationInputFieldListVisitor,
  errorEvaluationVisitor,
} from './helpers/index.js';
import { optionalVisitor } from './helpers/optional.js';
import { produceMetadata } from './metadata.js';

export default class BitloopsVisitor extends BitloopsParserVisitor {
  [x: string]: any;

  private _intermediateASTTree: IntermediateASTTree;
  private _currentFile: string;

  constructor(currentFile: string) {
    super();
    this._currentFile = currentFile;
    this._intermediateASTTree = new IntermediateASTTree(new IntermediateASTRootNode());
  }

  get intermediateASTTree() {
    return this._intermediateASTTree;
  }

  public get currentFile(): string {
    return this._currentFile;
  }

  visitProgram(ctx: BitloopsParser.ProgramContext): any {
    this.visitChildren(ctx);
  }

  visitEqualityExpression(ctx: BitloopsParser.EqualityExpressionContext) {
    return equalityExpressionVisitor(this, ctx);
  }

  visitDtoIdentifier(ctx: BitloopsParser.DtoIdentifierContext) {
    const identifierName = ctx.DTOIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const dtoIdentifierNode = new DTOIdentifierNodeBuilder(metadata)
      .withName(identifierName)
      .build();
    return dtoIdentifierNode;
  }

  visitIdentifier(ctx: BitloopsParser.IdentifierContext) {
    const identifierName = ctx.Identifier().getText();
    const metadata = produceMetadata(ctx, this);
    const identifierNode = new IdentifierBuilder(metadata).withName(identifierName).build();
    return identifierNode;
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
    // const expression = this.expressionBuilder.withExpressionValues(evaluation).build();
    // return expression;

    return new ExpressionBuilder().withExpression(evaluation).build();
    // return {
    //   expression: {
    //     ...evaluation,
    //   },
    // };
  }

  visitMemberDotExpression(ctx: BitloopsParser.MemberDotExpressionContext) {
    return memberDotExpressionVisitor(this, ctx);
  }

  visitMethodCallExpression(ctx: BitloopsParser.MethodCallExpressionContext) {
    return methodCallExpressionVisitor(this, ctx);
  }

  visitGetClassExpression(ctx: BitloopsParser.GetClassExpressionContext): any {
    return getClassExpressionVisitor(this, ctx);
  }

  visitToStringExpression(ctx: BitloopsParser.ToStringExpressionContext): any {
    return toStringExpressionVisitor(this, ctx);
  }

  visitAssignmentExpression(ctx: BitloopsParser.AssignmentExpressionContext) {
    return assignmentExpressionVisitor(this, ctx);
  }

  visitThisExpression(_ctx: BitloopsParser.ThisExpressionContext) {
    const thisExprNode = new ThisExpressionNodeBuilder().build();
    return new ExpressionBuilder().withExpression(thisExprNode).build();
    // return {
    //   expression: {
    //     evaluation: {
    //       regularEvaluation: {
    //         type: 'variable',
    //         value: 'this',
    //       },
    //     },
    //   },
    // };
  }

  visitIdentifierExpression(ctx: BitloopsParser.IdentifierExpressionContext) {
    return identifierExpressionVisitor(this, ctx);
  }

  visitRegularStructEvaluationString(ctx: BitloopsParser.RegularStructEvaluationStringContext) {
    return this.visit(ctx.regularStructEvaluation());
  }

  visitRegularErrorTypeEvaluationString(
    ctx: BitloopsParser.RegularErrorTypeEvaluationStringContext,
  ) {
    return this.visit(ctx.regularErrorTypeEvaluation());
  }

  visitRegularDTOEvaluationString(ctx: BitloopsParser.RegularDTOEvaluationStringContext) {
    return { value: this.visit(ctx.regularDTOEvaluation()) };
  }
  visitRegularDTOEvaluation(ctx: BitloopsParser.RegularDTOEvaluationContext) {
    return ctx.DTOIdentifier().getText();
  }

  visitArrayLiteralExpression(ctx: BitloopsParser.ArrayLiteralExpressionContext) {
    const arrayLiteralExpressionNode = this.visit(ctx.arrayLiteral());
    return new ExpressionBuilder().withExpression(arrayLiteralExpressionNode).build();
  }

  visitArrayLiteral(ctx: BitloopsParser.ArrayLiteralContext) {
    return arrayLiteralVisitor(this, ctx);
  }

  visitTemplateStringLiteral(ctx: BitloopsParser.TemplateStringLiteralContext) {
    const stringChars: any = ctx.templateStringAtom(null);
    const value = stringChars.map((sc) => sc.getText()).join('');
    return {
      type: 'backTickString',
      value: value,
    };
  }

  visitErrorEvaluation(ctx: BitloopsParser.ErrorEvaluationContext) {
    return errorEvaluationVisitor(this, ctx);
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

  visitExecuteExpression(_ctx: BitloopsParser.ExecuteExpressionContext) {
    return {
      type: 'variable',
      value: 'execute',
    };
  }
  visitDeleteKeyword(_ctx: BitloopsParser.DeleteKeywordContext) {
    return {
      type: 'variable',
      value: 'delete',
    };
  }

  visitRegularIntegerEvaluation(ctx: BitloopsParser.RegularIntegerEvaluationContext) {
    return integerEvaluation(ctx.IntegerLiteral().getText())[0];
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

  // visitThisDeclaration(ctx: BitloopsParser.ThisDeclarationContext) {
  //   return thisDeclarationVisitor(this, ctx);
  // }

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

  visitMethodArguments(ctx: BitloopsParser.MethodArgumentsContext): any {
    return methodArgumentsVisitor(this, ctx);
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

  visitLiteralExpression(ctx: BitloopsParser.LiteralExpressionContext) {
    return LiteralExpressionVisitor(this, ctx);
  }
  visitNumericLiteralLabel(ctx: BitloopsParser.NumericLiteralLabelContext) {
    const actualNumericLiteral = this.visitChildren(ctx)[0];
    return new NumericLiteralBuilder().withNumericLiteral(actualNumericLiteral).build();
  }

  visitTemplateStringLiteralLabel(ctx: BitloopsParser.TemplateStringLiteralLabelContext) {
    return this.visitChildren(ctx)[0];
  }

  visitIntegerLiteral(ctx: BitloopsParser.IntegerLiteralContext) {
    const node = integerEvaluation(ctx.IntegerLiteral().getText());
    return node;
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

  visitDomainEvaluationInputFieldList(ctx: BitloopsParser.DomainEvaluationInputFieldListContext) {
    return domainEvaluationInputFieldListVisitor(this, ctx);
  }

  visitDomainEvaluationInputRegular(ctx: BitloopsParser.DomainEvaluationInputRegularContext) {
    return domainEvaluationInputRegularVisitor(this, ctx);
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

  visitBuiltInClassEvaluation(ctx: BitloopsParser.BuiltInClassEvaluationContext) {
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

  visitFieldList(ctx: BitloopsParser.FieldListContext): FieldListNode {
    return fieldListVisitor(this, ctx);
  }

  visitField(ctx: BitloopsParser.FieldContext): FieldNode {
    return fieldVisitor(this, ctx);
  }

  visitDtoDeclaration(ctx: BitloopsParser.DtoDeclarationContext): { DTOs: DTONode } {
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

  // visitIsInstanceOf(ctx: BitloopsParser.IsInstanceOfContext): any {
  //   return isInstanceOfVisitor(this, ctx);
  // }

  visitIsInstanceOfExpression(ctx: BitloopsParser.IsInstanceOfExpressionContext): any {
    return isInstanceOfVisitor(this, ctx);
  }

  visitClassTypes(ctx: BitloopsParser.ClassTypesContext): any {
    return ctx.ErrorClass().getText();
  }

  // visitGetClassEvaluation(ctx: BitloopsParser.GetClassEvaluationContext): any {
  //   return getClassEvaluationVisitor(this, ctx);
  // }

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

  visitBitloopsPrimaryType(ctx: BitloopsParser.BitloopsPrimaryTypeContext) {
    return bitloopsPrimaryTypeVisitor(this, ctx);
  }

  visitPrimitivePrimType(ctx: BitloopsParser.PrimitivePrimTypeContext) {
    return primitivePrimTypeVisitor(this, ctx);
  }

  visitArrayBitloopsPrimType(ctx: BitloopsParser.ArrayBitloopsPrimTypeContext) {
    return arrayBitloopsPrimTypeVisitor(this, ctx);
  }

  visitBitloopsBuildInClassPrimType(ctx: BitloopsParser.BitloopsBuiltInClassPrimTypeContext) {
    const buildInClassType = ctx.bitloopsBuiltInClass().getText();
    const buildInClassTypeNode = new BuildInClassTypeBuilder().withType(buildInClassType).build();
    return buildInClassTypeNode;
  }

  visitBitloopsIdentifierPrimType(ctx: BitloopsParser.BitloopsIdentifierPrimTypeContext) {
    const bitloopsIdentifierType = ctx.bitloopsIdentifiers().getText();
    const bitloopsIdentifierTypeNode = new BitloopsIdentifierTypeBuilder()
      .withType(bitloopsIdentifierType)
      .build();
    return bitloopsIdentifierTypeNode;
  }

  visitOptional(ctx: BitloopsParser.OptionalContext) {
    return optionalVisitor(ctx);
  }
}
