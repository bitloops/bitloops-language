/**
 *  Bitloops Language
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
import { BitloopsBuiltInClassNames } from '../types.js';
import { ArchitectureLayers } from './architectureLayers.js';

const BitloopsTypesMapping = {
  TClassName: 'TClassName',
  TVariable: 'TVariable',
  TVariables: 'TVariables',
  TProps: 'TProps',
  TEvaluation: 'TEvaluation',
  TInstanceOf: 'TInstanceOf',
  TArgument: 'TArgument',
  TArgumentDependency: 'TArgumentDependency',
  TSwitchCases: 'TSwitchCases',
  TSwitchCase: 'TSwitchCase',
  TArgumentDependencyType: 'TArgumentDependencyType',
  TParameter: 'TParameterDependency',
  TParameterDependencyIdentifier: 'TParameterDependencyIdentifier',
  TParameterList: 'TParameterDependencies',
  TArgumentDependencies: 'TArgumentDependencies',
  TRegularEvaluation: 'TRegularEvaluation',
  TGetClass: 'TGetClass',
  TToStringExpression: 'TToStringExpression',
  TStructEvaluation: 'TStructEvaluation',
  TPropsEvaluation: 'TPropsEvaluation',
  TDTOEvaluation: 'TDTOEvaluation',
  TStandardVOEvaluation: 'TStandardVOEvaluation',
  TCondition: 'TCondition',
  TExpression: 'TExpression',
  TReturnStatement: 'TReturnStatement',
  TConstDeclaration: 'TConstDeclaration',
  TReturnOKStatement: 'TReturnOKStatement',
  TReturnErrorStatement: 'TReturnErrorStatement',
  TConstDecomposition: 'TConstDecomposition',
  TCase: 'TCase',
  TDefaultCase: 'TDefaultCase',
  TRegularCase: 'TRegularCase',
  TSwitchStatement: 'TSwitchStatement',
  TBreakStatement: 'TBreakStatement',
  TStatement: 'TStatement',
  TStatements: 'TStatements',
  TStatementsWithoutThis: 'TStatementsWithoutThis',
  TIfStatement: 'TIfStatement',
  TDTO: 'TDTO',
  TStruct: 'TStruct',
  TOkErrorReturnType: 'TOkErrorReturnType',
  TValueObject: 'TValueObject',
  TExecute: 'TExecute',
  TString: 'TString',
  TBackTickString: 'TBackTickString',
  TDomainErrors: 'TDomainErrors',
  TDomainError: 'TDomainError',
  TApplicationError: 'TApplicationError',
  TErrorId: 'TErrorId',
  TErrorMessage: 'TErrorMessage',
  TEvaluatePrimitive: 'TEvaluatePrimitive',
  TDefinitionMethodInfo: 'TDefinitionMethodInfo',
  TDefinitionMethods: 'TDefinitionMethods',
  TReturnType: 'TReturnType',
  TPackagePort: 'TPackagePort',
  TPackagePortIdentifier: 'TPackagePortIdentifier',
  TDomainCreateMethod: 'TDomainCreateMethod',
  TValueObjectEvaluation: 'TValueObjectEvaluation',
  TEvaluationFields: 'TEvaluationFields',
  TEvaluationField: 'TEvaluationField',
  TDomainEvaluation: 'TDomainEvaluation',
  TDomainEvaluationProps: 'TDomainEvaluationProps',
  TEntityEvaluation: 'TEntityEvaluation',
  TCommandEvaluation: 'TCommandEvaluation',
  TDomainEventEvaluation: 'TDomainEventEvaluation',
  TQueryEvaluation: 'TQueryEvaluation',
  TReadModelEvaluation: 'TReadModelEvaluation',
  TIntegrationEventEvaluation: 'TIntegrationEventEvaluation',
  TEntityConstructorEvaluation: 'TEntityConstructorEvaluation',
  TEntity: 'TEntity',
  TEntityValues: 'TEntityValues',
  TRootEntity: 'TRootEntity',
  TRepoPort: 'TRepoPort',
  TRepoPortIdentifier: 'TRepoPortIdentifier',
  TLogicalExpression: 'TLogicalExpression',
  TNotExpression: 'TNotExpression',
  TAndExpression: 'TAndExpression',
  TOrExpression: 'TOrExpression',
  TMultiplicativeExpression: 'TMultiplicativeExpression',
  TMultiplicativeOperator: 'TMultiplicativeOperator',
  TAdditiveExpression: 'TAdditiveExpression',
  TAdditiveOperator: 'TAdditiveOperator',
  TRelationalExpression: 'TRelationalExpression',
  TRelationalOperator: 'TRelationalOperator',
  TEqualityOperator: 'TEqualityOperator',
  TEqualityExpression: 'TEqualityExpression',
  TXorExpression: 'TXorExpression',
  TParenthesizedExpression: 'TParenthesizedExpression',
  TVariableDeclaration: 'TVariableDeclaration',
  TExpressionValues: ' TExpressionValues',
  TDomainRule: 'TDomainRule',
  TEntityCreate: 'TEntityCreate',
  TBuiltInFunction: 'TBuiltInFunction',
  TApplyRules: 'TApplyRules',
  TReadModel: 'TReadModels',
  TReadModelIdentifier: 'TReadModelIdentifier',
  TDomainMethods: 'TDomainMethods',
  TPublicMethod: 'TPublicMethod',
  TPrivateMethod: 'TPrivateMethod',
  TValueObjectMethods: 'TValueObjectMethods',
  TBitloopsPrimaryType: 'TBitloopsPrimaryType',
  TBuiltInClassEvaluation: 'TBuiltInClassEvaluation',
  TArrayLiteralExpression: 'TArrayLiteralExpression',
  TErrorEvaluation: 'TErrorEvaluation',
  TDTOIdentifier: 'TDTOIdentifier',
  TPropsIdentifier: 'TPropsIdentifier',
  TIdentifier: 'TIdentifier',
  TStructIdentifier: 'TStructIdentifier',
  Toperator: 'Toperator',
  TIdentifierExpression: 'TIdentifierExpression',
  TOptional: 'TOptional',
  TBitloopsPrimitives: 'TBitloopsPrimitives',
  ArrayBitloopsPrimType: 'ArrayBitloopsPrimType',
  TBitloopsIdentifier: 'TBitloopsIdentifier',
  TBitloopsBuildInClasses: 'TBitloopsBuildInClasses',
  TStandardValueType: 'TStandardValueType',
  TStandardVOType: 'TStandardVOType',
  TMethodCallExpression: 'TMethodCallExpression',
  TThisExpression: 'TThisExpression',
  TStringLiteral: 'TStringLiteral',
  TRegexLiteral: 'TRegexLiteral',
  TTemplateStringLiteral: 'TTemplateStringLiteral',
  TNullLiteral: 'TNullLiteral',
  TNumericLiteral: 'TNumericLiteral',
  TBooleanLiteral: 'TBooleanLiteral',
  TDecimalLiteral: 'TDecimalLiteral',
  TIntegerLiteral: 'TIntegerLiteral',
  TLiteral: 'TLiteral',
  TLiteralValue: 'TLiteralValue',
  TLiteralType: 'TLiteralType',
  TMemberDotExpression: 'TMemberDotExpression',
  TAssignmentExpression: 'TAssignmentExpression',
  TName: 'TName',
  TClass: 'TClass',
  TArgumentList: 'TArgumentList',
  TThenStatements: 'TThenStatements',
  TElseStatements: 'TElseStatements',
  TEntityIdentifier: 'TEntityIdentifier',
  TConstDeclarationList: 'TConstDeclarationList',
  TDomainRuleIdentifier: 'TDomainRuleIdentifier',
  TAppliedRule: 'TAppliedRule',
  TIsBrokenIfCondition: 'TIsBrokenIfCondition',
  TErrorIdentifier: 'TErrorIdentifier',
  TErrorIdentifiers: 'TErrorIdentifiers',
  TReturnOkType: 'TReturnOkType',
  TExtendsRepoPorts: 'TExtendsRepoPorts',
  TPublicMethods: 'TPublicMethods',
  TPrivateMethods: 'TPrivateMethods',
  TValueObjectIdentifier: 'TValueObjectIdentifier',
  TEnvironmentVariableExpression: 'TEnvironmentVariableExpression',
  TBoundedContextModule: 'TBoundedContextModule',
  TWordsWithSpaces: 'TWordsWithSpaces',
  TBoundedContextName: 'TBoundedContextName',
  TModuleName: 'TModuleName',
  TDefaultValueEnvironmentVariable: 'TDefaultValueEnvironmentVariable',
  TLanguage: 'TLanguage',
  TConfigInvocation: 'TConfigInvocation',
  TCommandIdentifier: 'TCommandIdentifier',
  TQueryIdentifier: 'TQueryIdentifier',
  TCommand: 'TCommand',
  TQuery: 'TQuery',
  TDomainEvent: 'TDomainEvent',
  TDomainEventIdentifier: 'TDomainEventIdentifier',
  TCommandTopicIdentifier: 'TCommandTopicIdentifier',
  TQueryTopicIdentifier: 'TQueryTopicIdentifier',
  TCommandHandler: 'TCommandHandler',
  TQueryHandler: 'TQueryHandler',
  TIntegrationEventIdentifier: 'TIntegrationEventIdentifier',
  TIntegrationEventInput: 'TIntegrationEventInput',
  TIntegrationVersionMappers: 'TIntegrationVersionMappers',
  TIntegrationEvent: 'TIntegrationEvent',
  TIntegrationVersionMapper: 'TIntegrationVersionMapper',
  DomainEventTopic: 'DomainEventTopic',
  TDomainEventHandler: 'TDomainEventHandler',
  TDomainEventHandlerIdentifier: 'TDomainEventHandlerIdentifier',
  TEventHandlerHandleMethod: 'TEventHandlerHandleMethod',
  TEventHandlerBusDependencies: 'TEventHandlerBusDependencies',
  THandlerAttributesAndConstructor: 'THandlerAttributesAndConstructor',
  TIntegrationEventHandlerIdentifier: 'TIntegrationEventHandlerIdentifier',
  TIntegrationEventHandler: 'TIntegrationEventHandler',
  TServicePortIdentifier: 'TServicePortIdentifier',
  TServicePort: 'TServicePort',
  TThisIdentifier: 'TThisIdentifier',
  TAddDomainEvent: 'TAddDomainEvent',
  TStatic: 'TStatic',
  TDomainServiceMethod: 'TDomainServiceMethod',
  TDomainService: 'TDomainService',
  TDomainServiceIdentifier: 'TDomainServiceIdentifier',
  TIntegrationEventHandlerHandleMethod: 'TIntegrationEventHandlerHandleMethod',
  TIntegrationEventParameter: 'TIntegrationEventParameter',
  TDomainServiceEvaluation: 'TDomainServiceEvaluation',
  TInjectionToken: 'TInjectionToken',
  TPortToken: 'TPortToken',
  TMetadata: 'TMetadata',
  THandle: 'THandle',
} as const;

type TBitloopsTypesKeys = keyof typeof BitloopsTypesMapping;

export type TBitloopsTypesValues = typeof BitloopsTypesMapping[TBitloopsTypesKeys];

const ClassTypes = {
  RootEntity: 'RootEntity',
  Entity: 'Entity',
  ValueObject: 'ValueObject',
  Props: 'Props',
  DomainError: 'DomainError',
  ApplicationError: 'ApplicationError',
  DTO: 'DTO',
  Struct: 'Struct',
  PackagePort: 'PackagePort',
  RepoPort: 'RepoPort',
  DomainRule: 'DomainRule',
  ReadModel: 'ReadModel',
  Command: 'Command',
  Query: 'Query',
  DomainEvent: 'DomainEvent',
  CommandHandler: 'CommandHandler',
  QueryHandler: 'QueryHandler',
  IntegrationEvent: 'IntegrationEvent',
  DomainEventHandler: 'DomainEventHandler',
  IntegrationEventHandler: 'IntegrationEventHandler',
  ServicePort: 'ServicePort',
  DomainService: 'DomainService',
  InjectionToken: 'InjectionToken',
} as const;

type TClassTypesKeys = keyof typeof ClassTypes;

export type TClassTypesValues = typeof ClassTypes[TClassTypesKeys];

export const mappingBitloopsBuiltInClassToLayer = {
  [BitloopsBuiltInClassNames.UUIDv4]: ArchitectureLayers.Domain,
};

const mappingClassTypeToComponentType: Record<TClassTypesValues, TBitloopsTypesValues> = {
  [ClassTypes.ValueObject]: BitloopsTypesMapping.TValueObject,
  [ClassTypes.Props]: BitloopsTypesMapping.TProps,
  [ClassTypes.DTO]: BitloopsTypesMapping.TDTO,
  [ClassTypes.DomainError]: BitloopsTypesMapping.TDomainErrors,
  [ClassTypes.PackagePort]: BitloopsTypesMapping.TPackagePort,
  [ClassTypes.Entity]: BitloopsTypesMapping.TEntity,
  [ClassTypes.RepoPort]: BitloopsTypesMapping.TRepoPort,
  [ClassTypes.RootEntity]: BitloopsTypesMapping.TRootEntity,
  [ClassTypes.DomainRule]: BitloopsTypesMapping.TDomainRule,
  [ClassTypes.Struct]: BitloopsTypesMapping.TStruct,
  [ClassTypes.ApplicationError]: BitloopsTypesMapping.TApplicationError,
  [ClassTypes.ReadModel]: BitloopsTypesMapping.TReadModel,
  [ClassTypes.DomainEvent]: BitloopsTypesMapping.TDomainEvent,
  [ClassTypes.Command]: BitloopsTypesMapping.TCommand,
  [ClassTypes.Query]: BitloopsTypesMapping.TQuery,
  [ClassTypes.CommandHandler]: BitloopsTypesMapping.TCommandHandler,
  [ClassTypes.QueryHandler]: BitloopsTypesMapping.TQueryHandler,
  [ClassTypes.DomainEventHandler]: BitloopsTypesMapping.TDomainEventHandler,
  [ClassTypes.IntegrationEvent]: BitloopsTypesMapping.TIntegrationEvent,
  [ClassTypes.IntegrationEventHandler]: BitloopsTypesMapping.TIntegrationEventHandler,
  [ClassTypes.ServicePort]: BitloopsTypesMapping.TServicePort,
  [ClassTypes.DomainService]: BitloopsTypesMapping.TDomainService,
  [ClassTypes.InjectionToken]: BitloopsTypesMapping.TInjectionToken,
};

export { BitloopsTypesMapping, ClassTypes, mappingClassTypeToComponentType };
