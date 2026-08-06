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

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.status !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Complete treatment before generating bill.",
      });
    }

    const existingBill = await Bill.findOne({
      appointment: appointment._id,
    });

    if (existingBill) {
      return res.status(400).json({
        success: false,
        message: "Bill already exists for this appointment.",
      });
    }

    let totalAmount = 0;

    treatments.forEach((item) => {
      totalAmount += item.cost;
    });

    let paymentStatus = "Pending";

    if (amountPaid >= totalAmount) {
      paymentStatus = "Paid";
    } else if (amountPaid > 0) {
      paymentStatus = "Partial";
    }

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

// ===================================
// Get All Bills
// ===================================
export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find()
      .populate("patient", "patientId fullName phone")
      .populate("doctor", "fullName specialization")
      .populate(
        "appointment",
        "appointmentId appointmentDate appointmentTime"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bills.length,
      bills,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Get Bill By ID
// ===================================
export const getBillById = async (req, res) => {
  try {
    const { id } = req.params;

    const bill = await Bill.findById(id)
      .populate("patient", "patientId fullName phone age gender")
      .populate("doctor", "fullName specialization")
      .populate(
        "appointment",
        "appointmentId appointmentDate appointmentTime problem"
      );

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    res.status(200).json({
      success: true,
      bill,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};