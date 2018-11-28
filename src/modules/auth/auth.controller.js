import passport from 'passport';
import HTTPStatus from 'http-status';
import APIError from '../../services/error';
import User from './user.model';
import UserRequestedActivationEmail from '../activate/userRequestedActivationEmail.event';

export async function login(req, res, next) {
  passport.authenticate('local', { session: true }, function(err, user, info) {
    if (err) return next(err);

    if (!user) {
      return next(new APIError(info.message, HTTPStatus.UNAUTHORIZED, true));
    }

    res.status(HTTPStatus.OK).json(user.toAuthJSON());
  })(req, res, next)
}

export async function register(req, res, next) {
  try {
    const user = await User.createUser({
      ...req.body,
      active: true
    });

    res.status(HTTPStatus.OK).json(user.toAuthJSON());
  } catch (error) {
    return next(error);
  }
}

export async function me(req, res, next) {
  try {
    res.status(HTTPStatus.OK).json(req.user);
  } catch (error) {
    return next(error);
  }
}
