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
export type TModule = {
  Props?: TProps;
  Controllers?: TRESTController | TGraphQLController;
  UseCases?: TUseCase;
  DomainErrors?: TDomainErrors;
  AggregateRoots?: TAggregateRoots;
  Entities?: TEntities;
  ValueObjects?: TValueObjects;
  DTOs?: TDTO;
  Structs?: TStructs;
  Packages?: TPackages;
  RepoPorts?: TRepoPorts;
  RepoAdapters?: TRepoAdapters;
};

export type TBitloopsClasses =
  | TProps
  | TValueObjects
  | TRESTController
  | TUseCase
  | TDomainErrors
  | TDTO
  | TStructs;

type TModuleName = string;
export type TBoundedContext = Record<TModuleName, TModule>;

type TBoundedContextName = string;
export type TBoundedContexts = Record<TBoundedContextName, TBoundedContext>;

export type TVariables = TVariable[];

export type TVariable = {
  optional?: boolean;
  type: string;
  name: string;
};

export type TPropsValues = {
  variables: TVariables;
};

export type TProps = Record<string, TPropsValues>;

export type TParamDependencyType = TBitloopsPrimitives | string;
// (name: string)
export type TParameterDependency = {
  type: TParamDependencyType;
  value: string;
};
export type TParameterDependencies = TParameterDependency[];

export type TArgumentDependencyType = TBitloopsPrimitives | 'variable';
// (name)
export type TArgumentDependency = {
  value: string;
  type: TArgumentDependencyType;
};

export type TArgumentDependencies = TArgumentDependency[];

export type TClassInstantiation = {
  classInstantiation: {
    className: string;
    argumentDependencies?: TArgumentDependencies;
  };
};

// Needed to check type on runtime, otherwise simple literal gets thrown away.
export const bitloopsPrimitives = [
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
  'Void',
] as const;
export type TBitloopsPrimitives = typeof bitloopsPrimitives[number]; //'string' | 'bool' | 'number';

type TUserDefinedClass = string;

export type TParam = 'variable' | 'method' | TBitloopsPrimitives | TUserDefinedClass;

export type TReturnType = TBitloopsPrimitives | TUserDefinedClass;

export type TBackTickString = {
  backTickString: string;
  // TODO add support for inside expressions
};

export type TString = {
  string: string;
};

export type TDomainError = {
  message: TBackTickString | TString;
  errorId: TString;
  parameters?: TParameterDependencies;
};

export type TDomainErrors = Record<string, TDomainError>;

export type TApplicationError = {
  message: TBackTickString | TString;
  errorId: TString;
  parameters?: TParameterDependencies;
};

export type TApplicationErrors = Record<string, TDomainError>;
export type TInstanceOf = {
  isInstanceOf: [TArgumentDependency, { class: string }]; // ArgumentsDependencies, e.g. name
};

export type TNotInstanceOf = {
  isNotInstanceOf: [TArgumentDependency, { class: string }]; // ArgumentsDependencies, e.g. name
};

export type TGetClass = {
  getClass: TRegularEvaluation;
};

export type TRegularEvaluation = {
  regularEvaluation: {
    type: TParam;
    value: string;
    argumentDependencies?: TArgumentDependencies; // ArgumentsDependencies, e.g. name
  };
};

export type TEvaluation = {
  evaluation:
    | TRegularEvaluation
    | TStructEvaluation
    | TDTOEvaluation
    | TInstanceOf
    | TNotInstanceOf
    | TGetClass;
};

('f()');
export type TCondition = {
  evaluateTrue?: TEvaluation;
  evaluateFalse?: TEvaluation;
};

export type TIfStatement = {
  if: {
    condition: TCondition;
    statements: TStatements;
  };
};

export type TStructEvaluationFields = ({ name: string } & TExpression)[];

export type TStructEvaluation = {
  struct: {
    fields: TStructEvaluationFields;
    name: string;
  };
};

export type TDTOEvaluationFields = TStructEvaluationFields;

export type TDTOEvaluation = {
  dto: {
    fields: TDTOEvaluationFields;
    name: string;
  };
};

export type TExpression = {
  expression: TCondition | TEvaluation | TClassInstantiation | TBackTickString;
};

//TODO maybe return should have two keys: ok and error
export type TReturnStatement = {
  return: TExpression;
};

export type TElseStatement = {
  else: {
    statements: TStatements;
  };
};
export type TReturnOKStatement = {
  returnOK: TExpression;
};

export type TReturnErrorStatement = {
  returnError: TExpression;
};

export type TConstDecompositionNested = {
  names: string[];
} & TEvaluation;

export type TConstDecomposition = {
  constDecomposition: TConstDecompositionNested;
};

export type TConstDeclaration = {
  constDeclaration: {
    name: string;
    type?: string;
    // expression: TExpression;
  } & TExpression;
};

export type TBreakStatement = 'break';

export type TStatement =
  | TBreakStatement
  | TIfBlock
  | TSwitch
  | TReturnStatement
  | TReturnOKStatement
  | TReturnErrorStatement
  | TConstDecomposition
  | TConstDeclaration
  | TExpression;

