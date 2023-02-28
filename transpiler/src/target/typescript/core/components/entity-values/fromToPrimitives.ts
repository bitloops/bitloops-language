import { TypeUtils } from '../../../../../utils/TypeUtils.js';

const getPrimitivesType = (primitivesObject: Record<string, any>, entityName: string): string => {
  const typeName = `T${entityName}Primitives`;
  let resultType = `type ${typeName} = `;
  resultType += buildPrimitivesTypeValue(primitivesObject, entityName);
  return resultType;
};

const buildPrimitivesTypeValue = (
  primitivesObject: Record<string, any>,
  entityName: string,
  isStandardValueType = false,
): string => {
  let result = '{\n';

  for (const key in primitivesObject) {
    const type = primitivesObject[key].primitiveValue ?? primitivesObject[key];
    if (TypeUtils.hasObjectType(type)) {
      let nestedType = type;
      const isStandardVO = type.isStandardVO === true;
      if (nestedType.primitiveValue) {
        nestedType = type.primitiveValue;
      } else if (isStandardVO) {
        nestedType = type.primitiveValue;
        if (TypeUtils.hasObjectType(nestedType)) {
          nestedType = Object.values(nestedType)[0];
        }
      }
      result += `${key}: ${buildPrimitivesTypeValue(nestedType, entityName, isStandardVO)};\n`;
    } else {
      if (isStandardValueType) {
        const objType = primitivesObject.primitiveValue || type;
        result = objType;
        return result;
      } else {
        result += `${key}: ${type};\n`;
      }
    }
  }
  result += '}';
  return result;
};

const generateToPrimitives = (
  primitivesObject: Record<string, any>,
  entityName: string,
): string => {
  const typeName = `T${entityName}Primitives`;
  let result = `public toPrimitives(): ${typeName} {`;
  result += 'return {\n';
  result += buildToPrimitives(primitivesObject);
  result += '};\n}';

  return result;
};

const buildToPrimitives = (
  primitivesObject: Record<string, any>,
  keyToAppend = '',
  isStandardVO = false,
): string => {
  let result = '';
  for (const [primitivesKey, value] of Object.entries(primitivesObject)) {
    if (primitivesKey === 'id') {
      result += 'id: this.id.toString(),';
    } else {
      const primitivesValue = value.primitiveValue ?? value;
      if (TypeUtils.hasObjectType(primitivesValue)) {
        result += `${primitivesKey}: {\n`;
        for (const key in primitivesValue) {
          const voProperty = primitivesValue[key].primitiveValue;
          if (TypeUtils.hasObjectType(voProperty)) {
            const updatedKey = `${primitivesKey}.${key}`;
            const isStandardVO = voProperty.isStandardVO === true;
            const primitivesObject = { [key]: voProperty };
            result += buildToPrimitives(primitivesObject, updatedKey, isStandardVO);
          } else {
            if (isStandardVO) {
              return buildStandardVOFieldValue({ key, primitivesKey, keyToAppend });
            } else {
              result += buildToPrimitivesFieldValue({ keyToAppend, key, primitivesKey });
            }
          }
        }

        result += '},';
      } else {
        const strToAppend = buildToPrimitivesLeafValue({ keyToAppend, primitivesKey });
        result += strToAppend;
      }
    }
  }
  return result;
};

const buildToPrimitivesLeafValue = (data: {
  keyToAppend: string;
  primitivesKey: string;
}): string => {
  const { keyToAppend, primitivesKey } = data;
  let strToAppend = '';
  if (keyToAppend) {
    strToAppend += `${primitivesKey}: this.props.${keyToAppend}.${primitivesKey},`;
  } else {
    strToAppend += `${primitivesKey}: this.props.${primitivesKey},`;
  }
  return strToAppend;
};

const buildToPrimitivesFieldValue = (data: {
  keyToAppend: string;
  key: string;
  primitivesKey: string;
}): string => {
  const { keyToAppend, key, primitivesKey } = data;
  let result = '';
  if (keyToAppend.length > 0) {
    result += `${key}: this.props.${keyToAppend}.${key},`;
  } else {
    result += `${key}: this.props.${primitivesKey}.${key},`;
  }
  return result;
};

const buildStandardVOFieldValue = (data: {
  keyToAppend: string;
  key: string;
  primitivesKey: string;
}): string => {
  const { keyToAppend, key, primitivesKey } = data;
  let propsValue = '';
  if (keyToAppend.length > 0) {
    propsValue += `${primitivesKey}: this.props.${keyToAppend}.${key},`;
  } else {
    propsValue += `${primitivesKey}: ${key}: this.props.${keyToAppend}.${key},`;
  }
  return propsValue;
};

const generateFromPrimitives = (
  primitivesObject: Record<string, any>,
  entityName: string,
): string => {
  const typeName = `T${entityName}Primitives`;
  const propsName = `${entityName}Props`;
  let result = `public static fromPrimitives(data: ${typeName}): ${entityName} {`;
  result += `const ${propsName} = {`;
  result += buildFromPrimitives(primitivesObject);
  result += '};\n';
  result += `return new ${entityName}(${propsName});\n`;
  result += '}';

  return result;
};

const getIdentifierFromNestedType = (key: Record<string, any>): string => {
  const { identifier } = Object.values(key)[0];
  return identifier;
};

const buildFromPrimitives = (
  primitivesObject: Record<string, any>,
  keyToAppend = '',
  isStandardValueType = false,
): string => {
  let result = '';
  for (const [primitivesKey, value] of Object.entries(primitivesObject)) {
    if (primitivesKey === 'id') {
      result += 'id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,';
    } else {
      let primitivesValue = value.primitiveValue ?? value;
      let nestedTypeName = '';
      const isStandardVO = isStandardValueType === true || value.isStandardVO === true;
      if (TypeUtils.hasObjectType(primitivesValue)) {
        if (isStandardVO) {
          primitivesValue = value.primitiveValue;
          nestedTypeName = value.identifier;
        } else {
          nestedTypeName = getIdentifierFromNestedType(primitivesValue);
        }

        let voString = `${nestedTypeName}.create({\n`;
        for (const key in primitivesValue) {
          const voPropertyToBuild = primitivesValue[key].primitiveValue;
          if (TypeUtils.hasObjectType(voPropertyToBuild)) {
            const updatedKey = `${primitivesKey}.${key}`;
            voString += buildFromPrimitives({ [key]: voPropertyToBuild }, updatedKey, isStandardVO);
          } else {
            const leafValue = buildFromPrimitivesLeafValue({
              isStandardVO,
              keyToAppend,
              key,
              primitivesKey,
            });
            voString += `${leafValue},`;
          }
        }
        voString += `\n}).value as ${nestedTypeName},`;
        result += `${primitivesKey}: ${voString}`;
      } else {
        result += `${primitivesKey}: data.${primitivesKey},`;
      }
    }
    result += '\n';
  }
  return result;
};

const buildFromPrimitivesLeafValue = (data: {
  isStandardVO: boolean;
  keyToAppend: string;
  key: string;
  primitivesKey: string;
}): string => {
  const { isStandardVO, keyToAppend, key, primitivesKey } = data;
  let res = '';
  if (keyToAppend.length > 0) {
    if (isStandardVO) {
      res += `${key}: data.${keyToAppend}`;
    } else {
      res += `${key}: data.${keyToAppend}.${key}`;
    }
  } else {
    if (isStandardVO) {
      res += `${key}: data.${primitivesKey}`;
    } else {
      res += `${key}: data.${primitivesKey}.${key}`;
    }
  }
  return res;
};

export { getPrimitivesType, generateFromPrimitives, generateToPrimitives };
