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
  DomainEventIdentifierKey,
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
  buildDomainEventEvaluation(
    domainEventIdentifier: string,
    fields: TEvaluationField[],
  ): TEvaluation {
    return {
      evaluation: {
        domainEvent: {
          [DomainEventIdentifierKey]: domainEventIdentifier,
          [evaluationFieldsKey]: fields,
        },
      },
    };
  }
  buildPackageEvaluation(
    packageIdentifier: string,
    methodName: string,
    argumentList: TArgumentList,
  ): TEvaluation {
    return {
      evaluation: {
        packageEvaluation: {
          identifier: packageIdentifier,
          methodName,
          ...argumentList,
        },
      },
    };
  }
  /**
   *
   * @param standardVOIdentifier e.g 'Currency'
   */
  buildStandardVOEvaluation(standardVOIdentifier: string, fields: TEvaluationField[]): TEvaluation {
    return {
      evaluation: {
        standardVO: {
          [identifierKey]: standardVOIdentifier,
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

  buildReadModelEvaluation(readModelIdentifier: string, propsParam: PropsParam): TEvaluation {
    const { fields, expression } = propsParam;
    const props: TDomainEvaluationExpression = fields ? { fields } : { ...expression };
    return {
      evaluation: {
        readModelEvaluation: {
          domainEvaluation: {
            readModelIdentifier,
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

  buildValueObjectonstructorEvaluation(
    valueObjectIdentifier: string,
    propsParam: PropsParam,
  ): TEvaluation {
    const { fields, expression } = propsParam;
    const props: TDomainEvaluationExpression = fields ? { fields } : { ...expression };
    return {
      evaluation: {
        valueObjectConstructor: {
          domainEvaluation: {
            valueObjectIdentifier,
            props,
          },
        },
      },
    };
  }

  buildDomainServiceEvaluation(domainServiceIdentifier: string, args?: TArgumentList): TEvaluation {
    return {
      evaluation: {
        domainService: {
          identifier: domainServiceIdentifier,
          ...args,
        },
      },
    };
  }
}
