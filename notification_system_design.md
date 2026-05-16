# Stage 1 – Notification System Design

## Problem Statement

Users are receiving a high volume of notifications and missing important updates.  
The goal is to implement a Priority Inbox that displays the top unread notifications based on priority and recency.

---

# Objective

Build a backend system that:

- Fetches notifications from the given API
- Prioritizes notifications
- Displays top 10 important notifications
- Maintains efficient notification ranking
- Uses logging middleware
- Avoids database usage

---

# Priority Logic

Notification priority is calculated using:

Final Score = Type Weight × 100 + Recency Score

## Notification Weights

| Type | Weight |
|------|------|
| Placement | 3 |
| Result | 2 |
| Event | 1 |

---

# Recency Calculation

Recent notifications are given higher priority.

Recency Score decreases as notification age increases.

---

# Working Flow

1. Fetch notifications from API
2. Calculate score for each notification
3. Sort notifications in descending order
4. Return top 10 notifications

---

# Efficient Top 10 Maintenance

To efficiently maintain the top 10 notifications while new notifications continue arriving:

## Min Heap Approach

- Maintain a Min Heap of size 10
- Insert notifications based on score
- Remove lowest priority notification when heap exceeds size

### Time Complexity

- Insertion → O(log n)
- Retrieval → O(1)

This avoids sorting the complete dataset repeatedly.

---

# Technologies Used

- Node.js
- Express.js
- Axios
- JavaScript

---

# Logging Middleware

A custom logging middleware is implemented to:

- Track API requests
- Store request logs
- Monitor incoming traffic

Logs are saved in:

server.log

---

# Scalability Improvements

Future enhancements can include:

- Redis caching
- Kafka/RabbitMQ streaming
- Machine Learning based ranking
- User-customized priorities

---

# Conclusion

The system successfully prioritizes notifications using weighted scoring and recency logic while maintaining scalability and clean backend architecture.