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
export const getUseCases = (useCases: object[]): any => {
  let useCaseObject = {};
  useCaseObject = useCases[0];
  if (!useCaseObject) {
    return {};
  }
  const useCaseObjectBoundedContext = Object.keys(useCaseObject)[0];
  const useCaseObjectModule = Object.keys(useCaseObject[useCaseObjectBoundedContext])[0];
  const useCaseObjectUseCaseName = Object.keys(
    useCaseObject[useCaseObjectBoundedContext][useCaseObjectModule],
  )[0];
  useCases.slice(1).forEach((useCase) => {
    const boundedContext = Object.keys(useCase)[0];
    const module = Object.keys(useCase[boundedContext])[0];
    const useCaseName = Object.keys(useCase[boundedContext][module])[0];
    const instance = useCase[boundedContext][module][useCaseName]['instances'][0];
    if (useCaseObjectBoundedContext === boundedContext) {
      if (useCaseObjectModule === module) {
        if (useCaseObjectUseCaseName === useCaseName) {
          useCaseObject[boundedContext][module][useCaseName]['instances'].push(instance);
        } else {
          useCaseObject[boundedContext][module][useCaseName] =
            useCase[boundedContext][module][useCaseName];
        }
      } else {
        useCaseObject[boundedContext][module] = useCase[boundedContext][module];
      }
    } else {
      useCaseObject[boundedContext] = useCase[boundedContext];
    }
  });
  return useCaseObject;
};
