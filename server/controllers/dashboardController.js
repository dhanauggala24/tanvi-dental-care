export const getOwnerDashboard = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      dashboard: {
        todaysPatients: 0,
        pendingAppointments: 0,
        waitingForAssignment: 0,
        completedAppointments: 0,
        upcomingAppointments: 0,
        todayRevenue: 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};