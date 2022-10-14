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
const addSpacesBeforeAndAfterCurlyBrackets = (str: string): string => {
  // curly brackets located within a regex should not have spaces padded to them
  // first we take care of the left curly bracket
  const regexPatchesLeft = str.matchAll(/((= \/?)(.*?{)(.*?\/g?))/g);
  for (const regexPatch of regexPatchesLeft) {
    const stringToBePatched = regexPatch[0];
    const patchedString = stringToBePatched.replace(/{/g, '&*&*&');
    str = str.replace(stringToBePatched, patchedString);
  }
  // then we take care of the right curly bracket
  const regexPatchesRight = str.matchAll(/((= \/?)(.*?})(.*?\/g?))/g);
  for (const regexPatch of regexPatchesRight) {
    const stringToBePatched = regexPatch[0];
    const patchedString = stringToBePatched.replace(/\}/g, '&^&^&');
    str = str.replace(stringToBePatched, patchedString);
  }
  // now we can add spaces to the curly brackets to make it easier to isolate class name
  // and methods etc. We also need to be careful with ${} inside ``
  str = str.replace(/{/g, ' { ').replace(/\$ {/g, '${').replace(/}/g, ' } ');
  // after we have added spaces to the curly brackets, we can now replace the patched strings
  str = str.replace(/&\*&\*&/g, '{').replace(/&\^&\^&/g, '}');
  return str;
};

const addSpacesBeforeAndAfterParentheses = (str: string): string => {
  // TODO fix regex parentheses issue
  // // parentheses located within a regex should not have spaces padded to them
  // // first we take care of the left parenthesis
  // const regexPatchesLeft = str.matchAll(/((= \/?)(.*?\()(.*?\/;?))/g);
  // for (const regexPatch of regexPatchesLeft) {
  //   const stringToBePatched = regexPatch[0];
  //   const patchedString = stringToBePatched.replace(/\(/g, '&*&*&');
  //   str = str.replace(stringToBePatched, patchedString);
  // }
  // // then we take care of the right parenthesis
  // const regexPatchesRight = str.matchAll(/((= \/?)(.*?\))(.*?\/;?))/g);
  // for (const regexPatch of regexPatchesRight) {
  //   const stringToBePatched = regexPatch[0];
  //   const patchedString = stringToBePatched.replace(/\}/g, '&^&^&');
  //   str = str.replace(stringToBePatched, patchedString);
  // }
  // // now we can add spaces to the parentheses to make it easier to isolate class name
  // // and methods etc
  // str = str.replace(/\(/g, ' ( ').replace(/}/g, ' ) ');
  // // after we have added spaces to the parentheses, we can now replace the patched strings
  // str = str.replace(/&\*&\*&/g, '(').replace(/&\^&\^&/g, ')');
  // return str;
  return str.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ');
};

const removeMultipleSpaces = (str: string): string => {
  return str.replace(/\s+/g, ' ');
};

const getNextWord = (str: string): { startIndex: number; endIndex: number; word: string } => {
  const startIndex = str.search(/\w/);
  const endIndex = str.search(/\s/);
  const word = str.slice(startIndex, endIndex);
  return { startIndex, endIndex, word };
};

const lowerCaseFirstLetter = (string: string): string => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

export {
  addSpacesBeforeAndAfterCurlyBrackets,
  addSpacesBeforeAndAfterParentheses,
  removeMultipleSpaces,
  getNextWord,
  lowerCaseFirstLetter,
};
