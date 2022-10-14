const removeStringLiteralQuotes = (stringLiteral: Readonly<string>): string => {
  const lastIndex = stringLiteral.length - 1;
  return stringLiteral.slice(1, lastIndex);
};

export { removeStringLiteralQuotes };
