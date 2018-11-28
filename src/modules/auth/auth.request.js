import * as Yup from 'yup';
import validator from '../../services/validation/Validator';

export async function RequestLogin(req, _, next) {
  const loginSchema = Yup.object().shape({
    password: Yup.string().required(),
    email: Yup.string()
    .required()
    .exists('User', 'userName|email', 'User not active', (q) => {
      return q.where('active').equals(true);
    }),
  });

  try {
    await validator.validate(req.body, loginSchema); 
  } catch (error) {
    return next(error);
  }

  return next();
}

export async function RequestRegister(req, _, next) {
  const loginSchema = Yup.object().shape({
    password: Yup.string().required().min(6).max(18),
    email: Yup.string()
    .required()
    .email()
    .max(255)
    .unique('User', 'email', 'Email already taken'),
    username: Yup.string()
    .required()
    .max(255)
    .unique('User', 'userName', 'Username already taken')
  });

  try {
    await validator.validate(req.body, loginSchema); 
  } catch (error) {
    return next(error);
  }

  return next();
}
