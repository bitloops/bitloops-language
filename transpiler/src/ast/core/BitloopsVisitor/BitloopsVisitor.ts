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
import { BitloopsIdentifierTypeBuilder } from '../intermediate-ast/builders/BitloopsPrimaryType/BitloopsIdentifierTypeBuilder.js';
import { BuildInClassTypeBuilder } from '../intermediate-ast/builders/BitloopsPrimaryType/BuildInClassTypeBuilder.js';
import { DTOIdentifierNodeBuilder } from '../intermediate-ast/builders/DTO/DTOIdentifierNodeBuilder.js';
import { ExpressionBuilder } from '../intermediate-ast/builders/expressions/ExpressionBuilder.js';
import { ThisExpressionNodeBuilder } from '../intermediate-ast/builders/expressions/thisExpressionBuilder.js';
import { IntermediateASTTree } from '../intermediate-ast/IntermediateASTTree.js';
import { FieldListNode } from '../intermediate-ast/nodes/FieldList/FieldListNode.js';
import { FieldNode } from '../intermediate-ast/nodes/FieldList/FieldNode.js';
import { IntermediateASTRootNode } from '../intermediate-ast/nodes/RootNode.js';
import { TConstDeclaration } from '../../../types.js';
import { NumericLiteralBuilder } from '../intermediate-ast/builders/expressions/literal/NumericLiteral/NumericLiteralBuilder.js';

import { BreakStatementNode } from './../intermediate-ast/nodes/statements/BreakStatementNode.js';
import { PropsIdentifierNode } from './../intermediate-ast/nodes/Props/PropsIdentifierNode.js';
import { PropsIdentifierNodeBuilder } from './../intermediate-ast/builders/Props/PropsIdentifierNodeBuilder.js';
import { aggregateDeclarationVisitor } from './helpers/aggregateDeclarationVisitor.js';
import { bitloopsPrimaryTypeVisitor } from './helpers/bitloopsPrimaryType.js';
import { entityBodyVisitor } from './helpers/entityBodyVisitor.js';
import {
  enviromentVariableVisitor,
  envVarWithDefaultValueExpressionVisitor,
  LiteralExpressionVisitor,
} from './helpers/expressions.js';

