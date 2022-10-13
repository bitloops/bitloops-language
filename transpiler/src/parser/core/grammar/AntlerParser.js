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
import antlr4 from 'antlr4';
// import md5 from 'md5';
import BitloopsLexer from './BitloopsLexer.js';
import BitloopsParser from './BitloopsParser.js';
import BitloopsParserListener from './BitloopsParserListener.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllParentsPath = (parser, node, tree = []) => {
  if (!node.parentCtx) {
    return tree;
  }
  const nodeType = parser.ruleNames[node.ruleIndex];
  // tree.push({type: nodeType, value: node.getText(), hash: md5(node), numOfChildren: node.children.length});
  tree.push({ type: nodeType, value: node.getText(), numOfChildren: node.children.length });
  return getAllParentsPath(parser, node.parentCtx, tree);
};

const getAllChildrensTree = (parser, node, tree = []) => {
  const nodeType = parser.ruleNames[node.ruleIndex] ? parser.ruleNames[node.ruleIndex] : 'LEAF';
  if (!node.children) {
    // return {type: nodeType, value: node.getText(), hash: md5(node)};
    return { type: nodeType, value: node.getText() };
  } else {
    const children = node.children.map((child) => getAllChildrensTree(parser, child, tree));
    // return {type: nodeType, value: node.getText(), hash: md5(node), numOfChildren: node.children.length, children};
    return { type: nodeType, value: node.getText(), numOfChildren: node.children.length, children };
  }
};

export class AntlerParser extends BitloopsParserListener {
  constructor(string) {
    super();
    const lexer = new BitloopsLexer(new antlr4.InputStream(string));
    const tokenStream = new antlr4.CommonTokenStream(lexer);
    this.parser = new BitloopsParser(tokenStream);
    this.parser.buildParseTrees = true;
    this._tree = this.parser.program();
  }

  get test() {
    return this._test;
  }

  get tree() {
    return this._tree;
  }

  get bitloopsTree() {
    return this._bitloopsTree;
  }

  enterProgram(ctx) {
    this._bitloopsTree = getAllChildrensTree(this.parser, ctx, []);
  }
}
