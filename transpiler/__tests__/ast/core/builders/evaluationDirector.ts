import {
  DTOIdentifierKey,
  structIdentifierKey,
  TArgumentList,
  TDomainEvaluationExpression,
  TEvaluation,
  TExpression,
  evaluationFieldsKey,
  TEvaluationField,
} from '../../../../src/types.js';

type PropsParam =
  | {
      fields: TEvaluationField[];
      expression?: never;
    }
  | {
      fields?: never;
      expression: TExpression;
    };

export class EvaluationBuilderDirector {
  buildStructEvaluation(structIdentifier: string, fields: TEvaluationField[]): TEvaluation {
    return {
      evaluation: {
        struct: {
          [structIdentifierKey]: structIdentifier,
          [evaluationFieldsKey]: fields,
        },
      },
    };
  }

  buildDTOEvaluation(dtoIdentifier: string, fields: TEvaluationField[]): TEvaluation {
    return {
      evaluation: {
        dto: {
          [DTOIdentifierKey]: dtoIdentifier,
          [evaluationFieldsKey]: fields,
        },
      },
    };
  }

  buildErrorEvaluation(errorIdentifier: string, args?: TArgumentList): TEvaluation {
    if (!args)
      args = {
        argumentList: [],
      };
    return {
      evaluation: {
        errorEvaluation: {
          error: errorIdentifier,
          ...args,
        },
      },
    };
  }

  buildBuiltInClassEvaluation(builtInIdentifier: string, args?: TArgumentList): TEvaluation {
    return {
      evaluation: {
        builtInClass: {
          className: builtInIdentifier,
          ...args,
        },
      },
    };
  }

  buildValueObjectEvaluation(valueObjectIdentifier: string, propsParam: PropsParam): TEvaluation {
    const { fields, expression } = propsParam;
    const props: TDomainEvaluationExpression = fields ? { fields } : { ...expression };
    return {
      evaluation: {
        valueObject: {
          domainEvaluation: {
            valueObjectIdentifier,
            props,
          },
        },
      },
    };
  }

  buildEntityEvaluation(entityIdentifier: string, propsParam: PropsParam): TEvaluation {
    const { fields, expression } = propsParam;
    const props: TDomainEvaluationExpression = fields ? { fields } : { ...expression };
    return {
      evaluation: {
        entity: {
          domainEvaluation: {
            entityIdentifier,
            props,
          },
        },
      },
    };
  }

  // private buildDomainEvaluation(
  //   domainIdentifier: string,
  //   propsParam: PropsParam,
  // ): TDomainEvaluation {
  //   const { fields, expression } = propsParam;
  //   const props: TDomainEvaluationExpression = fields ? { fields } : { ...expression };
  //   return {
  //     domainEvaluation: {
  //       name: domainIdentifier,
  //       props,
  //     },
  //   };
  // }
}
