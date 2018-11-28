import { Router } from 'express';
import * as BookingController from './booking.controller';
import { RequestCreateBooking } from './booking.request';
import { authenticate } from '../auth/auth.services';

const routes = Router();

routes.post(
  '/',
  RequestCreateBooking,
  authenticate,
  BookingController.create
);

routes.get(
  '/',
  authenticate,
  BookingController.get
);

export default routes;