export type TStatements = TStatement[];

export type TIfBlock = {
  ifBlock: (TIfStatement | TElseStatement)[];
};

export type TConstantVariable = {
  type: string;
  value: string;
  name: string;
};

export type TDomainPrivateMethod = {
  privateMethod: {
    parameterDependencies: TParameterDependencies; // ParametersDependencies, e.g. name: string
    returnType: TReturnType | TOkErrorReturnType;
    statements: TStatements;
  };
};

export type TDomainPublicMethod = {
  publicMethod: {
    parameterDependencies: TParameterDependencies;
    returnType: TOkErrorReturnType;
    statements: TStatements;
  };
};

export type TValueObjectMethodInfo = TDomainPrivateMethod;

export type TValueObjectMethods = Record<string, TValueObjectMethodInfo>;

export type TOkErrorReturnType = {
  ok: string[];
  errors?: string[];
};

export type TDomainCreateMethod = {
  parameterDependencies: TParameterDependencies; // ParametersDependencies, e.g. name: string
  returnType: TOkErrorReturnType;
  statements: TStatements;
};

type TDomainMethodName = string;

export type TDomainMethod = TDomainPublicMethod | TDomainPrivateMethod;
export type TDomainMethods = Record<TDomainMethodName, TDomainMethod>;

export type TValueObjectCreate = TDomainCreateMethod;

export type TValueObjectValues = {
  constantVars: TConstantVariable[];
  methods: TValueObjectMethods;
  create: TValueObjectCreate;
};

export type TValueObjects = Record<string, TValueObjectValues>;

export type TEntities = Record<string, TEntityValues>;

export type TEntityValues = {
  constantVars?: TConstantVariable[];
  methods?: TEntityMethods;
  create: TEntityCreate;
};

export type TEntityMethods = TDomainMethods;

export type TEntityCreate = TDomainCreateMethod;

export type TAggregateRoots = TEntities;

export type TDTOValues = {
  fields: TVariables;
};

export type TStructDeclaration = {
  fields: TVariables;
};

export type TExecute = {
  parameterDependencies: TParameterDependencies; // ParametersDependencies, e.g. name: string
  statements: TStatements;
};

export type TDTO = Record<string, TDTOValues>;

export type TStructs = Record<string, TStructDeclaration>;

export type TUseCaseValues = {
  returnTypes: TOkErrorReturnType;
  execute: TExecute;
  parameterDependencies: TParameterDependencies; // TODO maybe make this optional
};

export type TUseCase = Record<string, TUseCaseValues>;

export type TBaseControllerValues = {
  useCase?: string;
  // TODO remove dependencies
  parameterDependencies: TParameterDependencies; // Controller constructor parameters
};

export type TRestMethods = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'OPTIONS';

export type TRESTControllerValues = TBaseControllerValues & {
  parameterDependencies: TParameterDependencies;
  method: TRestMethods;
  execute: TRESTControllerExecute;
};

export type TRESTControllerExecute = {
  dependencies: TRESTControllerDependencies;
  statements: TStatements;
};

export type TRESTControllerDependencies = [string, string]; // e.g. (request, reply)

export type TRESTController = Record<string, TRESTControllerValues>;
type GraphQLControllerName = string;
export type TGraphQLController = Record<GraphQLControllerName, TGraphQLControllerValues>;

export type TGraphQLControllerValues = TBaseControllerValues & {
  type: 'graphql';
  operationType: TGraphQLOperation;
  operationName: string;
  inputType: string;
  execute: TGraphQLControllerExecute;
  outputType: string; // should be same as return type of execute
};

export type TGraphQLControllerExecute = {
  dependencies: TGraphQLControllerDependencies;
  returnType: string; // The DTO Returned by the controller's execute
  statements: TStatements;
};
export type TGraphQLControllerDependencies = [string]; // e.g. (request)

export type TDefaultCase = {
  defaultCase: {
    statements: TStatements;
  };
};

export type TRegularSwitchCase = {
  regularCase: {
    caseValue: TCaseValue;
    statements: TStatements;
  };
};

export type TCaseValue = {
  value: string;
};

export type TCase = TRegularSwitchCase | TDefaultCase;

export type TSwitch = {
  switch: {
    expression: TEvaluation;
    cases: TCase[];
  };
};

export type TEvaluatePrimitive = {
  value: string;
  type: TBitloopsPrimitives;
};

// SETUP Files Types

// interface IController {
//   boundedContext: string;
//   module: string;
//   useCase: string;
//   content: string;
// }

interface IUseCaseDependencyInjection {
  boundedContext: string;
  module: string;
  useCase: string;
  content: string;
}

export type TRouterName = string;

export interface IRouterRoute {
  path: string;
  method: string;
  controller: string;
  useCaseName: string;
}

type PackagePortName = string;
type PackageAdapterName = string;

export type TPackagesMapping = Record<PackagePortName, PackageAdapterName>;

