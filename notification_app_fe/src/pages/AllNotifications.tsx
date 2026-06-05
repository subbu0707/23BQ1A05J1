import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Notification, NotificationType } from "../types";
import notificationService from "../services/notificationService";
import NotificationCard from "../components/NotificationCard";
import FilterBar from "../components/FilterBar";
import PaginationBar from "../components/PaginationBar";
import { readStatusUtils } from "../utils/readStatusUtils";

const AllNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<NotificationType>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [readNotifications, setReadNotifications] = useState<Set<string>>(
    new Set(),
  );

  // Fetch notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await notificationService.getNotifications(1000, 1);
        setNotifications(data);
        setReadNotifications(readStatusUtils.getReadNotifications());
      } catch (err: any) {
        console.error("Error fetching notifications:", err);
        setError(
          "Failed to load notifications. " +
            (err.message || "Please try again later."),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Apply filter
  useEffect(() => {
    let filtered = notifications;

    if (selectedType !== "All") {
      filtered = notifications.filter((n) => n.Type === selectedType);
    }

    setFilteredNotifications(filtered);
    setCurrentPage(1);
  }, [notifications, selectedType]);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNotifications = filteredNotifications.slice(
    startIndex,
    endIndex,
  );
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  const handleMarkRead = (id: string) => {
    readStatusUtils.markAsRead(id);
    setReadNotifications(readStatusUtils.getReadNotifications());
  };

  const handleClearRead = () => {
    readStatusUtils.clearAll();
    setReadNotifications(new Set());
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 1, fontWeight: "bold" }}
        >
          📬 All Notifications
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Total: {filteredNotifications.length} notifications
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <FilterBar
        selectedType={selectedType}
        onFilterChange={setSelectedType}
        onClearRead={handleClearRead}
      />

      {paginatedNotifications.length === 0 ? (
        <Alert severity="info">No notifications found.</Alert>
      ) : (
        <>
          {paginatedNotifications.map((notification) => (
            <NotificationCard
              key={notification.ID}
              notification={notification}
              isRead={readNotifications.has(notification.ID)}
              onMarkRead={() => handleMarkRead(notification.ID)}
            />
          ))}

          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredNotifications.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </>
      )}
    </Container>
  );
};

export default AllNotifications;
