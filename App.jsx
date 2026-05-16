import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Grid,
  Box,
} from "@mui/material";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/priority-notifications"
      );

      const updatedNotifications =
        response.data.notifications.map((item) => ({
          ...item,
          viewed: false,
        }));

      setNotifications(updatedNotifications);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getChipColor = (type) => {
    switch (type) {
      case "Placement":
        return "success";
      case "Result":
        return "primary";
      case "Event":
        return "warning";
      default:
        return "default";
    }
  };

  const markAsViewed = (id) => {
    const updated = notifications.map((item) =>
      item.ID === id
        ? { ...item, viewed: true }
        : item
    );

    setNotifications(updated);
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        fontWeight="bold"
      >
        Priority Inbox
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 10,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {notifications.map((notification) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={notification.ID}
            >
              <Card
                onClick={() =>
                  markAsViewed(notification.ID)
                }
                sx={{
                  borderRadius: 4,
                  cursor: "pointer",
                  boxShadow: 4,
                  opacity: notification.viewed ? 0.6 : 1,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Chip
                      label={notification.Type}
                      color={getChipColor(notification.Type)}
                    />

                    <Chip
                      label={
                        notification.viewed
                          ? "Viewed"
                          : "New"
                      }
                      color={
                        notification.viewed
                          ? "default"
                          : "error"
                      }
                    />
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    {notification.Message}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {notification.Timestamp}
                  </Typography>

                  <Typography sx={{ mt: 2 }}>
                    Priority Score:
                    {" "}
                    {notification.score}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default App;