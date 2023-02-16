### BL

```
Test MyTest {
    string name;
    string description;
}
```

### Lexer

```
Test:               'Test';
TestIdentifier:     UpperCaseStart IdentifierPart* Test;
```

### Parser

```
testIdentifier
    : TestIdentifier
    ;

testDeclaration
    : Test testIdentifier OpenBrace fieldList CloseBrace
    ;

sourceElement
    :
    .....
    | testDeclaration
    ;
```
