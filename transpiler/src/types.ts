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
import { TClassTypesValues } from './helpers/mappings.js';
import { BitloopsLanguageAST } from './index.js';
import { IntermediateASTTree } from './ast/core/intermediate-ast/IntermediateASTTree.js';

export type TModule = {
  Props?: TProps;
  Controller?: TRESTController | TGraphQLController;
  UseCases?: TUseCase;
  ApplicationErrors?: TApplicationErrors;
  DomainErrors?: TDomainErrors;
  RootEntities?: TRootEntities;
  Entity?: TEntity;
  ValueObject?: TValueObject;
  DTOs?: TDTO;
  Structs?: TStructDeclaration;
  Packages?: TPackages;
  DomainRule?: TDomainRule;
  RepoPorts?: TRepoPorts;
  RepoAdapters?: TRepoAdapters;
  ReadModel?: TReadModel;
};

// TODO merge with TClassTypesValues from `transpiler/src/helpers/mappings.ts`
export type TClassType =
  | 'Props'
  | 'Controller'
  | 'UseCases'
  | 'ApplicationErrors'
  | 'DomainErrors'
  | 'RootEntities'
  | 'Entity'
  | 'ValueObject'
  | 'DTOs'
  | 'Structs'
  | 'Packages'
  | 'DomainRule'
  | 'RepoPorts'
  | 'RepoAdapters'
  | 'ReadModels';

export type TComponentType =
  | 'TProps'
  | 'TController'
  | 'TUseCase'
  | 'TApplicationErrors'
  | 'TDomainErrors'
  | 'TRootEntities'
  | 'TEntity'
  | 'TValueObject'
  | 'TDTOs'
  | 'TStruct' //TODO should we replace with TStructDeclaration/DTODeclaration
  | 'TPackages'
  | 'TDomainRule'
  | 'TRepoPorts'
  | 'TRepoAdapters'
  | 'TReadModels';

export type TClassName = string;
type TClassInformation = {
  moduleName: TModuleName;
  fileId: string;
  contents: BitloopsLanguageAST;
};

export type TASTCoreInputData = {
  boundedContext: string;
  classes: Record<TClassType, Record<TClassName, TClassInformation>>;
};

export type TContextData = { boundedContext: string; module: string };

export type TBitloopsTargetContent = {
  boundedContext: TBoundedContextName;
  module: TModuleName;
  classType: TClassType;
  className: TClassName;
  fileContent: TTargetDependenciesTypeScript;
}[];

export type BoundedContextModules = Record<TBoundedContextName, TModuleName[]>;

export type TBitloopsClasses =
  | TProps
  | TValueObject
  | TRESTController
  | TUseCase
  | TDomainErrors
  | TDTO
  | TStruct;

export type TModuleName = string;
export type TBoundedContext = Record<TModuleName, IntermediateASTTree>;

export type TBoundedContextName = string;
export type TBoundedContexts = Record<TBoundedContextName, TBoundedContext>;

export const fieldsKey = 'fields';
export const evaluationFieldsKey = 'fields';
export type TVariables = TVariable[];

export const identifierKey = 'identifier';
export type TIdentifier = string;

export const optionalKey = 'optional';
export type TOptional = boolean;

export const fieldKey = 'field';
export type TVariable = {
  [fieldKey]: {
    [optionalKey]?: TOptional;
    [identifierKey]: TIdentifier;
    [bitloopsPrimaryTypeKey]: TBitloopsPrimaryType;
  };
};

/**
 * Props
 */
export type TPropsIdentifier = string;
export const PropsIdentifierKey = 'PropsIdentifier';

export const PropsKey = 'Props';
export type TProps = {
  [PropsKey]: {
    [PropsIdentifierKey]: TPropsIdentifier;
    [fieldsKey]: TVariables;
  };
};

/**
 * Read Model
 */
export type TReadModelIdentifier = string;
export const ReadModelIdentifierKey = 'ReadModelIdentifier';
export const ReadModelKey = 'ReadModel';
export type TReadModel = {
  [ReadModelKey]: {
    [ReadModelIdentifierKey]: TReadModelIdentifier;
    [fieldsKey]: TVariables;
  };
};

export type TParamDependencyType = TBitloopsPrimaryType;

export type TParameterIdentifier = string;
export type TParameterDependency = {
  parameter: {
    type: TParamDependencyType;
    value: TParameterIdentifier;
  };
};
export type TParameterDependencies = TParameterDependency[];

// The old TArgumentDependency
export type TArgument = {
  argument: TExpression;
};

