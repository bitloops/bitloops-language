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
import {
  addSpacesBeforeAndAfterCurlyBrackets,
  addSpacesBeforeAndAfterParentheses,
  removeMultipleSpaces,
  getNextWord,
} from '../helpers/stringManipulations.js';
import { getClosingBracketIndex } from '../helpers/closingBrackets.js';

const BITLOOPS_CLASSES = [
  // 'Aggregate',
  'ValueObject',
  'Props',
  'Controller',
  'UseCase',
  'DomainError',
  'ApplicationError',
  'DTO',
];

type TBitloopsClasses = {
  className: string;
  classType: string;
  classContents: string;
}[];

type TBitloopsClassesResult = TBitloopsClasses | [];

const getNextBitloopsClassData = (
  str: string,
): {
  className: string;
  classType: string | undefined;
  classContents: string | undefined;
  remainingString: string | undefined;
} => {
  const nextWord = getNextWord(str);
  if (
    nextWord.word !== undefined &&
    nextWord.word !== '' &&
    BITLOOPS_CLASSES.includes(nextWord.word)
  ) {
    const classType = nextWord.word;
    if (classType) {
      const className = getNextWord(str.substring(classType.length).trim()).word;
      // Some classes have a simple header like "Props NameProps {"
      const classHeaderPrefix = `${classType} ${className} `;
      const classHeaderType =
        str.substring(classHeaderPrefix.length, classHeaderPrefix.length + 1) === '{'
          ? 'simple'
          : 'complex';
      let classHeader: string;
      if (classHeaderType === 'simple') {
        classHeader = `${classHeaderPrefix} {`;
      } else {
        const classHeaderAppendix = str.substring(
          str.indexOf('('),
          getClosingBracketIndex('(', str, str.indexOf('(') + 1),
        );
        classHeader = `${classHeaderPrefix} ${classHeaderAppendix} {`;
      }
      // Some other classes have a more complex header like "RESTController HelloWorldController ( helloWorldUseCase: HelloWorldUseCase ) {"

      const classContents = str.substring(
        0,
        getClosingBracketIndex('{', str, classHeader.length) + 1,
      );
      const remainingString = str.substring(classContents.length).trim();
      return {
        className,
        classType,
        classContents,
        remainingString,
      };
    }
  }
  return {
    className: undefined,
    classType: undefined,
    classContents: undefined,
    remainingString: str.substring(nextWord.word ? nextWord.word.length : 1),
  };
};

const getClassesBLStrings = (str: string): TBitloopsClassesResult => {
  if (str) {
    const bitloopsClassesData: TBitloopsClasses = [];
    let input = removeMultipleSpaces(
      addSpacesBeforeAndAfterParentheses(addSpacesBeforeAndAfterCurlyBrackets(str)),
    );
    let result = getNextBitloopsClassData(input);
    while (result.remainingString.length > 0) {
      if (result.classType) {
        bitloopsClassesData.push({
          className: result.className,
          classType: result.classType,
          classContents: result.classContents,
        });
      }
      input = result.remainingString;
      result = getNextBitloopsClassData(input);
    }
    return bitloopsClassesData;
  } else return [];
};

export { getClassesBLStrings, TBitloopsClasses, TBitloopsClassesResult };
