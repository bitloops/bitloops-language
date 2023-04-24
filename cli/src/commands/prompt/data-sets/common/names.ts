const Suffixes = {
  TOKEN: 'Token',
  PORT: 'Port',
  WRITE_PORT: 'WriteRepoPort',
  READ_PORT: 'ReadRepoPort',
  SERVICE_PORT: 'ServicePort',
};

export const getNameFromToken = (str: string): string => {
  if (!str.endsWith(Suffixes.TOKEN)) throw new Error(str + ' is not a Token');

  let value = str;

  // Remove token suffix
  value = str.slice(0, -Suffixes.TOKEN.length);

  if (value.endsWith(Suffixes.PORT)) {
    return value.slice(0, -Suffixes.PORT.length);
  }
  return value;
};

export const getNameFromPort = (str: string): string => {
  if (!str.endsWith(Suffixes.PORT)) throw new Error(str + ' is not a Port');

  // Remove port suffix
  return str.slice(0, -Suffixes.PORT.length);
};
