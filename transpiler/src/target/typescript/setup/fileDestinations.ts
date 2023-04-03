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
  OUTPUT_DB_FOLDER: 'db/',
  OUTPUT_INFRA_FOLDER: 'infra/',
  OUTPUT_GRAPHQL_FOLDER: 'graphql/',
  OUTPUT_REST_FOLDER: 'rest/',
  OUTPUT_ROUTERS_FOLDER: 'routers/',
  OUTPUT_SHARED_FOLDER: 'src/shared/',
  OUTPUT_SRC_FOLDER: 'src/',
  OUTPUT_CONFIG_FOLDER: 'src/config/',
}; // TODO optionally get this from the config

export type TSetupFileType =
  | 'SRC_FOLDER'
  | 'BOUNDED_CONTEXTS'
  | 'startup'
  | 'config'
  | 'DI'
  | 'subscriptions'
  | 'package.json'
  | 'Config'
  | 'REST.Fastify.Router'
  | 'REST.Fastify.API'
  | 'REST.Fastify.Server'
  | 'REST.Express.Server'
  | 'GraphQL.Server'
  | 'DB.Mongo'
  | 'DB.Mongo.Index'
  | 'DB.Mongo.Config'
  | 'Package.Adapter'
  | typeof ClassTypes.ApplicationError
  | typeof ClassTypes.DomainError
  | typeof ClassTypes.DomainRule
  | 'DI.Tokens';

export type TSetupTypeMapper = Record<TSetupFileType, string>;

export const setupTypeMapper: TSetupTypeMapper = {
  SRC_FOLDER: `/${setupMapper.OUTPUT_SRC_FOLDER}`,
  BOUNDED_CONTEXTS: 'bounded-contexts',
  startup: `/${setupMapper.OUTPUT_SRC_FOLDER}`,
  config: `/${setupMapper.OUTPUT_CONFIG_FOLDER}`,
  DI: '',
  'DI.Tokens': '',
  subscriptions: '',
  'package.json': '/./',
  Config: '/./',
  'REST.Fastify.Router': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}${setupMapper.OUTPUT_REST_FOLDER}fastify/routers/`,
  'REST.Fastify.API': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}${setupMapper.OUTPUT_REST_FOLDER}fastify/api/`,
  'REST.Fastify.Server': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}${setupMapper.OUTPUT_REST_FOLDER}fastify/`,
  'REST.Express.Server': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}${setupMapper.OUTPUT_REST_FOLDER}express/`,
  'GraphQL.Server': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}graphql/`,
  'DB.Mongo': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}${setupMapper.OUTPUT_DB_FOLDER}mongo/`,
  'DB.Mongo.Index': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}${setupMapper.OUTPUT_DB_FOLDER}mongo/`,
  'DB.Mongo.Config': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}${setupMapper.OUTPUT_DB_FOLDER}mongo/`,
  'Package.Adapter': `/${setupMapper.OUTPUT_SHARED_FOLDER}${setupMapper.OUTPUT_INFRA_FOLDER}package/`,
  [ClassTypes.ApplicationError]: '',
  [ClassTypes.DomainError]: '',
  [ClassTypes.DomainRule]: '',
};