// The old TArgumentDependencies
export type TArgumentList = TArgument[];

export type TClassInstantiation = {
  classInstantiation: {
    className: string;
    argumentDependencies?: TArgumentList;
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
  'backTickString',
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
] as const;
export type TBitloopsPrimitives = typeof bitloopsPrimitives[number]; //'string' | 'bool' | 'number';

export const BitloopsBuiltInClassNames = {
  UUIDv4: 'UUIDv4',
} as const;
export const bitloopsBuiltInClasses = [BitloopsBuiltInClassNames.UUIDv4] as const;
export type TBitloopsBuiltInClasses = typeof bitloopsBuiltInClasses[number];

export type TBitloopsIdentifier = string;

export type TParam = 'variable' | 'method' | TBitloopsPrimitives | TBitloopsIdentifier;

export const primitivesTypeKey = 'primitiveType';
export type TBitloopsPrimitivesObject = {
  [primitivesTypeKey]: TBitloopsPrimitives;
};

export const buildInClassTypeKey = 'buildInClassType';
export type TBitloopsBuiltInClassesObject = {
  [buildInClassTypeKey]: TBitloopsBuiltInClasses;
};

export const bitloopsIdentifiersTypeKey = 'bitloopsIdentifierType';
export type TBitloopsIdentifierObject = {
  [bitloopsIdentifiersTypeKey]: TBitloopsIdentifier;
};

export const arrayPrimaryTypeKey = 'arrayPrimaryType';
export type ArrayBitloopsPrimTypeObject = {
  [arrayPrimaryTypeKey]: TBitloopsPrimaryType;
};

export const bitloopsPrimaryTypeKey = 'type';
export type TBitloopsPrimaryType =
  | TBitloopsPrimitivesObject
  | TBitloopsBuiltInClassesObject
  | TBitloopsIdentifierObject
  | ArrayBitloopsPrimTypeObject;

export type TBackTickString = {
  backTickString: string;
  // TODO add support for inside expressions
};

export type TString = {
  string: string;
};

export type TDomainError = {
  message: TExpression;
  errorId: TExpression;
  parameters?: TParameterDependencies;
};

export type TDomainRule = {
  DomainRule: {
    domainRuleIdentifier: string;
    parameters?: TParameterDependencies;
    error: string;
    statements: TStatements;
    isBrokenIfCondition: TCondition;
  };
};

/**
 * This type exists because not all expressions work as a condition, only the ones that evaluate to boolean.
 * (at least in most languages)
 */
export type TCondition = {
  condition: TExpression;
};

export const DomainErrorKey = 'DomainError';
export const DomainErrorIdentifier = 'identifier';
export type TErrorMessage = { message: TExpression };
export type TErrorId = { errorId: TExpression };
export type TDomainErrors = {
  [DomainErrorKey]: {
    [DomainErrorIdentifier]: TIdentifier;
    parameters?: TParameterDependencies;
  } & TErrorMessage &
    TErrorId;
};

export const ApplicationErrorKey = 'ApplicationError';
export const ApplicationErrorIdentifier = 'identifier';
export type TApplicationError = {
  [ApplicationErrorKey]: {
    [ApplicationErrorIdentifier]: TIdentifier;
    parameters?: TParameterDependencies;
  } & TErrorMessage &
    TErrorId;
};

export type TApplicationErrors = Record<string, TApplicationError>;
export type TInstanceOf = {
  isInstanceOf: TExpression & { class: string };
};

export type TPropsEvaluation = {
  props: {
    fields: TEvaluationFields;
    name: string;
  };
};

export type TGetClass = {
  getClass: TExpression;
};

export type TRegularEvaluation = {
  regularEvaluation: {
    type: TParam;
    value: string;
    argumentDependencies?: TArgumentList; // ArgumentsDependencies, e.g. name
  };
};

export type TBuiltInClassEvaluation = {
  builtInClass: {
    className: string;
    argumentList: TArgumentList;
  };
};

// export type TCondition = {
//   evaluateTrue?: TEvaluation;
//   evaluateFalse?: TEvaluation;
// };
export type TEvaluationValues =
  | TRegularEvaluation
  | TStructEvaluation
  | TDTOEvaluation
  | TValueObjectEvaluation
  | TPropsEvaluation
  | TEntityEvaluation
  | TErrorEvaluation
  | TBuiltInClassEvaluation;

export type TMethodCallExpression = {
  methodCallExpression: TExpression & {
    argumentList: TArgumentList;
  };
};

export type TEvaluation = {
  evaluation: TEvaluationValues;
};

export type TIfStatement = {
  ifStatement: {
    condition: TExpression;
    thenStatements: TStatements;
    elseStatements?: TStatements;
  };
};

export type TEvaluationField = {
  evaluationField: { name: string } & TExpression;
};
export type TEvaluationFields = TEvaluationField[];

export type TStructEvaluation = {
  struct: {
    fields: TEvaluationFields;
    name: string;
  };
};

export type TDTOEvaluation = {
  dto: {
    fields: TEvaluationFields;
    name: string;
  };
};

export type TValueObjectEvaluation = {
  valueObject: TDomainEvaluation;
};

export type TEntityEvaluation = {
  entity: TDomainEvaluation;
};

export type TDomainEvaluation = {
  domainEvaluation: {
    props: TDomainEvaluationExpression;
  } & TDomainEvaluationName;
};

type TDomainEvaluationName =
  | {
      entityIdentifier: TEntityIdentifier;
    }
  | { valueObjectIdentifier: TValueObjectIdentifier };

export type TDomainEvaluationExpression =
  | {
      fields: TEvaluationFields;
    }
  | TExpression;

export const expressionKey = 'expression';
export type TExpression = {
  [expressionKey]: TExpressionValues;
};

export type TExpressionValues =
  | TEvaluation
  | TClassInstantiation
  | TBackTickString
  | TLogicalExpression
  | TMultiplicativeExpression
  | TAdditiveExpression
  | TRelationalExpression
  | TEqualityExpression
  | TParenthesizedExpression
  | TArrayLiteralExpression
  | TToStringExpression
  | TLiteral
  | TIdentifierExpr
  | TMethodCallExpression
  | TThisExpression
  | TMemberDotExpression
  | TAssignmentExpression
  | TInstanceOf
  | TGetClass;

export type TAssignmentExpression = {
  assignmentExpression: {
    left: TExpression;
  } & TExpression;
};

export type TMemberDotExpression = {
  memberDotExpression: TExpression & {
    identifier: string;
  };
};

export type TIdentifierExpr = {
  identifier: string;
};
export type TToStringExpression = {
  toStringMethod: TExpression;
};

export type TLiteral = {
  literal: TLiteralValues;
};
/* 🔧 TODO: add 'T' prefix */
export type TLiteralValues =
  | StringLiteral
  | BooleanLiteral
  | TNumericLiteral
  | NullLiteral
  | TemplateStringLiteral;

export type StringLiteral = {
  stringLiteral: string;
};
export type TemplateStringLiteral = {
  templateStringLiteral: string;
};

export type BooleanLiteral = {
  booleanLiteral: string;
};
export type NullLiteral = {
  nullLiteral: string;
};

export type TNumericLiteral = {
  numericLiteral: TNumericLiteralValues;
};
export type TNumericLiteralValues = IntegerLiteral | DecimalLiteral;
export type IntegerLiteral = {
  integerLiteral: {
    value: string;
    type: 'int32' | 'int64'; //| 'uint32' | 'uint64';
  };
};
export type DecimalLiteral = {
  decimalLiteral: {
    value: string;
    type: 'float' | 'double'; //| 'float32' | 'float64';
  };
};

export type TThisExpression = {
  thisExpression: 'this';
};

export type TArrayLiteralExpression = {
  arrayLiteral: TExpression[];
};

//TODO maybe return should have two keys: ok and error
export type TReturnStatement = {
  return: TExpression;
};

export const returnOKKey = 'returnOK';
export type TReturnOKStatement = {
  [returnOKKey]: TExpression;
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

export type TConstDeclarationValue = {
  identifier: string;
  type?: TBitloopsPrimaryType;
} & TExpression;

export const constDeclarationKey = 'constDeclaration';
export type TConstDeclaration = {
  [constDeclarationKey]: TConstDeclarationValue;
};

export const variableDeclarationKey = 'variableDeclaration';
export type TVariableDeclaration = {
  [variableDeclarationKey]: {
    identifier: string;
    type: TBitloopsPrimaryType;
  } & TExpression;
};

export type TThisDeclaration = {
  thisDeclaration: {
    name: string;
  } & TExpression;
};

export type TBreakStatement = {
  breakStatement: 'break';
};

export type TAppliedRule = {
  appliedRule: {
    domainRuleIdentifier: string;
    argumentList: TArgumentList;
  };
};

export type TApplyRules = {
  applyRules: TAppliedRule[];
};

export type TBuiltInFunction = {
  builtInFunction: TBuiltInFunctionValues;
};
export type TBuiltInFunctionValues = TApplyRules;

export type TStatement =
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
  | TBuiltInFunction
  | TExpression;

export type TStatements = TStatement[];

export type TConstantVariable = {
  type: string;
  value: string;
  name: string;
};

export type TDomainPrivateMethods = TDomainPrivateMethod[];

type TDomainPrivateMethodValues = {
  identifier: TIdentifier;
  parameters: TParameterDependencies;
  statements: TStatements;
};

export type TDomainPrivateMethodValuesPrimaryReturnType = {
  type: TBitloopsPrimaryType;
} & TDomainPrivateMethodValues;

export type TDomainPrivateMethodValuesOkErrorReturnType = TDomainPrivateMethodValues &
  TOkErrorReturnType;

export type TDomainPrivateMethod = {
  privateMethod:
    | TDomainPrivateMethodValuesPrimaryReturnType
    | TDomainPrivateMethodValuesOkErrorReturnType;
};

export type TDomainPublicMethods = TDomainPublicMethod[];

export type TDomainPublicMethod = {
  publicMethod: {
    identifier: TIdentifier;
    parameters: TParameterDependencies;
    statements: TStatements;
  } & TOkErrorReturnType;
};

export type TReturnOkType = {
  ok: {
    type: TBitloopsPrimaryType;
  };
};

export type TErrorIdentifier = {
  error: string; // e.g. DomainErrors.InvalidName
};
export type TErrorIdentifiers = TErrorIdentifier[];

// export type TOkErrorReturnTypeValues = {
//   errors: TErrorIdentifiers;
// } & TReturnOkType;

export type TOkErrorReturnType = {
  returnType: {
    errors: TErrorIdentifiers;
  } & TReturnOkType;
};

export type TDomainCreateMethod = {
  create: {
    statements: TStatements;
  } & TOkErrorReturnType &
    TParameterDependency;
};

export type TValueObjectCreate = TDomainCreateMethod;

export type TValueObjectIdentifier = string;

export type TValueObject = {
  ValueObject: {
    valueObjectIdentifier: TValueObjectIdentifier;
    constants?: TConstDeclaration[]; //TConstantVariable[];
    privateMethods?: TDomainPrivateMethods;
  } & TValueObjectCreate;
};

export type TEntityIdentifier = string;
export type TEntity = {
  Entity: {
    entityIdentifier: TEntityIdentifier;
    entityValues: TEntityValues;
  };
};

export type TEntityValues = {
  constants?: TConstDeclaration[]; // TConstantVariable[];
  publicMethods?: TDomainPublicMethods;
  privateMethods?: TDomainPrivateMethods;
} & TEntityCreate;

export type TEntityCreate = TDomainCreateMethod;

export type TRootEntities = Record<string, TEntityValues>;

export const StructKey = 'Struct';
export type TStructIdentifier = string;
export const structIdentifierKey = 'StructIdentifier';

export type TStructDeclaration = {
  [StructKey]: {
    [structIdentifierKey]: TStructIdentifier;
    fields: TVariables;
  };
};

export type TExecute = {
  parameters: TParameterDependencies; // ParametersDependencies, e.g. name: string
  statements: TStatements;
} & TOkErrorReturnType;

export type TDTOIdentifier = string;
export const DTOIdentifierKey = 'DTOIdentifier';

export const DTOKey = 'DTO';
export type TDTO = {
  [DTOKey]: {
    [DTOIdentifierKey]: TDTOIdentifier;
    [fieldsKey]: TVariables;
  };
};

export type TStruct = Record<string, TStructDeclaration>;

export const UseCaseKey = 'UseCase';
export type TUseCaseIdentifier = string;
export const UseCaseIdentifierKey = 'UseCaseIdentifier';

export type TUseCase = {
  [UseCaseKey]: {
    [UseCaseIdentifierKey]: TUseCaseIdentifier;
    execute: TExecute;
    parameters: TParameterDependencies; // TODO maybe make this optional
  };
};

export type TBaseControllerValues = {
  // useCase?: string;
  parameters: TParameterDependencies; // Controller constructor parameters
};

export type TRestMethods = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'OPTIONS';

export type TRESTController = {
  RESTController: TBaseControllerValues & {
    RESTControllerIdentifier: string;
    method: TRestMethods;
    execute: TRESTControllerExecute;
  };
};

export type TRESTControllerExecute = {
  dependencies: TRESTControllerDependencies;
  statements: TStatements;
};

export type TRESTControllerDependencies = [string, string]; // e.g. (request, reply)

export type GraphQLControllerIdentifier = string;

export type TGraphQLController = {
  GraphQLController: TBaseControllerValues & {
    GraphQLControllerIdentifier: GraphQLControllerIdentifier;
    inputType: null | string;
    operationType: TGraphQLOperation;
    operationName: string;
    execute: TGraphQLControllerExecute;
  };
};

export type TGraphQLControllerExecute = {
  dependencies: TGraphQLControllerDependencies;
  returnType: string; // The DTO Returned by the controller's execute
  statements: TStatements;
};
export type TGraphQLControllerDependencies = [string]; // e.g. (request)

export type TDefaultCase = {
  statements: TStatements;
};

export type TRegularCase = {
  regularCase: {
    statements: TStatements;
  } & TExpression;
};

export type TSwitchStatement = {
  switchStatement: {
    cases: TRegularCase[];
    defaultCase: TDefaultCase;
  } & TExpression;
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
  [UseCaseClassName: string]: {
    instances: TUseCaseDefinitions[];
  };
};

export type TControllers = {
  [boundedContext: string]: {
    [module: string]: TControllerOfModule;
  };
};

export type TControllerOfModule = {
  [ControllerClassName: string]: TRestControllerDefinitions | TGraphQLControllerInstances;
};

export const repoSupportedTypes = ['DB.Postgres', 'DB.MySQL', 'DB.SQLite', 'DB.Mongo'] as const;
export type TRepoSupportedTypes = typeof repoSupportedTypes[number];

export type TReposSetup = {
  connections: {
    [connectionName: string]: TRepoConnectionInfo;
  };
  repoAdapters: {
    [boundedContext: string]: {
      [module: string]: TSetupRepoAdapters;
    };
  };
};

type RepoAdapterName = string;
export type TSetupRepoAdapters = Record<RepoAdapterName, TRepoAdapterInfo>;

export type TRepoAdapters = Record<RepoAdapterName, TRepoAdapterInfo>;

export type TRepoConnectionInfo = {
  dbType: TRepoSupportedTypes;
  host: TSingleExpression;
  port: TSingleExpression;
  database: TSingleExpression;
};

export type TRepoAdapterInfo = {
  dbType: TRepoSupportedTypes;
  repoPort: string;
  connection: TSingleExpression; // Name of connection instance
  collection: TSingleExpression;
  instanceIdentifier: string;
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
  language: string;
  servers?: TServers;
  routers?: TRouters;
};

export type TServers = Partial<{
  [key in TServerType]: {
    serverInstances: (TRESTServerInstance | TGraphQLServerInstance)[];
  };
}>;

export type TServerType = 'REST.Fastify' | 'REST.Express' | 'GraphQL';
export type TRouterInstanceName = string;
export type TRestServerInstanceRouters = Record<TRouterInstanceName, { routerPrefix: string }>;
export type TRESTServerInstance = {
  port: TSingleExpression;
  apiPrefix?: string;
  routers: TRestServerInstanceRouters;
};

export type TGraphQLServerInstance = {
  port: TSingleExpression;
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
type TRouters = Partial<Record<TServerType, TRoutersInfo>>;
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

export type TResolvers = TResolver[];

export type TGraphQLOperation = 'query' | 'mutation' | 'subscription';

export type TResolver = {
  boundedContext: string;
  module: string;
  operationType: TGraphQLOperation;
  operationName: string;
  input: string | null; // a DTO or nothing for no input
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
  returnType: TBitloopsPrimaryType;
};

export type TPackages = Record<string, TPackage>;

export type TPackage = {
  port: TPackagePort;
  adapters: TPackageAdapterNames;
};

export type TRepoPorts = Record<string, TRepoPort>;

export type TAggregateRepoPort = {
  readModelName?: never; // TODO remove and use type identifiers from here `src/target/typescript/core/type-identifiers/repoPort.ts`
  aggregateRootName: string;
  extendedRepoPorts: string[];
  definitionMethods: TDefinitionMethods;
};

export type TReadModelRepoPort = {
  readModelName: string;
  aggregateRootName?: never;
  extendedRepoPorts: string[];
  definitionMethods: TDefinitionMethods;
};

export type TRepoPort = TAggregateRepoPort | TReadModelRepoPort;

export type TPackageAdapterNames = string[];

/**
 * Setup Expression
 */
// singleExpression
//     : singleExpression Or singleExpression                                   # LogicalOrExpression
//     | EnvPrefix OpenParen Identifier Comma literal CloseParen                # EnvPrefixExpression
//     | envVariable                                                            # EnvVariableExpression
//     | literal                                                                # LiteralExpression
//     | identifier                                                             # IdentifierExpression //Identifier or Variable method

export type TSingleExpressionValue = // | TMultiplicativeExpression
  // | TAdditiveExpression
  // | TRelationalExpression
  // | TEqualityExpression
  // | TParenthesizedExpression;
  | TLogicalSingleExpression
  | TEnvVarWithDefaultValueExpression
  | TEnvironmentVariableExpression
  | TLiteralExpression
  | TIdentifierExpression
  | TObjectLiteral;

export type TSingleExpression = {
  expression: TSingleExpressionValue;
};
// env(FASTIFY_PORT, env(FASTIFY_PORT, 3000))
// process.env.FASTIFY_PORT || 5001
export type TEnvVarWithDefaultValueExpression = {
  envVarDefault: TEnvironmentVariableExpression & {
    defaultValue: TLiteralExpression; // | TIdentifierExpression;
  };
};

export type TObjectLiteral = {
  objectLiteral: {
    name: string;
    expression: TSingleExpressionValue;
  }[];
};

export type TEnvironmentVariableExpression = {
  envVariable: {
    value: string;
  };
};

export type TLiteralExpression = {
  literal: {
    type: TBitloopsPrimitives | 'number';
    value: string;
  };
};

export type TIdentifierExpression = {
  identifier: {
    value: string;
  };
};

export type TLogicalSingleExpression = {
  logicalExpression:
    | TNotSingleExpression
    | TAndSingleExpression
    | TOrSingleExpression
    | TXorSingleExpression;
};

export type TNotSingleExpression = {
  notExpression: TSingleExpression;
};

export type TAndSingleExpression = {
  andExpression: {
    left: TSingleExpression;
    right: TSingleExpression;
  };
};

export type TErrorEvaluation = {
  errorEvaluation: {
    name: string;
    argumentList?: TArgumentList;
  };
};

export type TOrSingleExpression = {
  orExpression: {
    left: TSingleExpression;
    right: TSingleExpression;
  };
};

export type TXorSingleExpression = {
  xorExpression: {
    left: TSingleExpression;
    right: TSingleExpression;
  };
};

export type TLogicalExpression = {
  logicalExpression: TNotExpression | TAndExpression | TOrExpression | TXorExpression;
};

export type TNotExpression = {
  notExpression: TExpression;
};

export type TAndExpression = {
  andExpression: {
    left: TExpression;
    right: TExpression;
  };
};

export type TOrExpression = {
  orExpression: {
    left: TExpression;
    right: TExpression;
  };
};

export type TXorExpression = {
  xorExpression: {
    left: TExpression;
    right: TExpression;
  };
};

export type TMultiplicativeExpression = {
  multiplicativeExpression: {
    left: TExpression;
    operator: TMultiplicativeOperator;
    right: TExpression;
  };
};

export type TMultiplicativeOperator = '*' | '/' | '%';

export type TAdditiveExpression = {
  additiveExpression: {
    left: TExpression;
    operator: TAdditiveOperator;
    right: TExpression;
  };
};

export type TAdditiveOperator = '+' | '-';

export type TRelationalExpression = {
  relationalExpression: {
    left: TExpression;
    operator: TRelationalOperator;
    right: TExpression;
  };
};

export type TRelationalOperator = '<' | '<=' | '>' | '>=';

export type TEqualityExpression = {
  equalityExpression: {
    left: TExpression;
    operator: TEqualityOperator;
    right: TExpression;
  };
};

export type TEqualityOperator = '==' | '!=';

export type TParenthesizedExpression = {
  parenthesizedExpression: TExpression;
};

type TDependencyTypescript = {
  type: 'absolute' | 'relative';
  default: boolean;
  value: string;
  from?: string; // children set it only for absolute types
};

export type TDependencyChildTypescript = TDependencyTypescript & {
  // when type is relative
  classType?: TClassTypesValues;
  className?: string;
};

export type TDependencyParentTypescript = TDependencyTypescript & {
  from: string;
};

export type TDependenciesTypeScript = (TDependencyChildTypescript | TDependencyParentTypescript)[];
export type TTargetDependenciesTypeScript = {
  output: string;
  dependencies: TDependenciesTypeScript;
};
