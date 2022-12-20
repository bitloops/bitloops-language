import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import {
  TDomainErrorValue,
  TApplicationErrorValue,
  TTargetDependenciesTypeScript,
  TExpression,
  TParameter,
} from '../../../../../types.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

export const getErrorValues = (
  error: TDomainErrorValue | TApplicationErrorValue,
): {
  messageResult: TTargetDependenciesTypeScript;
  errorIdText: TTargetDependenciesTypeScript;
  parametersResult: TTargetDependenciesTypeScript;
} => {
  const domainErrorValue = error as TDomainErrorValue;
  const applicationErrorValue = error as TDomainErrorValue;

  let message: TExpression;
  let errorId: TExpression;
  let parameters: TParameter[];

  if (domainErrorValue) {
    message = domainErrorValue.message;
    errorId = domainErrorValue.errorId;
    parameters = domainErrorValue.parameters;
  } else if (applicationErrorValue) {
    message = applicationErrorValue.message;
    errorId = applicationErrorValue.errorId;
    parameters = applicationErrorValue.parameters;
  }

  const messageExpression = message.expression;
  const messageResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpressionValues,
    value: messageExpression,
  });
  const errorIdRegularEval = errorId.expression;

  const errorIdText = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpressionValues,
    value: errorIdRegularEval,
  });

  const parametersResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterList,
    value: { parameters } ?? [],
  });

  return {
    messageResult,
    errorIdText,
    parametersResult,
  };
};
