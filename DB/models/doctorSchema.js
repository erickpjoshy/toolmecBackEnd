import { Schema, model } from 'mongoose';

const doctorSchema = Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, trim: true, required: true },
    specialization: { type: String, trim: true, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
  },
  { timestamps: true }
);

const Doctor = model('Doctor', doctorSchema);

export default Doctor;
