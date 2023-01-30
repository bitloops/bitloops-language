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
  repoPortKey,
  TAggregateRepoPort,
  TReadModelRepoPort,
  TRepoPort,
} from '../../../../types.js';

export class RepoPortTypeIdentifiers {
  static isAggregateRepoPort = (repoPort: TRepoPort): repoPort is TAggregateRepoPort => {
    const value = repoPort[repoPortKey];
    if ('entityIdentifier' in value) return true;
    return false;
  };

  static isReadModelRepoPort = (repoPort: TRepoPort): repoPort is TReadModelRepoPort => {
    const value = repoPort[repoPortKey];
    if ('readModelIdentifier' in value) return true;
    return false;
  };
}
