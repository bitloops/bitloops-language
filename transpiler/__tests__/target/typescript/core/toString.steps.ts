import { defineFeature, loadFeature } from 'jest-cucumber';
import { modelToTargetLanguage } from '../../../../src/target/typescript/core/modelToTargetLanguage.js';

const feature = loadFeature('__tests__/target/typescript/core/toString.feature');

defineFeature(feature, (test) => {
  let getClassType;
  let result;
  let value;

  test('Expression with toString', ({ given, when, then }) => {
    given(/^type is "(.*)"$/, (type) => {
      getClassType = type;
    });

    given(/^I have a ToString expression (.*)$/, (getClass) => {
      value = getClass;
    });

    when('I generate the code', () => {
      const getClassValue = JSON.parse(value);
      result = modelToTargetLanguage({
        type: getClassType,
        value: getClassValue,
      });
    });

    then(/^I should see the (.*) code$/, (output) => {
      expect(result.output).toEqual(output);
    });
  });
});