import {
  functionBodyVisitor,
  jestTestDeclarationVisitor,
  argumentListVisitor,
  argumentVisitor,
  structEvaluationVisitor,
  evaluationFieldListVisitor,
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
  switchStatementVisitor,
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
  caseClausesVisitor,
  parameterListVisitor,
  parameterVisitor,
  parameterArgIdentifierVisitor,
  isBrokenConditionVisitor,
  graphQLOperationTypeVisitor,
  graphQLOperationInputTypeVisitor,
  graphQLExecuteDependenciesVisitor,
  packagePortIdentifierVisitor,
} from './helpers/index.js';
import { optionalVisitor } from './helpers/optional.js';
import { produceMetadata } from './metadata.js';
import { ConditionNodeBuilder } from '../intermediate-ast/builders/statements/ifStatement/ConditionBuilder.js';
import { BreakStatementNodeBuilder } from '../intermediate-ast/builders/statements/BreakStatement.js';
import { ReturnStatementNodeBuilder } from '../intermediate-ast/builders/statements/ReturnStatementBuilder.js';
import { ReturnStatementNode } from '../intermediate-ast/nodes/statements/ReturnStatementNode.js';
import { EntityValuesNode } from '../intermediate-ast/nodes/Entity/EntityValuesNode.js';
import { ConstDeclarationListNode } from '../intermediate-ast/nodes/ConstDeclarationListNode.js';
import { DomainCreateNode } from '../intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { DomainRuleIdentifierBuilder } from '../intermediate-ast/builders/DomainRule/DomainRuleIdentifierBuilder.js';
import { ParameterIdentifierNode } from '../intermediate-ast/nodes/ParameterList/ParameterIdentifierNode.js';
import { ParameterListNode } from '../intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import { ParameterNode } from '../intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { IdentifierNode } from '../intermediate-ast/nodes/identifier/IdentifierNode.js';
import { StructIdentifierNodeBuilder } from '../intermediate-ast/builders/Struct/StructIdentifierNodeBuilder.js';
import { ErrorIdentifierNodeBuilder } from '../intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifierBuilder.js';
import { ErrorIdentifierNode } from '../intermediate-ast/nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import { ErrorIdentifiersNode } from '../intermediate-ast/nodes/ErrorIdentifiers/ErrorIdentifiersNode.js';
import { ReturnOkErrorTypeNode } from '../intermediate-ast/nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ReturnOkTypeNodeBuilder } from '../intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { ReturnOkTypeNode } from '../intermediate-ast/nodes/returnOkErrorType/ReturnOkTypeNode.js';
import { PublicMethodDeclarationListNode } from '../intermediate-ast/nodes/methods/PublicMethodDeclarationListNode.js';
import { PublicMethodDeclarationNode } from '../intermediate-ast/nodes/methods/PublicMethodDeclarationNode.js';
import { PrivateMethodDeclarationNode } from '../intermediate-ast/nodes/methods/PrivateMethodDeclarationNode.js';
import { PrivateMethodDeclarationListNode } from '../intermediate-ast/nodes/methods/PrivateMethodDeclarationListNode.js';
import { BitloopsPrimaryTypeNode } from '../intermediate-ast/nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { RESTControllerExecuteDependenciesNodeBuilder } from '../intermediate-ast/builders/controllers/restController/RESTControllerDependenciesNodeBuilder.js';
import { RESTControllerIdentifierNodeBuilder } from '../intermediate-ast/builders/controllers/restController/RESTControllerIdentifierNodeBuilder.js';
import { GraphQLControllerIdentifierNodeBuilder } from '../intermediate-ast/builders/controllers/graphQL/RESTControllerIdentifierNodeBuilder.js';
import { UseCaseIdentifierNodeBuilder } from '../intermediate-ast/builders/UseCase/UseCaseIdentifierNodeBuilder.js';
import { EvaluationFieldListNode } from '../intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { templateStringEvaluation } from './helpers/expression/literal/templateStringLiteral.js';
import { RepoPortIdentifierNodeBuilder } from '../intermediate-ast/builders/repo-port/RepoPortIdentifierNodeBuilder.js';
import { MethodDefinitionListNode } from '../intermediate-ast/nodes/method-definitions/MethodDefinitionListNode.js';
import { ReadModelIdentifierNodeBuilder } from '../intermediate-ast/builders/readModel/ReadModelIdentifierNodeBuilder.js';
import { ReadModelIdentifierNode } from '../intermediate-ast/nodes/readModel/ReadModelIdentifierNode.js';
import { ExtendsRepoPortsNodeBuilder } from '../intermediate-ast/builders/ExtendsRepoPortNodeBuilder.js';
import { ExtendsRepoPortsNode } from '../intermediate-ast/nodes/extendsRepoPortNode.js';
import { ValueObjectIdentifierNode } from '../intermediate-ast/nodes/valueObject/ValueObjectIdentifierNode.js';
import { valueObjectIdentifierVisitor } from './helpers/valueObjectIdentifier.js';
import { EntityIdentifierNode } from '../intermediate-ast/nodes/Entity/EntityIdentifierNode.js';
import { EntityIdentifierNodeBuilder } from '../intermediate-ast/builders/Entity/EntityIdentifierBuilder.js';
import { IdentifierNodeBuilder } from '../intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { domainConstructorParameterVisitor } from './helpers/domainConstructorParameterVisitor.js';
import { DomainCreateParameterNode } from '../intermediate-ast/nodes/Domain/DomainCreateParameterNode.js';
import { DTOIdentifierNode } from '../intermediate-ast/nodes/DTO/DTOIdentifierNode.js';
import { ExpressionNode } from '../intermediate-ast/nodes/Expression/ExpressionNode.js';
import { jestTestSetupDeclarationVisitor } from './helpers/jestTestSetupDeclaration.js';
import {
  bindServerRoutesVisitor,
  bindServerRouteVisitor,
  restServerAPIPrefixVisitor,
  restServerDeclarationVisitor,
  restServerPortVisitor,
  serverInstantiationOptionsVisitor,
  serverTypeOptionVisitor,
} from './helpers/setup/restServerDeclaration.js';
import { ServerTypeIdentifierNode } from '../intermediate-ast/nodes/setup/ServerTypeIdentifierNode.js';
import { ServerRoutesNode } from '../intermediate-ast/nodes/setup/ServerRoutesNode.js';
import { RestServerPortNode } from '../intermediate-ast/nodes/setup/RestServerPortNode.js';
import { RestServerAPIPrefixNode } from '../intermediate-ast/nodes/setup/RestServerAPIPrefixNode.js';
import { UseCaseExpressionNode } from '../intermediate-ast/nodes/setup/UseCaseExpressionNode.js';
import { useCaseDefinitionVisitor } from './helpers/setup/useCaseDefinition.js';
import { useCaseExpressionVisitor } from './helpers/setup/useCaseExpressionVisitor.js';
import { BoundedContextModuleNode } from '../intermediate-ast/nodes/setup/BoundedContextModuleNode.js';
import { boundedContextModuleVisitor } from './helpers/setup/boundedContextModuleVisitor.js';
import { boundedContextVisitor } from './helpers/setup/boundedContextDeclarationVisitor.js';
import { moduleVisitor } from './helpers/setup/moduleDeclarationVisitor.js';
import { wordsWithSpacesVisitor } from './helpers/setup/wordsWithSpacesVisitor.js';
import { WordsWithSpacesNode } from '../intermediate-ast/nodes/setup/WordsWithSpacesNode.js';
import { repoConnectionDefinitionVisitor } from './helpers/setup/repoConnectionDefinitionVisitor.js';
import { repoConnectionTypeVisitor } from './helpers/setup/repoConnectionTypeVisitor.js';
import { repoConnectionExpressionVisitor } from './helpers/setup/repoConnectionExpressionVisitor.js';
import { RepoConnectionExpressionNode } from '../intermediate-ast/nodes/setup/repo/RepoConnectionExpressionNode.js';
import { DatabaseTypeNode } from '../intermediate-ast/nodes/setup/repo/DatabaseTypeNode.js';
import { repoConnectionOptionsVisitor } from './helpers/setup/repoConnectionOptionsVisitor.js';
import { routerDefinitionVisitor } from './helpers/setup/routerDefinition.js';
import { RouterExpressionNode } from '../intermediate-ast/nodes/setup/RouterExpressionNode.js';
import { routerExpressionVisitor } from './helpers/setup/routerExpressionVisitor.js';
import { RestRouterNode } from '../intermediate-ast/nodes/setup/RestRouterNode.js';
import { restRouterVisitor } from './helpers/setup/restRouterVisitor.js';
import { RouterArgumentsNode } from '../intermediate-ast/nodes/setup/RouterArgumentsNode.js';
import { RouterControllersNode } from '../intermediate-ast/nodes/setup/RouterControllersNode.js';
import { routerArgumentsVisitor } from './helpers/setup/routerArgumentsVisitor.js';
import { routerControllersVisitor } from './helpers/setup/routerControllersVisitor.js';
import { routerControllerVisitor } from './helpers/setup/routerControllerVisitor.js';
import { RouterControllerNode } from '../intermediate-ast/nodes/setup/RouterControllerNode.js';
import { HTTPMethodVerbNode } from '../intermediate-ast/nodes/setup/HTTPMethodVerbNode.js';
import { httpMethodVerbVisitor } from './helpers/setup/httpMethodVerbVisitor.js';
import { ServerTypeIdentifierNodeBuilder } from '../intermediate-ast/builders/setup/ServerTypeIdentifierNodeBuilder.js';
import { StringLiteralNode } from '../intermediate-ast/nodes/Expression/Literal/StringLiteralNode.js';
import { configInvocationVisitor } from './helpers/setup/configInvocation.js';
import { languageSetterMethodVisitor } from './helpers/setup/languageSetterMethod.js';
import { LanguageNode } from '../intermediate-ast/nodes/setup/LanguageNode.js';
import { packageConcretionVisitor } from './helpers/setup/packageConcretion.js';
import { packageAdapterIdentifierVisitor } from './helpers/setup/packageAdapterIdentifier.js';
import { PackageAdapterIdentifierNode } from '../intermediate-ast/nodes/package/packageAdapters/PackageAdapterIdentifierNode.js';
import { ServerRouteNode } from '../intermediate-ast/nodes/setup/ServerRouteNode.js';
import { RestServerNode } from '../intermediate-ast/nodes/setup/RestServerNode.js';
import { RepoAdapterClassNameNode } from '../intermediate-ast/nodes/setup/repo/RepoAdapterClassNameNode.js';
import { repoAdapterClassNameVisitor } from './helpers/setup/repoAdapterClassName.js';
import { RepoAdapterOptionsNode } from '../intermediate-ast/nodes/setup/repo/RepoAdapterOptionsNode.js';
import { repoAdapterOptionsVisitor } from './helpers/setup/repoAdapterOptions.js';
import { ConcretedRepoPortNode } from '../intermediate-ast/nodes/setup/repo/ConcretedRepoPortNode.js';
import { concretedRepoPortVisitor } from './helpers/setup/concretedRepoPort.js';
import { RepoAdapterExpressionNode } from '../intermediate-ast/nodes/setup/repo/RepoAdapterExpressionNode.js';
import { repoAdapterExpressionVisitor } from './helpers/setup/repoAdapterExpression.js';
import { repoAdapterDefinitionVisitor } from './helpers/setup/repoAdapterDefinition.js';

