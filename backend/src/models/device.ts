import mongoose, { Schema, Document } from 'mongoose';

export interface IDevice extends Document {
  name: string;
  serialNumber: string;
  creationDate: Date;
}

const DeviceSchema: Schema = new Schema({
   name: {
    type: String,
    required: [true, 'Device name is required'],
    minlength: [3, 'Device name must be at least 3 characters long'],
    maxlength: [50, 'Device name cannot exceed 50 characters'],
  },
  serialNumber: {
    type: String,
    required: [true, 'Serial number is required'],
    minlength: [5, 'Serial number must be at least 5 characters long'],
    maxlength: [20, 'Serial number cannot exceed 20 characters'],
    match: [/^[a-zA-Z0-9]*$/, 'Serial number must be alphanumeric'],
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IDevice>('Device', DeviceSchema);