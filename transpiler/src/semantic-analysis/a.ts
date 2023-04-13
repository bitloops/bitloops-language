interface ISymbol {
  type: string;
}

class SymbolTable {
  private localSymbols: { [name: string]: ISymbol } = {};
  private childrenScopes: { [name: string]: SymbolTable } = {};

  constructor(private readonly parent?: SymbolTable) {}

  public insert(name: string, type: string): void {
    this.localSymbols[name] = { type };
  }

  public lookup(name: string): ISymbol | null {
    const symbol = this.localSymbols[name];
    if (symbol) {
      return symbol;
    }
    if (this.parent) {
      return this.parent.lookup(name);
    }
    return null;
  }

  public createChildScope(name: string): SymbolTable {
    const childScope = new SymbolTable(this);
    this.childrenScopes[name] = childScope;
    return childScope;
  }

  public getChildScope(name: string): SymbolTable | null {
    return this.childrenScopes[name] || null;
  }
}

/***
 * FOR THIS CLASS
 */
export class Person {
  private props;
  constructor(props: CompletedTodosProps) {
    this.props = props;
  }

  public static create(
    props: CompletedTodosProps,
  ): Either<CompletedTodosVO, DomainErrors.InvalidTodosCounterError> {
    const res = 5;
    if (res < 5) {
      const result = false;
      return result;
    } else {
      const result = true;
      return result;
    }
    return res;
  }

  public getCounter(counter: number): number {
    const myName = 'Hello';
    return myName.length;
  }
}

/**
 * HOW WE WOULD CONSTRUCT SYMBOL TABLE
 */

const globalScope = new SymbolTable();

// Define Person class in global scope
const personClassScope = globalScope.createChildScope('Person');

// Define props attribute
personClassScope.define('this', 'Person');
personClassScope.define('props', 'CompletedTodosProps');

// Define constructor method
const constructorScope = personClassScope.createChildScope('constructor');
constructorScope.define('props', 'CompletedTodosProps');

// Define static create method
const createScope = personClassScope.createChildScope('create');
createScope.define('props', 'CompletedTodosProps');
createScope.define('res', 'unknown');
createScope.define('result', 'Either<CompletedTodosVO, DomainErrors.InvalidTodosCounterError>');

// Define if statement in create method
const ifScope = createScope.createChildScope('if');
ifScope.define('result', 'boolean');

// Define else statement in create method
const elseScope = createScope.createChildScope('else');
elseScope.define('result', 'boolean');

// Define getCounter method
const getCounterScope = personClassScope.createChildScope('getCounter');
getCounterScope.define('counter', 'number');
getCounterScope.define('myName', 'string');

const obj = {
  symbols: [],
  children: {
    Person: {
      symbols: [
        { name: 'this', type: 'Person' },
        { name: 'props', type: 'CompletedTodosProps' },
      ],
      children: {
        constructor: {
          symbols: [{ name: 'props', type: 'CompletedTodosProps' }],
          children: {},
        },
        create: {
          symbols: [
            { name: 'props', type: 'CompletedTodosProps' },
            { name: 'res', type: 'unknown' },
            {
              name: 'result',
              type: 'Either<CompletedTodosVO, DomainErrors.InvalidTodosCounterError>',
            },
          ],
          children: {
            if: {
              symbols: [{ name: 'result', type: 'boolean' }],
              children: {},
            },
            else: {
              symbols: [{ name: 'result', type: 'boolean' }],
              children: {},
            },
          },
        },
      },
    },
  },
};

import ts from 'typescript';

// Create a TypeScript program
const program = ts.createProgram({
  options: {},
  rootNames: ['path/to/your/file.ts'],
});
// Get the source file that you want to analyze
const sourceFile = program.getSourceFile('path/to/your/file.ts');

// Get the type checker
const typeChecker = program.getTypeChecker();

// Get the symbol table for the source file
const symbolTable = typeChecker.getSymbolAtLocation(sourceFile);

// Log the symbol table
console.log(symbolTable);
