const { calculateScore } = require("../utils/scoring");

function getTopNotifications(notifications, limit = 10) {
  const scoredNotifications = notifications.map((notification) => ({
    ...notification,
    score: calculateScore(notification),
  }));

  scoredNotifications.sort((a, b) => b.score - a.score);

  return scoredNotifications.slice(0, limit);
}

module.exports = {
  getTopNotifications,
};