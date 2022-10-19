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
import { isLanguageSupported, SupportedLanguages } from '../../../helpers/supportedLanguages.js';
import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import {
  argumentDependenciesToTargetLanguage,
  argumentDependencyToTargetLanguage,
} from './components/dependencies/argument.js';
import {
  parameterDependenciesToTargetLanguage,
  parameterDependencyToTargetLanguage,
} from './components/dependencies/index.js';
import { propsToTargetLanguage, propsValuesToTargetLanguage } from './components/props/index.js';
import { constDecompositionToTargetLanguage } from './components/statements/constDecomposition.js';
import { constDeclarationToTargetLanguage } from './components/statements/constDeclaration.js';
import { classInstantiationToTargetLanguage } from './components/statements/expression/classInstantiation.js';
import { conditionToTargetLanguage } from './components/statements/expression/condition.js';
import { getClassToTargetLanguage } from './components/statements/expression/evaluation/getClass.js';
import { evaluationToTargetLanguage } from './components/statements/expression/evaluation/index.js';
import {
  instanceOfToTargetLanguage,
  notInstanceOfToTargetLanguage,
} from './components/statements/expression/evaluation/instance.js';
import { regularEvaluationToTargetLanguage } from './components/statements/expression/evaluation/regularEvaluation.js';
import { expressionToTargetLanguage } from './components/statements/expression/index.js';
import { expressionValuesToTargetLanguage } from './components/statements/expression/expressionValues.js';
import { structToTargetLanguage } from './components/statements/expression/evaluation/struct.js';
import {
  returnErrorToTargetLanguage,
  returnOkToTargetLanguage,
  returnToTargetLanguage,
} from './components/statements/return.js';
import {
  defaultSwitchCaseToTargetLanguage,
  regularSwitchCaseToTargetLanguage,
} from './components/statements/switch/case.js';
import {
  statementsToTargetLanguage,
  statementsWithoutThisToTargetLanguage,
  statementToTargetLanguage,
} from './components/statements/index.js';
import { ifStatementToTargetLanguage } from './components/statements/ifBlock/ifStatement.js';
import {
  variablesToTargetLanguage,
  variableToTargetLanguage,
} from './components/variables/index.js';
import { DTOToTargetLanguage, DTOValuesToTargetLanguage } from './components/DTO/index.js';
import { switchStatementToTargetLanguage } from './components/statements/switch/index.js';
import { breakStmtToTargetLanguage } from './components/statements/break.js';
import { okErrorReturnTypeToTargetLanguage } from './components/okkErrorReturnType.js';
import { valueObjectsToTargetLanguage } from './components/valueObjects/index.js';
import { useCaseToTargetLanguage } from './components/useCase/index.js';
import { controllersToTargetLanguage } from './components/controllers/index.js';
import { restControllersToTargetLanguage } from './components/controllers/rest/index.js';
import {
  backTickStringToTargetLanguage,
  stringToTargetLanguage,
} from './components/strings/index.js';
import { domainErrorsToTargetLanguage } from './components/domainErrors/index.js';
import { primitiveEvaluationToTargetLanguage } from './components/primitiveEvaluator/index.js';
import { graphQLControllersToTargetLanguage } from './components/controllers/graphql/index.js';
import { graphQLSetupDataToTargetLanguage } from '../setup/graphql/index.js'; // TODO check this
import { applicationErrorsToTargetLanguage } from './components/applicationErrors/index.js';
import {
  structDeclarationToTargetLanguage,
  structDeclarationValuesToTargetLanguage,
} from './components/structDeclaration/index.js';
import { DTOEvaluationToTargetLanguage } from './components/statements/expression/evaluation/dtoEvaluation.js';
import {
  definitionMethodInfoToTargetLanguage,
  definitionMethodsToTargetLanguage,
} from './components/definitionMethods/index.js';
import { returnTypeToDefinitionLanguage } from './components/returnType/index.js';
import { packagePortToTargetLanguage } from './components/packagePort/index.js';
import { packagesToTargetLanguage } from './components/packages/index.js';
import { domainCreate, domainCreateEntity } from './components/domain/index.js';
import { valueObjectEvaluationToTargetLanguage } from './components/statements/expression/evaluation/valueObjectEvaluation.js';
import { evaluationFieldsToTargetLanguage } from './components/statements/expression/evaluation/evaluationFields.js';
import { domainEvaluationToTargetLanguage } from './components/statements/expression/evaluation/domainEvaluation.js';
import { entityEvaluationToTargetLanguage } from './components/statements/expression/evaluation/entityEvaluation.js';
import { entitiesToTargetLanguage } from './components/entity/index.js';
import { thisDeclarationToTargetLanguage } from './components/statements/thisDeclaration.js';
import { repoPortToTargetLanguage } from './components/repo/repoPort.js';
import {
  additiveOperatorToTargetLanguage,
  equalityOperatorToTargetLanguage,
  multiplicativeOperatorToTargetLanguage,
  relationalOperatorToTargetLanguage,
} from './components/statements/expression/operators.js';
import { multiplicativeExpressionToTargetLanguage } from './components/statements/expression/multiplicativeExpression.js';
import { additiveExpressionToTargetLanguage } from './components/statements/expression/additiveExpression.js';
import { relationalExpressionToTargetLanguage } from './components/statements/expression/relationalExpression.js';
import { equalityExpressionToTargetLanguage } from './components/statements/expression/equalityExpression.js';
import {
  andExpressionToTargetLanguage,
  logicalExpressionToTargetLanguage,
  notExpressionToTargetLanguage,
  orExpressionToTargetLanguage,
  xorExpressionToTargetLanguage,
} from './components/statements/expression/logicalExpressions.js';
import { parenthesizedExpressionToTargetLanguage } from './components/statements/expression/parenthesizedExpression.js';
import { variableDeclarationToTargetLanguage } from './components/statements/variableDeclaration.js';
import { repoAdapterToTargetLanguage } from './components/repo/repoAdapter.js';
import { singleExpressionToTargetLanguage } from '../setup/single-expression/index.js'; // TODO check this
import { ISetupData, TBoundedContexts, TContextData } from '../../../types.js';

