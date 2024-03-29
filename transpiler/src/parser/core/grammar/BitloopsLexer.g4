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
lexer grammar BitloopsLexer;

channels { ERROR }

options {
    superClass=BitloopsLexerBase;
}

MultiLineComment:               '/*' .*? '*/'             -> channel(HIDDEN);
SingleLineComment:              '//' ~[\r\n\u2028\u2029]* -> channel(HIDDEN);
RegularExpressionLiteral:       '/' RegularExpressionFirstChar RegularExpressionChar* {this.IsRegexPossible()}? '/' IdentifierPart*;

OpenBracket:                    '[';
CloseBracket:                   ']';
OpenParen:                      '(';
// OpenCloseParen:                 '()';
CloseParen:                     ')';
OpenBrace:                      '{' {this.ProcessOpenBrace();};
TemplateCloseBrace:             {this.IsInTemplateString()}? '}' -> popMode;
CloseBrace:                     '}' {this.ProcessCloseBrace();};
SemiColon:                      ';';
Comma:                          ',';
Assign:                         '=';
QuestionMark:                   '?';
Colon:                          ':';
Ellipsis:                       '...';
Dot:                            '.';
PlusPlus:                       '++';
MinusMinus:                     '--';
Plus:                           '+';
Minus:                          '-';
BitNot:                         '~';
// Not:                            '!';
Not:                            'NOT';
Multiply:                       '*';
Divide:                         '/';
Modulus:                        '%';
RightShiftArithmetic:           '>>';
LeftShiftArithmetic:            '<<';
RightShiftLogical:              '>>>';
LessThan:                       '<';
MoreThan:                       '>';
LessThanEquals:                 '<=';
GreaterThanEquals:              '>=';
Equals_:                        '==';
NotEquals:                      '!=';
IdentityEquals:                 '===';
IdentityNotEquals:              '!==';
BitAnd:                         '&';
BitXOr:                         '^';
BitOr:                          '|';
// And:                            '&&';
// Or:                             '||';
And:                            'AND';
Or:                             'OR';
Xor:                            'XOR';
MultiplyAssign:                 '*=';
DivideAssign:                   '/=';
ModulusAssign:                  '%=';
PlusAssign:                     '+=';
MinusAssign:                    '-=';
LeftShiftArithmeticAssign:      '<<=';
RightShiftArithmeticAssign:     '>>=';
RightShiftLogicalAssign:        '>>>=';
BitAndAssign:                   '&=';
BitXorAssign:                   '^=';
BitOrAssign:                    '|=';
ARROW:                          '=>';


/// Null Literals

NullLiteral:                    'null';

/// Boolean Literals

BooleanLiteral:                 'true'
              |                 'false'
              ;

IntegerLiteral:                DecimalIntegerLiteral
              ;


DecimalLiteral:                 DecimalIntegerLiteral '.' [0-9]* ExponentPart?
              |                 '-'? '.' [0-9]+ ExponentPart?
              |                 DecimalIntegerLiteral ExponentPart?
              ;


HexIntegerLiteral:              '0' [xX] HexDigit+;
OctalIntegerLiteral:            '0' [0-7]+;
OctalIntegerLiteral2:           '0' [oO] [0-7]+;
BinaryIntegerLiteral:           '0' [bB] [01]+;

Digits:                         [0-9]+;

/// Keywords
Optional:                       'optional';
Break:                          'break';
Do:                             'do';
Instanceof:                     'instanceof';
Typeof:                         'typeof';
Case:                           'case';
Else:                           'else';
New:                            'new';
Var:                            'var';
Catch:                          'catch';
Finally:                        'finally';
Return:                         'return';
Void:                           'void';
Continue:                       'continue';
For:                            'for';
Switch:                         'switch';
While:                          'while';
Debugger:                       'debugger';
Function_:                       'function';
This:                           'this';
With:                           'with';
Default:                        'default';
If:                             'if';
Throw:                          'throw';
In:                             'in';
Of:                             'of';
Try:                            'try';
As:                             'as';
From:                           'from';
ReadOnly:                       'readonly';
Async:                          'async';
Throws:                         'throws';
ApplyRules:                     'applyRules';
AddDomainEvent:                 'addDomainEvent';
CorsOptions:                    'corsOptions';
IfError:                        'ifError';

