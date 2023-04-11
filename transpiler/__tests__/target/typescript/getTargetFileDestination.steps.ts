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
import { getTargetFileDestination } from '../../../src/target/typescript-nest/helpers/getTargetFileDestination.js';
import {
  MissingBoundedContext,
  MissingModule,
  SupportedTargetLanguageAndClassType,
  UnsupportedTargetLanguage,
} from './getTargetFileDestination.mock.js';

interface IResult {
  path: string;
  filename: string;
}

const unacceptableValueFromStrings = (value: string): '' | ' ' | undefined | null => {
  switch (value) {
    case 'undefined':
      return undefined;
    case 'null':
      return null;
    case 'empty':
      return '';
    case 'space':
      return ' ';
    default:
      throw new Error('Unsupported value');
  }
};

MissingBoundedContext.boundedContexts.forEach((boundedContext) => {
  test('Missing bounded context', () => {
    const unacceptableValue = unacceptableValueFromStrings(boundedContext);
    let result: IResult | Error;

    try {
      result = getTargetFileDestination(
        unacceptableValue,
        MissingBoundedContext.restInfo.module,
        MissingBoundedContext.restInfo.classType,
        MissingBoundedContext.restInfo.className,
        MissingBoundedContext.restInfo.targetLanguage,
      );
    } catch (error) {
      result = error;
    }

    expect(result).toEqual(new Error('Bounded context is required'));
  });
});

MissingModule.modules.forEach((module) => {
  test('Missing module', () => {
    const unacceptableValue = unacceptableValueFromStrings(module);
    let result: IResult | Error;

    try {
      result = getTargetFileDestination(
        MissingModule.restInfo.boundedContext,
        unacceptableValue,
        MissingModule.restInfo.classType,
        MissingModule.restInfo.className,
        MissingModule.restInfo.targetLanguage,
      );
    } catch (error) {
      result = error;
    }

    expect(result).toEqual(new Error('Module is required'));
  });
});

UnsupportedTargetLanguage.targetLanguages.forEach((targetLanguage) => {
  test('Unsupported target language', () => {
    expect(() =>
      getTargetFileDestination(
        'Hello World',
        'Random module',
        'Props',
        'NameProps',
        targetLanguage,
      ),
    ).toThrowError(`Language ${targetLanguage} is not supported`);
  });
});

test('Invalid class type', () => {
  const unacceptableType: any = 'InvalidClassType';

  let result: IResult | Error;
  try {
    result = getTargetFileDestination('Hello World', 'iam', unacceptableType, 'NameProps');
  } catch (error) {
    result = error;
  }

  expect(result).toEqual(new Error(`Class type ${unacceptableType} is not supported`));
});

SupportedTargetLanguageAndClassType.forEach((testCase) => {
  const { boundedContext, module, classType, className, targetLanguage, path, filename } = testCase;

  const result = getTargetFileDestination(
    boundedContext,
    module,
    classType,
    className,
    targetLanguage,
  );

  expect((result as IResult).path).toEqual(path);

  expect((result as IResult).filename).toEqual(filename);
});
