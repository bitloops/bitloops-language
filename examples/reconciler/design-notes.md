# Reconciler Design

## Entities

* Ledger
* BankTransaction
* Reconciliation (Aggregate Root)
* LedgerEntry
* OldLedgerEntry
* BankTransactionStatement
* Lexer

## Suggestions

### Lexer

* Lexer should have the following methods:
  * getTokens()
* Lexer should have to get the Lexer options when it is constructed (Inside the ledger entry/BankTransaction)

The lexer options shall live inside a common ancestor of BankTransaction or LedgerEntry -> AccountingEntry

Who is responsible for getting the token and token types? -> AccountingEntry

AccountingEntry has a lexer 
it has the following methods (previously belonging to the Lexer):


- getCategories
- getTerms
- getNumbers
- getAlphanumeric
- getCompounds

(maybe all those shall be private and expose only getTags all the tags).

The AccountingEntry will have the lexer configuration as a field. Each get ("categories, terms", 'etc) will invoke the lexer 


