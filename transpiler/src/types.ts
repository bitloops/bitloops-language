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
import { TBoundedContexts } from './ast/core/types.js';
import { TClassTypesValues } from './helpers/mappings.js';

// TODO this should be removed
export type TModule = {
  Props?: TProps;
  Controller?: TRESTController | TGraphQLController;
  UseCases?: TUseCase;
  ApplicationErrors?: TApplicationErrors; //TODO change
  DomainErrors?: TDomainErrors;
  RootEntities?: TRootEntity;
  Entity?: TEntity;
  ValueObject?: TValueObject;
  DTOs?: TDTO;
  Structs?: TStructDeclaration;
  Package?: TPackage;
  DomainRule?: TDomainRule;
  RepoPort?: TRepoPort;
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
  | 'Package'
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
  | 'TRootEntity'
  | 'TEntity'
  | 'TValueObject'
  | 'TDTOs'
  | 'TStruct' //TODO should we replace with TStructDeclaration/DTODeclaration
  | 'TPackages'
  | 'TDomainRule'
  | 'TRepoPort'
  | 'TRepoAdapters'
  | 'TReadModels';

export type TClassName = string;

export type TContextData = { boundedContext: string; module: string };

export type TBitloopsClasses =
  | TProps
  | TValueObject
  | TRESTController
  | TUseCase
  | TDomainError
  | TDTO
  | TStruct;

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
  } & TBitloopsPrimaryType;
};

/**
 * Props
 */
export type TPropsIdentifier = string;
export const PropsIdentifierKey = 'propsIdentifier';

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
export const ReadModelIdentifierKey = 'readModelIdentifier';
export const ReadModelKey = 'ReadModel';
export type TReadModel = {
  [ReadModelKey]: {
    [ReadModelIdentifierKey]: TReadModelIdentifier;
    [fieldsKey]: TVariables;
  };
};

export type TParameterType = TBitloopsPrimaryType;

export type TParameterIdentifier = string;
export type TParameter = {
  parameter: {
    value: TParameterIdentifier;
  } & TParameterType;
};

export type TDomainCreateParameter = {
  domainCreateParameter: {
    [PropsIdentifierKey]: TPropsIdentifier;
    value: TParameterIdentifier;
  };
};

export type TParameterList = {
  parameters: TParameter[];
};

export type TArgument = {
  argument: TExpression;
};

export type TArgumentList = {
  argumentList: TArgument[];
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
  [arrayPrimaryTypeKey]: TBitloopsPrimaryTypeValues;
};

export const bitloopsPrimaryTypeKey = 'type';
export type TBitloopsPrimaryTypeValues =
  | TBitloopsPrimitivesObject
  | TBitloopsBuiltInClassesObject
  | TBitloopsIdentifierObject
  | ArrayBitloopsPrimTypeObject;

export type TBitloopsPrimaryType = {
  [bitloopsPrimaryTypeKey]: TBitloopsPrimaryTypeValues;
};

export type TBackTickString = {
  backTickString: string;
  // TODO add support for inside expressions
};

export type TString = {
  string: string;
};

