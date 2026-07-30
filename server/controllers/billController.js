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