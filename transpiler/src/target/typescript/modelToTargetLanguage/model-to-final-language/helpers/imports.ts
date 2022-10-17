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
import ts from 'typescript';
import { TypescriptImportsReverseMapper } from './index.js';

/**
 * Old function that only handles one file at a time
 * To be deleted once the new function is tested/validated
 */
const findMissingTSImports = (fileNames: string[], options: ts.CompilerOptions): string[] => {
  const program = ts.createProgram(fileNames, options);
  const emitResult = program.emit();

  const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  const missingComponents = new Set<string>();

  allDiagnostics.forEach((diagnostic) => {
    // Only care for errors in the current file
    if (diagnostic.file && fileNames.includes(diagnostic.file.fileName)) {
      const { line, character } = ts.getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start!,
      );
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

      if (diagnostic.code === 2304 || diagnostic.code === 2503) {
        const missingComponent = message.substring(
          message.indexOf("'") + 1,
          message.lastIndexOf("'"),
        );
        missingComponents.add(missingComponent);
      } else if (diagnostic.code === 2552) {
        const messageOfInterest = message.split('.')[0];
        const missingComponent = messageOfInterest.substring(
          messageOfInterest.indexOf("'") + 1,
          messageOfInterest.lastIndexOf("'"),
        );
        missingComponents.add(missingComponent);
      }
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${character + 1})-[${
          diagnostic.code
        }]: ${message}`,
      );
    } else {
      // console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    }
  });
  if (missingComponents.size > 0) console.log({ missingComponents });

  // const exitCode = emitResult.emitSkipped ? 1 : 0;
  // console.log(`Process exiting with code '${exitCode}'.`);
  return Array.from(missingComponents);
};

/**
 * Creates one program for all target files, by
 * populating the reverseMapper with the missing imports
 * @param fileNames
 * @param options
 * @param reverseMapping - an initialized reverse mapping, which will be populated with the missing imports
 * @returns
 */
const findAllMissingTSImports = (
  fileNames: string[],
  options: ts.CompilerOptions,
  reverseMapping: TypescriptImportsReverseMapper,
): TypescriptImportsReverseMapper => {
  const program = ts.createProgram(fileNames, options);
  const emitResult = program.emit();

  const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  allDiagnostics.forEach((diagnostic) => {
    // Only care for errors in the current file
    if (diagnostic.file && diagnostic.file.fileName in reverseMapping) {
      // const { line, character } = ts.getLineAndCharacterOfPosition(
      //   diagnostic.file,
      //   diagnostic.start!,
      // );
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

      if (!reverseMapping[diagnostic.file.fileName].missingImports) {
        reverseMapping[diagnostic.file.fileName].missingImports = new Set<string>();
      }
      if (diagnostic.code === 2304 || diagnostic.code === 2503) {
        const missingComponent = message.substring(
          message.indexOf("'") + 1,
          message.lastIndexOf("'"),
        );
        // TODO differentiate input type to be Set<string> and return type to be string[] to remove casting
        (reverseMapping[diagnostic.file.fileName].missingImports as Set<string>).add(
          missingComponent,
        );
      } else if (diagnostic.code === 2552) {
        const messageOfInterest = message.split('.')[0];
        const missingComponent = messageOfInterest.substring(
          messageOfInterest.indexOf("'") + 1,
          messageOfInterest.lastIndexOf("'"),
        );
        (reverseMapping[diagnostic.file.fileName].missingImports as Set<string>).add(
          missingComponent,
        );
      }
    } else {
      // console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    }
  });

  return reverseMapping;
};

export { findMissingTSImports, findAllMissingTSImports };
