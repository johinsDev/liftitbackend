import { Router } from 'express';
import * as AuthController from './auth.controller';
import { RequestLogin, RequestRegister } from './auth.request';
import { authenticate } from './auth.services';

const routes = Router();

routes.post(
  '/signin',
  RequestLogin,
  AuthController.login
);

routes.post(
  '/signup',
  RequestRegister,
  AuthController.register
);

routes.get(
  '/me',
  authenticate,
  AuthController.me
);

export default routes;
