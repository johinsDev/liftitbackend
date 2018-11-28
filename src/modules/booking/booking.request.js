import * as Yup from 'yup';
import validator from '../../services/validation/Validator';

export async function RequestCreateBooking(req, _, next) {
  const bookingSchema = Yup.object().shape({
    origin: Yup.string().required(),
    destination: Yup.string().required()
  });

  try {
    await validator.validate(req.body, bookingSchema); 
  } catch (error) {
    return next(error);
  }

  return next();
}
