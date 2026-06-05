export interface Notification {
  ID: string;
  Type: "Placement" | "Result" | "Event";
  Message: string;
  Timestamp: string;
}

export interface NotificationResponse {
  notifications: Notification[];
  total?: number;
  page?: number;
  limit?: number;
}

export type NotificationType = "Placement" | "Result" | "Event" | "All";
