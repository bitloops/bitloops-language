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
import { TBitloopsPrimitives, TTargetDependenciesTypeScript } from '../../../../../../../types.js';
import { ClassTypes, TClassTypesValues } from '../../../../../../../helpers/mappings.js';
import { IntermediateASTTree } from '../../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { getChildDependencies } from '../../../../dependencies.js';
import { bitloopsTypeToLangMapping } from '../../../../../../../helpers/bitloopsPrimitiveToLang.js';
import { SupportedLanguages } from '../../../../../../supportedLanguages.js';
import { FieldListNode } from '../../../../../../../ast/core/intermediate-ast/nodes/FieldList/FieldListNode.js';

export type FieldWithGetter = {
  nameOfField: string;
  primitiveTypeOfField: TBitloopsPrimitives;
};

export class FieldsWithGetters {
  constructor(private readonly ast: IntermediateASTTree) {}

  public findFields(repoDependencyName: string, type: TClassTypesValues): Array<FieldWithGetter> {
    if (type === ClassTypes.RootEntity) {
      const rootEntityNode = this.ast.getAggregateNodeWithIdentifier(repoDependencyName);
      if (!rootEntityNode) {
        throw new Error(`${type} ${repoDependencyName} not found`);
      }

      const aggregatePropsNode = this.ast.getPropsNodeOfEntity(rootEntityNode);

      if (!aggregatePropsNode) {
        const aggregateNodeIdentifier = rootEntityNode.getIdentifier().getValue();
        throw new Error(`Props for aggregate ${aggregateNodeIdentifier} not found`);
      }
      return this.findPrimitivesAndValueObjectsWithOnePrimitiveProperty(
        aggregatePropsNode.getFieldListNode(),
      );
    } else if (type === ClassTypes.ReadModel) {
      const readModelNode = this.ast.getReadModelByIdentifier(repoDependencyName);

      if (!readModelNode) {
        throw new Error(`${type} ${repoDependencyName} not found`);
      }

      return this.findPrimitivesAndValueObjectsWithOnePrimitiveProperty(
        readModelNode.getFieldListNode(),
      );
    }
    throw new Error(`Unsupported type ${type}`);
  }

  static generateGettersInterfacesTarget(
    repoDependencyName: string,
    fields: Array<FieldWithGetter>,
  ): TTargetDependenciesTypeScript {
    const dependencies = getChildDependencies(repoDependencyName);
    const output = fields
      .map((field) => {
        const { nameOfField, primitiveTypeOfField } = field;

        return (
          FieldsWithGetters.getByOneMethodSignature(
            repoDependencyName,
            nameOfField,
            primitiveTypeOfField,
          ).resultSignature + ';'
        );
      })
      .join('\n');
    return {
      dependencies,
      output,
    };
  }

  static getByOneMethodSignature(
    repoDependencyName: string,
    nameOfField: string,
    primitiveTypeOfField: TBitloopsPrimitives,
  ): { resultSignature: string; localIdentifier: string } {
    const mappedPrimitive =
      bitloopsTypeToLangMapping[SupportedLanguages.TypeScript](primitiveTypeOfField);
    const nameOfFieldCapitalized = nameOfField[0].toUpperCase() + nameOfField.slice(1);
    const methodName = `getBy${nameOfFieldCapitalized}`;
    return {
      resultSignature: `${methodName}(${nameOfField}: ${mappedPrimitive}): Promise<${repoDependencyName} | null>`,
      localIdentifier: nameOfField,
    };
  }

  private findPrimitivesAndValueObjectsWithOnePrimitiveProperty(
    fieldListNode: FieldListNode,
  ): Array<FieldWithGetter> {
    const primitiveFields = fieldListNode.getPrimitiveFields();
    const valueObjectFieldsWithOnePrimitiveProperty =
      this.ast.getValueObjectFieldsWithOnePrimitiveProperty(fieldListNode);

    const primitivesAndValueObjectsWithOnePrimitiveProperty = [
      ...primitiveFields.map((field) => ({
        nameOfField: field.fieldValue,
        primitiveTypeOfField: field.fieldType,
      })),
      ...valueObjectFieldsWithOnePrimitiveProperty.map((field) => ({
        nameOfField: field.fieldValue,
        primitiveTypeOfField: field.fieldType,
      })),
    ];

    const fieldsExceptId = primitivesAndValueObjectsWithOnePrimitiveProperty.filter(
      (field) => field.nameOfField !== 'id',
    );
    return fieldsExceptId;
  }
}
