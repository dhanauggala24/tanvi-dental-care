import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

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
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "patientId fullName phone age gender")
      .populate("doctor", "fullName")
      .sort({ createdAt: -1 });

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
export const approveAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = "Approved";
    appointment.approvedBy = req.user._id;

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment approved successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const assignDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorId } = req.body;

    // Find appointment
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Find doctor
    const doctor = await User.findById(doctorId);

    if (!doctor || doctor.role !== "owner") {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Assign doctor
    appointment.doctor = doctor._id;

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Doctor assigned successfully",
      appointment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};