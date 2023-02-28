import { IntermediateASTTree } from '../../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { TClassTypesValues } from '../../../../../../../helpers/mappings.js';
import { FieldsWithGetters } from '../../repoPort/helpers/fieldsWithGetters.js';

export const getGettersMethodImplementation = (
  entityName: string,
  model: IntermediateASTTree,
  type: TClassTypesValues,
): string => {
  const fieldWithGetters = new FieldsWithGetters(model);
  const fieldsThatNeedGetters = fieldWithGetters.findFields(entityName, type);
  let result = '';
  for (const { nameOfField, primitiveTypeOfField } of fieldsThatNeedGetters) {
    const { resultSignature, localIdentifier } = FieldsWithGetters.getByOneMethodSignature(
      entityName,
      nameOfField,
      primitiveTypeOfField,
    );
    result += `async ${resultSignature} {
      const res = await this.collection.findOne({
        ${localIdentifier},
      });
      if (!res) {
        return null;
      }
      const { _id, ...rest } = res;
      return ${entityName}.fromPrimitives({
        id: _id,
        ...rest,
      });
    }\n`;
  }
  return result;
};
