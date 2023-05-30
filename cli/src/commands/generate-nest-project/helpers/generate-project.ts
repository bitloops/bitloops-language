import { spawn } from 'child_process';

export const generateNestProjectProcess = async (projectName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
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
      }
      console.log('Have you installed NestJS CLI?');
      reject();
    });
  });
};
