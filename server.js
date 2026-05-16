const express = require("express");
const axios = require("axios");
const { getTopNotifications } = require("./services/priorityService");

const app = express();
const PORT = 3000;

app.get("/priority-notifications", async (req, res) => {
  try {
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications"
    );

    const notifications = response.data.notifications;

    const topNotifications = getTopNotifications(notifications, 10);

    res.json({
      total: topNotifications.length,
      notifications: topNotifications,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Error fetching notifications",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});