import mongoose, { Schema } from 'mongoose';
import filteredBody from '../utils/filteredBody';

const filleable = [ 'name' ];

const PermissionSchema = new Schema(
  {
    name: String,
    roles: [{
      type: Schema.Types.ObjectId,
      ref: 'Role',
    }],
  },
  { timestamps: true },
);

PermissionSchema.index({ name: 1 });

PermissionSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      name: this.name,
      roles: this.roles
    };
  },
};


export default mongoose.model('Permission', PermissionSchema);