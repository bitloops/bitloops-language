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
 import { modelToTargetLanguage } from '../../../src/functions/modelToTargetLanguage/index.js';
 
 const feature = loadFeature('./__tests__/features/toTargetLanguage/expression.feature');
 
 defineFeature(feature, (test) => {
   let language;
   let expressionType;
   let result;
   let value;
 
   test('Expression with all possible expression types', ({ given, and, when, then }) => {
     given(/^type is "(.*)"$/, (type) => {
       expressionType = type;
     });
 
     and(/^language is "(.*)"$/, (lang) => {
       language = lang;
     });
 
     given(/^I have an expression (.*)$/, (expression) => {
       value = expression;
     });
 
     when('I generate the code', () => {
       const expressionValue = JSON.parse(value);
       result = modelToTargetLanguage({
         type: expressionType,
         value: expressionValue,
         targetLanguage: language,
       });
     });
 
     then(/^I should see the (.*) code$/, (output) => {
       expect(result).toEqual(output);
     });
   });
 
   test('Unsupported expression type', ({ given, and, when, then }) => {
     given(/^type is "(.*)"$/, (type) => {
       expressionType = type;
     });
 
     and(/^language is "(.*)"$/, (lang) => {
       language = lang;
     });
 
     given(/^I have an invalid (.*) with unsupported (.*)$/, (expression) => {
       value = expression;
     });
 
     // eslint-disable-next-line @typescript-eslint/no-empty-function
     when('I generate the code', () => {});
 
     then(/^I should get an error saying that (.*) is unsupported$/, (expression) => {
       const expressionValue = JSON.parse(expression);
       expect(() =>
         modelToTargetLanguage({
           type: expressionType,
           value: expressionValue,
           targetLanguage: language,
         }),
       ).toThrowError(`Unsupported expression: ${expressionValue}`);
     });
   });
 });
 