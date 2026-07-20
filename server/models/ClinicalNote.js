import mongoose from "mongoose";

const clinicalNoteSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    chiefComplaint: {
      type: String,
      required: true,
      trim: true,
    },

    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },

    treatmentDone: {
      type: String,
      required: true,
      trim: true,
    },

    prescription: {
      type: String,
      default: "",
      trim: true,
    },

    advice: {
      type: String,
      default: "",
      trim: true,
    },

    followUpDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ClinicalNote", clinicalNoteSchema);