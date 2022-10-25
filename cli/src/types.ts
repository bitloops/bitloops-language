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
import { BitloopsLanguageAST } from '@bitloops/bl-transpiler';
export declare type TModule = {
  Props?: TProps;
  Controllers?: TRESTController | TGraphQLController;
  UseCases?: TUseCase;
  ApplicationErrors?: TApplicationErrors;
  DomainErrors?: TDomainErrors;
  RootEntities?: TRootEntities;
  Entities?: TEntities;
  ValueObjects?: TValueObjects;
  DTOs?: TDTO;
  Structs?: TStructs;
  Packages?: TPackages;
  Rules?: TRules;
  RepoPorts?: TRepoPorts;
  RepoAdapters?: TRepoAdapters;
};
export declare type TClassType =
  | 'Props'
  | 'Controllers'
  | 'UseCases'
  | 'ApplicationErrors'
  | 'DomainErrors'
  | 'RootEntities'
  | 'Entities'
  | 'ValueObjects'
  | 'DTOs'
  | 'Structs'
  | 'Packages'
  | 'Rules'
  | 'RepoPorts'
  | 'RepoAdapters';
export declare type TComponentType =
  | 'TProps'
  | 'TControllers'
  | 'TUseCase'
  | 'TApplicationErrors'
  | 'TDomainErrors'
  | 'TRootEntities'
  | 'TEntities'
  | 'TValueObjects'
  | 'TDTOs'
  | 'TStructs'
  | 'TPackages'
  | 'TRules'
  | 'TRepoPorts'
  | 'TRepoAdapters';
export declare type TClassName = string;
declare type TClassInformation = {
  moduleName: TModuleName;
  fileId: string;
  contents: BitloopsLanguageAST;
};
export declare type TFileId = string;
declare type TFileContents = string;
export declare type TParserCoreInputData = {
  boundedContext: TBoundedContextName;
  module: TModuleName;
  fileId: TFileId;
  fileContents: TFileContents;
}[];
export declare type TASTCoreInputData = {
  boundedContext: string;
  classes: Record<TClassType, Record<TClassName, TClassInformation>>;
};
export declare type TContextData = {
  boundedContext: string;
  module: string;
};
export declare type TBitloopsTargetContent = {
  boundedContext: TBoundedContextName;
  module: TModuleName;
  classType: TClassType;
  className: TClassName;
  fileContent: TTargetDependenciesTypeScript;
}[];
export declare type TBitloopsOutputTargetContent = {
  boundedContext: TBoundedContextName;
  module: TModuleName;
  classType: TClassType;
  className: TClassName;
  fileContent: string;
}[];
export declare type BoundedContextModules = Record<TBoundedContextName, TModuleName[]>;
export declare type TBitloopsTargetSetupContent = {
  fileId: string;
  fileType: string;
  fileContent: string;
}[];
export declare type TBitloopsTargetGeneratorParams = {
  intermediateAST: TBoundedContexts;
  setupData: ISetupData;
  targetLanguage: string;
  formatterConfig?: any;
  sourceDirPath?: string;
};
export declare type TBitloopsClasses =
  | TProps
  | TValueObjects
  | TRESTController
  | TUseCase
  | TDomainErrors
  | TDTO
  | TStructs;
