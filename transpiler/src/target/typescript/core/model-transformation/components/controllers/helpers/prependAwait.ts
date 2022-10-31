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
import { isConstDeclaration } from '../../../../../../../helpers/typeGuards.js';
import { deepClone } from '../../../../../../../utils/deepClone.js';
import { TConstDeclaration, TStatement } from '../../../../../../../types.js';

const isUseCaseExecuteStatement = (value: TStatement): value is TConstDeclaration => {
  if (!isConstDeclaration(value)) {
    return false;
  }
  if (isUseCaseExecuteConstDeclaration(value)) {
    return true;
  }

  return false;
};

const isUseCaseExecuteConstDeclaration = (value: TConstDeclaration): boolean => {
  const { expression } = value.constDeclaration;
  if (
    expression?.['evaluation']?.regularEvaluation?.type === 'method' &&
    expression?.['evaluation']?.regularEvaluation?.value.startsWith('this.') &&
    expression?.['evaluation']?.regularEvaluation?.value.endsWith('.execute')
  ) {
    return true;
  }
  return false;
};
const prependAwaitToExecute = (_value: TConstDeclaration): TConstDeclaration => {
  const value = deepClone(_value);
  const { expression } = value.constDeclaration;
  const methodValue = expression?.['evaluation']?.regularEvaluation?.value;
  expression['evaluation'].regularEvaluation.value = `await ${methodValue}`;
  return value;
};
const findUseCaseExecuteResultIdentifier = (value: TConstDeclaration): string => {
  const { name } = value.constDeclaration;
  return name;
};

export { isUseCaseExecuteStatement, prependAwaitToExecute, findUseCaseExecuteResultIdentifier };