export type TDomainRule = {
  DomainRule: {
    domainRuleIdentifier: string;
    error: string;
    statements: TStatements;
    isBrokenIfCondition: TCondition;
  } & Partial<TParameterList>;
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

export type TDomainErrors = Record<string, TDomainError>;

export type TDomainError = {
  [DomainErrorKey]: TDomainErrorValue;
};

export type TDomainErrorValue = {
  [DomainErrorIdentifier]: TIdentifier;
} & TErrorMessage &
  TErrorId &
  Partial<TParameterList>;

export const ApplicationErrorKey = 'ApplicationError';
export const ApplicationErrorIdentifier = 'identifier';
export type TApplicationError = {
  [ApplicationErrorKey]: TApplicationErrorValue;
};

export type TApplicationErrorValue = {
  [ApplicationErrorIdentifier]: TIdentifier;
} & TErrorMessage &
  TErrorId &
  Partial<TParameterList>;

export type TApplicationErrors = Record<string, TApplicationError>;
export type TInstanceOf = {
  isInstanceOf: TExpression & { class: string };
};

export type TPropsEvaluation = {
  props: {
    fields: TEvaluationFields;
    [PropsIdentifierKey]: string;
  };
};

export type TGetClass = {
  getClass: TExpression;
};

export type TBuiltInClassEvaluation = {
  builtInClass: {
    className: string;
  } & TArgumentList;
};

// export type TCondition = {
//   evaluateTrue?: TEvaluation;
//   evaluateFalse?: TEvaluation;
// };
export type TEvaluationValues =
  | TStructEvaluation
  | TDTOEvaluation
  | TValueObjectEvaluation
  | TPropsEvaluation
  | TEntityEvaluation
  | TErrorEvaluation
  | TBuiltInClassEvaluation;

export type TMethodCallExpression = {
  methodCallExpression: TExpression & TArgumentList;
};

export type TEvaluation = {
  evaluation: TEvaluationValues;
};

export type TIfStatement = {
  ifStatement: {
    condition: TExpression;
    thenStatements: {
      statements: TStatements;
    };
    elseStatements?: {
      statements: TStatements;
    };
  };
};

export type TEvaluationField = {
  evaluationField: { identifier: string } & TExpression;
};
export type TEvaluationFields = TEvaluationField[];

export type TStructEvaluation = {
  struct: {
    fields: TEvaluationFields;
    [structIdentifierKey]: string;
  };
};

export type TDTOEvaluation = {
  dto: {
    fields: TEvaluationFields;
    [DTOIdentifierKey]: TDTOIdentifier;
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
  | TBackTickString // To  be removed?
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
  | TGetClass
  | TEnvironmentVariableExpression
  | TObjectLiteral
  | TLiteralExpression
  | TEnvironmentVariableExpression;
// TODO TLiteralExpression and TLiteral maybe need merge

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

export type TIntegerLiteralType = 'int32' | 'int64';
export type IntegerLiteral = {
  integerLiteral: {
    value: string;
    type: TIntegerLiteralType; //| 'uint32' | 'uint64';
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
  [returnOKKey]: TExpression | null;
};

export const returnErrorKey = 'returnError';
export type TReturnErrorStatement = {
  [returnErrorKey]: TExpression;
};

export type TConstDeclarationValue = {
  identifier: string;
} & Partial<TBitloopsPrimaryType> &
  TExpression;

export const constDeclarationKey = 'constDeclaration';
export type TConstDeclaration = {
  [constDeclarationKey]: TConstDeclarationValue;
};

export const variableDeclarationKey = 'variableDeclaration';
export type TVariableDeclaration = {
  [variableDeclarationKey]: {
    identifier: string;
  } & TBitloopsPrimaryType &
    TExpression;
};

export type TBreakStatement = {
  breakStatement: 'break';
};

export type TAppliedRule = {
  appliedRule: {
    domainRuleIdentifier: string;
  } & TArgumentList;
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
  | TConstDeclaration
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
  statements: TStatements;
} & TParameterList;

export type TDomainPrivateMethodValuesPrimaryReturnType = TBitloopsPrimaryType &
  TDomainPrivateMethodValues;

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
    statements: TStatements;
  } & TOkErrorReturnType &
    TParameterList;
};

export type TReturnOkType = {
  ok: TBitloopsPrimaryType;
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
    TDomainCreateParameter;
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

export const RootEntityKey = 'RootEntity';
export type TRootEntity = {
  [RootEntityKey]: {
    entityIdentifier: TEntityIdentifier;
    entityValues: TEntityValues;
  };
};

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
  statements: TStatements;
} & TOkErrorReturnType &
  Partial<TParameter>;

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
  } & TParameterList;
};

export const languageKey = 'language';
export type TLanguage = 'TypeScript' | 'Java'; //TODO add for for unknown language

export const configInvocationKey = 'configInvocation';
export type TConfigInvocation = {
  configInvocation: {
    language: TLanguage;
  };
};

export type TBaseControllerValues = TParameterList;

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
  boundedContext: string;
  module: string;
  packageValues: TPackagesMapping;
};

// TODO this should be removed
export type TSetupData = {
  controllers?: TControllers;
  useCases?: TUseCaseDefinition;
  useCaseDependencyInjections?: IUseCaseDependencyInjection[];
  language: string;
  servers?: TServers;
  routers?: TRouters;
  packages?: TPackagesSetup;
  repos?: TReposSetup;
};

export type TUseCaseDefinition = {
  useCaseDefinition: {
    identifier: TIdentifier;
  } & TUseCaseExpression;
};

export type TUseCaseExpression = {
  useCaseExpression: {
    [UseCaseIdentifierKey]: TUseCaseIdentifier;
  } & TArgumentList &
    TBoundedContextModule;
};

export type TBoundedContextModule = {
  boundedContextModule: {
    boundedContextName: TBoundedContextName;
    moduleName: TModuleName;
  };
};

export type TBoundedContextName = TWordsWithSpaces;

export type TModuleName = TWordsWithSpaces;

export type TWordsWithSpaces = {
  wordsWithSpaces: string;
};

export type TControllers = {
  boundedContext: string;
  module: string;
  controllerValues: TControllerOfModule;
};

export type TControllerOfModule = {
  [ControllerClassName: string]: TRestControllerDefinitions | TGraphQLControllerInstances;
};

export const repoSupportedTypes = ['DB.Postgres', 'DB.MySQL', 'DB.SQLite', 'DB.Mongo'] as const;
export type TRepoSupportedTypes = typeof repoSupportedTypes[number];

export type TReposSetup = {
  connections: {
    connectionName: string;
    connectionValues: TRepoConnectionInfo;
  }[];
  repoAdapters: {
    boundedContext: string;
    module: string;
    repoAdapterValues: TSetupRepoAdapters;
  };
};

type RepoAdapterName = string;
export type TSetupRepoAdapters = Record<RepoAdapterName, TRepoAdapterInfo>;

