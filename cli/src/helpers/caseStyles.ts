/**
 *  Bitloops Language CLI
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
import _ from 'lodash';

const pascalCase = (str: string): string => {
  return str
    .replace(/(\w)(\w*)/g, (_, g1, g2) => {
      return g1.toUpperCase() + g2.toLowerCase();
    })
    .replaceAll(' ', '');
};

const camelCase = (str: string): string => {
  return _.camelCase(str);
};

const kebabCase = (str: string): string => {
  return _.kebabCase(str);
};

export { pascalCase, kebabCase, camelCase };
