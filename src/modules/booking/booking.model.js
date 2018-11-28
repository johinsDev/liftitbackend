import mongoose, { Schema } from 'mongoose';
import filteredBody from '../../utils/filteredBody';

const filleable = [ 'origin', 'destination', 'user' ];

const BookingSchema = new Schema(
  {
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  { timestamps: true },
);


BookingSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      origin: this.origin,
      destination: this.destination,
      created: this.createdAt
    };
  }
};


BookingSchema.statics = {
  createBooking(params) {
    return this.create({
     ...filteredBody(params, filleable)
    });
  }
}

BookingSchema.index({ origin: 1, destination: 1 });

export default mongoose.model('Booking', BookingSchema);