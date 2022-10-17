import { getNextTypesSubtree, getNextTypesValue, getNextTypesChildren } from '../../utils/index.js';
import { getBitloopsModel, TSourceElementContext } from '../BitloopsParser.js';
import {
  TGraphQLControllerExecute,
  TGraphQLControllerValues,
  TRESTControllerValues,
} from '../../../types.js';

enum controllers {
  RESTController = 'RESTController',
  GraphQLController = 'GraphQLController',
}

const controllerDeclaration = (children: any[]): any => {
  const controllerIdentifier = children[0].value;
  switch (controllerIdentifier) {
    case controllers.RESTController:
      return restController(children);
    case controllers.GraphQLController:
      return graphQLController(children);
  }
};

const restController = (children: any[]): any => {
  const controllerName = getBitloopsModel(children[1]).value;
  const controllerParameters = getBitloopsModel(children[2]);
  const methodExecuteDeclaration = getBitloopsModel(children[4]);
  const controllerExecuteDeclaration = getBitloopsModel(children[5]);
  const subModel: TRESTControllerValues = {
    ...controllerExecuteDeclaration,
    ...methodExecuteDeclaration,
    parameterDependencies: controllerParameters,
  };
  return {
    key: controllerName,
    subModel,
  };
};

const graphQLController = (children: any[]): any => {
  const subtree = {
    children,
    numOfChildren: children.length,
  };
  const controllerName = getBitloopsModel(children[1]).value;

  const formalParameterList = getNextTypesSubtree('formalParameterList', subtree);
  const controllerParameters = getBitloopsModel(formalParameterList);

  const graphQLResolverOptions = getNextTypesSubtree('graphQLResolverOptions', subtree);
  // console.log('graphQLResolverOptions', graphQLResolverOptions);

  const graphQLControllerExecuteDeclaration = getNextTypesSubtree(
    'graphQLControllerExecuteDeclaration',
    subtree,
  );
  // console.log('graphQLControllerExecuteDeclaration', graphQLControllerExecuteDeclaration);
  const controllerExecuteDeclaration = getGraphQLControllerExecuteDeclaration(
    graphQLControllerExecuteDeclaration,
  );
  // console.log('controllerExecuteDeclaration:', controllerExecuteDeclaration);
  const parsedResolverOptions = getGraphQLResolverOptions(
    graphQLResolverOptions,
    controllerName,
    controllerExecuteDeclaration.returnType,
  );
  const subModel: TGraphQLControllerValues = {
    execute: controllerExecuteDeclaration,
    ...parsedResolverOptions,
    parameterDependencies: controllerParameters,
    type: 'graphql',
  };
  return {
    key: controllerName,
    subModel,
  };
};

const graphQLOperationsMapping = {
  'GraphQL.Operations.Query': 'query',
  'GraphQL.Operations.Mutation': 'mutation',
  'GraphQL.Operations.Subscription': 'subscription',
};

const getGraphQLResolverOptions = (
  resolverOptions: any,
  controllerName: string,
  returnType: string,
): any => {
  // console.log('resolverOptions::', resolverOptions);
  const suffixLength = 'Controller'.length;
  const operationNamePascal = controllerName.substring(0, controllerName.length - suffixLength);
  const operationName = operationNamePascal.charAt(0).toLowerCase() + operationNamePascal.slice(1);

  const rawOperationType = getNextTypesValue('graphQLOperation', resolverOptions);
  // console.log('rawOperationType::', rawOperationType);
  const operationType = graphQLOperationsMapping[rawOperationType];
  const inputType = getNextTypesValue('graphQLResolverInputType', resolverOptions);
  return {
    operationType,
    operationName,
    inputType,
    outputType: returnType,
  };
};

export const getGraphQLControllerExecuteDeclaration = (tree: any): TGraphQLControllerExecute => {
  const dependencies: [string] = [
    getNextTypesChildren('graphQLControllerParameters', tree)[0].value,
  ];
  const returnType = getNextTypesValue('graphQLControllerReturnType', tree);
  // Pass returnType to function statements
  const contextSourceElement: TSourceElementContext = { returnType };
  const functionBody = getNextTypesSubtree('functionBody', tree);
  // console.log('functionBody', functionBody);
  const statements = functionBody.value
    ? getBitloopsModel(functionBody, contextSourceElement).statements
    : [];
  return { dependencies, returnType, statements };
};

export { controllerDeclaration };