export declare type TModuleName = string;
export declare type TBoundedContext = Record<TModuleName, TModule>;
export declare type TBoundedContextName = string;
export declare type TBoundedContexts = Record<TBoundedContextName, TBoundedContext>;
export declare type TVariables = TVariable[];
export declare type TVariable = {
  optional?: boolean;
  type: string;
  name: string;
};
export declare type TPropsValues = {
  variables: TVariables;
};
export declare type TProps = Record<string, TPropsValues>;
export declare type TParamDependencyType = TBitloopsPrimitives | string;
export declare type TParameterDependency = {
  type: TParamDependencyType;
  value: string;
};
export declare type TParameterDependencies = TParameterDependency[];
export declare type TArgumentDependencyType = TBitloopsPrimitives | 'variable';
export declare type TArgumentDependency = {
  value: string;
  type: TArgumentDependencyType;
};
export declare type TArgumentDependencies = TArgumentDependency[];
export declare type TClassInstantiation = {
  classInstantiation: {
    className: string;
    argumentDependencies?: TArgumentDependencies;
  };
};
export declare const bitloopsPrimitives: readonly [
  'double',
  'float',
  'int32',
  'int64',
  'uint32',
  'uint64',
  'sint32',
  'sint64',
  'fixed32',
  'fixed64',
  'sfixed32',
  'sfixed64',
  'bool',
  'string',
  'bytes',
  'enum',
  'Timestamp',
  'Any',
  'Struct',
  'Map',
  'NullValue',
  'Duration',
  'regex',
  'void',
];
export declare type TBitloopsPrimitives = typeof bitloopsPrimitives[number];
declare type TUserDefinedClass = string;
export declare type TParam = 'variable' | 'method' | TBitloopsPrimitives | TUserDefinedClass;
export declare type TReturnType = TBitloopsPrimitives | TUserDefinedClass;
export declare type TBackTickString = {
  backTickString: string;
};
export declare type TString = {
  string: string;
};
export declare type TDomainError = {
  message: TBackTickString | TString;
  errorId: TString;
  parameters?: TParameterDependencies;
};
export declare type TRule = {
  parameters?: TParameterDependencies;
  error: string;
  statements: TStatements;
  isBrokenIfCondition: TCondition;
};
export declare type TRules = Record<string, TRule>;
export declare type TDomainErrors = Record<string, TDomainError>;
export declare type TApplicationError = {
  message: TBackTickString | TString;
  errorId: TString;
  parameters?: TParameterDependencies;
};
export declare type TApplicationErrors = Record<string, TDomainError>;
export declare type TInstanceOf = {
  isInstanceOf: [
    TArgumentDependency,
    {
      class: string;
    },
  ];
};
export declare type TPropsEvaluation = {
  props: {
    fields: TEvaluationFields;
    name: string;
  };
};
export declare type TNotInstanceOf = {
  isNotInstanceOf: [
    TArgumentDependency,
    {
      class: string;
    },
  ];
};
export declare type TGetClass = {
  getClass: TRegularEvaluation;
};
export declare type TRegularEvaluation = {
  regularEvaluation: {
    type: TParam;
    value: string;
    argumentDependencies?: TArgumentDependencies;
  };
};
export declare type TEvaluation = {
  evaluation:
    | TRegularEvaluation
    | TStructEvaluation
    | TDTOEvaluation
    | TValueObjectEvaluation
    | TPropsEvaluation
    | TEntityEvaluation
    | TInstanceOf
    | TNotInstanceOf
    | TGetClass;
};
export declare type TCondition = {
  condition: TExpression;
};
export declare type TIfStatement = {
  ifStatement: {
    condition: TExpression;
    thenStatements: TStatements;
    elseStatements?: TStatements;
  };
};
export declare type TEvaluationFields = ({
  name: string;
} & TExpression)[];
export declare type TStructEvaluation = {
  struct: {
    fields: TEvaluationFields;
    name: string;
  };
};
export declare type TDTOEvaluation = {
  dto: {
    fields: TEvaluationFields;
    name: string;
  };
};
export declare type TValueObjectEvaluation = {
  valueObject: TDomainEvaluation;
};
export declare type TEntityEvaluation = {
  entity: TDomainEvaluation;
};
export declare type TDomainEvaluation = {
  props: TEvaluationFields | TRegularEvaluation;
  name: string;
};
export declare type TExpression = {
  expression: TExpressionValues;
};
export declare type TExpressionValues =
  | TEvaluation
  | TClassInstantiation
  | TBackTickString
  | TLogicalExpression
  | TMultiplicativeExpression
  | TAdditiveExpression
  | TRelationalExpression
  | TEqualityExpression
  | TParenthesizedExpression;
export declare type TReturnStatement = {
  return: TExpression;
};
export declare type TReturnOKStatement = {
  returnOK: TExpression;
};
export declare type TReturnErrorStatement = {
  returnError: TExpression;
};
export declare type TConstDecompositionNested = {
  names: string[];
} & TEvaluation;
export declare type TConstDecomposition = {
  constDecomposition: TConstDecompositionNested;
};
export declare type TConstDeclarationValue = {
  name: string;
  type?: string;
} & TExpression;
export declare type TConstDeclaration = {
  constDeclaration: TConstDeclarationValue;
};
export declare type TVariableDeclaration = {
  variableDeclaration: {
    name: string;
    type: string;
  } & TExpression;
};
export declare type TThisDeclaration = {
  thisDeclaration: {
    name: string;
  } & TExpression;
};
export declare type TBreakStatement = 'break';
export declare type TApplyRules = {
  applyRules: {
    name: string;
    arguments: TArgumentDependencies;
  }[];
};
export declare type TBuildInFunction = {
  buildInFunction: TApplyRules;
};
export declare type TStatement =
  | TBreakStatement
  | TIfStatement
  | TSwitchStatement
  | TReturnStatement
  | TReturnOKStatement
  | TReturnErrorStatement
  | TConstDecomposition
  | TConstDeclaration
  | TThisDeclaration
  | TVariableDeclaration
  | TBuildInFunction
  | TExpression;
