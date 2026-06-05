import axios from "axios";
import { Notification, NotificationResponse, NotificationType } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://4.224.186.213/evaluation-service";
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN || "";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const notificationService = {
  /**
   * Fetch all notifications with optional filtering
   */
  async getNotifications(
    limit: number = 100,
    page: number = 1,
    notificationType?: NotificationType,
  ): Promise<Notification[]> {
    try {
      const params: Record<string, any> = { limit, page };
      if (notificationType && notificationType !== "All") {
        params.notification_type = notificationType;
      }

      const response = await apiClient.get<NotificationResponse>(
        "/notifications",
        { params },
      );

      console.log(
        `✓ Fetched ${response.data.notifications.length} notifications`,
      );
      return response.data.notifications || [];
    } catch (error: any) {
      console.error("✗ Error fetching notifications:", error.message);
      throw error;
    }
  },

  /**
   * Fetch all notifications (for caching)
   */
  async getAllNotifications(): Promise<Notification[]> {
    return this.getNotifications(1000, 1);
  },

  /**
   * Get priority inbox (top 10)
   */
  async getPriorityInbox(): Promise<Notification[]> {
    try {
      const allNotifications = await this.getAllNotifications();

      // Priority weights
      const weights: Record<string, number> = {
        Placement: 3,
        Result: 2,
        Event: 1,
      };

      // Sort by priority then timestamp
      const sorted = [...allNotifications].sort((a, b) => {
        const priorityDiff = weights[b.Type] - weights[a.Type];
        if (priorityDiff !== 0) return priorityDiff;
        return (
          new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime()
        );
      });

      return sorted.slice(0, 10);
    } catch (error) {
      console.error("Error getting priority inbox:", error);
      throw error;
    }
  },
};

export default notificationService;
