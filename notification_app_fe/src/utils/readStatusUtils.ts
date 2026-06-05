// Local storage utilities for managing read/unread notifications

const READ_NOTIFICATIONS_KEY = "readNotifications";

export const readStatusUtils = {
  /**
   * Get all read notification IDs
   */
  getReadNotifications(): Set<string> {
    const stored = localStorage.getItem(READ_NOTIFICATIONS_KEY);
    if (!stored) return new Set();
    try {
      return new Set(JSON.parse(stored));
    } catch {
      return new Set();
    }
  },

  /**
   * Check if a notification is read
   */
  isRead(notificationId: string): boolean {
    return this.getReadNotifications().has(notificationId);
  },

  /**
   * Mark a notification as read
   */
  markAsRead(notificationId: string): void {
    const readIds = this.getReadNotifications();
    readIds.add(notificationId);
    localStorage.setItem(
      READ_NOTIFICATIONS_KEY,
      JSON.stringify(Array.from(readIds)),
    );
    console.log(`Marked notification ${notificationId} as read`);
  },

  /**
   * Mark multiple notifications as read
   */
  markManyAsRead(notificationIds: string[]): void {
    const readIds = this.getReadNotifications();
    notificationIds.forEach((id) => readIds.add(id));
    localStorage.setItem(
      READ_NOTIFICATIONS_KEY,
      JSON.stringify(Array.from(readIds)),
    );
  },

  /**
   * Clear all read notifications
   */
  clearAll(): void {
    localStorage.removeItem(READ_NOTIFICATIONS_KEY);
  },
};

export default readStatusUtils;
