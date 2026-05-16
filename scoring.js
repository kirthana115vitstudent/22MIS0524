function calculateScore(notification) {
  const typeWeights = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  const weight = typeWeights[notification.Type] || 0;

  const currentTime = new Date();
  const notificationTime = new Date(notification.Timestamp);

  const minutesOld =
    (currentTime.getTime() - notificationTime.getTime()) / (1000 * 60);

  const recencyScore = Math.max(0, 100 - minutesOld);

  return weight * 100 + recencyScore;
}

module.exports = {
  calculateScore,
};