Extends:                        'extends';
Const:                          'const';
RepoPort:                       'RepoPort';
Props:                          'Props';
ReadModel:                      'ReadModel';
DTO:                            'DTO';
Command:                        'Command';
Query:                          'Query';
CommandHandler:                 'CommandHandler';
QueryHandler:                   'QueryHandler';
ValueObject:                    'ValueObject';
AggregateRoot:                  'AggregateRoot';
Entity:                         'Entity';
DomainEventHandler:             'DomainEventHandler';
IntegrationEventHandler:        'IntegrationEventHandler';
DomainEvent:                    'DomainEvent';
Service:                        'Service';
Repository:                     'Repository';
Factory:                        'Factory';
DomainError:                    'DomainError';
ApplicationError:               'ApplicationError';
DomainErrors:                   'DomainErrors';
ApplicationErrors:              'ApplicationErrors';
OK:                             'OK';
Errors:                         'Errors';
Config:                         'Config';
PackagePort:                    'PackagePort';
Package:                        'Package';
ServicePort:                    'ServicePort';
VO:                             'VO';
Rule:                           'Rule';
IsBrokenIf:                     'isBrokenIf';
Root:                           'Root';
StandardVO:                     'StandardVO';
IntegrationEvent:               'IntegrationEvent';
DomainService:                  'DomainService';

/// The following tokens are also considered to be FutureReservedWords
/// when parsing strict mode

// Implements:                     'implements' ;
Let:                            'let' ;
Private:                        'private' ;
Public:                         'public' ;
// Interface:                      'interface' ;
// Package:                        'package' ;
Protected:                      'protected' ;
Static:                         'static' ;
// Yield:                          'yield' ;

//keywords:

Any : 'any';
Double: 'double';
Float: 'float';
Int32: 'int32';
Int64: 'int64';
Uint32: 'uint32';
Uint64: 'uint64';
Sint32: 'sint32';
Sint64: 'sint64';
Fixed32: 'fixed32';
Fixed64: 'fixed64';
Sfixed32: 'sfixed32';
Sfixed64: 'sfixed64';
Boolean: 'bool';
String: 'string';
Bytes: 'bytes';
Timestamp: 'timestamp';
Struct: 'Struct';

// TypeAlias : 'type';

Get: 'get';
Set: 'set';

// Constructor: 'constructor';
Execute: 'execute';
Handle: 'handle';
Create:  'create';
Namespace: 'namespace';
// Require: 'require';
// Module: 'module';
Declare: 'declare';

JestTest: 'JestTest';
JestTestStatement: 'JestTestStatement';
JestTestStatementList: 'JestTestStatementList';
JestTestFunctionBody: 'JestTestFunctionBody';
JestTestExecute: 'JestTestExecute';
JestTestStructEvaluation: 'JestTestStructEvaluation';
JestTestDTOEvaluation: 'JestTestDTOEvaluation';
JestTestEvaluation: 'JestTestEvaluation';
JestTestReturnOkErrorType: 'JestTestReturnOkErrorType';
JestTestExpression: 'JestTestExpression';
JestTestConstDeclaration: 'JestTestConstDeclaration';
JestTestMethodDefinitionList: 'JestTestMethodDefinitionList';
JestTestCreateMethodDeclaration: 'JestTestCreateMethodDeclaration';
JestTestPrivateMethodDeclaration: 'JestTestPrivateMethodDeclaration';
JestTestPublicMethodDeclaration: 'JestTestPublicMethodDeclaration';
JestTestValueObjectDeclaration: 'JestTestValueObjectDeclaration';
JestTestEntityDeclaration: 'JestTestEntityDeclaration';
JestTestCondition: 'JestTestCondition';
JestTestVariableDeclaration: 'JestTestVariableDeclaration';
JestTestIsInstanceOf: 'JestTestIsInstanceOf';
JestTestValueObjectEvaluation: 'JestTestValueObjectEvaluation';
JestTestEntityEvaluation: 'JestTestEntityEvaluation';
JestTestSingleExpression: 'JestTestSingleExpression';
JestTestGetClass: 'JestTestGetClass';
JestTestBuiltInFunction: 'JestTestBuiltInFunction';
JestTestBuiltInClass: 'JestTestBuiltInClass';
JestTestBitloopsPrimaryType: 'JestTestBitloopsPrimaryType';
JestTestReturnStatement: 'JestTestReturnStatement';

