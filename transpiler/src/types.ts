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
import { ArrayUtils } from './utils/ArrayUtils.js';

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
  } & Partial<TParameterType>;
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

export const bitloopsPrimitivesObj = ArrayUtils.toObject<TBitloopsPrimitives>([
  ...bitloopsPrimitives,
]);

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

export const builtInClassTypeKey = 'builtInClassType';
export type TBitloopsBuiltInClassesObject = {
  [builtInClassTypeKey]: TBitloopsBuiltInClasses;
};

export type TStandardValueType = {
  standardValueType: StandardVOType;
};

export type TStandardValueTypeValues = StandardVOType; // | StandardRuleType | StandardEnumType; etc(extendable)

export type TStandardVO = string;
export type StandardVOType = {
  standardVOType: TStandardVO;
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
  | ArrayBitloopsPrimTypeObject
  | TStandardValueType;

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
  isInstanceOf: TExpression & { class: TBitloopsPrimaryType };
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

export type TPortToken = {
  portIdentifier: string;
};

export type TDomainServiceEvaluation = {
  domainService: {
    identifier: string;
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
  | TIntegrationEventEvaluation
  | TEntityConstructorEvaluation
  | TErrorEvaluation
  | TBuiltInClassEvaluation
  | TBuiltInFunctionValues
  | TCommandEvaluation
  | TQueryEvaluation
  | TDomainEventEvaluation
  | TStandardVOEvaluation
  | TDomainServiceEvaluation
  | TReadModelEvaluation
  | TPackageEvaluation;

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

export type TCommandEvaluation = {
  command: {
    [identifierKey]: TIdentifier;
  } & Partial<TEvaluationFields>;
};

export type TQueryEvaluation = {
  query: {
    [identifierKey]: TIdentifier;
  } & Partial<TEvaluationFields>;
};

export type TDomainEventEvaluation = {
  domainEvent: {
    [DomainEventIdentifierKey]: TIdentifier;
  } & Partial<TEvaluationFields>;
};

export type TStandardVOEvaluation = {
  standardVO: {
    [identifierKey]: TIdentifier;
  } & TEvaluationFields;
};

export type TValueObjectEvaluation = {
  valueObject: TDomainEvaluation;
};

export type TEntityEvaluation = {
  entity: TDomainEvaluation;
};
export type TEntityConstructorEvaluation = {
  entityConstructor: TDomainEvaluation;
};

export type TIntegrationEventEvaluation = {
  integrationEvent: {
    props: TDomainEvaluationExpression;
    integrationEventIdentifier: TIntegrationEventIdentifier;
  };
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
  | { valueObjectIdentifier: TValueObjectIdentifier }
  | { readModelIdentifier: TReadModelIdentifier };

export type TReadModelEvaluation = {
  readModelEvaluation: TDomainEvaluation;
};
export type TPackageEvaluation = {
  packageEvaluation: {
    identifier: string;
    methodName: string;
  } & TArgumentList;
};

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
  | TObjectLiteral
  | TIfErrorExpression
  | TAnonymousFunction;

export type TIfErrorExpression = {
  ifErrorExpression: TExpression & Partial<TAnonymousFunction>;
};

export type TStatementsObj = { statements: TStatements };

export type TAnonymousFunction = {
  anonymousFunction: {
    arrowFunctionBody: TReturnStatement | TStatementsObj;
  } & TParameterList;
};

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
  | TemplateStringLiteral
  | TRegexLiteral;

export type StringLiteral = {
  stringLiteral: string;
};

export type TRegexLiteral = {
  regexLiteral: string;
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
  return: TExpression | null;
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
    Partial<TExpression>;
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

export type TThisIdentifier = string;

export type TAddDomainEvent = {
  addDomainEvent: {
    identifier?: TIdentifier;
    thisIdentifier?: TThisIdentifier;
  } & TExpression;
};

export type TBuiltInFunction = {
  builtInFunction: TBuiltInFunctionValues;
};
export type TBuiltInFunctionValues = TApplyRules | TAddDomainEvent;

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

export type TPrivateMethods = TPrivateMethod[];

type TStatic = {
  static: boolean;
};

export type TPrivateMethodValues = {
  identifier: TIdentifier;
  statements: TStatements;
} & TParameterList &
  TStatic;

export type TPrivateMethodValuesPrimaryReturnType = TBitloopsPrimaryType & TPrivateMethodValues;

export type TPrivateMethodValuesOkErrorReturnType = TPrivateMethodValues & TOkErrorReturnType;

export type TPrivateMethod = {
  privateMethod: TPrivateMethodValuesPrimaryReturnType | TPrivateMethodValuesOkErrorReturnType;
};

export type TPublicMethods = TPublicMethod[];

export type TPublicMethod = {
  publicMethod: {
    identifier: TIdentifier;
    statements: TStatements;
  } & TOkErrorReturnType &
    TParameterList &
    TStatic;
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
    TParameter;
};

export type TValueObjectCreate = TDomainCreateMethod;

export type TValueObjectIdentifier = string;

export type TValueObject = {
  ValueObject: {
    valueObjectIdentifier: TValueObjectIdentifier;
    constants?: TConstDeclaration[]; //TConstantVariable[];
    privateMethods?: TPrivateMethods;
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
  publicMethods?: TPublicMethods;
  privateMethods?: TPrivateMethods;
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

export const languageKey = 'language';
export type TLanguage = 'TypeScript-Nest' | 'TypeScript';

export const configInvocationKey = 'configInvocation';
export type TConfigInvocation = {
  [configInvocationKey]: {
    [languageKey]: TLanguage;
  };
};

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

export const methodDefinitionListKey = 'methodDefinitionList';
export type TDefinitionMethods = { [methodDefinitionListKey]: TDefinitionMethodInfo[] };

export const PackagePortIdentifierKey = 'PackagePortIdentifier';
export type TPackagePortIdentifier = string;
export const PackagePortKey = 'PackagePort';
export type TPackagePort = {
  [PackagePortKey]: {
    [PackagePortIdentifierKey]: TPackagePortIdentifier;
  } & TDefinitionMethods;
};

export type TDefinitionMethodValues = {
  identifier: TIdentifier;
} & TParameterList;

export type TDefinitionMethodPrimaryReturnType = TDefinitionMethodValues & TBitloopsPrimaryType;

export type TDefinitionMethodOkErrorReturnType = TDefinitionMethodValues & TOkErrorReturnType;

export type TDefinitionMethodInfo = {
  methodDefinition: TDefinitionMethodPrimaryReturnType | TDefinitionMethodOkErrorReturnType;
};

export const ServicePortIdentifierKey = 'ServicePortIdentifier';
export type TServicePortIdentifier = string;
export type TServicePort = {
  ServicePort: {
    [ServicePortIdentifierKey]: TServicePortIdentifier;
  } & TDefinitionMethods;
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
  contextInfo?: TContextData;
};

export type TDependencyParentTypescript = TDependencyTypescript & {
  from: string;
};

export type TDependenciesTypeScript = (TDependencyChildTypescript | TDependencyParentTypescript)[];
export type TTargetDependenciesTypeScript = {
  output: string;
  dependencies: TDependenciesTypeScript;
};

export type TCommandIdentifier = TIdentifier;
export type TCommandTopicIdentifier = TIdentifier;
export const commandKey = 'command';

export type TCommand = {
  [commandKey]: {
    [identifierKey]: TCommandIdentifier;
  } & TVariables;
};

export const queryKey = 'query';
export type TQueryIdentifier = TIdentifier;
export type TQuery = {
  [queryKey]: {
    [identifierKey]: TQueryIdentifier;
  } & Partial<TVariables>;
};

export const commandHandlerKey = 'commandHandler';
export type TCommandHandlerIdentifier = TIdentifier;
export type TCommandHandler = {
  [commandHandlerKey]: {
    [identifierKey]: TCommandHandlerIdentifier;
    execute: TExecute;
  } & TParameterList;
};

export const queryHandlerKey = 'queryHandler';
export type TQueryHandlerIdentifier = TIdentifier;

export type TQueryHandler = {
  [queryHandlerKey]: {
    [identifierKey]: TQueryHandlerIdentifier;
    execute: TExecute;
  } & TParameterList;
};

// DomainEventHandler & IntegrationEventHandler
export type TEventHandlerBusDependencies = {
  eventHandlerBusDependencies: {
    commandBus: boolean;
    queryBus: boolean;
    integrationEventBus: boolean;
    pubSubIntegrationEventBus: boolean;
  };
};

export type TIntegrationVersionMappers = {
  integrationVersionMappers: TIntegrationVersionMapper[];
};

export type TIntegrationVersionMapper = {
  integrationVersionMapper: {
    statements: TStatements;
    [structIdentifierKey]: TStructIdentifier;
  } & StringLiteral;
};

export type TIntegrationEventIdentifier = string;
export type TIntegrationEvent = {
  IntegrationEvent: {
    integrationEventIdentifier: TIntegrationEventIdentifier;
  } & TIntegrationVersionMappers &
    TParameter;
};
export const DomainEventIdentifierKey = 'DomainEventIdentifier';

export type TDomainEventIdentifier = string;

export type TDomainEvent = {
  domainEvent: {
    [DomainEventIdentifierKey]: TDomainEventIdentifier;
    entityIdentifier: TEntityIdentifier;
  } & Partial<TVariables>;
};

type TDomainEventHandlerIdentifier = string;

export type TDomainEventHandler = {
  domainEventHandler: {
    domainEventHandlerIdentifier: TDomainEventHandlerIdentifier;
    handle: THandle;
  } & TParameterList &
    TEventHandlerBusDependencies;
};

//TODO see if we can merge them
export type THandle = TExecute;

export type TIntegrationEventHandlerHandleMethod = {
  integrationEventHandlerHandleMethod: {
    statements: TStatements;
  } & TOkErrorReturnType &
    TIntegrationEventParameter;
};

export type TIntegrationEventParameter = {
  integrationEventParameter: {
    value: TParameterIdentifier;
    integrationEventIdentifier: TIntegrationEventIdentifier;
  } & TBoundedContextModule;
};

type TIntegrationEventHandlerIdentifier = string;
export type TIntegrationEventHandler = {
  integrationEventHandler: {
    integrationEventHandlerIdentifier: TIntegrationEventHandlerIdentifier;
  } & TParameterList &
    TEventHandlerBusDependencies &
    TEvaluationField &
    TIntegrationEventHandlerHandleMethod;
};

export enum IntegrationEventHandlerOptions {
  eventVersion = 'eventVersion',
}

export const domainServiceKey = 'domainService';
export type TDomainService = {
  [domainServiceKey]: {
    identifier: TIdentifier;
    constants?: TConstDeclaration[];
    publicMethods: TPublicMethods;
    privateMethods?: TPrivateMethods;
  } & TParameterList;
};
