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
  TRepoSupportedTypes,
  TRepoPort,
  TTargetDependenciesTypeScript,
  TSingleExpression,
  TPropsValues,
  TModule,
  ISetupData,
} from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';
import { getChildDependencies } from '../../../dependencies.js';
import { isVO } from '../../../../../../helpers/typeGuards.js';

const CRUDWriteRepoPort = 'CRUDWriteRepoPort';
// const CRUDReadRepoPort = 'CRUDReadRepoPort';

const getVOProps = (voName: string, model: TModule): TPropsValues => {
  const voModel = model.ValueObjects[voName];
  const voPropsName = voModel.create.parameterDependency.type;
  const voProps = model.Props[voPropsName];
  return voProps;
};

const getVODeepFields = (voProps: TPropsValues, model: TModule): string[] => {
  const voDeepFields = [];
  voProps.variables.forEach((variable) => {
    const { name, type } = variable;
    if (isVO(type)) {
      const nestedVOProps = getVOProps(type, model);
      const nestedVOResult = getVODeepFields(nestedVOProps, model);
      const nestedFields = [];
      nestedVOResult.forEach((fieldsString) => {
        nestedFields.push(`${name}.${fieldsString}`);
      });
      voDeepFields.push(...nestedFields);
    } else {
      voDeepFields.push(name);
    }
  });
  return voDeepFields;
};

const getAggregateDeepFields = (
  aggregatePropsModel: TPropsValues,
  aggregateName: string,
  model: TModule,
): string => {
  return aggregatePropsModel.variables
    .filter((variable) => variable.name !== 'id')
    .map((variable) => {
      const { name, type } = variable;
      if (isVO(type)) {
        const voProps = getVOProps(type, model);
        const deepFieldsVO = getVODeepFields(voProps, model);
        return deepFieldsVO
          .map((fieldsString) => {
            const splitFields = fieldsString.split('.');
            const voFieldName = splitFields[splitFields.length - 1];
            return `${voFieldName}: ${aggregateName}.${name}.${fieldsString}`;
          })
          .join(', ');
      }
      // TODO check if is Entity and maybe get the id only
      return `${name}: ${aggregateName}.${name}`;
    })
    .join(', ');
};

const fetchTypeScriptMongoCrudBaseRepo = (
  entityName: string,
  aggregatePropsModel: TPropsValues,
  model: TModule,
): TTargetDependenciesTypeScript => {
  // TODO get type of entity ID From the entity, don't assume it's Domain.UUIdv4
  let dependencies = [];
  const lowerCaseEntityName = (entityName.charAt(0).toLowerCase() + entityName.slice(1)).slice(
    0,
    entityName.length - 'Entity'.length,
  );

  const deepFields = getAggregateDeepFields(aggregatePropsModel, lowerCaseEntityName, model);

  const aggregateRootId = lowerCaseEntityName + 'Id';
  const output = `
  async getAll(): Promise<${entityName}[]> {
    throw new Error('Method not implemented.');
  }
  async getById(${aggregateRootId}: Domain.UUIDv4): Promise<${entityName}> {
    return (await this.collection.find({
      _id: ${aggregateRootId}.toString(),
    })) as unknown as ${entityName};
  }
  async delete(${aggregateRootId}: Domain.UUIDv4): Promise<void> {
    await this.collection.deleteOne({
      _id: ${aggregateRootId}.toString(),
    });
  }
  async save(${lowerCaseEntityName}: ${entityName}): Promise<void> {
    await this.collection.insertOne({
      _id: ${lowerCaseEntityName}.id.toString() as unknown as Mongo.ObjectId,
      ${deepFields}
    });
  }
  async update(${lowerCaseEntityName}: ${entityName}): Promise<void> {
    await this.collection.updateOne(
      {
        _id: ${lowerCaseEntityName}.id.toString(),
      },
      {
        $set: {
      ${deepFields}
        },
      },
    );
  }
  `;
  const domainIdDependency = getChildDependencies(['UUIDv4', entityName]);
  dependencies = [...dependencies, ...domainIdDependency];
  return {
    output,
    dependencies,
  };
};

const repoBodyLangMapping = (
  dbType: TRepoSupportedTypes,
  collectionExpression: TSingleExpression,
  connectionExpression: TSingleExpression,
  repoPortInfo: TRepoPort,
  propsModel: TPropsValues,
  model: TModule,
  setupData: ISetupData,
): TTargetDependenciesTypeScript => {
  const collection = modelToTargetLanguage({
    type: BitloopsTypesMapping.TSingleExpression,
    value: collectionExpression,
  });
  const connection = modelToTargetLanguage({
    type: BitloopsTypesMapping.TSingleExpression,
    value: connectionExpression,
  });
  const { database } = setupData.repos.connections[connection.output];
  const dbName = modelToTargetLanguage({
    type: BitloopsTypesMapping.TSingleExpression,
    value: database,
  });

  let dependencies = [
    ...collection.dependencies,
    ...connection.dependencies,
    ...dbName.dependencies,
  ];
  let result = '';
  switch (dbType) {
    case 'DB.Mongo': {
      result = `constructor(private client: Mongo.Client) { 
        const dbName = ${dbName.output};
      const collection = ${collection.output};
      this.collection = this.client.db(dbName).collection(collection);
     }`;
      if (repoPortInfo.extendedRepoPorts.includes(CRUDWriteRepoPort)) {
        const methodsResult = fetchTypeScriptMongoCrudBaseRepo(
          repoPortInfo.aggregateRootName,
          propsModel,
          model,
        );
        result += methodsResult.output;
        dependencies = [...dependencies, ...methodsResult.dependencies];
      }
      break;
    }
    default: {
      throw new Error(`Unsupported db type: ${dbType}`);
    }
  }
  return {
    output: result,
    dependencies,
  };
};
export { repoBodyLangMapping };
