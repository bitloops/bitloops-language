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
import {
  ISetupData,
  TBoundedContexts,
  TContextData,
  TTargetDependenciesTypeScript,
} from '../../../types.js';
import { buildInFunctionToTargetLanguage } from './components/statements/buildInFunctions/index.js';
import { applyRulesToTargetLanguage } from './components/statements/buildInFunctions/applyRules.js';
import {
  ruleDeclarationToTargetLanguage,
  rulesDeclarationToTargetLanguage,
} from './components/rulesDeclaration/index.js';

const modelToTargetLanguage = (props: {
  type: string;
  value: any;
  contextData?: TContextData;
  setupData?: ISetupData;
  model?: TBoundedContexts;
}): TTargetDependenciesTypeScript => {
  const { type, value, contextData, setupData, model } = props;
  // let targetLanguage;
  // if (!props.targetLanguage) {
  //   targetLanguage = SupportedLanguages.TypeScript;
  // } else {
  //   targetLanguage = props.targetLanguage;
  // }

  // if (!isLanguageSupported(targetLanguage)) {
  //   throw new Error(`Language ${targetLanguage} is not supported`);
  // }

  let res: TTargetDependenciesTypeScript;
  switch (type) {
    case BitloopsTypesMapping.TStatement: {
      res = statementToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TStatements: {
      res = statementsToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TStatementsWithoutThis: {
      res = statementsWithoutThisToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TVariable: {
      res = variableToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TVariables: {
      res = variablesToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TProps: {
      res = propsToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TPropsValues: {
      res = propsValuesToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TInstanceOf: {
      res = instanceOfToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TNotInstanceOf: {
      res = notInstanceOfToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TRegularEvaluation: {
      res = regularEvaluationToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TEvaluation: {
      res = evaluationToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TArgumentDependency: {
      res = argumentDependencyToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TArgumentDependencies: {
      res = argumentDependenciesToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TClassInstantiation: {
      res = classInstantiationToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TGetClass: {
      res = getClassToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TStructEvaluation: {
      res = structToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TStructs: {
      res = structDeclarationToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TStructDeclaration: {
      res = structDeclarationValuesToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TExpression: {
      res = expressionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TExpressionValues: {
      res = expressionValuesToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TParameterDependency: {
      res = parameterDependencyToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TParameterDependencies: {
      res = parameterDependenciesToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TCondition: {
      res = conditionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TReturnStatement: {
      res = returnToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TReturnOKStatement: {
      res = returnOkToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TReturnErrorStatement: {
      res = returnErrorToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TConstDecomposition: {
      res = constDecompositionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TConstDeclaration: {
      res = constDeclarationToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TThisDeclaration: {
      res = thisDeclarationToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TDefaultCase: {
      res = defaultSwitchCaseToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TIfStatement: {
      res = ifStatementToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TRegularCase: {
      res = regularSwitchCaseToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TSwitchStatement: {
      res = switchStatementToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TBreakStatement: {
      res = breakStmtToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TDTO: {
      res = DTOToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TDTOValues: {
      res = DTOValuesToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TOkErrorReturnType: {
      res = okErrorReturnTypeToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TValueObjects: {
      res = valueObjectsToTargetLanguage({
        valueObjects: value,
        model,
        contextData,
      });
      break;
    }
    case BitloopsTypesMapping.TUseCase: {
      res = useCaseToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TRESTController: {
      if (contextData && setupData?.controllers) {
        res = restControllersToTargetLanguage(value, contextData, setupData?.controllers);
      } else {
        throw new Error('Missing context data and/or controllers');
      }
      break;
    }
    case BitloopsTypesMapping.TGraphQLController: {
      res = graphQLControllersToTargetLanguage(value, contextData);
      break;
    }
    case BitloopsTypesMapping.TString: {
      res = stringToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TBackTickString: {
      res = backTickStringToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TDomainErrors: {
      res = domainErrorsToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TApplicationErrors: {
      res = applicationErrorsToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TEvaluatePrimitive: {
      res = primitiveEvaluationToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TGraphQLSetupData: {
      res = graphQLSetupDataToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TDTOEvaluation: {
      res = DTOEvaluationToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TControllers: {
      res = controllersToTargetLanguage(value, contextData, setupData);
      break;
    }
    case BitloopsTypesMapping.TDefinitionMethodInfo: {
      res = definitionMethodInfoToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TDefinitionMethods: {
      res = definitionMethodsToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TReturnType: {
      res = returnTypeToDefinitionLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TPackagePort: {
      res = packagePortToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TPackages: {
      res = packagesToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TDomainCreateMethod: {
      res = domainCreate(value);
      break;
    }
    case BitloopsTypesMapping.TEntityCreate: {
      res = domainCreateEntity(value);
      break;
    }
    case BitloopsTypesMapping.TValueObjectEvaluation: {
      res = valueObjectEvaluationToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TEvaluationFields: {
      res = evaluationFieldsToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TDomainEvaluation: {
      res = domainEvaluationToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TEntityEvaluation: {
      res = entityEvaluationToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TEntities: {
      res = entitiesToTargetLanguage({
        entities: value,
        model,
        contextData,
      });
      break;
    }
    case BitloopsTypesMapping.TRepoPorts: {
      res = repoPortToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TAdditiveOperator: {
      res = additiveOperatorToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TMultiplicativeOperator: {
      res = multiplicativeOperatorToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TRelationalOperator: {
      res = relationalOperatorToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TEqualityOperator: {
      res = equalityOperatorToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TEqualityExpression: {
      res = equalityExpressionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TLogicalExpression: {
      res = logicalExpressionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TNotExpression: {
      res = notExpressionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TAndExpression: {
      res = andExpressionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TOrExpression: {
      res = orExpressionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TMultiplicativeExpression: {
      res = multiplicativeExpressionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TAdditiveExpression: {
      res = additiveExpressionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TXorExpression: {
      res = xorExpressionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TRelationalExpression: {
      res = relationalExpressionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TParenthesizedExpression: {
      res = parenthesizedExpressionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TVariableDeclaration: {
      res = variableDeclarationToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TRepoAdapters: {
      res = repoAdapterToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TSingleExpression: {
      res = singleExpressionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TBuildInFunction: {
      res = buildInFunctionToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TApplyRules: {
      res = applyRulesToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TRules: {
      res = rulesDeclarationToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TRuleValues: {
      res = ruleDeclarationToTargetLanguage(value);
      break;
    }
    default: {
      throw new Error(`${type} type is not supported`);
    }
  }
  return res;
};

export { modelToTargetLanguage };
