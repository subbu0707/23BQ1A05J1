import axios from "axios";
import { Notification, NotificationResponse } from "./types";

const API_BASE_URL = "http://4.224.186.213/evaluation-service";

export async function fetchNotifications(
  accessToken: string,
): Promise<Notification[]> {
  try {
    console.log("Fetching notifications from API...");

    const response = await axios.get<NotificationResponse>(
      `${API_BASE_URL}/notifications`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log(
      `✓ Successfully fetched ${response.data.notifications.length} notifications`,
    );
    return response.data.notifications;
  } catch (error: any) {
    console.error("✗ Error fetching notifications:", error.message);
    throw error;
  }
}

export default fetchNotifications;
