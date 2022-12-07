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
  TClassInstantiation: 'TClassInstantiation',
  TParameterDependency: 'TParameterDependency',
  TParameterDependencyIdentifier: 'TParameterDependencyIdentifier',
  TParameterDependencies: 'TParameterDependencies',
  TArgumentDependencies: 'TArgumentDependencies',
  TRegularEvaluation: 'TRegularEvaluation',
  TGetClass: 'TGetClass',
  TToStringExpression: 'TToStringExpression',
  TStructEvaluation: 'TStructEvaluation',
  TPropsEvaluation: 'TPropsEvaluation',
  TDTOEvaluation: 'TDTOEvaluation',
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
  TStructDeclaration: 'TStructDeclaration',
  TOkErrorReturnType: 'TOkErrorReturnType',
  TValueObjects: 'TValueObjects',
  TUseCase: 'TUseCase',
  TRESTController: 'TRESTController',
  TGraphQLController: 'TGraphQLController',
  TControllers: 'TControllers',
  TString: 'TString',
  TBackTickString: 'TBackTickString',
  TDomainErrors: 'TDomainErrors',
  TDomainError: 'TDomainError',
  TErrorId: 'TErrorId',
  TErrorMessage: 'TErrorMessage',
  TApplicationErrors: 'TApplicationErrors',
  TEvaluatePrimitive: 'TEvaluatePrimitive',
  TGraphQLSetupData: 'TGraphQLSetupData',
  TDefinitionMethodInfo: 'TDefinitionMethodInfo',
  TDefinitionMethods: 'TDefinitionMethods',
  TReturnType: 'TReturnType',
  TPackagePort: 'TPackagePort',
  TPackages: 'TPackages',
  TDomainCreateMethod: 'TDomainCreateMethod',
  TValueObjectEvaluation: 'TValueObjectEvaluation',
  TEvaluationFields: 'TEvaluationFields',
  TEvaluationField: 'TEvaluationField',
  TDomainEvaluation: 'TDomainEvaluation',
  TDomainEvaluationProps: 'TDomainEvaluationProps',
  TEntityEvaluation: 'TEntityEvaluation',
  TEntity: 'TEntity',
  TEntityValues: 'TEntityValues',
  TThisDeclaration: 'TThisDeclaration',
  TRepoPort: 'TRepoPort',
  TRepoAdapters: 'TRepoAdapters',
  TSingleExpression: 'TSingleExpression',
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
  TRootEntities: 'TRootEntities',
  TDomainRule: 'TDomainRule',
  TEntityCreate: 'TEntityCreate',
  TBuildInFunction: 'TBuildInFunction',
  TApplyRules: 'TApplyRules',
  TReadModels: 'TReadModels',
  TDomainMethods: 'TDomainMethods',
  TDomainPublicMethod: 'TDomainPublicMethod',
  TDomainPrivateMethod: 'TDomainPrivateMethod',
  TValueObjectMethods: 'TValueObjectMethods',
  TBitloopsPrimaryType: 'TBitloopsPrimaryType',
  TBuiltInClassEvaluation: 'TBuiltInClassEvaluation',
  TArrayLiteralExpression: 'TArrayLiteralExpression',
  TErrorEvaluation: 'TErrorEvaluation',
  TDTOIdentifier: 'TDTOIdentifier',
  TPropsIdentifier: 'TPropsIdentifier',
  TIdentifier: 'TIdentifier',
  TStructIdentifier: 'TStructIdentifier',
  TUseCaseIdentifier: 'TUseCaseIdentifier',
  Toperator: 'Toperator',
  TIdentifierExpression: 'TIdentifierExpression',
  TOptional: 'TOptional',
  TBitloopsPrimitives: 'TBitloopsPrimitives',
  ArrayBitloopsPrimType: 'ArrayBitloopsPrimType',
  TBitloopsIdentifier: 'TBitloopsIdentifier',
  TBitloopsBuildInClasses: 'TBitloopsBuildInClasses',
  TMethodCallExpression: 'TMethodCallExpression',
  TThisExpression: 'TThisExpression',
  TStringLiteral: 'TStringLiteral',
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
  TIdentifierList: 'TIdentifierList',
};

type TBitloopsTypesKeys = keyof typeof BitloopsTypesMapping;

export type TBitloopsTypesValues = typeof BitloopsTypesMapping[TBitloopsTypesKeys];

const ClassTypes = {
  RootEntities: 'RootEntities',
  Entity: 'Entity',
  ValueObjects: 'ValueObjects',
  Props: 'Props',
  Controllers: 'Controllers',
  UseCases: 'UseCases',
  DomainErrors: 'DomainErrors',
  ApplicationErrors: 'ApplicationErrors',
  DTOs: 'DTOs',
  Struct: 'Struct',
  Packages: 'Packages',
  RepoPort: 'RepoPort',
  RepoAdapters: 'RepoAdapters',
  DomainRule: 'DomainRule',
  ReadModels: 'ReadModels',
} as const;

type TClassTypesKeys = keyof typeof ClassTypes;

export type TClassTypesValues = typeof ClassTypes[TClassTypesKeys];

const ArchitectureLayers = {
  Domain: 'Domain',
};

export const mappingBitloopsBuiltInClassToLayer = {
  [BitloopsBuiltInClassNames.UUIDv4]: ArchitectureLayers.Domain,
};

const mappingClassTypeToComponentType = {
  [ClassTypes.Controllers]: BitloopsTypesMapping.TControllers,
  [ClassTypes.UseCases]: BitloopsTypesMapping.TUseCase,
  [ClassTypes.ValueObjects]: BitloopsTypesMapping.TValueObjects,
  [ClassTypes.Props]: BitloopsTypesMapping.TProps,
  [ClassTypes.DTOs]: BitloopsTypesMapping.TDTO,
  [ClassTypes.DomainErrors]: BitloopsTypesMapping.TDomainErrors,
  [ClassTypes.Packages]: BitloopsTypesMapping.TPackages,
  [ClassTypes.Entity]: BitloopsTypesMapping.TEntity,
  [ClassTypes.RootEntities]: BitloopsTypesMapping.TRootEntities,
  [ClassTypes.RepoPorts]: BitloopsTypesMapping.TRepoPorts,
  [ClassTypes.RepoAdapters]: BitloopsTypesMapping.TRepoAdapters,
  [ClassTypes.DomainRule]: BitloopsTypesMapping.TDomainRule,
  [ClassTypes.Struct]: BitloopsTypesMapping.TStruct,
  [ClassTypes.ApplicationErrors]: BitloopsTypesMapping.TApplicationErrors,
  [ClassTypes.ReadModels]: BitloopsTypesMapping.TReadModels,
};

export { BitloopsTypesMapping, ClassTypes, mappingClassTypeToComponentType };
