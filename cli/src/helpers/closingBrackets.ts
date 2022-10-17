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
const getClosingBracketIndex = (
  openBracket: '(' | '{' | '[',
  str: string,
  startIndex = 0,
): number => {
  const getTargetBracket = (openBracket: '(' | '{' | '['): string => {
    switch (openBracket) {
      case '(':
        return ')';
      case '[':
        return ']';
      case '{':
        return '}';
    }
  };
  const targetBracket = getTargetBracket(openBracket);
  let bracketCount = 1;
  for (let i = startIndex; i < str.length; i += 1) {
    const letter = str[i];
    // loop through all letters of string
    if (targetBracket === letter) {
      bracketCount -= 1;
    } else if (openBracket === letter) {
      bracketCount += 1;
    }
    // console.log(letter, 'bracketCount', bracketCount);
    if (bracketCount === 0) {
      return i;
    }
  }
  return -1;
};

const areClosingBracketsBalanced = (str: string): number | boolean => {
  const holder = [];
  const openBrackets = ['(', '{', '['];
  const closedBrackets = [')', '}', ']'];
  for (const letter of str) {
    // loop through all letters of string
    if (openBrackets.includes(letter)) {
      // if its opening bracket
      holder.push(letter);
    } else if (closedBrackets.includes(letter)) {
      // if its closing
      const openPair = openBrackets[closedBrackets.indexOf(letter)]; // find its pair
      if (holder[holder.length - 1] === openPair) {
        // check if that pair is the last element in the array
        holder.splice(-1, 1); // if so, remove it
      } else {
        // if its not
        holder.push(letter);
        break; // exit loop
      }
    }
  }
  return holder.length === 0; // return true if length is 0, otherwise false
};

export { getClosingBracketIndex, areClosingBracketsBalanced };
