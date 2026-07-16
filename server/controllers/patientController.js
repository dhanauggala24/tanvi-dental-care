import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";

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

    // Create appointment
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