export default class BitloopsVisitor extends BitloopsParserVisitor {
  [x: string]: any;

  private _intermediateASTTree: IntermediateASTTree;
  private _currentFile: string;

  constructor(currentFile: string) {
    super();
    this._currentFile = currentFile;
    this._intermediateASTTree = new IntermediateASTTree(new IntermediateASTRootNode());
  }

  get intermediateASTTree(): IntermediateASTTree {
    return this._intermediateASTTree;
  }

  public get currentFile(): string {
    return this._currentFile;
  }

  visitProgram(ctx: BitloopsParser.ProgramContext): any {
    this.visitChildren(ctx);
  }

  visitCoreProgram(ctx: BitloopsParser.CoreProgramContext): any {
    this.visitChildren(ctx);
  }

  visitSetupProgram(ctx: BitloopsParser.SetupProgramContext): any {
    this.visitChildren(ctx);
  }

  visitEqualityExpression(ctx: BitloopsParser.EqualityExpressionContext): ExpressionNode {
    return equalityExpressionVisitor(this, ctx);
  }

  visitDtoIdentifier(ctx: BitloopsParser.DtoIdentifierContext): DTOIdentifierNode {
    const identifierName = ctx.DTOIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const dtoIdentifierNode = new DTOIdentifierNodeBuilder(metadata)
      .withName(identifierName)
      .build();
    return dtoIdentifierNode;
  }

  visitPropsIdentifier(ctx: BitloopsParser.PropsIdentifierContext): PropsIdentifierNode {
    const identifierName = ctx.PropsIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const propsIdentifierNode = new PropsIdentifierNodeBuilder(metadata)
      .withName(identifierName)
      .build();
    return propsIdentifierNode;
  }

