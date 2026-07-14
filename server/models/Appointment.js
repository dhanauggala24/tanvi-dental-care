import mongoose from "mongoose";

const rescheduleSchema = new mongoose.Schema(
  {
    previousDate: Date,
    previousTime: String,

    newDate: Date,
    newTime: String,

    reason: String,

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      unique: true,
      required: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    appointmentTime: {
      type: String,
      required: true,
    },

    estimatedDuration: {
      type: Number,
      default: 30,
    },

    appointmentType: {
      type: String,
      enum: ["Online", "Walk-in"],
      required: true,
    },

    problem: {
      type: String,
      required: true,
      trim: true,
    },

    priority: {
      type: String,
      enum: ["Normal", "Urgent", "Emergency"],
      default: "Normal",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rescheduled",
        "Completed",
        "Cancelled",
        "No Show",
      ],
      default: "Pending",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    checkInTime: Date,

    consultationStartTime: Date,

    consultationEndTime: Date,

    rescheduleHistory: [rescheduleSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Appointment", appointmentSchema);