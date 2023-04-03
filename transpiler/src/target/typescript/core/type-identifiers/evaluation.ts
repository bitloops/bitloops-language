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

import {
  TCommandEvaluation,
  TQueryEvaluation,
  TIntegrationEventEvaluation,
  TEntityConstructorEvaluation,
  TErrorEvaluation,
  TEvaluationValues,
  TStandardVOEvaluation,
  TStructEvaluation,
  TDomainEventEvaluation,
} from '../../../../types.js';
const STRUCT_STRING = 'struct';
// const DTO_STRING = 'dto';
export class EvaluationTypeIdentifiers {
  static isStructEvaluation(evaluation: TEvaluationValues): evaluation is TStructEvaluation {
    if (STRUCT_STRING in evaluation) {
      return true;
    }
    return false;
  }

  static isCommandEvaluation(evaluation: TEvaluationValues): evaluation is TCommandEvaluation {
    if ('command' in evaluation) {
      return true;
    }
    return false;
  }

  static isQueryEvaluation(evaluation: TEvaluationValues): evaluation is TQueryEvaluation {
    if ('query' in evaluation) {
      return true;
    }
    return false;
  }

  static isErrorEvaluation(evaluation: TEvaluationValues): evaluation is TErrorEvaluation {
    if ('errorEvaluation' in evaluation) {
      return true;
    }
    return false;
  }

  static isIntegrationEventEvaluation(
    evaluation: TEvaluationValues,
  ): evaluation is TIntegrationEventEvaluation {
    if ('integrationEvent' in evaluation) {
      return true;
    }
    return false;
  }

  static isEntityConstructorEvaluation(
    evaluation: TEvaluationValues,
  ): evaluation is TEntityConstructorEvaluation {
    if ('entityConstructor' in evaluation) {
      return true;
    }
    return false;
  }

  static isStandardVOEvaluation(
    evaluation: TEvaluationValues,
  ): evaluation is TStandardVOEvaluation {
    return 'standardVO' in evaluation;
  }

  static isDomainEventEvaluation(
    evaluation: TEvaluationValues,
  ): evaluation is TDomainEventEvaluation {
    return 'domainEvent' in evaluation;
  }

  static isCorsOptionsEvaluation(evaluation: TEvaluationValues): evaluation is TErrorEvaluation {
    if ('corsOptions' in evaluation) {
      return true;
    }
    return false;
  }

  static isDomainServiceEvaluation(evaluation: TEvaluationValues): evaluation is TErrorEvaluation {
    if ('domainService' in evaluation) {
      return true;
    }
    return false;
  }
}
