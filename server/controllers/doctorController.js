import Appointment from "../models/Appointment.js";
import ClinicalNote from "../models/ClinicalNote.js";

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user._id,
    })
      .populate("patient", "patientId fullName phone age gender")
      .sort({ appointmentDate: 1, appointmentTime: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const saveClinicalNote = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      chiefComplaint,
      diagnosis,
      treatmentDone,
      prescription,
      advice,
      followUpDate,
    } = req.body;

    // Find appointment
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Create Clinical Note
    const clinicalNote = await ClinicalNote.create({
      appointment: appointment._id,
      patient: appointment.patient,
      doctor: req.user._id,

      chiefComplaint,
      diagnosis,
      treatmentDone,
      prescription,
      advice,
      followUpDate,
    });

    // Mark appointment completed
    appointment.status = "Completed";
    await appointment.save();

    res.status(201).json({
      success: true,
      message: "Clinical note saved successfully",
      clinicalNote,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};