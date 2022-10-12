import express from 'express';
import bodyParserImport from 'body-parser';
import morganImport from 'morgan';
import corsImport from 'cors';
import helmetImport from 'helmet';
import { BaseExpressController } from './models/BaseExpressController';

namespace Express {
  export const app = express;
  export const bodyParser = bodyParserImport;
  export const morgan = morganImport;
  export const cors = corsImport;
  export const helmet = helmetImport;
  export const BaseController = BaseExpressController;
}

export { Express };