export declare type TStatements = TStatement[];
export declare type TConstantVariable = {
  type: string;
  value: string;
  name: string;
};
export declare type TDomainPrivateMethod = {
  privateMethod: {
    parameterDependencies: TParameterDependencies;
    returnType: TReturnType | TOkErrorReturnType;
    statements: TStatements;
  };
};
export declare type TDomainPublicMethod = {
  publicMethod: {
    parameterDependencies: TParameterDependencies;
    returnType: TOkErrorReturnType;
    statements: TStatements;
  };
};
export declare type TValueObjectMethodInfo = TDomainPrivateMethod;
export declare type TValueObjectMethods = Record<string, TValueObjectMethodInfo>;
export declare type TOkErrorReturnType = {
  ok: string;
  errors?: string[];
};
export declare type TDomainCreateMethod = {
  parameterDependency: TParameterDependency;
  returnType: TOkErrorReturnType;
  statements: TStatements;
};
declare type TDomainMethodName = string;
export declare type TDomainMethod = TDomainPublicMethod | TDomainPrivateMethod;
export declare type TDomainMethods = Record<TDomainMethodName, TDomainMethod>;
export declare type TValueObjectCreate = TDomainCreateMethod;
export declare type TValueObjectValues = {
  constantVars: TConstDeclarationValue[];
  methods: TValueObjectMethods;
  create: TValueObjectCreate;
};
export declare type TValueObjects = Record<string, TValueObjectValues>;
export declare type TEntities = Record<string, TEntityValues>;
export declare type TEntityValues = {
  constantVars?: TConstDeclarationValue[];
  methods?: TEntityMethods;
  create: TEntityCreate;
};
export declare type TEntityMethods = TDomainMethods;
export declare type TEntityCreate = TDomainCreateMethod;
export declare type TRootEntities = Record<string, TEntityValues>;
export declare type TDTOValues = {
  fields: TVariables;
};
export declare type TStructDeclaration = {
  fields: TVariables;
};
export declare type TExecute = {
  parameterDependencies: TParameterDependencies;
  statements: TStatements;
};
export declare type TDTO = Record<string, TDTOValues>;
export declare type TStructs = Record<string, TStructDeclaration>;
export declare type TUseCaseValues = {
  returnTypes: TOkErrorReturnType;
  execute: TExecute;
  parameterDependencies: TParameterDependencies;
};
export declare type TUseCase = Record<string, TUseCaseValues>;
export declare type TBaseControllerValues = {
  useCase?: string;
  parameterDependencies: TParameterDependencies;
};
export declare type TRestMethods = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'OPTIONS';
export declare type TRESTControllerValues = TBaseControllerValues & {
  parameterDependencies: TParameterDependencies;
  method: TRestMethods;
  execute: TRESTControllerExecute;
};
export declare type TRESTControllerExecute = {
  dependencies: TRESTControllerDependencies;
  statements: TStatements;
};
export declare type TRESTControllerDependencies = [string, string];
export declare type TRESTController = Record<string, TRESTControllerValues>;
declare type GraphQLControllerName = string;
export declare type TGraphQLController = Record<GraphQLControllerName, TGraphQLControllerValues>;
export declare type TGraphQLControllerValues = TBaseControllerValues & {
  type: 'graphql';
  operationType: TGraphQLOperation;
  inputType: string;
  operationName: string;
  execute: TGraphQLControllerExecute;
  outputType: string;
};
export declare type TGraphQLControllerExecute = {
  dependencies: TGraphQLControllerDependencies;
  returnType: string;
  statements: TStatements;
};
export declare type TGraphQLControllerDependencies = [string];
export declare type TDefaultCase = {
  statements: TStatements;
};
export declare type TRegularCase = {
  caseValue: string;
  statements: TStatements;
};
export declare type TSwitchStatement = {
  switchStatement: {
    cases: TRegularCase[];
    defaultCase: TDefaultCase;
  } & TExpression;
};
export declare type TEvaluatePrimitive = {
  value: string;
  type: TBitloopsPrimitives;
};
interface IUseCaseDependencyInjection {
  boundedContext: string;
  module: string;
  useCase: string;
  content: string;
}
export declare type TRouterName = string;
export interface IRouterRoute {
  path: string;
  method: string;
  controller: string;
  useCaseName: string;
}
declare type PackagePortName = string;
declare type PackageAdapterName = string;
export declare type TPackagesMapping = Record<PackagePortName, PackageAdapterName>;
export declare type TPackagesSetup = {
  [boundedContext: string]: {
    [module: string]: TPackagesMapping;
  };
};
export interface ISetupData {
  controllers?: TControllers;
  useCases?: TUseCases;
  useCaseDependencyInjections?: IUseCaseDependencyInjection[];
  setup?: TSetupInfo;
  packages?: TPackagesSetup;
  repos?: TReposSetup;
}
export declare type TUseCases = {
  [boundedContext: string]: {
    [module: string]: TUseCasesOfModule;
  };
};
export declare type TUseCasesOfModule = {
  [UseCaseClassName: string]: {
    instances: TUseCaseDefinitions[];
  };
};
export declare type TControllers = {
  [boundedContext: string]: {
    [module: string]: TControllerOfModule;
  };
};
export declare type TControllerOfModule = {
  [ControllerClassName: string]: TRestControllerDefinitions | TGraphQLControllerInstances;
};
export declare const repoSupportedTypes: readonly [
  'DB.Postgres',
  'DB.MySQL',
  'DB.SQLite',
  'DB.Mongo',
];
export declare type TRepoSupportedTypes = typeof repoSupportedTypes[number];
export declare type TReposSetup = {
  connections: {
    [connectionName: string]: TRepoConnectionInfo;
  };
  repoAdapters: {
    [boundedContext: string]: {
      [module: string]: TSetupRepoAdapters;
    };
  };
};
declare type RepoAdapterInstance = string;
export declare type TSetupRepoAdapters = Record<RepoAdapterInstance, TRepoAdapterInfo>;
declare type TRepoAdapterAndPortInfo = TRepoAdapterInfo & {
  repoPortInfo: TRepoPort;
};
export declare type TRepoAdapters = Record<RepoAdapterInstance, TRepoAdapterAndPortInfo>;
export declare type TRepoConnectionInfo = {
  dbType: TRepoSupportedTypes;
  host: TSingleExpression;
  port: TSingleExpression;
  database: TSingleExpression;
};
export declare type TRepoAdapterInfo = {
  dbType: TRepoSupportedTypes;
  repoPort: string;
  connection: TSingleExpression;
  collection: TSingleExpression;
};
export declare enum ControllerTypeOfDefinition {
  REST = 'rest',
  GRAPHQL = 'graphql',
}
export declare type TUseCaseDefinitions = {
  instanceName: string;
  dependencies: string[];
};
export declare type TRestControllerDefinitions = {
  type: ControllerTypeOfDefinition.REST;
  method: string;
  serverType: TServerType;
  instances: {
    url: string;
    controllerInstance: string;
    dependencies: string[];
  }[];
};
export declare type TGraphQLControllerInstances = {
  type: ControllerTypeOfDefinition.GRAPHQL;
  instances: {
    controllerInstance: string;
    dependencies: string[];
  }[];
};
export declare type TSetupInfo = {
  language: string;
  servers?: TServers;
  routers?: TRouters;
};
export declare type TServers = Partial<{
  [key in TServerType]: {
    serverInstances: (TRESTServerInstance | TGraphQLServerInstance)[];
  };
}>;
export declare type TServerType = 'REST.Fastify' | 'REST.Express' | 'GraphQL';
export declare type TRouterInstanceName = string;
export declare type TRestServerInstanceRouters = Record<
  TRouterInstanceName,
  {
    routerPrefix: string;
  }
