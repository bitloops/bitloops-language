import { spawn } from 'child_process';

export const generateNestProjectProcess = async (projectName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const HAVE_YOU_INSTALLED_NEST_JS_CLI_MESSAGE = 'Have you installed NestJS CLI?\n'; //TODO: is this message ok?
    const command = spawn('nest', ['new', projectName, '--skip-git', '-p', 'yarn']);

    command.stdout.on('data', (data) => {
      // console.log(`stdout: ${data}`);
      console.log(data.toString());
    });

    command.stderr.on('data', (data) => {
      console.error(data.toString());
      // console.error(`stderr: ${data}`);
    });

    command.on('close', (code) => {
      // console.log(`child process exited with code ${code}`);
      if (code === 0) {
        resolve();
        return;
      }
      console.log(HAVE_YOU_INSTALLED_NEST_JS_CLI_MESSAGE);
      reject();
    });

    command.on('error', (error) => {
      // console.log(`child process exited with code ${code}`);
      console.log(HAVE_YOU_INSTALLED_NEST_JS_CLI_MESSAGE);
      console.log(error); //TODO: we want to log the error or not?
      reject();
    });
  });
};
