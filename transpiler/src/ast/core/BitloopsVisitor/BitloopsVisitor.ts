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
import { BuiltInClassTypeBuilder } from '../intermediate-ast/builders/BitloopsPrimaryType/BuiltInClassTypeBuilder.js';
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
  AnonymousExpressionVisitor,
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
  methodDefinitionVisitor,
  methodDefinitionListVisitor,
  returnErrorsTypeVisitor,
  returnOkErrorTypeVisitor,
  errorIdentifiersVisitor,
  fieldListVisitor,
  fieldVisitor,
  dtoDeclarationVisitor,
  propsDeclarationVisitor,
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
  executeDeclarationVisitor,
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
  ifErrorExpressionVisitor,
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
  packagePortIdentifierVisitor,
  commandEvaluationVisitor,
  queryEvaluationVisitor,
  domainEventDeclarationVisitor,
  domainEventIdentifierVisitor,
  domainEventHandlerDeclarationVisitor,
  domainEventHandlerIdentifierVisitor,
  domainEventHandlerHandleMethodVisitor,
  domainEventHandlerHandleMethodParameterVisitor,
  integrationEventEvaluationVisitor,
  entityConstructorEvaluationVisitor,
  standardVOEvaluationVisitor,
  domainCreateDeclarationVisitor,
  regexLiteralEvaluation,
  readModelEvaluationVisitor,
  domainEventEvaluationVisitor,
  packageEvaluationVisitor,
  forOfStatementVisitor,
  // staticMethodCallExpressionVisitor,
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
import { DTOIdentifierNode } from '../intermediate-ast/nodes/DTO/DTOIdentifierNode.js';
import { ExpressionNode } from '../intermediate-ast/nodes/Expression/ExpressionNode.js';
import { jestTestSetupDeclarationVisitor } from './helpers/jestTestSetupDeclaration.js';
import { BoundedContextModuleNode } from '../intermediate-ast/nodes/setup/BoundedContextModuleNode.js';
import { boundedContextModuleVisitor } from './helpers/setup/boundedContextModuleVisitor.js';
import { boundedContextVisitor } from './helpers/setup/boundedContextDeclarationVisitor.js';
import { moduleVisitor } from './helpers/setup/moduleDeclarationVisitor.js';
import { wordsWithSpacesVisitor } from './helpers/setup/wordsWithSpacesVisitor.js';
import { WordsWithSpacesNode } from '../intermediate-ast/nodes/setup/WordsWithSpacesNode.js';
import { StringLiteralNode } from '../intermediate-ast/nodes/Expression/Literal/StringLiteralNode.js';
import { configInvocationVisitor } from './helpers/setup/config/configInvocation.js';
import { languageSetterMethodVisitor } from './helpers/setup/languageSetterMethod.js';
import { LanguageNode } from '../intermediate-ast/nodes/setup/config/language/LanguageNode.js';
import { BoundedContextNameNode } from '../intermediate-ast/nodes/setup/BoundedContextNameNode.js';
import { ModuleNameNode } from '../intermediate-ast/nodes/setup/ModuleNameNode.js';
import { domainCreateParameterVisitor } from './helpers/domainCreateParameterVisitor.js';
import { commandDeclarationVisitor } from './helpers/commandDeclaration.js';
import { queryDeclarationVisitor } from './helpers/queryDeclaration.js';
import { commandHandlerVisitor } from './helpers/commandHandler.js';
import { queryHandlerVisitor } from './helpers/queryHandlerVisitor.js';
import { integrationEventDeclarationVisitor } from './helpers/integration-event/integrationEventVisitor.js';
import { DomainEventIdentifierNode } from '../intermediate-ast/nodes/DomainEvent/DomainEventIdentifierNode.js';
import { StandardVOTypeNodeBuilder } from '../intermediate-ast/builders/BitloopsPrimaryType/StandardVOTypeNodeBuilder.js';
import { StandardValueTypeNodeBuilder } from '../intermediate-ast/builders/BitloopsPrimaryType/StandardValueTypeNodeBuilder.js';
import { IntegrationEventIdentifierNodeBuilder } from '../intermediate-ast/builders/integration-event/IntegrationEventIdentifierNodeBuilder.js';
import { IntegrationEventIdentifierNode } from '../intermediate-ast/nodes/integration-event/IntegrationEventIdentifierNode.js';
import { integrationEventInputVisitor } from './helpers/integration-event/integrationEventInputVisitor.js';
import { integrationEventInputTypeVisitor } from './helpers/integration-event/integrationEventInputTypeVisitor.js';
import { IntegrationVersionMapperListNode } from '../intermediate-ast/nodes/integration-event/IntegrationVersionMapperListNode.js';
import { integrationVersionMapperListVisitor } from './helpers/integration-event/integrationVersionMapperListVisitor.js';
import { IntegrationVersionMapperNode } from '../intermediate-ast/nodes/integration-event/IntegrationVersionMapperNode.js';
import { integrationVersionMapperVisitor } from './helpers/integration-event/integrationVersionMapperVisitor.js';
import { StructIdentifierNode } from '../intermediate-ast/nodes/struct/StructIdentifierNode.js';
import {
  integrationEventHandlerDeclarationVisitor,
  integrationEventHandlerHandleMethodParameterVisitor,
  integrationEventHandlerHandleMethodVisitor,
  integrationEventHandlerIdentifierVisitor,
} from './helpers/integration-event/integrationEventHandlerDeclarationVisitor.js';
import { IntegrationEventHandlerIdentifierNode } from '../intermediate-ast/nodes/integration-event/IntegrationEventHandlerIdentifierNode.js';
import { BitloopsPrimaryTypeNodeBuilderDirector } from '../intermediate-ast/directors/BitloopsPrimaryTypeNodeBuilderDirector.js';
import { servicePortDeclarationVisitor } from './helpers/service-port/servicePortDeclarationVisitor.js';
import { servicePortIdentifierVisitor } from './helpers/service-port/servicePortIdentifierVisitor.js';
import { ServicePortIdentifierNode } from '../intermediate-ast/nodes/service-port/ServicePortIdentifierNode.js';
import { addDomainEventStatementVisitor } from './helpers/addDomainEventStatementVisitor.js';
import { BuiltInFunctionNode } from '../intermediate-ast/nodes/statements/builtinFunction/BuiltinFunctionNode.js';
import { ThisIdentifierNode } from '../intermediate-ast/nodes/ThisIdentifier/ThisIdentifierNode.js';
import { ThisIdentifierNodeBuilder } from '../intermediate-ast/builders/ThisIdentifier/ThisIdentifierNodeBuilder.js';
import { StaticNodeBuilder } from '../intermediate-ast/builders/methods/StaticNodeBuilder.js';
import { StaticNode } from '../intermediate-ast/nodes/methods/StaticNode.js';
import {
  domainServiceDeclarationVisitor,
  domainServiceIdentifierVisitor,
} from './helpers/domainService.js';
import { IntegrationEventParameterNode } from '../intermediate-ast/nodes/integration-event/IntegrationEventParameterNode.js';
import { NullLiteralBuilder } from '../intermediate-ast/builders/expressions/literal/NullLiteralBuilder.js';
import { domainServiceEvaluationVisitor } from './helpers/expression/evaluation/domainServiceEvaluation.js';
import { IntegrationEventHandlerHandleMethodNode } from '../intermediate-ast/nodes/integration-event/IntegrationEventHandlerHandleMethodNode.js';
import { anonymousFunctionVisitor } from './helpers/anonymousFunctionVisitor.js';
import { arrowFunctionBodyVisitor } from './helpers/arrowFunctionBodyVisitor.js';
import { valueObjectConstructorEvaluationVisitor } from './helpers/expression/evaluation/valueObejctConstructorEvaluation.js';
import { ArgumentListNode } from '../intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { ForOfStatementNode } from '../intermediate-ast/nodes/statements/ForOfStatementNode.js';