>;
export declare type TRESTServerInstance = {
  port: TSingleExpression;
  apiPrefix?: string;
  routers: TRestServerInstanceRouters;
};
export declare type TGraphQLServerInstance = {
  port: TSingleExpression;
  resolvers: TControllerResolverBind[];
};
export declare type TControllerResolverBind = {
  boundedContext: string;
  module: string;
  controllerClassName: string;
  controllerInstance: string;
  dependencies: string[];
};
export declare type TRoutes = {
  methodURLMap: Record<
    TMethodAndPath,
    {
      controllerClass: string;
      boundedContext: string;
      module: string;
    }
  >;
};
declare type TRouters = Partial<Record<TServerType, TRoutersInfo>>;
export declare type TRoutersInfo = Record<TRouterInstanceName, TRoutes>;
export declare type TMethodAndPath = string;
/**
 * GraphQL Setup
 */
export declare type TGraphQLSetupData = {
  servers: IServer[];
  resolvers: TResolvers;
  addResolversToServer: IAddResolversToServer[];
  bitloopsModel: TBoundedContexts;
};
export interface IServer {
  type: string;
  name: string;
  port: string;
}
declare type TResolvers = TResolver[];
export declare type TGraphQLOperation = 'query' | 'mutation' | 'subscription';
export declare type TResolver = {
  boundedContext: string;
  module: string;
  operationType: TGraphQLOperation;
  operationName: string;
  input: string | TProps;
  output: string;
  controller: string;
};
export interface IAddResolversToServer {
  serverName: string;
  resolver: {
    name: string;
    boundedContext: string;
    module: string;
  };
}
export declare type TDefinitionMethods = Record<string, TDefinitionMethodInfo>;
export declare type TPackagePort = {
  name: string;
  definitionMethods: TDefinitionMethods;
};
export declare type TDefinitionMethodInfo = {
  parameterDependencies: TParameterDependencies;
  returnType: TReturnType;
};
export declare type TPackages = Record<string, TPackage>;
export declare type TPackage = {
  port: TPackagePort;
  adapters: TPackageAdapterNames;
};
export declare type TRepoPorts = Record<string, TRepoPort>;
export declare type TRepoPort = {
  aggregateRootName: string;
  extendedRepoPorts: string[];
  definitionMethods: TDefinitionMethods;
};
export declare type TPackageAdapterNames = string[];
/**
 * Setup Expression
 */
