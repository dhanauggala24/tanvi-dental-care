import mongoose from "mongoose";

const clinicalNoteSchema = new mongoose.Schema(
  {
    clinicalNoteId: {
      type: String,
      unique: true,
      required: true,
    },

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
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

    toothNumbers: [
      {
        type: String,
      },
    ],

    treatmentDone: {
      type: String,
      required: true,
      trim: true,
    },

    medicines: [
      {
        name: String,
        dosage: String,
        frequency: String,
        duration: String,
      },
    ],

    nextVisitDate: Date,

    nextVisitReason: String,

    remarks: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ClinicalNote", clinicalNoteSchema);