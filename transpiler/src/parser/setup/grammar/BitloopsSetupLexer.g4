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
lexer grammar BitloopsSetupLexer;

channels { ERROR }

options {
    // superClass=BitloopsLexerBase;
}


SetLanguage:                    'setLanguage';
TypeScript:                     'TypeScript';
Java:                           'Java';
FastifyServer:                  'REST.Fastify';
ExpressServer:                  'REST.Express';
GraphQLServerType:              'GraphQL';
RESTRouter:                     'RESTRouter';
RESTServer:                     'RESTServer';
GraphQLServer:                  'GraphQLServer';
PackagePortClassName:           [A-Z] [0-9a-zA-Z]* 'PackagePort';
PackageAdapterClassName:        [A-Z] [0-9a-zA-Z]* 'PackageAdapter';
UseCaseName:                    [A-Z] [0-9a-zA-Z]* 'UseCase';
ControllerName:                 [A-Z] [0-9a-zA-Z]* 'Controller';
ServerTypeOption:               'server';
ServerApiPrefix:                'apiPrefix';

EnvPrefix:                      'Env';
EnvVariable:                    'env.' [a-zA-Z_]+ [a-zA-Z0-9_]*;

// Path:                           Divide Identifier? (Divide Identifier)*; // TODO check valid url path

Concretes:                      'concretes';

GET:                            'Get';
POST:                           'Post';
PUT:                            'Put';
DELETE:                         'Delete';
PATCH:                          'Patch';
OPTIONS:                        'Options';
// HEAD:                           'HEAD';
// CONNECT:                        'CONNECT';
// TRACE:                          'TRACE';
// UnknownMethod:                  Identifier;
// PathString:                     '/hello';

MultiLineComment:               '/*' .*? '*/'             -> channel(HIDDEN);
SingleLineComment:              '//' ~[\r\n\u2028\u2029]* -> channel(HIDDEN);

SingleQuoteString:              '\'';
DoubleQuoteString:              '"';
OpenBracket:                    '[';
CloseBracket:                   ']';
OpenParen:                      '(';
CloseParen:                     ')';
OpenCurlyBracket:               '{';
CloseCurlyBracket:              '}';
SemiColon:                      ';';
Comma:                          ',';
Assign:                         '=';
QuestionMark:                   '?';
Colon:                          ':';
Ellipsis:                       '...';
Dot:                            '.';
Plus:                           '+';
Minus:                          '-';
BitNot:                         '~';
Not:                            '!';
Multiply:                       '*';
Divide:                         '/';
Modulus:                        '%';
LessThan:                       '<';
MoreThan:                       '>';
Equals_:                        '==';
NotEquals:                      '!=';
BitAnd:                         '&';
BitXOr:                         '^';
BitOr:                          '|';
And:                            '&&';
Or:                             'OR';
MultiplyAssign:                 '*=';
DivideAssign:                   '/=';
ModulusAssign:                  '%=';
PlusAssign:                     '+=';
MinusAssign:                    '-=';
ARROW:                          '=>';

/// Null Literals
NullLiteral:                    'null';

/// Boolean Literals
BooleanLiteral:                 'true'
              |                 'false';

/// Numeric Literals
IntegerLiteral:               DecimalIntegerLiteral
              ;
DecimalLiteral:                 DecimalIntegerLiteral '.' [0-9]* ExponentPart?
              |                 '.' [0-9]+ ExponentPart?
              |                 DecimalIntegerLiteral ExponentPart?
              ;

HexIntegerLiteral:              '0' [xX] HexDigit+;
OctalIntegerLiteral:            '0' [0-7]+;
OctalIntegerLiteral2:           '0' [oO] [0-7]+;
BinaryIntegerLiteral:           '0' [bB] [01]+;


/// Keywords
New:                            'new';

Const:                          'const';
Props:                          'Props';
DTO:                            'DTO';
RESTController:                 'RESTController';
GraphQLController:              'GraphQLController';
GRPCController:                 'GRPCController';
UseCase:                        'UseCase';
ValueObject:                    'ValueObject';
AggregateRoot:                  'AggregateRoot';
Entity:                         'Entity';
DomainEvent:                    'DomainEvent';
Service:                        'Service';
Repository:                     'Repository';
Factory:                        'Factory';
DomainError:                    'DomainError';
ApplicationError:               'ApplicationError';
OK:                             'OK';
Error:                          'Error';
Config:                         'Config';
Struct:                         'Struct';
Function_:                      'function';
RepoPort:                       'RepoPort';
RepoAdapters:                   'RepoAdapters';
RepoConnections:                'RepoConnections';
Mongo:                          'Mongo';
// Primitives
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

At: '@';

JestTestSingleExpression: 'JestTestSingleExpression';

/// Identifier Names and Identifiers

RepoPortIdentifier:             UpperCaseStart IdentifierPart* RepoPort;
Identifier:                     IdentifierStart IdentifierPart*;
Digits:                         [0-9]+;
Digit:                          [0-9];

/// String Literals
StringLiteral:                 ('"' DoubleStringCharacter* '"'
            //  |                  '\'' SingleStringCharacter* '\'') {this.ProcessStringLiteral();}
             |                  '\'' SingleStringCharacter* '\'')
             ;

WS: [ \n\t\r]+ -> skip;
// Fragment rules

// WORD: (LOWERCASE | UPPERCASE)+;
// fragment LOWERCASE: [a-z];
// fragment UPPERCASE: [A-Z];
fragment DIGIT: '0'..'9' ;

fragment UpperCaseStart
    : [\p{Lu}]
    ;

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
    | [1-9] [0-9]*
    ;

fragment ExponentPart
    : [eE] [+-]? [0-9]+
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