export type TRepoAdapters = Record<RepoAdapterName, TRepoAdapterInfo>;

export type TRepoConnectionInfo = {
  dbType: TRepoSupportedTypes;
  host: TExpression;
  port: TExpression;
  database: TExpression;
};

export type TRepoAdapterInfo = {
  dbType: TRepoSupportedTypes;
  repoPort: string;
  connection: TExpression; // Name of connection instance
  collection: TExpression;
  instanceIdentifier: string;
};

export enum ControllerTypeOfDefinition {
  REST = 'rest',
  GRAPHQL = 'graphql',
}

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

export type TServers = (TRESTServerInstance | TGraphQLServerInstance)[];

export type TServerType = 'REST.Fastify' | 'REST.Express' | 'GraphQL';
export type TRouterInstanceName = string;

export type TRouterPrefix = StringLiteral;
export type TRestServerInstanceRouters = TRestServerInstanceRouter[];
export type TRestServerInstanceRouter = {
  serverRoute: {
    identifier: TRouterInstanceName;
    routerPrefix: TRouterPrefix;
  };
};

export type TRestServerPort = TExpression;

export type TAPIPrefix = StringLiteral;

export type TRestServerOptions = {
  apiPrefix?: TAPIPrefix;
  restServerPort: TRestServerPort;
  serverType: TServerType;
};

export type TRESTServerInstance = {
  restServer: {
    serverOptions: TRestServerOptions;
    serverRoutes: TRestServerInstanceRouters;
  };
};

export type TGraphQLServerInstance = {
  port: TExpression;
  resolvers: TControllerResolverBind[];
  serverType: TServerType;
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

export const methodDefinitionListKey = 'methodDefinitionList';
export type TDefinitionMethods = { [methodDefinitionListKey]: TDefinitionMethodInfo[] };

export const PackagePortIdentifierKey = 'PackagePortIdentifier';
export type TPackagePortIdentifier = string;
export type TPackagePort = {
  [PackagePortIdentifierKey]: TPackagePortIdentifier;
} & TDefinitionMethods;

export type TDefinitionMethodInfo = {
  methodDefinition: {
    identifier: TIdentifier;
  } & TBitloopsPrimaryType &
    TParameterList;
};

export const PackageIdentifierKey = 'PackageIdentifier';
export type TPackageIdentifier = string;
export type TPackage = {
  Package: {
    [PackageIdentifierKey]: TPackageIdentifier;
    port: TPackagePort;
    adapters: TPackageAdapterNames;
  };
};

export const repoPortKey = 'RepoPort';
export type TExtendsRepoPorts = { [identifierKey]: TIdentifier }[];

export type TRepoPortIdentifier = string;
export const repoPortIdentifierKey = 'repoPortIdentifier';
export type TAggregateRepoPort = {
  [repoPortKey]: {
    [repoPortIdentifierKey]: TRepoPortIdentifier;
    entityIdentifier: string;
    extendsRepoPorts: TExtendsRepoPorts;
    methodDefinitionList?: TDefinitionMethodInfo[];
  };
};

export type TReadModelRepoPort = {
  [repoPortKey]: {
    [repoPortIdentifierKey]: TRepoPortIdentifier;
    readModelIdentifier: string;
    extendsRepoPorts: TExtendsRepoPorts;
    methodDefinitionList?: TDefinitionMethodInfo[];
  };
};

export type TRepoPort = TAggregateRepoPort | TReadModelRepoPort;

export type TPackageAdapterNames = string[];

export type TObjectLiteral = {
  objectLiteral: {
    name: string;
    expression: TExpression;
  }[];
};

export type TEnvironmentVariableExpression = {
  environmentVariable: {
    identifier: string;
    defaultValue?: TLiteralValues;
  };
};

export type TLiteralExpressionType = TBitloopsPrimitives | 'number';

export type TLiteralExpression = {
  literal: {
    type: TLiteralExpressionType;
    value: string;
  };
};

export type TIdentifierExpression = {
  identifier: {
    value: string;
  };
};

// // export type TLogicalSingleExpression = {
// //   logicalExpression:
// //     | TNotSetupExpression
// //     | TAndSingleExpression
// //     | TOrSingleExpression
// //     | TXorSingleExpression;
// // };

// // export type TNotSetupExpression = {
// //   notExpression: TSetupExpression;
// // };

// // export type TAndSingleExpression = {
// //   andExpression: {
// //     left: TSetupExpression;
// //     right: TSetupExpression;
// //   };
// // };

export type TErrorEvaluation = {
  errorEvaluation: {
    error: string;
  } & Partial<TArgumentList>;
};

// // export type TOrSingleExpression = {
// //   orExpression: {
// //     left: TSetupExpression;
// //     right: TSetupExpression;
// //   };
// // };

// // export type TXorSingleExpression = {
// //   xorExpression: {
// //     left: TSetupExpression;
// //     right: TSetupExpression;
// //   };
// // };

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
