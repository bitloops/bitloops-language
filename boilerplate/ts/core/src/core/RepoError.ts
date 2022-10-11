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
import { ICoreError } from './ICoreError';

// TODO maybe make errorId mandatory
interface IRepoError extends ICoreError {
  errorId?: string;
}

export abstract class RepoError implements IRepoError {
  public readonly message: string;
  public readonly errorId?: string;

  constructor(message: string, errorId?: string) {
    this.message = message;
    if (errorId) this.errorId = errorId;
  }
}