export type TPackagesSetup = {
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

export type TUseCases = {
  [boundedContext: string]: {
    [module: string]: TUseCasesOfModule;
  };
};

export type TUseCasesOfModule = {
  [UseCaseClassName: string]: TUseCaseDefinitions;
};

export type TControllers = {
  [boundedContext: string]: {
    [module: string]: TControllerOfModule;
  };
};

export type TControllerOfModule = {
  [ControllerClassName: string]: TRestControllerDefinitions | TGraphQLControllerInstances;
};

export const repoSupportedTypes = ['postgres', 'mysql', 'sqlite', 'mongodb'] as const;
export type TRepoSupportedTypes = typeof repoSupportedTypes[number];

export type TReposSetup = {
  connections?: {
    [connectionName: string]: TRepoConnectionInfo;
  };
  repoAdapters?: {
    [boundedContext: string]: {
      [module: string]: TSetupRepoAdapters;
    };
  };
};

type RepoAdapterInstance = string;
export type TSetupRepoAdapters = Record<RepoAdapterInstance, TRepoAdapterInfo>;

type TRepoAdapterAndPortInfo = TRepoAdapterInfo & {
  repoPortInfo: TRepoPort;
};
export type TRepoAdapters = Record<RepoAdapterInstance, TRepoAdapterAndPortInfo>;

export type TRepoConnectionInfo = {
  dbType: TRepoSupportedTypes;
  host: string;
  port: number;
  database: string;
};

export type TRepoAdapterInfo = {
  dbType: TRepoSupportedTypes;
  repoPort: string;
  connection: string; // Name of connection instance
  collection: string;
};

export enum ControllerTypeOfDefinition {
  REST = 'rest',
  GRAPHQL = 'graphql',
}

export type TUseCaseDefinitions = {
  instanceName: string;
  dependencies: string[]; // Replace with correct type
};

export type TRestControllerDefinitions = {
  type: ControllerTypeOfDefinition.REST;
  method: string; // TODO replace with type
  serverType: TServerType;
  instances: {
    url: string;
    controllerInstance: string;
    dependencies: string[]; // Replace with correct type
  }[];
};

export type TGraphQLControllerInstances = {
  type: ControllerTypeOfDefinition.GRAPHQL;
  instances: {
    controllerInstance: string;
    dependencies: string[]; // Replace with correct type
  }[];
};

export type TSetupInfo = {
  language?: string;
  servers?: TServers;
  routers?: TRouters;
};

export type TServers = {
  [key in TServerType]: {
    serverInstances: (TRESTServerInstance | TGraphQLServerInstance)[];
  };
};

export type TServerType = 'REST.Fastify' | 'REST.Express' | 'GraphQL';
export type TRouterInstanceName = string;
export type TRESTServerInstance = {
  port: string;
  apiPrefix?: string;
  routers: Record<TRouterInstanceName, { routerPrefix: string }>;
};

export type TGraphQLServerInstance = {
  port: string;
  resolvers: TControllerResolverBind[];
};

export type TControllerResolverBind = {
  boundedContext: string;
  module: string;
  controllerClassName: string;
  controllerInstance: string;
  dependencies: string[]; // Replace with correct type
};

export type TRoutes = {
  methodURLMap: Record<
    TMethodAndPath,
    {
      controllerClass: string;
      // controllerInstance: string;
      boundedContext: string;
      module: string;
    }
  >;
};
type TRouters = Record<TServerType, TRoutersInfo>;
export type TRoutersInfo = Record<TRouterInstanceName, TRoutes>;

export type TMethodAndPath = string;

/**
 * GraphQL Setup
 */
export type TGraphQLSetupData = {
  // TODO discuss useCases, controllers di
  servers: IServer[];
  resolvers: TResolvers;
  addResolversToServer: IAddResolversToServer[];
  // DTOs: { [boundedContent: string]: { [moduleName: string]: { DTOs: TDTO } } }; // Referenced DTOs are also needed
  bitloopsModel: TBoundedContexts;
};

export interface IServer {
  type: string;
  name: string;
  port: string;
}

type TResolvers = TResolver[];

type TGraphQLOperation = 'query' | 'mutation' | 'subscription';

export type TResolver = {
  boundedContext: string;
  module: string;
  operationType: TGraphQLOperation;
  operationName: string;
  input: string | TProps; // an existing DTO or any type
  output: string; // a DTO
  controller: string;
};

export interface IAddResolversToServer {
  serverName: string;
  resolver: {
    name: string; // Should match the Operation name
    boundedContext: string;
    module: string;
  };
}
export type TDefinitionMethods = Record<string, TDefinitionMethodInfo>;

export type TPackagePort = {
  name: string;
  definitionMethods: TDefinitionMethods;
};

export type TDefinitionMethodInfo = {
  parameterDependencies: TParameterDependencies;
  returnType: TReturnType;
};

export type TPackages = Record<string, TPackage>;

export type TPackage = {
  port: TPackagePort;
  adapters: TPackageAdapterNames;
};

export type TRepoPorts = Record<string, TRepoPort>;

export type TRepoPort = {
  aggregateRootName: string;
  extendedRepoPorts: string[];
  definitionMethods: TDefinitionMethods;
};

export type TPackageAdapterNames = string[];
