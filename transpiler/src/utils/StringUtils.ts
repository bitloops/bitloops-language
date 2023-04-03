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
export class StringUtils {
  static getLastCharactersOfString(str: string, charsNumber: number): string {
    return str.substring(str.length - charsNumber);
  }

  static removeLastCharactersOfString(str: string, charsNumber: number): string {
    return str.slice(0, -charsNumber);
  }

  static getSubstringsBetweenStrings(content: string, start: string, end: string): string[] {
    const substrings = [];
    let startIndex = 0;
    let endIndex = 0;
    while (startIndex !== -1) {
      startIndex = content.indexOf(start, endIndex);
      endIndex = content.indexOf(end, startIndex + start.length);
      if (startIndex !== -1 && endIndex !== -1) {
        substrings.push(content.substring(startIndex + start.length, endIndex));
      }
    }
    return substrings;
  }

  static getIndicesOf(
    searchStr: string,
    str: string,
    caseSensitive: boolean,
    startPosition?: number,
  ): number[] {
    const searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
      return [];
    }
    let startIndex = startPosition ?? 0,
      index: number;
    const indices = [];
    if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
    }
    return indices;
  }

  static upperCaseFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static isEmpty(str: string): boolean {
    return str.length === 0;
  }
}
