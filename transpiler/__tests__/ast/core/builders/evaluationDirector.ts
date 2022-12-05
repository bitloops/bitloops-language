import {
  TArgumentList,
  TDomainEvaluation,
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
          name: structIdentifier,
          fields,
        },
      },
    };
  }

  buildDTOEvaluation(dtoIdentifier: string, fields: TEvaluationFields): TEvaluation {
    return {
      evaluation: {
        dto: {
          name: dtoIdentifier,
          fields,
        },
      },
    };
  }

  buildErrorEvaluation(errorIdentifier: string, args?: TArgumentList): TEvaluation {
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
    return {
      evaluation: {
        valueObject: this.buildDomainEvaluation(valueObjectIdentifier, propsParam),
      },
    };
  }

  buildEntityEvaluation(entityIdentifier: string, propsParam: PropsParam): TEvaluation {
    return {
      evaluation: {
        entity: this.buildDomainEvaluation(entityIdentifier, propsParam),
      },
    };
  }

  private buildDomainEvaluation(
    domainIdentifier: string,
    propsParam: PropsParam,
  ): TDomainEvaluation {
    const { fields, expression } = propsParam;
    const props: TDomainEvaluationExpression = fields ? { fields } : { ...expression };
    return {
      domainEvaluation: {
        name: domainIdentifier,
        props,
      },
    };
  }
}