  visitStructIdentifier(ctx: BitloopsParser.StructIdentifierContext): IdentifierNode {
    const identifierName = ctx.UpperCaseIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const structIdentifierNode = new StructIdentifierNodeBuilder(metadata)
      .withName(identifierName)
      .build();
    return structIdentifierNode;
  }

  visitUseCaseIdentifier(ctx: BitloopsParser.UseCaseIdentifierContext): IdentifierNode {
    const identifierName = ctx.UseCaseIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const useCaseIdentifierNode = new UseCaseIdentifierNodeBuilder(metadata)
      .withName(identifierName)
      .build();
    return useCaseIdentifierNode;
  }

  visitRepoPortIdentifier(ctx: BitloopsParser.RepoPortIdentifierContext) {
    const repoPortIdentifierName = ctx.RepoPortIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const repoPortIdentifierNode = new RepoPortIdentifierNodeBuilder(metadata)
      .withName(repoPortIdentifierName)
      .build();
    return repoPortIdentifierNode;
  }

  visitIdentifier(ctx: BitloopsParser.IdentifierContext): IdentifierNode {
    const identifierName = ctx.Identifier().getText();
    const metadata = produceMetadata(ctx, this);
    const identifierNode = new IdentifierNodeBuilder(metadata).withName(identifierName).build();
    return identifierNode;
  }

