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
import { TodoAlreadyCompletedError as TodoAlreadyCompleted } from './todo-already-completed.domain-error';
import { TitleOutOfBoundsError as TitleOutOfBounds } from './title-out-of-bounds.domain-error';
import { TodoAlreadyUncompletedError as TodoAlreadyUncompleted } from './todo-already-uncompleted.domain-error';
export namespace DomainErrors {
  export class TodoAlreadyCompletedError extends TodoAlreadyCompleted {
    static readonly errorId = TodoAlreadyCompleted.errorId;
  }
  export class TitleOutOfBoundsError extends TitleOutOfBounds {
    static readonly errorId = TitleOutOfBounds.errorId;
  }
  export class TodoAlreadyUncompletedError extends TodoAlreadyUncompleted {
    static readonly errorId = TodoAlreadyUncompleted.errorId;
  }
}
