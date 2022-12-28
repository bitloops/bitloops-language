import { FileUtil } from '../../../../../src/utils/file.js';
import { RestServerNodeDirector } from '../../builders/restServerNodeDirector.js';

export const VALID_REST_SERVER_CASES = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/restServerDeclaration/restServer.bl',
    ),
    description: 'Valid rest server',
    fileId: 'testFile.bl',
    restServer: new RestServerNodeDirector().buildRestServer(),
  },
];