  visitUpperCaseIdentifier(ctx: BitloopsParser.UpperCaseIdentifierContext): IdentifierNode {
    const identifierName = ctx.UpperCaseIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const identifierNode = new IdentifierNodeBuilder(metadata).withName(identifierName).build();
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
    return new ExpressionBuilder().withExpression(evaluation).build();
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
    return templateStringEvaluation(value);
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

  visitCondition(ctx: BitloopsParser.ConditionContext) {
    const expression = this.visit(ctx.expression());
    const metadata = produceMetadata(ctx, this);
    const conditionNode = new ConditionNodeBuilder(metadata).withExpression(expression).build();
    return conditionNode;
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

  visitConstDeclaration(ctx: BitloopsParser.ConstDeclarationContext) {
    return constDeclarationVisitor(this, ctx);
  }

  visitVariableDeclaration(ctx: BitloopsParser.VariableDeclarationContext) {
    return variableDeclarationVisitor(this, ctx);
  }

  visitTypeAnnotation(ctx: BitloopsParser.TypeAnnotationContext) {
    return this.visit(ctx.bitloopsPrimaryType());
  }

  visitSwitchStatement(ctx: BitloopsParser.SwitchStatementContext) {
    return switchStatementVisitor(this, ctx);
  }

  visitCaseClauses(ctx: BitloopsParser.CaseClausesContext) {
    return caseClausesVisitor(this, ctx);
  }

  visitCaseClause(ctx: BitloopsParser.CaseClauseContext) {
    return caseClauseVisitor(this, ctx);
  }

  visitDefaultClause(ctx: BitloopsParser.DefaultClauseContext) {
    return defaultClauseVisitor(this, ctx);
  }

  visitBreakStatement(): BreakStatementNode {
    return new BreakStatementNodeBuilder().build();
  }

  visitFunctionBody(ctx: BitloopsParser.FunctionBodyContext) {
    return functionBodyVisitor(this, ctx);
  }

  visitJestTestDeclaration(ctx: BitloopsParser.JestTestDeclarationContext) {
    return jestTestDeclarationVisitor(this, ctx);
  }

  visitjestTestSetupDeclarationStatement(
    ctx: BitloopsParser.JestTestSetupDeclarationStatementContext,
  ) {
    return jestTestSetupDeclarationVisitor(this, ctx);
  }

  visitArgumentList(ctx: BitloopsParser.ArgumentListContext) {
    return argumentListVisitor(this, ctx);
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

  visitEvaluationFieldList(
    ctx: BitloopsParser.EvaluationFieldListContext,
  ): EvaluationFieldListNode {
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

  visitLiteralExpression(ctx: BitloopsParser.LiteralExpressionContext) {
    return LiteralExpressionVisitor(this, ctx);
  }
  visitNumericLiteralLabel(ctx: BitloopsParser.NumericLiteralLabelContext) {
    const actualNumericLiteral = this.visitChildren(ctx)[0];
    const metadata = produceMetadata(ctx, this);
    return new NumericLiteralBuilder(metadata).withNumericLiteral(actualNumericLiteral).build();
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

  visitParameter(ctx: BitloopsParser.ParameterContext): ParameterNode {
    return parameterVisitor(this, ctx);
  }

  visitParameterList(ctx: BitloopsParser.ParameterListContext): ParameterListNode {
    return parameterListVisitor(this, ctx);
  }
  visitParameterIdentifier(
    ctx: BitloopsParser.ParameterIdentifierContext,
  ): ParameterIdentifierNode {
    return parameterArgIdentifierVisitor(this, ctx);
  }

  visitRestControllerExecuteDeclaration(
    ctx: BitloopsParser.RestControllerExecuteDeclarationContext,
  ): any {
    return restControllerExecuteDeclarationVisitor(this, ctx);
  }

  visitRestControllerMethodDeclaration(ctx: BitloopsParser.RestControllerMethodDeclarationContext) {
    return restControllerMethodDeclarationVisitor(this, ctx);
  }
  visitRestControllerIdentifier(ctx: BitloopsParser.RestControllerIdentifierContext) {
    const metadata = produceMetadata(ctx, this);
    return new RESTControllerIdentifierNodeBuilder(metadata)
      .withName(ctx.ControllerIdentifier().getText())
      .build();
  }

  visitGraphQLControllerIdentifier(ctx: BitloopsParser.GraphQLControllerIdentifierContext) {
    const metadata = produceMetadata(ctx, this);
    return new GraphQLControllerIdentifierNodeBuilder(metadata)
      .withName(ctx.ControllerIdentifier().getText())
      .build();
  }

  visitRestControllerParameters(ctx: BitloopsParser.RestControllerParametersContext): any {
    const metadata = produceMetadata(ctx, this);
    return new RESTControllerExecuteDependenciesNodeBuilder(metadata)
      .withDependencies(ctx.Identifier(0).getText(), ctx.Identifier(1).getText())
      .build();
  }

  // GraphQLControllerDeclaration
  visitGraphQLControllerDeclaration(ctx: BitloopsParser.GraphQLControllerDeclarationContext): any {
    return graphQLControllerDeclarationVisitor(this, ctx);
  }

  visitRESTControllerDeclaration(ctx: BitloopsParser.RESTControllerDeclarationContext): void {
    restControllerDeclarationVisitor(this, ctx);
  }

  visitGraphQLResolverOptions(ctx: BitloopsParser.GraphQLResolverOptionsContext): any {
    return graphQLResolverOptionsVisitor(this, ctx);
  }

  visitGraphQLControllerExecuteDeclaration(
    ctx: BitloopsParser.GraphQLControllerExecuteDeclarationContext,
  ) {
    return graphQLControllerExecuteVisitor(this, ctx);
  }

  visitGraphQLControllerParameters(ctx: BitloopsParser.GraphQLControllerParametersContext): any {
    return graphQLExecuteDependenciesVisitor(this, ctx);
  }

  visitGraphQLOperationTypeAssignment(ctx: BitloopsParser.GraphQLOperationTypeAssignmentContext) {
    return graphQLOperationTypeVisitor(this, ctx);
  }

  visitGraphQLOperationInputTypeAssignment(
    ctx: BitloopsParser.GraphQLOperationInputTypeAssignmentContext,
  ) {
    return graphQLOperationInputTypeVisitor(this, ctx);
  }

  visitMethodDefinitionList(
    ctx: BitloopsParser.MethodDefinitionListContext,
  ): MethodDefinitionListNode {
    return methodDefinitionListVisitor(this, ctx);
  }

  visitMethodDefinition(ctx: BitloopsParser.MethodDefinitionContext) {
    return methodDefinitionVisitor(this, ctx);
  }

  visitErrorIdentifier(ctx: BitloopsParser.ErrorIdentifierContext): ErrorIdentifierNode {
    const errorIdentifierName = ctx.ErrorIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const errorIdentifierNode = new ErrorIdentifierNodeBuilder(metadata)
      .withName(errorIdentifierName)
      .build();
    return errorIdentifierNode;
  }

  visitReturnOkType(ctx: BitloopsParser.ReturnOkTypeContext): ReturnOkTypeNode {
    const primaryTypeNode = this.visit(ctx.bitloopsPrimaryType()); // ctx.type_().getText();
    const metadata = produceMetadata(ctx, this);
    const returnOkTypeNode = new ReturnOkTypeNodeBuilder(metadata)
      .withType(primaryTypeNode)
      .build();
    return returnOkTypeNode;
  }

  visitBuiltInClassEvaluation(ctx: BitloopsParser.BuiltInClassEvaluationContext) {
    return builtInClassEvaluationVisitor(this, ctx);
  }

  visitErrorIdentifiers(ctx: BitloopsParser.ErrorIdentifiersContext): ErrorIdentifiersNode {
    return errorIdentifiersVisitor(this, ctx);
  }

  visitReturnErrorsType(ctx: BitloopsParser.ReturnErrorsTypeContext): ErrorIdentifiersNode {
    return returnErrorsTypeVisitor(this, ctx);
  }

  visitReturnOkErrorType(ctx: BitloopsParser.ReturnOkErrorTypeContext): ReturnOkErrorTypeNode {
    return returnOkErrorTypeVisitor(this, ctx);
  }

  visitFieldList(ctx: BitloopsParser.FieldListContext): FieldListNode {
    return fieldListVisitor(this, ctx);
  }

  visitField(ctx: BitloopsParser.FieldContext): FieldNode {
    return fieldVisitor(this, ctx);
  }

  visitDtoDeclaration(ctx: BitloopsParser.DtoDeclarationContext): void {
    dtoDeclarationVisitor(this, ctx);
  }
  visitPropsDeclaration(ctx: BitloopsParser.PropsDeclarationContext): any {
    return propsDeclarationVisitor(this, ctx);
  }

  visitDomainConstructorDeclaration(
    ctx: BitloopsParser.DomainConstructorDeclarationContext,
  ): DomainCreateNode {
    return domainConstructorDeclarationVisitor(this, ctx);
  }

  visitDomainConstructorParam(
    ctx: BitloopsParser.DomainConstructorParamContext,
  ): DomainCreateParameterNode {
    return domainConstructorParameterVisitor(this, ctx);
  }

  visitValueObjectDeclaration(ctx: BitloopsParser.ValueObjectDeclarationContext): void {
    valueObjectDeclarationVisitor(this, ctx);
  }

  visitValueObjectIdentifier(
    ctx: BitloopsParser.ValueObjectIdentifierContext,
  ): ValueObjectIdentifierNode {
    return valueObjectIdentifierVisitor(this, ctx);
  }

  visitEntityIdentifier(ctx: BitloopsParser.EntityIdentifierContext): EntityIdentifierNode {
    const metadata = produceMetadata(ctx, this);

    const entityIdentifier = ctx.EntityIdentifier().getText();
    const entityIdentifierNode = new EntityIdentifierNodeBuilder(metadata)
      .withName(entityIdentifier)
      .build();

    return entityIdentifierNode;
  }

  visitEntityDeclaration(ctx: BitloopsParser.EntityDeclarationContext): void {
    entityDeclarationVisitor(this, ctx);
  }

  visitAggregateDeclaration(ctx: BitloopsParser.AggregateDeclarationContext) {
    return aggregateDeclarationVisitor(this, ctx);
  }

  visitEntityBody(ctx: BitloopsParser.EntityBodyContext): EntityValuesNode {
    return entityBodyVisitor(this, ctx);
  }

  visitDomainConstDeclarationList(
    ctx: BitloopsParser.DomainConstDeclarationListContext,
  ): ConstDeclarationListNode {
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
  ): PublicMethodDeclarationListNode {
    return publicMethodDeclarationListVisitor(this, ctx);
  }

  visitPublicMethodDeclaration(
    ctx: BitloopsParser.PublicMethodDeclarationContext,
  ): PublicMethodDeclarationNode {
    return publicMethodDeclarationVisitor(this, ctx);
  }

  // Private method declaration

  visitPrivateMethodDeclarationList(
    ctx: BitloopsParser.PrivateMethodDeclarationListContext,
  ): PrivateMethodDeclarationListNode {
    return privateMethodDeclarationListVisitor(this, ctx);
  }

  visitPrivateMethodDeclaration(
    ctx: BitloopsParser.PrivateMethodDeclarationContext,
  ): PrivateMethodDeclarationNode {
    return privateMethodDeclarationVisitor(this, ctx);
  }

  visitReturnPrivateMethodType(
    ctx: BitloopsParser.ReturnPrivateMethodTypeContext,
  ): BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode {
    return returnPrivateMethodTypeVisitor(this, ctx);
  }

  visitReturnStatement(ctx: BitloopsParser.ReturnStatementContext): ReturnStatementNode {
    const expressionNode = this.visit(ctx.expression());

    const metadata = produceMetadata(ctx, this);

    const returnStatementNode = new ReturnStatementNodeBuilder(metadata)
      .withExpression(expressionNode)
      .build();
    return returnStatementNode;
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
  visitDomainRuleDeclaration(ctx: BitloopsParser.DomainRuleDeclarationContext): void {
    domainRuleDeclarationVisitor(this, ctx);
  }

  visitDomainRuleBody(ctx: BitloopsParser.DomainRuleBodyContext): any {
    return domainRuleBodyVisitor(this, ctx);
  }

  visitIsBrokenStatement(ctx: BitloopsParser.IsBrokenStatementContext): any {
    return isBrokenConditionVisitor(this, ctx);
  }

  visitApplyRulesStatement(ctx: BitloopsParser.ApplyRulesStatementContext) {
    return applyRulesStatementVisitor(this, ctx);
  }

  visitDomainRuleIdentifier(ctx: BitloopsParser.DomainRuleIdentifierContext) {
    const metadata = produceMetadata(ctx, this);
    return new DomainRuleIdentifierBuilder(metadata)
      .withName(ctx.RuleIdentifier().getText())
      .build();
  }

  visitApplyRuleStatementRulesList(ctx: BitloopsParser.ApplyRuleStatementRulesListContext): any {
    return applyRuleStatementRulesListVisitor(this, ctx);
  }
  visitApplyRulesRule(ctx: BitloopsParser.ApplyRulesRuleContext): any {
    return applyRulesRuleVisitor(this, ctx);
  }

  visitIsInstanceOfExpression(ctx: BitloopsParser.IsInstanceOfExpressionContext): any {
    return isInstanceOfVisitor(this, ctx);
  }

  visitClassTypes(ctx: BitloopsParser.ClassTypesContext): any {
    return ctx.ErrorClass().getText();
  }

  /**
   * UseCase Declaration
   */
  visitUseCaseDeclaration(ctx: BitloopsParser.UseCaseDeclarationContext): void {
    useCaseDeclarationVisitor(this, ctx);
  }
  visitUseCaseExecuteDeclaration(ctx: BitloopsParser.UseCaseExecuteDeclarationContext): any {
    return useCaseExecuteDeclarationVisitor(this, ctx);
  }

  visitStructDeclaration(ctx: BitloopsParser.StructDeclarationContext): void {
    structDeclarationVisitor(this, ctx);
  }

  visitPackagePortDeclaration(ctx: BitloopsParser.PackagePortDeclarationContext): void {
    packagePortDeclarationVisitor(this, ctx);
  }

  visitPackagePortIdentifier(ctx: BitloopsParser.PackagePortIdentifierContext) {
    return packagePortIdentifierVisitor(this, ctx);
  }

  visitRepoPortDeclaration(ctx: BitloopsParser.RepoPortDeclarationContext): void {
    return repoPortDeclarationVisitor(this, ctx);
  }

  visitRepoExtendsList(ctx: BitloopsParser.RepoExtendsListContext): ExtendsRepoPortsNode {
    return this.visitChildren(ctx).filter((listItem) => listItem !== undefined)[0];
  }

  visitRepoPortExtendableIdentifierList(
    ctx: BitloopsParser.RepoPortExtendableIdentifierListContext,
  ): ExtendsRepoPortsNode {
    const identifierList: IdentifierNode[] = this.visitChildren(ctx).filter(
      (child) => child !== undefined,
    );

    const identifierListNode = new ExtendsRepoPortsNodeBuilder()
      .withIdentifierList(identifierList)
      .build();
    return identifierListNode;
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
  visitReadModelDeclaration(ctx: BitloopsParser.ReadModelDeclarationContext): void {
    readModelDeclarationVisitor(this, ctx);
  }

  visitReadModelIdentifier(
    ctx: BitloopsParser.ReadModelIdentifierContext,
  ): ReadModelIdentifierNode {
    return new ReadModelIdentifierNodeBuilder(produceMetadata(ctx, this))
      .withName(ctx.ReadModelIdentifier().getText())
      .build();
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

  visitBitloopsBuiltInClassPrimType(ctx: BitloopsParser.BitloopsBuiltInClassPrimTypeContext) {
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

  visitRestServerDeclaration(ctx: BitloopsParser.RestServerDeclarationContext): RestServerNode {
    return restServerDeclarationVisitor(this, ctx);
  }

  visitServerInstantiationOptions(ctx: BitloopsParser.ServerInstantiationOptionsContext) {
    return serverInstantiationOptionsVisitor(this, ctx);
  }

  visitServerTypeOption(ctx: BitloopsParser.ServerTypeOptionContext): ServerTypeIdentifierNode {
    const serverTypeNode = serverTypeOptionVisitor(this, ctx);
    return serverTypeNode;
  }

  visitServerApiPrefixOption(
    ctx: BitloopsParser.ServerApiPrefixOptionContext,
  ): RestServerAPIPrefixNode {
    const apiPrefixNode = restServerAPIPrefixVisitor(this, ctx);
    return apiPrefixNode;
  }

  visitRestServerPort(ctx: BitloopsParser.RestServerPortContext): RestServerPortNode {
    return restServerPortVisitor(this, ctx);
  }

  //TODO support custom option in the future?
  // visitCustomServerOption(ctx: BitloopsParser.CustomServerOptionContext): ExpressionNode {
  //   const res = customServerOptionVisitor(this, ctx);
  //   return res;
  // }

  visitBindServerRoutes(ctx: BitloopsParser.BindServerRoutesContext): ServerRoutesNode {
    const routesNode = bindServerRoutesVisitor(this, ctx);
    return routesNode;
  }

  visitRouteBind(ctx: BitloopsParser.RouteBindContext): ServerRouteNode {
    const routeNode = bindServerRouteVisitor(this, ctx);
    return routeNode;
  }

  visitEnvVarWithDefaultValueExpression(
    ctx: BitloopsParser.EnvVarWithDefaultValueExpressionContext,
  ): ExpressionNode {
    const envVar = envVarWithDefaultValueExpressionVisitor(this, ctx);
    return envVar;
  }

  visitEnvironmentVariableExpression(
    ctx: BitloopsParser.EnvironmentVariableExpressionContext,
  ): ExpressionNode {
    const envVar = enviromentVariableVisitor(this, ctx);
    return envVar;
  }
  visitUseCaseDefinitionStatement(ctx: BitloopsParser.UseCaseDefinitionStatementContext): void {
    this.visit(ctx.useCaseDefinition());
  }

  visitUseCaseDefinition(ctx: BitloopsParser.UseCaseDefinitionContext): void {
    useCaseDefinitionVisitor(this, ctx);
  }

  visitUseCaseExpression(ctx: BitloopsParser.UseCaseExpressionContext): UseCaseExpressionNode {
    return useCaseExpressionVisitor(this, ctx);
  }

  visitRepoConnectionDefinition(ctx: BitloopsParser.RepoConnectionDefinitionContext): void {
    repoConnectionDefinitionVisitor(this, ctx);
  }

  visitRepoConnectionExpression(
    ctx: BitloopsParser.RepoConnectionExpressionContext,
  ): RepoConnectionExpressionNode {
    return repoConnectionExpressionVisitor(this, ctx);
  }

  visitRepoConnectionType(ctx: BitloopsParser.RepoConnectionTypeContext): DatabaseTypeNode {
    return repoConnectionTypeVisitor(this, ctx);
  }

  visitRepoConnectionOptions(ctx: BitloopsParser.RepoConnectionOptionsContext): any {
    return repoConnectionOptionsVisitor(this, ctx);
  }

  visitBoundedContextModuleDeclaration(
    ctx: BitloopsParser.BoundedContextModuleDeclarationContext,
  ): BoundedContextModuleNode {
    return boundedContextModuleVisitor(this, ctx);
  }

  visitBoundedContextDeclaration(
    ctx: BitloopsParser.BoundedContextDeclarationContext,
  ): BoundedContextModuleNode {
    return boundedContextVisitor(this, ctx);
  }

  visitModuleDeclaration(
    ctx: BitloopsParser.BoundedContextDeclarationContext,
  ): BoundedContextModuleNode {
    return moduleVisitor(this, ctx);
  }

  visitWordsWithSpaces(ctx: BitloopsParser.WordsWithSpacesContext): WordsWithSpacesNode {
    return wordsWithSpacesVisitor(this, ctx);
  }

  visitAlpha_numeric_ws(ctx: BitloopsParser.Alpha_numeric_wsContext): string {
    if (ctx.Identifier()) {
      return ctx.Identifier().getText();
    } else if (ctx.UpperCaseIdentifier()) {
      return ctx.UpperCaseIdentifier().getText();
    } else if (ctx.IntegerLiteral()) {
      return ctx.IntegerLiteral().getText();
    } else {
      return '';
    }
  }

  visitRouterDefinitionStatement(ctx: BitloopsParser.RouterDefinitionStatementContext): void {
    this.visit(ctx.routerDefinition());
  }

  visitRouterDefinition(ctx: BitloopsParser.RouterDefinitionContext): void {
    routerDefinitionVisitor(this, ctx);
  }

  visitRouterExpression(ctx: BitloopsParser.RouterExpressionContext): RouterExpressionNode {
    return routerExpressionVisitor(this, ctx);
  }

  visitRestRouter(ctx: BitloopsParser.RestRouterContext): RestRouterNode {
    return restRouterVisitor(this, ctx);
  }

  visitRouterArguments(ctx: BitloopsParser.RouterArgumentsContext): RouterArgumentsNode {
    return routerArgumentsVisitor(this, ctx);
  }

  visitRouterControllers(ctx: BitloopsParser.RouterControllersContext): RouterControllersNode {
    return routerControllersVisitor(this, ctx);
  }

  visitRouterController(ctx: BitloopsParser.RouterControllerContext): RouterControllerNode {
    return routerControllerVisitor(this, ctx);
  }

  visitHttpMethodVerb(ctx: BitloopsParser.HttpMethodVerbContext): HTTPMethodVerbNode {
    return httpMethodVerbVisitor(this, ctx);
  }

  visitServerType(ctx: BitloopsParser.ServerTypeContext): ServerTypeIdentifierNode {
    let serverType = '';
    if (ctx.expressServer()) {
      serverType = ctx.expressServer().getText();
    }
    if (ctx.fastifyServer()) {
      serverType = ctx.fastifyServer().getText();
    }
    if (ctx.graphQLServerType()) {
      serverType = ctx.graphQLServerType().getText();
    }
    const metadata = produceMetadata(ctx, this);
    return new ServerTypeIdentifierNodeBuilder(metadata)
      .withServerTypeIdentifier(serverType)
      .build();
  }

  visitPathString(ctx: BitloopsParser.PathStringContext): StringLiteralNode {
    return stringEvaluation(ctx.StringLiteral().getText());
  }

  visitConfigInvocation(ctx: BitloopsParser.ConfigInvocationContext): void {
    configInvocationVisitor(this, ctx);
  }

  visitLanguageSetterMethod(ctx: BitloopsParser.LanguageSetterMethodContext): LanguageNode {
    return languageSetterMethodVisitor(this, ctx);
  }

  visitPackageConcretion(ctx: BitloopsParser.PackageConcretionContext): void {
    packageConcretionVisitor(this, ctx);
  }

  visitPackageAdapterIdentifier(
    ctx: BitloopsParser.PackageAdapterIdentifierContext,
  ): PackageAdapterIdentifierNode {
    return packageAdapterIdentifierVisitor(this, ctx);
  }

  visitRepoAdapterClassName(
    ctx: BitloopsParser.RepoAdapterClassNameContext,
  ): RepoAdapterClassNameNode {
    return repoAdapterClassNameVisitor(this, ctx);
  }

  visitRepoAdapterOptions(ctx: BitloopsParser.RepoAdapterOptionsContext): RepoAdapterOptionsNode {
    return repoAdapterOptionsVisitor(this, ctx);
  }

  visitConcretedRepoPort(ctx: BitloopsParser.ConcretedRepoPortContext): ConcretedRepoPortNode {
    return concretedRepoPortVisitor(this, ctx);
  }

  visitRepoAdapterExpression(
    ctx: BitloopsParser.RepoAdapterExpressionContext,
  ): RepoAdapterExpressionNode {
    return repoAdapterExpressionVisitor(this, ctx);
  }

  visitRepoAdapterDefinition(ctx: BitloopsParser.RepoAdapterDefinitionContext): void {
    repoAdapterDefinitionVisitor(this, ctx);
  }
}