// Abstract: 'abstract';

// BuiltInClasses
UUIDv4: 'UUIDv4';

Is: 'is';
GetClass: 'getClass';
ToString: 'toString';

//
// Ext.2 Additions to 1.8: Decorators
//
At: '@';

/// Identifier Names and Identifiers
DTOIdentifier:                  UpperCaseStart IdentifierPart* DTO;
ValueObjectIdentifier:          UpperCaseStart IdentifierPart* VO;
EntityIdentifier:               UpperCaseStart IdentifierPart* Entity;
ErrorIdentifier:                (DomainErrors | ApplicationErrors) Dot UpperCaseStart IdentifierPart*;
PackagePortIdentifier:          UpperCaseStart IdentifierPart* PackagePort;
PackageIdentifier:              UpperCaseIdentifier IdentifierPart* Package;
ServicePortIdentifier:          UpperCaseStart IdentifierPart* ServicePort;
PropsIdentifier:                UpperCaseStart IdentifierPart* Props;
ReadModelIdentifier:            UpperCaseStart IdentifierPart* ReadModel;
RuleIdentifier:                 UpperCaseStart IdentifierPart* Rule;
RepoPortIdentifier:             UpperCaseStart IdentifierPart* RepoPort;
DomainErrorIdentifier:          UpperCaseStart IdentifierPart* 'Error';
ValueObjectEvaluationIdentifier:   UpperCaseStart IdentifierPart* VO;
CommandIdentifier:              UpperCaseStart IdentifierPart* Command;
QueryIdentifier:                UpperCaseStart IdentifierPart* Query;
DomainEventIdentifier:          UpperCaseStart IdentifierPart* DomainEvent;
CommandHandlerIdentifier:       UpperCaseStart IdentifierPart* CommandHandler;
QueryHandlerIdentifier:         UpperCaseStart IdentifierPart* QueryHandler;
IntegrationEventIdentifier:     UpperCaseStart IdentifierPart* IntegrationEvent;
DomainEventHandlerIdentifier:   UpperCaseStart IdentifierPart* DomainEventHandler;
IntegrationEventHandlerIdentifier: UpperCaseStart IdentifierPart* IntegrationEventHandler;
DomainServiceIdentifier:        UpperCaseStart IdentifierPart* DomainService;
SetLanguage:                    'setLanguage';
TypeScript:                     'TypeScript';
TypeScriptNest:                 'TypeScript-Nest';
Java:                           'Java';

EnvPrefix:                      'Env';
EnvVariable:                    'env.' [a-zA-Z_]+ [a-zA-Z0-9_]*;

Concretes:                      'concretes';

UpperCaseIdentifier:            UpperCaseStart IdentifierPart*;
Identifier:                     IdentifierStart IdentifierPart*;

/// String Literals
StringLiteral:                 ('"' DoubleStringCharacter* '"'
            //  |                  '\'' SingleStringCharacter* '\'') {this.ProcessStringLiteral();}
             |                  '\'' SingleStringCharacter* '\'')
             ;

