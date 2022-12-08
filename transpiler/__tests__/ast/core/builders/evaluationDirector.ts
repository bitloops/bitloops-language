import {
  DTOIdentifierKey,
  structIdentifierKey,
  TArgumentList,
  TDomainEvaluationExpression,
  TEvaluation,
  TEvaluationFields,
  TExpression,
} from '../../../../src/types.js';

type PropsParam =
  | {
      fields: TEvaluationFields;
      expression?: never;
    }
  | {
      fields?: never;
      expression: TExpression;
    };

export class EvaluationBuilderDirector {
  buildStructEvaluation(structIdentifier: string, fields: TEvaluationFields): TEvaluation {
    return {
      evaluation: {
        struct: {
          [structIdentifierKey]: structIdentifier,
          fields,
        },
      },
    };
  }

  buildDTOEvaluation(dtoIdentifier: string, fields: TEvaluationFields): TEvaluation {
    return {
      evaluation: {
        dto: {
          [DTOIdentifierKey]: dtoIdentifier,
          fields,
        },
      },
    };
  }

  buildErrorEvaluation(errorIdentifier: string, args?: TArgumentList): TEvaluation {
    if (!args) args = [];
    return {
      evaluation: {
        errorEvaluation: {
          name: errorIdentifier,
          argumentList: args,
        },
      },
    };
  }

  buildBuiltInClassEvaluation(builtInIdentifier: string, args?: TArgumentList): TEvaluation {
    return {
      evaluation: {
        builtInClass: {
          className: builtInIdentifier,
          argumentList: args,
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
