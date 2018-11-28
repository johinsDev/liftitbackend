import mongoose, { Schema } from 'mongoose';
import filteredBody from '../utils/filteredBody';

const filleable = [ 'name' ];

const RoleSchema = new Schema(
  {
    name: String
  },
  { timestamps: true }
);

RoleSchema.index({ name: 1 });

RoleSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      name: this.name,
      permissions: this.permissions
    };
  },
};

RoleSchema.virtual('permissions', {
  ref: 'Permission',
  localField: '_id',
  foreignField: 'roles'
});

export default mongoose.model('Role', RoleSchema);