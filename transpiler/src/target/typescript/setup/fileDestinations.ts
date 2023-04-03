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

import { ClassTypes } from '../../../helpers/mappings.js';

const setupMapper = {
  OUTPUT_SRC_FOLDER: 'src/',
  OUTPUT_CONFIG_FOLDER: 'src/config/',
}; // TODO optionally get this from the config

export type TSetupFileType =
  | 'SRC_FOLDER'
  | 'BOUNDED_CONTEXTS'
  | 'startup'
  | 'config'
  | 'Config'
  | typeof ClassTypes.ApplicationError
  | typeof ClassTypes.DomainError
  | typeof ClassTypes.DomainRule
  | 'DI.Tokens'
  | 'index.ts'
  | 'nest.module.ts';

export type TSetupTypeMapper = Record<TSetupFileType, string>;

export const setupTypeMapper: TSetupTypeMapper = {
  SRC_FOLDER: `/${setupMapper.OUTPUT_SRC_FOLDER}`,
  BOUNDED_CONTEXTS: 'bounded-contexts',
  startup: `/${setupMapper.OUTPUT_SRC_FOLDER}`,
  config: `/${setupMapper.OUTPUT_CONFIG_FOLDER}`,
  'DI.Tokens': '',
  'index.ts': '',
  'nest.module.ts': '',
  Config: '/./',
  [ClassTypes.ApplicationError]: '',
  [ClassTypes.DomainError]: '',
  [ClassTypes.DomainRule]: '',
};
