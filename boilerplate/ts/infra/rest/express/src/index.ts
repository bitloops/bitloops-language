import express from 'express';
import bodyParserImport from 'body-parser';
import morganImport from 'morgan';
import corsImport from 'cors';
import helmet from 'helmet';
import { BaseExpressController } from './models/BaseExpressController.js';

namespace Express {
  export const app = express;
  export const bodyParser = bodyParserImport;
  export const morgan = morganImport;
  export const cors = corsImport;
  export const BaseController = BaseExpressController;
}

export { Express, helmet };
