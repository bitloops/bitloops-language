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
import { defineFeature, loadFeature } from 'jest-cucumber';
import { getTargetFileDestination } from '../../../src/target/typescript/helpers/getTargetFileDestination.js';

const feature = loadFeature('./__tests__/target/typescript/getTargetFileDestination.feature');

interface IResult {
  path: string;
  filename: string;
}

defineFeature(feature, (test) => {
  test('Missing bounded context', ({ given, when, then }) => {
    let unacceptableValue: '' | ' ' | undefined | null;
    let result: IResult | Error;

    given(/^I am sending an invalid bounded context value (.*)$/, async (boundedContext) => {
      switch (boundedContext) {
        case 'undefined':
          unacceptableValue = undefined;
          break;
        case 'null':
          unacceptableValue = null;
          break;
        case 'empty':
          unacceptableValue = '';
          break;
        case 'space':
          unacceptableValue = ' ';
          break;
        default:
          throw new Error('Unsupported value');
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    when(
      /^I call the function with bounded context (.*), module (.*), class type (.*), class name (.*), and language (.*)$/,
      (_, classType, moduleName, className, targetLanguage) => {
        try {
          result = getTargetFileDestination(
            unacceptableValue,
            moduleName,
            classType,
            className,
            targetLanguage,
          );
        } catch (error) {
          result = error;
        }
      },
    );

    then(/^I should get an error saying that "Bounded context is required"$/, () => {
      expect(result).toEqual(new Error('Bounded context is required'));
    });
  });

  test('Missing module', ({ given, when, then }) => {
    let unacceptableValue: '' | ' ' | undefined | null;
    let result: IResult | Error;

    given(/^I am sending an invalid module value (.*)$/, async (moduleName) => {
      switch (moduleName) {
        case 'undefined':
          unacceptableValue = undefined;
          break;
        case 'null':
          unacceptableValue = null;
          break;
        case 'empty':
          unacceptableValue = '';
          break;
        case 'space':
          unacceptableValue = ' ';
          break;
        default:
          throw new Error('Unsupported value');
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    when(
      /^I call the function with bounded context (.*), module (.*), class type (.*), class name (.*), and language (.*)$/,
      (boundedContext, _, classType, className, targetLanguage) => {
        try {
          result = getTargetFileDestination(
            boundedContext,
            unacceptableValue,
            classType,
            className,
            targetLanguage,
          );
        } catch (error) {
          result = error;
        }
      },
    );

    then(/^I should get an error saying that "Module is required"$/, () => {
      expect(result).toEqual(new Error('Module is required'));
    });
  });

  test('Unsupported target language', ({ given, when, then }) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    given(/^I have a language called (.*)$/, () => {});

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    when('I call the function', () => {});

    then(/^I should get an error saying that (.*) is unsupported$/, (targetLanguage) => {
      expect(() =>
        getTargetFileDestination(
          'Hello World',
          'Random module',
          'Props',
          'NameProps',
          targetLanguage,
        ),
      ).toThrowError(`Language ${targetLanguage} is not supported`);
      //.toEqual({ message: `Hello, ${name}!` });
    });
  });

  test('Invalid class type', ({ given, when, then }) => {
    const unacceptableType = 'InvalidClassType';
    let result: IResult | Error;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    given(`I am sending an invalid class type "${unacceptableType}"`, () => {});

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    when('I call the function with the invalid class type', () => {
      try {
        result = getTargetFileDestination('Hello World', 'iam', unacceptableType, 'NameProps');
      } catch (error) {
        result = error;
      }
    });

    then(
      `I should get an error saying that "Class type ${unacceptableType} is not supported"`,
      () => {
        expect(result).toEqual(new Error(`Class type ${unacceptableType} is not supported`));
      },
    );
  });

  test('Supported target language and class type', ({ given, when, then }) => {
    let result: IResult | Error;

    given(
      /^I have a bounded context called (.*), a module (.*), a class type (.*), a class name (.*), and a language (.*)$/,
      async (boundedContext, moduleName, classType, className, targetLanguage) => {
        result = getTargetFileDestination(
          boundedContext,
          moduleName,
          classType,
          className,
          targetLanguage,
        );
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    when('I call the function', () => {});

    then(/^I should get a target path called (.*)$/, (path) => {
      expect((result as IResult).path).toEqual(path);
    });

    then(/^I should get a filename called (.*)$/, (filename) => {
      expect((result as IResult).filename).toEqual(filename);
    });
  });
});
