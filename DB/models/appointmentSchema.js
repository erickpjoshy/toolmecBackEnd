import { Schema, model } from 'mongoose';

const appointmentSchema = Schema(
  {
    slot: { type: Schema.Types.ObjectId, ref: 'Slot' },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['BOOKED', 'DONE', 'CANCELLED'] },
  },
  { timestamps: true }
);

const Appointment = model('Appointment', appointmentSchema);

export default Appointment;
