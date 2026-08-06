import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

// ============================
// Get All Appointments
// ============================
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

// ============================
// Approve Appointment
// ============================
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

// ============================
// Assign Doctor
// ============================
export const assignDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorId } = req.body;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const doctor = await User.findById(doctorId);

    if (!doctor || doctor.role !== "owner") {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

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