const modelToTargetLanguage = (props: {
  type: string;
  value: any;
  targetLanguage?: string;
  contextData?: TContextData;
  setupData?: ISetupData;
  model?: TBoundedContexts;
}): string => {
  const { type, value, contextData, setupData, model } = props;
  let targetLanguage;
  if (!props.targetLanguage) {
    targetLanguage = SupportedLanguages.TypeScript;
  } else {
    targetLanguage = props.targetLanguage;
  }

  if (!isLanguageSupported(targetLanguage)) {
    throw new Error(`Language ${targetLanguage} is not supported`);
  }

  let res: string;
  switch (type) {
    case BitloopsTypesMapping.TStatement: {
      res = statementToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TStatements: {
      res = statementsToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TStatementsWithoutThis: {
      res = statementsWithoutThisToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TVariable: {
      res = variableToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TVariables: {
      res = variablesToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TProps: {
      res = propsToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TPropsValues: {
      res = propsValuesToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TInstanceOf: {
      res = instanceOfToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TNotInstanceOf: {
      res = notInstanceOfToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TRegularEvaluation: {
      res = regularEvaluationToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TEvaluation: {
      res = evaluationToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TArgumentDependency: {
      res = argumentDependencyToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TArgumentDependencies: {
      res = argumentDependenciesToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TClassInstantiation: {
      res = classInstantiationToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TGetClass: {
      res = getClassToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TStructEvaluation: {
      res = structToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TStructs: {
      res = structDeclarationToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TStructDeclaration: {
      res = structDeclarationValuesToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TExpression: {
      res = expressionToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TExpressionValues: {
      res = expressionValuesToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TParameterDependency: {
      res = parameterDependencyToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TParameterDependencies: {
      res = parameterDependenciesToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TCondition: {
      res = conditionToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TReturnStatement: {
      res = returnToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TReturnOKStatement: {
      res = returnOkToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TReturnErrorStatement: {
      res = returnErrorToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TConstDecomposition: {
      res = constDecompositionToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TConstDeclaration: {
      res = constDeclarationToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TThisDeclaration: {
      res = thisDeclarationToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TDefaultCase: {
      res = defaultSwitchCaseToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TIfStatement: {
      res = ifStatementToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TRegularCase: {
      res = regularSwitchCaseToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TSwitchStatement: {
      res = switchStatementToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TBreakStatement: {
      res = breakStmtToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TDTO: {
      res = DTOToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TDTOValues: {
      res = DTOValuesToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TOkErrorReturnType: {
      res = okErrorReturnTypeToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TValueObjects: {
      res = valueObjectsToTargetLanguage({
        valueObjects: value,
        model,
        targetLanguage,
        contextData,
      });
      break;
    }
    case BitloopsTypesMapping.TUseCase: {
      res = useCaseToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TRESTController: {
      console.log('contextData', contextData);
      console.log('setupData?.controllers', setupData);
      if (contextData && setupData?.controllers) {
        res = restControllersToTargetLanguage(
          value,
          targetLanguage,
          contextData,
          setupData?.controllers,
        );
      } else {
        throw new Error('Missing context data and/or controllers');
      }
      break;
    }
    case BitloopsTypesMapping.TGraphQLController: {
      res = graphQLControllersToTargetLanguage(value, targetLanguage, contextData);
      break;
    }
    case BitloopsTypesMapping.TString: {
      res = stringToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TBackTickString: {
      res = backTickStringToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TDomainErrors: {
      res = domainErrorsToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TApplicationErrors: {
      res = applicationErrorsToTargetLanguage(value, targetLanguage);
      break;
    }

    case BitloopsTypesMapping.TEvaluatePrimitive: {
      res = primitiveEvaluationToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TGraphQLSetupData: {
      res = graphQLSetupDataToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TDTOEvaluation: {
      res = DTOEvaluationToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TControllers: {
      res = controllersToTargetLanguage(value, targetLanguage, contextData, setupData);
      break;
    }
    case BitloopsTypesMapping.TDefinitionMethodInfo: {
      res = definitionMethodInfoToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TDefinitionMethods: {
      res = definitionMethodsToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TReturnType: {
      res = returnTypeToDefinitionLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TPackagePort: {
      res = packagePortToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TPackages: {
      res = packagesToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TDomainCreateMethod: {
      res = domainCreate(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TEntityCreate: {
      res = domainCreateEntity(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TValueObjectEvaluation: {
      res = valueObjectEvaluationToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TEvaluationFields: {
      res = evaluationFieldsToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TDomainEvaluation: {
      res = domainEvaluationToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TEntityEvaluation: {
      res = entityEvaluationToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TEntities: {
      res = entitiesToTargetLanguage({
        entities: value,
        model,
        targetLanguage,
        contextData,
      });
      break;
    }
    case BitloopsTypesMapping.TRepoPorts: {
      res = repoPortToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TAdditiveOperator: {
      res = additiveOperatorToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TMultiplicativeOperator: {
      res = multiplicativeOperatorToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TRelationalOperator: {
      res = relationalOperatorToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TEqualityOperator: {
      res = equalityOperatorToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TEqualityExpression: {
      res = equalityExpressionToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TLogicalExpression: {
      res = logicalExpressionToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TNotExpression: {
      res = notExpressionToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TAndExpression: {
      res = andExpressionToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TOrExpression: {
      res = orExpressionToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TMultiplicativeExpression: {
      res = multiplicativeExpressionToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TAdditiveExpression: {
      res = additiveExpressionToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TXorExpression: {
      res = xorExpressionToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TRelationalExpression: {
      res = relationalExpressionToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TParenthesizedExpression: {
      res = parenthesizedExpressionToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TVariableDeclaration: {
      res = variableDeclarationToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TRepoAdapters: {
      res = repoAdapterToTargetLanguage(value, targetLanguage);
      break;
    }
    case BitloopsTypesMapping.TSingleExpression: {
      res = singleExpressionToTargetLanguage(value, targetLanguage);
      break;
    }
    default: {
      throw new Error(`${type} type is not supported`);
    }
  }
  return res;
};

export { modelToTargetLanguage };
