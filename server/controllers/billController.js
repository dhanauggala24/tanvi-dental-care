import Bill from "../models/Bill.js";
import Appointment from "../models/Appointment.js";

// ===================================
// Generate Bill
// ===================================
export const generateBill = async (req, res) => {
  try {
    const {
      appointmentId,
      treatments,
      paymentMethod,
      amountPaid,
      remarks,
    } = req.body;

    // Find Appointment
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Treatment must be completed
    if (appointment.status !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Complete treatment before generating bill.",
      });
    }

    // Prevent duplicate bill
    const existingBill = await Bill.findOne({
      appointment: appointment._id,
    });

    if (existingBill) {
      return res.status(400).json({
        success: false,
        message: "Bill already exists for this appointment.",
      });
    }

    // Calculate Total
    let totalAmount = 0;

    treatments.forEach((item) => {
      totalAmount += item.cost;
    });

    // Decide payment status
    let paymentStatus = "Pending";

    if (amountPaid >= totalAmount) {
      paymentStatus = "Paid";
    } else if (amountPaid > 0) {
      paymentStatus = "Partial";
    }

    // Generate Bill Number
    const billCount = await Bill.countDocuments();

    const bill = await Bill.create({
      billNumber: `INV${String(billCount + 1).padStart(6, "0")}`,
      patient: appointment.patient,
      appointment: appointment._id,
      doctor: appointment.doctor,
      treatments,
      totalAmount,
      amountPaid,
      paymentStatus,
      paymentMethod,
      remarks,
    });

    res.status(201).json({
      success: true,
      message: "Bill generated successfully",
      bill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};