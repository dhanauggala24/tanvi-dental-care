import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import ClinicalNote from "../models/ClinicalNote.js";

// ============================
// Register Patient + Appointment
// ============================
export const registerPatient = async (req, res) => {
  try {
    const {
      fullName,
      age,
      gender,
      phone,
      problem,
      preferredDate,
      preferredTime,
    } = req.body;

    // Check if patient already exists
    let patient = await Patient.findOne({ phone });

    // Create new patient if not found
    if (!patient) {
      const patientCount = await Patient.countDocuments();

      patient = await Patient.create({
        patientId: `P${String(patientCount + 1).padStart(6, "0")}`,
        fullName,
        age,
        gender,
        phone,
      });
    }

    // Create Appointment
    const appointmentCount = await Appointment.countDocuments();

    const appointment = await Appointment.create({
      appointmentId: `A${String(appointmentCount + 1).padStart(6, "0")}`,
      patient: patient._id,
      appointmentDate: preferredDate,
      appointmentTime: preferredTime,
      appointmentType: "Online",
      problem,
    });

    res.status(201).json({
      success: true,
      message: "Appointment Booked Successfully",
      patientId: patient.patientId,
      appointmentId: appointment.appointmentId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Patient History
// ============================
export const getPatientHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const history = await ClinicalNote.find({
      patient: patient._id,
    })
      .populate("doctor", "fullName email specialization")
      .populate(
        "appointment",
        "appointmentId appointmentDate appointmentTime problem status"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      patient,
      totalVisits: history.length,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};