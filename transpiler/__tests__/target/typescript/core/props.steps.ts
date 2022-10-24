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
 
 const feature = loadFeature('./__tests__/features/toTargetLanguage/props.feature');
 
 defineFeature(feature, (test) => {
   let language;
   let propsType;
   let result;
   let value;
 
   test('Props with one or two variables to Typescript', ({ given, and, when, then }) => {
     given(/^type is "(.*)"$/, (type) => {
       propsType = type;
     });
 
     and(/^language is "(.*)"$/, (lang) => {
       language = lang;
     });
 
     given(/^I have a prop (.*)$/, (prop) => {
       value = prop;
     });
 
     when('I generate the code', () => {
       const propsValue = JSON.parse(value);
       result = modelToTargetLanguage({
         type: propsType,
         value: propsValue,
         targetLanguage: language,
       });
     });
 
     then(/^I should see the (.*) code$/, (output) => {
       expect(result).toEqual(output);
     });
   });
 
   test('Props with no variables to Typescript', ({ given, and, when, then }) => {
     given(/^type is "(.*)"$/, (type) => {
       propsType = type;
     });
 
     and(/^language is "(.*)"$/, (lang) => {
       language = lang;
     });
 
     given(/^I have a prop (.*)$/, (prop) => {
       value = prop;
     });
 
     when('I generate the code', () => {
       const propsValue = JSON.parse(value);
       result = () => {
         modelToTargetLanguage({ type: propsType, value: propsValue, targetLanguage: language });
       };
     });
 
     then(/^I should see the (.*) output$/, (error) => {
       expect(result).toThrow(error);
     });
   });
 
   test('Props with variables not formatted as array to Typescript', ({
     given,
     and,
     when,
     then,
   }) => {
     given(/^type is "(.*)"$/, (type) => {
       propsType = type;
     });
 
     and(/^language is "(.*)"$/, (lang) => {
       language = lang;
     });
 
     given(/^I have a prop (.*)$/, (prop) => {
       value = prop;
     });
 
     when('I generate the code', () => {
       const propsValue = JSON.parse(value);
       result = () => {
         modelToTargetLanguage({ type: propsType, value: propsValue, targetLanguage: language });
       };
     });
 
     then(/^I should see the (.*) output$/, (error) => {
       expect(result).toThrow(error);
     });
   });
 });
 