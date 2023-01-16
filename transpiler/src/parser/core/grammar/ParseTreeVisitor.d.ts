export default class ParseTreeVisitor {
  visit(ctx: any): any;
  visitChildren(ctx: any): any;
  visitTerminal(node: any): void;
  visitErrorNode(node: any): void;
}
