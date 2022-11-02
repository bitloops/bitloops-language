import chalk from 'chalk';

const TAB = '  ';
const SPINNER_COLOR = 'magenta';
const greenColor = chalk.hex('#00ff00');
const redColor = chalk.hex('#ff0000');
const purpleColor = chalk.hex('#800080');
const yellowColor = chalk.hex('#ffff00');
const timeout = async (
  ms: number,
  throbber: any,
  persistMessage: string,
  icon: string,
): Promise<void> => {
  throbber.color = SPINNER_COLOR;
  await new Promise((resolve) => setTimeout(resolve, ms));
  throbber.stopAndPersist({
    symbol: TAB + icon,
    text: persistMessage,
  });
};

const stopSpinner = (throbber: any, persistMessage: string, icon: string): void => {
  throbber.color = SPINNER_COLOR;
  throbber.stopAndPersist({
    symbol: TAB + icon,
    text: persistMessage,
  });
};

export { greenColor, redColor, purpleColor, yellowColor, timeout, stopSpinner, TAB };
