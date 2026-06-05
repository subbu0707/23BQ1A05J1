import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
} from "@mui/material";
import { Notification } from "../types";
import { readStatusUtils } from "../utils/readStatusUtils";

interface NotificationCardProps {
  notification: Notification;
  isRead: boolean;
  onMarkRead: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  isRead,
  onMarkRead,
}) => {
  const getPriorityColor = (
    type: string,
  ):
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success" => {
    switch (type) {
      case "Placement":
        return "error";
      case "Result":
        return "warning";
      case "Event":
        return "info";
      default:
        return "default";
    }
  };

  const handleCardClick = () => {
    if (!isRead) {
      onMarkRead();
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        cursor: "pointer",
        fontWeight: isRead ? "normal" : "bold",
        opacity: isRead ? 0.7 : 1,
        "&:hover": {
          boxShadow: 6,
          backgroundColor: "#f5f5f5",
        },
        transition: "all 0.2s ease",
      }}
      onClick={handleCardClick}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          mb={1}
        >
          <Chip
            label={notification.Type}
            color={getPriorityColor(notification.Type)}
            size="small"
            sx={{ fontWeight: "bold" }}
          />
          {!isRead && (
            <Chip
              label="New"
              size="small"
              sx={{ backgroundColor: "#ff9800", color: "white" }}
            />
          )}
        </Box>

        <Typography
          variant="body1"
          sx={{ mb: 1, fontWeight: isRead ? "normal" : "bold" }}
        >
          {notification.Message}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="textSecondary">
            {new Date(notification.Timestamp).toLocaleString()}
          </Typography>
          {!isRead && (
            <Button
              size="small"
              variant="text"
              onClick={(e) => {
                e.stopPropagation();
                onMarkRead();
              }}
            >
              Mark as Read
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
