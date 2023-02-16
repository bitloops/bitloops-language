import {
  DTOIdentifierKey,
  structIdentifierKey,
  TArgumentList,
  TDomainEvaluationExpression,
  TEvaluation,
  TExpression,
  evaluationFieldsKey,
  TEvaluationField,
  identifierKey,
  TQueryEvaluation,
  TCommandEvaluation,
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

  buildCorsEvaluation(fields: TEvaluationField[]): TEvaluation {
    return {
      evaluation: {
        corsOptions: {
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

  buildCommandEvaluation(commandIdentifier: string, fields?: TEvaluationField[]): TEvaluation {
    const evaluation: TCommandEvaluation = {
      command: {
        [identifierKey]: commandIdentifier,
      },
    };
    if (fields) {
      evaluation.command[evaluationFieldsKey] = fields;
    }
    return {
      evaluation,
    };
  }

  buildQueryEvaluation(commandIdentifier: string, fields?: TEvaluationField[]): TEvaluation {
    const evaluation: TQueryEvaluation = {
      query: {
        [identifierKey]: commandIdentifier,
      },
    };

    if (fields) {
      evaluation.query[evaluationFieldsKey] = fields;
    }
    return {
      evaluation,
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

  buildIntegrationEventEvaluation(
    integrationEventIdentifier: string,
    propsParam: PropsParam,
  ): TEvaluation {
    const { fields, expression } = propsParam;
    const props: TDomainEvaluationExpression = fields ? { fields } : { ...expression };
    return {
      evaluation: {
        integrationEvent: {
          integrationEventIdentifier,
          props,
        },
      },
    };
  }

  buildEntityConstructorEvaluation(entityIdentifier: string, propsParam: PropsParam): TEvaluation {
    const { fields, expression } = propsParam;
    const props: TDomainEvaluationExpression = fields ? { fields } : { ...expression };
    return {
      evaluation: {
        entityConstructor: {
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
