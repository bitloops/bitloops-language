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
import { BitloopsBuildInClassNames } from '../types.js';

const BitloopsTypesMapping = {
  TVariable: 'TVariable',
  TVariables: 'TVariables',
  TProps: 'TProps',
  TPropsValues: 'TPropsValues',
  TEvaluation: 'TEvaluation',
  TInstanceOf: 'TInstanceOf',
  TNotInstanceOf: 'TNotInstanceOf',
  TArgumentDependency: 'TArgumentDependency',
  TClassInstantiation: 'TClassInstantiation',
  TParameterDependency: 'TParameterDependency',
  TParameterDependencies: 'TParameterDependencies',
  TArgumentDependencies: 'TArgumentDependencies',
  TRegularEvaluation: 'TRegularEvaluation',
  TGetClass: 'TGetClass',
  TStructEvaluation: 'TStructEvaluation',
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
  TDTOValues: 'TDTOValues',
  TStructs: 'TStructs',
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
  TDomainEvaluation: 'TDomainEvaluation',
  TEntityEvaluation: 'TEntityEvaluation',
  TEntities: 'TEntities',
  TEntityValues: 'TEntityValues',
  TThisDeclaration: 'TThisDeclaration',
  TRepoPorts: 'TRepoPorts',
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
  TRules: 'TRules',
  TRuleValues: 'TRuleValues',
  TEntityCreate: 'TEntityCreate',
  TBuildInFunction: 'TBuildInFunction',
  TApplyRules: 'TApplyRules',
  TReadModels: 'TReadModels',
  TDomainMethods: 'TDomainMethods',
  TDomainPublicMethod: 'TDomainPublicMethod',
  TDomainPrivateMethod: 'TDomainPrivateMethod',
  TValueObjectMethods: 'TValueObjectMethods',
  TBitloopsPrimaryType: 'TBitloopsPrimaryType',
  TErrorEvaluation: 'TErrorEvaluation',
};

const ClassTypes = {
  RootEntities: 'RootEntities',
  Entities: 'Entities',
  ValueObjects: 'ValueObjects',
  Props: 'Props',
  Controllers: 'Controllers',
  UseCases: 'UseCases',
  DomainErrors: 'DomainErrors',
  ApplicationErrors: 'ApplicationErrors',
  DTOs: 'DTOs',
  Structs: 'Structs',
  Packages: 'Packages',
  RepoPorts: 'RepoPorts',
  RepoAdapters: 'RepoAdapters',
  Rules: 'Rules',
  ReadModels: 'ReadModels',
} as const;

type TClassTypesKeys = keyof typeof ClassTypes;

export type TClassTypesValues = typeof ClassTypes[TClassTypesKeys];

const ArchitectureLayers = {
  Domain: 'Domain',
};

export const mappingBitloopsBuildInClassToLayer = {
  [BitloopsBuildInClassNames.UUIDv4]: ArchitectureLayers.Domain,
};

const mappingClassTypeToComponentType = {
  [ClassTypes.Controllers]: BitloopsTypesMapping.TControllers,
  [ClassTypes.UseCases]: BitloopsTypesMapping.TUseCase,
  [ClassTypes.ValueObjects]: BitloopsTypesMapping.TValueObjects,
  [ClassTypes.Props]: BitloopsTypesMapping.TProps,
  [ClassTypes.DTOs]: BitloopsTypesMapping.TDTO,
  [ClassTypes.DomainErrors]: BitloopsTypesMapping.TDomainErrors,
  [ClassTypes.Packages]: BitloopsTypesMapping.TPackages,
  [ClassTypes.Entities]: BitloopsTypesMapping.TEntities,
  [ClassTypes.RootEntities]: BitloopsTypesMapping.TRootEntities,
  [ClassTypes.RepoPorts]: BitloopsTypesMapping.TRepoPorts,
  [ClassTypes.RepoAdapters]: BitloopsTypesMapping.TRepoAdapters,
  [ClassTypes.Rules]: BitloopsTypesMapping.TRules,
  [ClassTypes.Structs]: BitloopsTypesMapping.TStructs,
  [ClassTypes.ApplicationErrors]: BitloopsTypesMapping.TApplicationErrors,
  [ClassTypes.Rules]: BitloopsTypesMapping.TRules,
  [ClassTypes.ReadModels]: BitloopsTypesMapping.TReadModels,
};

export { BitloopsTypesMapping, ClassTypes, mappingClassTypeToComponentType };
