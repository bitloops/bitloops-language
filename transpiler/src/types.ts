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

export type TClassName = string;

export type TContextData = { boundedContext: string; module: string };

export const fieldsKey = 'fields';
export const evaluationFieldsKey = 'fields';
export type TVariables = {
  [fieldsKey]: TVariable[];
};

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

export type TPropsValues = {
  [PropsIdentifierKey]: TPropsIdentifier;
} & TVariables;

export type TProps = {
  [PropsKey]: TPropsValues;
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
  } & TVariables;
};

export type TParameterType = TBitloopsPrimaryType;

export type TParameterIdentifier = string;
export type TParameter = {
  parameter: {
    value: TParameterIdentifier;
  } & TParameterType;
};

// props, TodoProps
export type TDomainCreateParameter = {
  domainCreateParameter: {
    [identifierKey]: TIdentifier;
    parameterType: TPropsIdentifier;
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

export type TInstanceOf = {
  isInstanceOf: TExpression & { class: string };
};

export type TPropsEvaluation = {
  props: {
    [PropsIdentifierKey]: string;
  } & TEvaluationFields;
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
  | TCorsOptionsEvaluation
  | TDTOEvaluation
  | TValueObjectEvaluation
  | TPropsEvaluation
  | TEntityEvaluation
  | TErrorEvaluation
  | TBuiltInClassEvaluation
  | TBuiltInFunctionValues;

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
export type TEvaluationFields = {
  [evaluationFieldsKey]: TEvaluationField[];
};

export type TCorsOptionsEvaluation = {
  corsOptions: TEvaluationFields;
};

export type TStructEvaluation = {
  struct: {
    [structIdentifierKey]: string;
  } & TEvaluationFields;
};

export type TDTOEvaluation = {
  dto: {
    [DTOIdentifierKey]: TDTOIdentifier;
  } & TEvaluationFields;
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

export type TDomainEvaluationExpression = TEvaluationFields | TExpression;

export const expressionKey = 'expression';
export type TExpression = {
  [expressionKey]: TExpressionValues;
};

export type TExpressionValues =
  | TEvaluation
  | TLogicalExpression
  | TMultiplicativeExpression
  | TAdditiveExpression
  | TRelationalExpression
  | TEqualityExpression
  | TParenthesizedExpression
  | TArrayLiteralExpression
  | TToStringExpression
  | TLiteral
  | TIdentifierExpression
  | TMethodCallExpression
  | TThisExpression
  | TMemberDotExpression
  | TAssignmentExpression
  | TInstanceOf
  | TGetClass
  | TEnvironmentVariableExpression
  | TObjectLiteral;

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

export type TIdentifierExpression = {
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
  } & TVariables;
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
  } & TVariables;
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
export type TLanguage = 'TypeScript' | 'Java'; //TODO add for unknown languages

export const configInvocationKey = 'configInvocation';
export type TConfigInvocation = {
  [configInvocationKey]: {
    [languageKey]: TLanguage;
  };
};

export const packageAdapterIdentifierKey = 'packageAdapterIdentifier';
export type TPackageAdapterIdentifier = string;

export const packageConcretionKey = 'packageConcretion';
export type TPackageConcretion = {
  [packageConcretionKey]: {
    [PackagePortIdentifierKey]: TPackagePortIdentifier;
    [packageAdapterIdentifierKey]: TPackageAdapterIdentifier;
  } & TBoundedContextModule;
};

export const repoAdapterClassNameKey = 'repoAdapterClassName';
export type TRepoAdapterClassName = {
  [repoAdapterClassNameKey]: string;
};

export type TRepoDatabaseType = {
  dbType: TRepoSupportedTypes;
};

export const repoAdapterOptionsKey = 'repoAdapterOptions';
export type TRepoAdapterOptions = {
  [repoAdapterOptionsKey]: TEvaluationFields;
};

export const concretedRepoPortKey = 'concretedRepoPort';
export type TConcretedRepoPort = string;

export type TRepoAdapterConnectionInfo = TRepoConnectionExpression;
export const repoAdapterExpressionKey = 'repoAdapterExpression';
export type TRepoAdapterExpression = {
  [repoAdapterExpressionKey]: {
    [concretedRepoPortKey]: TConcretedRepoPort;
  } & TRepoAdapterClassName &
    TRepoDatabaseType &
    TRepoAdapterOptions &
    TBoundedContextModule &
    TRepoAdapterConnectionInfo;
};

export const repoAdapterKey = 'repoAdapter';
export type TRepoAdapter = {
  [repoAdapterKey]: {
    [identifierKey]: TIdentifier;
  } & TRepoAdapterExpression;
};

export const setupRepoAdapterDefinitionKey = 'setupRepoAdapterDefinition';
export type TSetupRepoAdapterDefinition = {
  [setupRepoAdapterDefinitionKey]: {
    [identifierKey]: TIdentifier;
  } & TRepoAdapterExpression;
};

export type TBaseControllerValues = TParameterList;

export type TRestMethods = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'OPTIONS';

export type TRESTControllerIdentifier = string;
export type TRESTController = {
  RESTController: TBaseControllerValues & {
    serverType?: TServerType;
    RESTControllerIdentifier: TRESTControllerIdentifier;
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

export type TGraphQLOperation = 'query' | 'mutation' | 'subscription';

export type TGraphQLController = {
  GraphQLController: TBaseControllerValues & {
    graphQLControllerIdentifier: GraphQLControllerIdentifier;
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

export type TRouterName = string;

export interface IRouterRoute {
  path: string;
  method: string;
  controller: string;
  useCaseName: string;
}

export type TRouterDefinition = {
  routerDefinition: {
    identifier: TIdentifier;
  } & TRouterExpression;
};

export type TRestRouter = 'RESTRouter';
export type TRouterArguments = {
  routerArguments: { serverType: TServerType };
};
export type THTTPMethodVerb = 'Get' | 'Put' | 'Post' | 'Delete' | 'Patch' | 'Options';

export type TControllerInstanceName = string;

export type TRouterController = {
  routerController: {
    httpMethodVerb: THTTPMethodVerb;
    RESTControllerIdentifier: TRESTControllerIdentifier;
    controllerInstanceName: TControllerInstanceName;
  } & StringLiteral &
    TBoundedContextModule &
    TArgumentList;
};

export type TRouterControllers = {
  routerControllers: TRouterController[];
};

export type TRouterExpression = {
  routerExpression: {
    restRouter: TRestRouter;
  } & TRouterArguments &
    TRouterControllers;
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

export const RepoConnectionDefinitionKey = 'RepoConnectionDefinition';
export type TRepoConnectionDefinition = {
  [RepoConnectionDefinitionKey]: {
    identifier: TIdentifier;
  } & TRepoConnectionExpression;
};

export const RepoConnectionExpressionKey = 'RepoConnectionExpression';
export type TRepoConnectionExpression = {
  [RepoConnectionExpressionKey]: {
    dbType: TRepoSupportedTypes;
  } & TRepoConnectionOptions;
};

export const RepoConnectionOptionsKey = 'options';
export type TRepoConnectionOptions = {
  [RepoConnectionOptionsKey]: TEvaluationFields;
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

export const repoSupportedTypes = ['DB.Postgres', 'DB.MySQL', 'DB.SQLite', 'DB.Mongo'] as const;
export type TRepoSupportedTypes = typeof repoSupportedTypes[number];

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

export type TRESTServerInstance = {
  restServer: {
    serverOptions: TEvaluationFields;
    serverRoutes: TRestServerInstanceRouters;
  };
};

export const GraphQLServerInstanceKey = 'graphQLServer';
export type TGraphQLServerInstance = {
  [GraphQLServerInstanceKey]: {
    [ControllerResolversKey]: TControllerResolvers;
  } & TGraphQLServerOptions;
};

export const ControllerResolverKey = 'controllerResolver';
export type TControllerResolver = {
  [ControllerResolverKey]: {
    graphQLControllerIdentifier: GraphQLControllerIdentifier;
    controllerInstanceName: TControllerInstanceName;
  } & TBoundedContextModule &
    TArgumentList;
};

export const ControllerResolversKey = 'controllerResolvers';
export type TControllerResolvers = TControllerResolver[];

export const GraphQLServerOptionsKey = 'graphQLServerOptions';
export type TGraphQLServerOptions = {
  [GraphQLServerOptionsKey]: TEvaluationFields;
};

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

export type TErrorEvaluation = {
  errorEvaluation: {
    error: string;
  } & Partial<TArgumentList>;
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

export enum RepoConnectionOptions {
  host = 'host',
  port = 'port',
  database = 'database',
}

export enum RepoAdapterOptions {
  connection = 'connection',
  collection = 'collection',
}

export enum RestServerOptions {
  server = 'server',
  apiPrefix = 'apiPrefix',
  port = 'port',
}

export type TCommandIdentifier = string;
const commandKey = 'command';
export const commandIdentifierKey = 'commandIdentifier';

export type TCommand = {
  [commandKey]: {
    [commandIdentifierKey]: TCommandIdentifier;
    commandTopic: TExpression;
  } & TVariables;
};
