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
// import { defineFeature, loadFeature } from 'jest-cucumber';
// import path from 'path';
// import {
//   getBitloopsModulesPreModelData,
//   TGetUseCasesResponse,
// } from '../../src/parser/bitloopsFilesToString/index.js';

// const feature = loadFeature('./__tests__/parser/bitloopsFileToString.feature');

// defineFeature(feature, (test) => {
//   test.skip('Valid filepath produces valid string', ({ given, when, then }) => {
//     let filePath: string;
//     let result: {
//       miscFilesString: string;
//       useCases: TGetUseCasesResponse;
//     };
//     given(/^I am sending path (.*)$/, (modulePath: string) => {
//       if (modulePath.includes('ABSOLUTE_PATH')) {
//         filePath = modulePath.replaceAll('ABSOLUTE_PATH', process.cwd());
//       } else {
//         filePath = modulePath;
//       }
//       filePath = path.normalize(filePath);
//     });

//     when('I call the function', () => {
//       result = getBitloopsModulesPreModelData(filePath);
//     });

//     // TODO add useCases handling
//     then(/^I should get a string response not null (.*)$/, (response) => {
//       const { miscFilesString } = result; //{, useCases}
//       const editedResult = miscFilesString
//         .replaceAll('`', '')
//         .replaceAll('${', '{')
//         .replaceAll('\t', '')
//         .replaceAll('\n', ' ')
//         .replaceAll('  ', '')
//         .replaceAll('  ', '')
//         .trim();
//       expect(editedResult).toEqual(response);
//     });
//   });
// });
