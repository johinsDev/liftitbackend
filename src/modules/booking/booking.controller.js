import HTTPStatus from 'http-status';
import Booking from './booking.model';

export async function create(req, res, next) {
  try {
    const booking = await Booking.createBooking({
      ...req.body,
      user: req.user._id
    });

    res.status(HTTPStatus.OK).json(booking);
  } catch (error) {
    return next(error);
  }
}

export async function get(req, res, next) {
  try {
    const bookings = await Booking.find({
      user: req.user._id
    });

    res.status(HTTPStatus.OK).json(bookings);
  } catch (error) {
    return next(error);
  }
}