export type TContextInfo = {
  boundedContextName: string;
  moduleName: string;
};

export default class BitloopsVisitor extends BitloopsParserVisitor {
  [x: string]: any;

  private _intermediateASTTree: IntermediateASTTree;
  private _currentFile: string;
  private _contextInfo: TContextInfo | null = null;

  constructor(currentFile: string, contextInfo?: TContextInfo) {
    super();
    this._currentFile = currentFile;
    if (contextInfo) {
      this._contextInfo = contextInfo;
    }
    this._intermediateASTTree = new IntermediateASTTree(new IntermediateASTRootNode());
  }

  get intermediateASTTree(): IntermediateASTTree {
    return this._intermediateASTTree;
  }

  public get currentFile(): string {
    return this._currentFile;
  }

  public get contextInfo(): TContextInfo | null {
    return this._contextInfo;
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

  visitStructIdentifier(ctx: BitloopsParser.StructIdentifierContext): StructIdentifierNode {
    const identifierName = ctx.UpperCaseIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const structIdentifierNode = new StructIdentifierNodeBuilder(metadata)
      .withName(identifierName)
      .build();
    return structIdentifierNode;
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

  visitIfErrorExpression(ctx: BitloopsParser.IfErrorExpressionContext) {
    return ifErrorExpressionVisitor(this, ctx);
  }

  visitAnonymousFunction(ctx: BitloopsParser.AnonymousFunctionContext) {
    return anonymousFunctionVisitor(this, ctx);
  }

  visitArrowFunctionBody(ctx: BitloopsParser.ArrowFunctionBodyContext) {
    return arrowFunctionBodyVisitor(this, ctx);
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
  visitRegularDTOEvaluation(ctx: BitloopsParser.RegularDTOEvaluationContext): string {
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
      value: value,
    };
  }

  visitIdentifierString(ctx: BitloopsParser.IdentifierStringContext) {
    return {
      value: ctx.Identifier().getText(),
    };
  }

  visitEntityIdentifierString(ctx: BitloopsParser.EntityIdentifierStringContext) {
    return {
      value: ctx.EntityIdentifier().getText(),
    };
  }

  visitValueObjectIdentifierString(ctx: BitloopsParser.ValueObjectIdentifierStringContext) {
    return {
      value: ctx.ValueObjectIdentifier().getText(),
    };
  }

  visitExecuteExpression(_ctx: BitloopsParser.ExecuteExpressionContext) {
    return {
      value: 'execute',
    };
  }

  visitHandleKeywordIdentifier(_ctx: BitloopsParser.HandleKeywordIdentifierContext) {
    return {
      value: 'handle',
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

  visitRegularExpressionLiteralLabel(
    ctx: BitloopsParser.RegularExpressionLiteralLabelContext,
  ): any {
    return regexLiteralEvaluation(ctx.RegularExpressionLiteral().getText());
  }

  visitNullLiteral(ctx: BitloopsParser.NullLiteralContext): any {
    return new NullLiteralBuilder(produceMetadata(ctx, this)).build();
  }

  visitBooleanLiteral(ctx: BitloopsParser.BooleanLiteralContext) {
    return booleanEvaluation(ctx.BooleanLiteral().getText());
  }

  visitLiteralExpression(ctx: BitloopsParser.LiteralExpressionContext): ExpressionNode {
    return LiteralExpressionVisitor(this, ctx);
  }
  visitAnonymousFunctionExpression(
    ctx: BitloopsParser.AnonymousFunctionExpressionContext,
  ): ExpressionNode {
    return AnonymousExpressionVisitor(this, ctx);
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

  visitStandardVOEvaluation(ctx: BitloopsParser.StandardVOEvaluationContext) {
    return standardVOEvaluationVisitor(this, ctx);
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
  visitCommandEvaluation(ctx: BitloopsParser.CommandEvaluationContext): any {
    return commandEvaluationVisitor(this, ctx);
  }

  visitDomainEventEvaluation(ctx: BitloopsParser.DomainEventEvaluationContext): any {
    return domainEventEvaluationVisitor(this, ctx);
  }

  visitQueryEvaluation(ctx: BitloopsParser.QueryEvaluationContext): any {
    return queryEvaluationVisitor(this, ctx);
  }

  visitReadModelEvaluation(ctx: BitloopsParser.ReadModelEvaluationContext): any {
    return readModelEvaluationVisitor(this, ctx);
  }

  visitPackageEvaluation(ctx: BitloopsParser.PackageEvaluationContext): any {
    return packageEvaluationVisitor(this, ctx);
  }

  visitPackageIdentifier(ctx: BitloopsParser.PackageIdentifierContext): IdentifierNode {
    const packageName = ctx.PackageIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const packageIdentifierNode = new IdentifierNodeBuilder(metadata).withName(packageName).build();
    return packageIdentifierNode;
  }

  visitIntegrationEventEvaluation(ctx: BitloopsParser.IntegrationEventEvaluationContext): any {
    return integrationEventEvaluationVisitor(this, ctx);
  }
  visitEntityConstructorEvaluation(ctx: BitloopsParser.EntityConstructorEvaluationContext): any {
    return entityConstructorEvaluationVisitor(this, ctx);
  }

  visitValueObjectConstructorEvaluation(
    ctx: BitloopsParser.ValueObjectConstructorEvaluationContext,
  ): any {
    return valueObjectConstructorEvaluationVisitor(this, ctx);
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

  visitDomainCreateDeclaration(
    ctx: BitloopsParser.DomainCreateDeclarationContext,
  ): DomainCreateNode {
    return domainCreateDeclarationVisitor(this, ctx);
  }

  visitDomainCreateParam(ctx: BitloopsParser.DomainCreateParamContext): ParameterNode {
    return domainCreateParameterVisitor(this, ctx);
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

  visitAggregateDeclaration(ctx: BitloopsParser.AggregateDeclarationContext): void {
    aggregateDeclarationVisitor(this, ctx);
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

  visitReturnMethodType(
    ctx: BitloopsParser.ReturnMethodTypeContext,
  ): BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode {
    return returnPrivateMethodTypeVisitor(this, ctx);
  }

  visitReturnStatement(ctx: BitloopsParser.ReturnStatementContext): ReturnStatementNode {
    const metadata = produceMetadata(ctx, this);

    const returnStatementNodeBuilder = new ReturnStatementNodeBuilder(metadata);

    if (ctx.expression()) {
      const expressionNode = this.visit(ctx.expression());
      returnStatementNodeBuilder.withExpression(expressionNode);
    }
    const returnStatementNode = returnStatementNodeBuilder.build();

    return returnStatementNode;
  }

  visitForOfStatement(ctx: BitloopsParser.ForOfStatementContext): ForOfStatementNode {
    return forOfStatementVisitor(this, ctx);
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

  visitIsBrokenStatementErrorArgs(
    ctx: BitloopsParser.IsBrokenStatementErrorArgsContext,
  ): ArgumentListNode {
    return this.visit(ctx.methodArguments());
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

  visitExecuteDeclaration(ctx: BitloopsParser.ExecuteDeclarationContext): any {
    return executeDeclarationVisitor(this, ctx);
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
    const buildInClassTypeNode = new BuiltInClassTypeBuilder().withType(buildInClassType).build();
    return buildInClassTypeNode;
  }

  visitStandardValueTypePrimType(ctx: any) {
    const value = this.visit(ctx.standardValueType());
    return new StandardValueTypeNodeBuilder(produceMetadata(ctx, this)).withValue(value).build();
  }

  visitStandardVOType(ctx: BitloopsParser.StandardVOTypeContext) {
    const identifier = ctx.upperCaseIdentifier().getText();
    return new StandardVOTypeNodeBuilder(produceMetadata(ctx, this)).withValue(identifier).build();
  }

  visitBitloopsIdentifierPrimType(ctx: BitloopsParser.BitloopsIdentifierPrimTypeContext) {
    const metadata = produceMetadata(ctx, this);
    const bitloopsIdentifierType = ctx.bitloopsIdentifiers().getText();
    const bitloopsIdentifierTypeNode = new BitloopsIdentifierTypeBuilder(metadata)
      .withType(bitloopsIdentifierType)
      .build();
    return bitloopsIdentifierTypeNode;
  }

  visitOptional(ctx: BitloopsParser.OptionalContext) {
    return optionalVisitor(ctx);
  }

  visitBoundedContextModuleDeclaration(
    ctx: BitloopsParser.BoundedContextModuleDeclarationContext,
  ): BoundedContextModuleNode {
    return boundedContextModuleVisitor(this, ctx);
  }

  visitBoundedContextDeclaration(
    ctx: BitloopsParser.BoundedContextDeclarationContext,
  ): BoundedContextNameNode {
    return boundedContextVisitor(this, ctx);
  }

  visitModuleDeclaration(ctx: BitloopsParser.BoundedContextDeclarationContext): ModuleNameNode {
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

  visitSetLanguageConfig(ctx: BitloopsParser.SetLanguageConfigContext): void {
    configInvocationVisitor(this, ctx);
  }

  visitLanguageSetterMethod(ctx: BitloopsParser.LanguageSetterMethodContext): LanguageNode {
    return languageSetterMethodVisitor(this, ctx);
  }

  visitCommandIdentifier(ctx: BitloopsParser.CommandIdentifierContext): IdentifierNode {
    const commandName = ctx.CommandIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const commandIdentifierNode = new IdentifierNodeBuilder(metadata).withName(commandName).build();
    return commandIdentifierNode;
  }

  visitCommandDeclaration(ctx: BitloopsParser.CommandDeclarationContext): void {
    return commandDeclarationVisitor(this, ctx);
  }

  visitQueryIdentifier(ctx: BitloopsParser.QueryIdentifierContext): IdentifierNode {
    const queryName = ctx.QueryIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const queryIdentifierNode = new IdentifierNodeBuilder(metadata).withName(queryName).build();
    return queryIdentifierNode;
  }

  visitQueryDeclaration(ctx: BitloopsParser.QueryDeclarationContext): void {
    return queryDeclarationVisitor(this, ctx);
  }

  visitCommandHandler(ctx: BitloopsParser.CommandHandlerContext): void {
    return commandHandlerVisitor(this, ctx);
  }

  visitCommandHandlerIdentifier(
    ctx: BitloopsParser.CommandHandlerIdentifierContext,
  ): IdentifierNode {
    const commandHandlerName = ctx.CommandHandlerIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const commandHandlerIdentifierNode = new IdentifierNodeBuilder(metadata)
      .withName(commandHandlerName)
      .build();
    return commandHandlerIdentifierNode;
  }

  visitQueryHandler(ctx: BitloopsParser.QueryHandlerContext): void {
    return queryHandlerVisitor(this, ctx);
  }

  visitQueryHandlerIdentifier(ctx: BitloopsParser.QueryHandlerIdentifierContext): IdentifierNode {
    const queryHandlerName = ctx.QueryHandlerIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const queryHandlerIdentifierNode = new IdentifierNodeBuilder(metadata)
      .withName(queryHandlerName)
      .build();
    return queryHandlerIdentifierNode;
  }

  visitIntegrationEventDeclaration(ctx: BitloopsParser.IntegrationEventDeclarationContext): void {
    integrationEventDeclarationVisitor(this, ctx);
  }

  visitIntegrationEventIdentifier(
    ctx: BitloopsParser.IntegrationEventIdentifierContext,
  ): IntegrationEventIdentifierNode {
    const identifierName = ctx.IntegrationEventIdentifier().getText();
    const metadata = produceMetadata(ctx, this);
    const integrationEventIdentifierNode = new IntegrationEventIdentifierNodeBuilder(metadata)
      .withName(identifierName)
      .build();
    return integrationEventIdentifierNode;
  }

  visitIntegrationEventInputType(
    ctx: BitloopsParser.IntegrationEventInputTypeContext,
  ): BitloopsPrimaryTypeNode {
    return integrationEventInputTypeVisitor(this, ctx);
  }

  visitIntegrationEventInput(ctx: BitloopsParser.IntegrationEventInputContext): ParameterNode {
    return integrationEventInputVisitor(this, ctx);
  }

  visitIntegrationVersionMapperList(
    ctx: BitloopsParser.IntegrationVersionMapperListContext,
  ): IntegrationVersionMapperListNode {
    return integrationVersionMapperListVisitor(this, ctx);
  }

  visitIntegrationVersionMapper(
    ctx: BitloopsParser.IntegrationVersionMapperContext,
  ): IntegrationVersionMapperNode {
    return integrationVersionMapperVisitor(this, ctx);
  }

  visitVersionName(ctx: BitloopsParser.VersionNameContext): StringLiteralNode {
    return stringEvaluation(ctx.StringLiteral().getText());
  }

  visitIntegrationReturnSchemaType(
    ctx: BitloopsParser.IntegrationReturnSchemaTypeContext,
  ): StructIdentifierNode {
    return this.visit(ctx.structIdentifier());
  }

  visitDomainEventDeclaration(ctx: BitloopsParser.DomainEventDeclarationContext): void {
    domainEventDeclarationVisitor(this, ctx);
  }

  visitDomainEventIdentifier(
    ctx: BitloopsParser.DomainEventIdentifierContext,
  ): DomainEventIdentifierNode {
    return domainEventIdentifierVisitor(this, ctx);
  }

  visitDomainEventHandlerDeclaration(
    ctx: BitloopsParser.DomainEventHandlerDeclarationContext,
  ): void {
    domainEventHandlerDeclarationVisitor(this, ctx);
  }

  visitDomainEventHandlerIdentifier(ctx: BitloopsParser.DomainEventHandlerIdentifierContext): any {
    return domainEventHandlerIdentifierVisitor(this, ctx);
  }

  visitDomainEventHandlerHandleDeclaration(
    ctx: BitloopsParser.DomainEventHandlerHandleDeclarationContext,
  ): any {
    return domainEventHandlerHandleMethodVisitor(this, ctx);
  }

  visitDomainEventHandlerHandleParameter(
    ctx: BitloopsParser.DomainEventHandlerHandleParameterContext,
  ): any {
    return domainEventHandlerHandleMethodParameterVisitor(this, ctx);
  }

  visitIntegrationEventHandlerDeclaration(
    ctx: BitloopsParser.IntegrationEventHandlerDeclarationContext,
  ): void {
    integrationEventHandlerDeclarationVisitor(this, ctx);
  }

  visitIntegrationEventHandlerIdentifier(
    ctx: BitloopsParser.IntegrationEventHandlerIdentifierContext,
  ): IntegrationEventHandlerIdentifierNode {
    return integrationEventHandlerIdentifierVisitor(this, ctx);
  }

  visitIntegrationEventHandlerHandleDeclaration(
    ctx: BitloopsParser.IntegrationEventHandlerHandleDeclarationContext,
  ): IntegrationEventHandlerHandleMethodNode {
    return integrationEventHandlerHandleMethodVisitor(this, ctx);
  }

  visitEventHandlerHandleIdentifier(
    ctx: BitloopsParser.EventHandlerHandleIdentifierContext,
  ): BitloopsPrimaryTypeNode {
    const type = ctx.domainEventIdentifier().getText();

    const metadata = produceMetadata(ctx, this);
    return new BitloopsPrimaryTypeNodeBuilderDirector(metadata).buildIdentifierPrimaryType(type);
  }

  visitIntegrationEventHandlerHandleParameter(
    ctx: BitloopsParser.IntegrationEventHandlerHandleParameterContext,
  ): IntegrationEventParameterNode {
    return integrationEventHandlerHandleMethodParameterVisitor(this, ctx);
  }

  visitServicePortDeclaration(ctx: BitloopsParser.ServicePortDeclarationContext): void {
    servicePortDeclarationVisitor(this, ctx);
  }

  visitServicePortIdentifier(
    ctx: BitloopsParser.ServicePortIdentifierContext,
  ): ServicePortIdentifierNode {
    return servicePortIdentifierVisitor(this, ctx);
  }

  visitAddDomainEventStatement(
    ctx: BitloopsParser.AddDomainEventStatementContext,
  ): BuiltInFunctionNode {
    return addDomainEventStatementVisitor(this, ctx);
  }

  visitThisIdentifier(ctx: BitloopsParser.ThisIdentifierContext): ThisIdentifierNode {
    const thisName = ctx.This().getText();
    return new ThisIdentifierNodeBuilder(produceMetadata(ctx, this)).withName(thisName).build();
  }

  visitStaticKeyword(ctx: BitloopsParser.StaticKeywordContext): StaticNode {
    return new StaticNodeBuilder(produceMetadata(ctx, this)).withValue(true).build();
  }

  visitDomainServiceDeclaration(ctx: BitloopsParser.DomainServiceDeclarationContext): void {
    domainServiceDeclarationVisitor(this, ctx);
  }

  visitDomainServiceIdentifier(ctx: BitloopsParser.DomainServiceIdentifierContext): IdentifierNode {
    return domainServiceIdentifierVisitor(this, ctx);
  }

  visitDomainServiceEvaluation(ctx: BitloopsParser.DomainServiceEvaluationContext): any {
    return domainServiceEvaluationVisitor(this, ctx);
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

  // visitStaticMethodCallExpression(
  //   ctx: BitloopsParser.StaticMemberDotExpressionContext,
  // ): ExpressionNode {
  //   return staticMethodCallExpressionVisitor(this, ctx);
  // }
}
