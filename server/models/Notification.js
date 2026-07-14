import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    notificationId: {
      type: String,
      unique: true,
      required: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },

    type: {
      type: String,
      enum: ["SMS", "WhatsApp", "Email"],
      required: true,
    },

    subject: String,

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Sent", "Failed"],
      default: "Pending",
    },

    sentBy: {
      type: String,
      enum: ["System", "Receptionist"],
      default: "System",
    },

    sentAt: Date,

    failureReason: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", notificationSchema);