export declare type TSingleExpressionValue =
  | TLogicalSingleExpression
  | TEnvVarWithDefaultValueExpression
  | TEnvironmentVariableExpression
  | TLiteralExpression
  | TIdentifierExpression;
export declare type TSingleExpression = {
  expression: TSingleExpressionValue;
};
export declare type TEnvVarWithDefaultValueExpression = {
  envVarDefault: TEnvironmentVariableExpression & {
    defaultValue: TLiteralExpression;
  };
};
export declare type TEnvironmentVariableExpression = {
  envVariable: {
    value: string;
  };
};
export declare type TLiteralExpression = {
  literal: {
    type: TBitloopsPrimitives | 'number';
    value: string;
  };
};
export declare type TIdentifierExpression = {
  identifier: {
    value: string;
  };
};
export declare type TLogicalSingleExpression = {
  logicalExpression:
    | TNotSingleExpression
    | TAndSingleExpression
    | TOrSingleExpression
    | TXorSingleExpression;
};
export declare type TNotSingleExpression = {
  notExpression: TSingleExpression;
};
export declare type TAndSingleExpression = {
  andExpression: {
    left: TSingleExpression;
    right: TSingleExpression;
  };
};
export declare type TOrSingleExpression = {
  orExpression: {
    left: TSingleExpression;
    right: TSingleExpression;
  };
};
export declare type TXorSingleExpression = {
  xorExpression: {
    left: TSingleExpression;
    right: TSingleExpression;
  };
};
export declare type TLogicalExpression = {
  logicalExpression: TNotExpression | TAndExpression | TOrExpression | TXorExpression;
};
export declare type TNotExpression = {
  notExpression: TExpressionValues;
};
export declare type TAndExpression = {
  andExpression: {
    left: TExpressionValues;
    right: TExpressionValues;
  };
};
export declare type TOrExpression = {
  orExpression: {
    left: TExpressionValues;
    right: TExpressionValues;
  };
};
export declare type TXorExpression = {
  xorExpression: {
    left: TExpressionValues;
    right: TExpressionValues;
  };
};
export declare type TMultiplicativeExpression = {
  multiplicativeExpression: {
    left: TExpressionValues;
    operator: TMultiplicativeOperator;
    right: TExpressionValues;
  };
};
export declare type TMultiplicativeOperator = '*' | '/' | '%';
export declare type TAdditiveExpression = {
  additiveExpression: {
    left: TExpressionValues;
    operator: TAdditiveOperator;
    right: TExpressionValues;
  };
};
export declare type TAdditiveOperator = '+' | '-';
export declare type TRelationalExpression = {
  relationalExpression: {
    left: TExpressionValues;
    operator: TRelationalOperator;
    right: TExpressionValues;
  };
};
export declare type TRelationalOperator = '<' | '<=' | '>' | '>=';
export declare type TEqualityExpression = {
  equalityExpression: {
    left: TExpressionValues;
    operator: TEqualityOperator;
    right: TExpressionValues;
  };
};
export declare type TEqualityOperator = '==' | '!=';
export declare type TParenthesizedExpression = {
  parenthesizedExpression: TExpressionValues;
};
export declare type TTargetDependenciesTypeScript = {
  output: string;
  dependencies: {
    type: 'absolute' | 'relative';
    default: boolean;
    value: string;
    from: string;
  }[];
};
export {};
//# sourceMappingURL=types.d.ts.map