BackTick:                       '`' {this.IncreaseTemplateDepth();} -> pushMode(TEMPLATE);

WhiteSpaces:                    [\t\u000B\u000C\u0020\u00A0]+ -> channel(HIDDEN);

LineTerminator:                 [\r\n\u2028\u2029] -> channel(HIDDEN);

HtmlComment:                    '<!--' .*? '-->' -> channel(HIDDEN);
CDataComment:                   '<![CDATA[' .*? ']]>' -> channel(HIDDEN);
UnexpectedCharacter:            . -> channel(ERROR);

mode TEMPLATE;

BackTickInside:                 '`' {this.DecreaseTemplateDepth();} -> type(BackTick), popMode;
TemplateStringStartExpression:  '${' -> pushMode(DEFAULT_MODE);
TemplateStringAtom:             ~[`];


WS: [ \n\t\r]+ -> skip;

// Fragment rules

fragment DoubleStringCharacter
    : ~["\\\r\n]
    | '\\' EscapeSequence
    | LineContinuation
    ;
fragment SingleStringCharacter
    : ~['\\\r\n]
    | '\\' EscapeSequence
    | LineContinuation
    ;
fragment EscapeSequence
    : CharacterEscapeSequence
    | '0' // no digit ahead! TODO
    | HexEscapeSequence
    | UnicodeEscapeSequence
    | ExtendedUnicodeEscapeSequence
    ;
fragment CharacterEscapeSequence
    : SingleEscapeCharacter
    | NonEscapeCharacter
    ;
fragment HexEscapeSequence
    : 'x' HexDigit HexDigit
    ;
fragment UnicodeEscapeSequence
    : 'u' HexDigit HexDigit HexDigit HexDigit
    ;
fragment ExtendedUnicodeEscapeSequence
    : 'u' '{' HexDigit+ '}'
    ;
fragment SingleEscapeCharacter
    : ['"\\bfnrtv]
    ;

fragment NonEscapeCharacter
    : ~['"\\bfnrtv0-9xu\r\n]
    ;
fragment EscapeCharacter
    : SingleEscapeCharacter
    | [0-9]
    | [xu]
    ;
fragment LineContinuation
    : '\\' [\r\n\u2028\u2029]
    ;
fragment HexDigit
    : [0-9a-fA-F]
    ;
fragment DecimalIntegerLiteral
    : '0'
    | [-]? [1-9] [0-9]*
    ;
fragment ExponentPart
    : [eE] [+-]? [0-9]+
    ;
fragment RegularEvaluationPart: [a-zA-Z_][a-zA-Z0-9]*;

fragment RegularEvaluationStart
    : [\p{L}]
    | [$_]
    | '\\' UnicodeEscapeSequence
    ;
fragment IdentifierPart
    : IdentifierStart
    | [\p{Mn}]
    | [\p{Nd}]
    | [\p{Pc}]
    | '\u200C'
    | '\u200D'
    ;
fragment IdentifierStart
    : [\p{L}]
    | [$_]
    | '\\' UnicodeEscapeSequence
    ;

fragment UpperCaseStart
    : [\p{Lu}]
    ;

fragment RegularExpressionFirstChar
    : ~[*\r\n\u2028\u2029\\/[]
    | RegularExpressionBackslashSequence
    | '[' RegularExpressionClassChar* ']'
    ;
fragment RegularExpressionChar
    : ~[\r\n\u2028\u2029\\/[]
    | RegularExpressionBackslashSequence
    | '[' RegularExpressionClassChar* ']'
    ;
fragment RegularExpressionClassChar
    : ~[\r\n\u2028\u2029\]\\]
    | RegularExpressionBackslashSequence
    ;
fragment RegularExpressionBackslashSequence
    : '\\' ~[\r\n\u2028\u2029]
    ;

