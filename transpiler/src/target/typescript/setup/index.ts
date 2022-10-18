// import { createDirectory } from '../helpers/createDirectory.js';
// import { readFromFile, writeToFile } from '../helpers/fileOperations.js';
import chalk from 'chalk';
// import path from 'path';
import packageJSONTemplate from './package-template.json';
import { SetupTypeScript } from './SetupTypeScript.js';
import { ISetupData, TBitloopsTargetSetupContent, TBoundedContexts } from '../../../types.js';
import { BitloopsTargetSetupGeneratorError } from '../../BitloopsTargetSetupGeneratorError.js';
// import { mockData } from './mockSetupData.js';

type TSetupOutput = { filePath: string; content: string };

export const generateSetupFiles = (
  setupData: ISetupData,
  _bitloopsModel: TBoundedContexts,
  // outputDirPath: string,
  sourceDirPath: string,
): TBitloopsTargetSetupContent | BitloopsTargetSetupGeneratorError => {
  console.log('Generating system files...');
  const setup = new SetupTypeScript();
  const pathsAndContents: TSetupOutput[] = [];

  // Step 1. Generate routes files
  const routes = setup.generateServerRouters(setupData, _bitloopsModel);
  routes.forEach((router) => {
    pathsAndContents.push(router);
  });
  // console.log('routes:', routes);
  // console.log('--------------------------------');

  // Step 2. Generate routers files
  const routers = setup.generateAPIs(setupData.setup);
  // console.log('routers:', routers);
  // console.log('--------------------------------');
  routers.forEach((router) => {
    pathsAndContents.push(router);
  });

  // Step 3. Generate DIs
  const controllerDIs = setup.generateDIs(setupData, _bitloopsModel);
  // console.log('controllerDIs:', controllerDIs);
  console.log('--------------------------------');
  controllerDIs.forEach((controllerDI) => {
    pathsAndContents.push(controllerDI);
  });
  // const useCaseDIs = setup.generateUseCaseDIs(setupData, _bitloopsModel);
  // console.log('controllerDIs:', controllerDIs);
  // console.log('--------------------------------');
  // useCaseDIs.forEach((controllerDI) => {
  //   pathsAndContents.push(controllerDI);
  // });

  // Step 4. Setup server file
  const serverSetup = setup.generateServers(setupData.setup, _bitloopsModel);
  // console.log('serverSetup:', serverSetup);
  // console.log('--------------------------------');
  serverSetup.forEach((server) => {
    pathsAndContents.push(server);
  });

  // Step 5. Startup File
  const startupFile = setup.generateStartupFile(setupData.setup, setupData.repos);
  // console.log('startupFile:', startupFile);
  // console.log('--------------------------------');
  pathsAndContents.push(startupFile);

  // Step 6. Package files
  const packageFiles = setup.generatePackageFiles(setupData.packages, sourceDirPath);
  packageFiles.forEach((packageFile) => {
    pathsAndContents.push(packageFile);
  });
  // Step 7. Generate repo connections
  const repoConnections = setup.generateRepoConnections(setupData);
  repoConnections.forEach((repoConnection) => {
    pathsAndContents.push(repoConnection);
  });

  // console.log('pathsAndContents:', pathsAndContents);
  // TODO Move template files also

  // Step 7. Write files
  console.log('Writing system files to disk...');
  const result: TBitloopsTargetSetupContent = [];
  pathsAndContents.forEach((pathAndContent) => {
    const { filePath, content } = pathAndContent;
    result.push({ fileId: filePath, fileType: 'file', fileContent: content });
  });
  console.log('System files written successfully!');

  // Step 8. Write package.json
  console.log('Writing package.json information to disk...');
  // const packageJSONFilePath = `${outputDirPath}/package.json`;
  const packageJSON = {
    ...packageJSONTemplate,
    dependencies: setup.getNodeDependencies(),
    devDependencies: setup.getNodeDevDependencies(),
  };
  // writeToFile(JSON.stringify(packageJSON, null, 2), packageJSONFilePath);
  result.push({
    fileId: 'package.json',
    fileType: 'package.json',
    fileContent: JSON.stringify(packageJSON),
  });
  console.log('package.json written successfully!');

  const greenColor = chalk.hex('#00ff00');
  console.log(greenColor('Project generated successfully!'));
  return result;
};

// const getServerTypeFromServerName = (serverName: string, data: any): string => {
//   return data.setup.servers.find((server) => server.name === serverName).type;
// };

// const getServerType = (routerName: string, data: any): string => {
//   const serverName = data.setup.addRouterToServer[routerName].server;
//   return getServerTypeFromServerName(serverName, data);
// };

// const getServerName = (routerName: string, data: any): string => {
//   const serverName = data.setup.addRouterToServer[routerName].server;
//   return serverName;
// };

// const moveRouteTemplateFileToTarget = (outputDirPath: string, controllerPath: string): void => {
//   const templateFile = `${outputDirPath}/src/shared/infra/${controllerPath}/index.ts.template`;
//   const targetFilePath = `${outputDirPath}/src/shared/infra/${controllerPath}/router`;
//   const targetFileName = `${targetFilePath}/index.ts`;
//   const routerTemplateFileContents = readFromFile(templateFile);
//   createDirectory(targetFilePath);
//   writeToFile(routerTemplateFileContents, targetFileName);
// };

// generateSetupFiles(mockData, {} as any, './project/');
