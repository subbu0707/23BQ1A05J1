import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { Notification } from "../types";
import notificationService from "../services/notificationService";
import NotificationCard from "../components/NotificationCard";
import { readStatusUtils } from "../utils/readStatusUtils";

const PriorityInbox: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readNotifications, setReadNotifications] = useState<Set<string>>(
    new Set(),
  );

  // Fetch priority inbox on component mount
  useEffect(() => {
    const fetchPriorityInbox = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await notificationService.getPriorityInbox();
        setNotifications(data);
        setReadNotifications(readStatusUtils.getReadNotifications());
      } catch (err: any) {
        console.error("Error fetching priority inbox:", err);
        setError(
          "Failed to load priority inbox. " +
            (err.message || "Please try again later."),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPriorityInbox();
  }, []);

  const handleMarkRead = (id: string) => {
    readStatusUtils.markAsRead(id);
    setReadNotifications(readStatusUtils.getReadNotifications());
  };

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: 4, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  // Calculate priority distribution
  const distribution = {
    Placement: notifications.filter((n) => n.Type === "Placement").length,
    Result: notifications.filter((n) => n.Type === "Result").length,
    Event: notifications.filter((n) => n.Type === "Event").length,
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 1, fontWeight: "bold" }}
        >
          ⭐ Priority Inbox (Top 10)
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Your most important notifications sorted by priority
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Priority Distribution Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={4}>
          <Box
            sx={{
              p: 2,
              backgroundColor: "#ffebee",
              borderRadius: 1,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#c62828" }}
            >
              {distribution.Placement}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Placements
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box
            sx={{
              p: 2,
              backgroundColor: "#fff3e0",
              borderRadius: 1,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#f57c00" }}
            >
              {distribution.Result}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Results
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box
            sx={{
              p: 2,
              backgroundColor: "#e3f2fd",
              borderRadius: 1,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#1565c0" }}
            >
              {distribution.Event}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Events
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {notifications.length === 0 ? (
        <Alert severity="info">No notifications available.</Alert>
      ) : (
        <Box>
          {notifications.map((notification, index) => (
            <Box key={notification.ID} sx={{ position: "relative" }}>
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  left: -40,
                  fontWeight: "bold",
                  color: "textSecondary",
                }}
              >
                #{index + 1}
              </Typography>
              <NotificationCard
                notification={notification}
                isRead={readNotifications.has(notification.ID)}
                onMarkRead={() => handleMarkRead(notification.ID)}
              />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default PriorityInbox;
