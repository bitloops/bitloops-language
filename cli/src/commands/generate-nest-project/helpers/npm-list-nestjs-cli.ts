import { spawn } from 'child_process';

/**
 * checks if the NestJS CLI is installed
 */

export const checkForNestJsCli = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const NEST_JS_NOT_INSTALLED_MESSAGE =
      'NestJS CLI is not installed. We are going to install it...\n';
    const NEST_JS_INSTALLED_MESSAGE = 'NestJS CLI is installed.\n';

    const command = spawn('npm', ['list', '-g', '@nestjs/cli@9.5.0']);

    command.stdout.on('data', (data) => {
      // console.log(`stdout: ${data}`);
      console.log(data.toString());
    });

    command.stderr.on('data', (data) => {
      console.error(data.toString());
      // console.error(`stderr: ${data}`);
    });

    command.on('close', (code) => {
      //   console.log(`child process exited with code ${code}`);
      if (code === 0) {
        //code 0 means that the package is installed
        console.log(NEST_JS_INSTALLED_MESSAGE);
        resolve();
        return;
      }
      console.log(NEST_JS_NOT_INSTALLED_MESSAGE);
      reject();
    });

    command.on('error', () => {
      // console.log(`child process exited with code ${code}`);
      reject();
    });
  });
};
