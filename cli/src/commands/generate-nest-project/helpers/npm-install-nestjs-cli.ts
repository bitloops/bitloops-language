import { spawn } from 'child_process';

/**
 * installs the NestJS CLI
 */
export const npmInstallNestJsCli = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const NEST_JS_SUCCESSFULLY_INSTALLED_MESSAGE = 'NestJS CLI installed successfully.\n';
    const NEST_JS_INSTALL_ERROR_MESSAGE =
      'An error has occurred during the installation of @nestjs/cli.\nPlease run "npm install -g @nestjs/cli" to install it.\n';
    const command = spawn('npm', ['install', '-g', '@nestjs/cli@9.5.0']);

    command.stdout.on('data', (data) => {
      // console.log(`stdout: ${data}`);
      console.log(data.toString());
    });

    command.stderr.on('data', (data) => {
      console.error(data.toString());
      // console.error(`stderr: ${data}`);.
    });

    command.on('close', (code) => {
      //   console.log(`child process exited with code ${code}`);
      if (code === 0) {
        console.log(NEST_JS_SUCCESSFULLY_INSTALLED_MESSAGE);
        resolve();
        return;
      }
      console.log(NEST_JS_INSTALL_ERROR_MESSAGE);
      reject();
    });

    command.on('error', () => {
      // console.log(`child process exited with code ${code}`);
      console.log(NEST_JS_INSTALL_ERROR_MESSAGE);
      reject();
    });
  });
};
