import { TArgumentList, TEvaluation, TEvaluationFields } from '../../../../src/types.js';

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
}
