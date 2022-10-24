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
 
 const feature = loadFeature('./__tests__/features/toTargetLanguage/parameterDependency.feature');
 
 defineFeature(feature, (test) => {
   let language;
   let parameterDependencyType;
   let result;
   let value;
 
   test('parameterDependency with valid input', ({ given, and, when, then }) => {
     given(/^type is "(.*)"$/, (type) => {
       parameterDependencyType = type;
     });
 
     and(/^language is "(.*)"$/, (lang) => {
       language = lang;
     });
 
     given(/^I have an parameterDependency (.*)$/, (prop) => {
       value = prop;
     });
 
     when('I generate the code', () => {
       const parameterDependencyValue = JSON.parse(value);
       result = modelToTargetLanguage({
         type: parameterDependencyType,
         value: parameterDependencyValue,
         targetLanguage: language,
       });
     });
 
     then(/^I should see the (.*) code$/, (output) => {
       expect(result).toEqual(output);
     });
   });
 });
 