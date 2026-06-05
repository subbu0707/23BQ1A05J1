import { Notification } from "./types";

// Priority weights as per requirements
const PRIORITY_WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1,
} as const;

/**
 * Generates priority inbox by:
 * 1. Sorting notifications by priority weight (descending)
 * 2. Then by timestamp (newest first)
 * 3. Taking top 10 notifications
 */
export function generatePriorityInbox(
  notifications: Notification[],
): Notification[] {
  try {
    console.log(
      `Processing ${notifications.length} notifications for priority inbox...`,
    );

    // Sort by priority weight first, then by timestamp
    const sortedNotifications = [...notifications].sort((a, b) => {
      // Compare priority weights
      const priorityDiff = PRIORITY_WEIGHTS[b.Type] - PRIORITY_WEIGHTS[a.Type];

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      // If same priority, sort by timestamp (newest first)
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    });

    // Take top 10
    const topTen = sortedNotifications.slice(0, 10);

    console.log(
      `✓ Priority inbox generated with ${topTen.length} notifications`,
    );
    console.log("\nPriority Inbox (Top 10):");
    console.log("------------------------");
    topTen.forEach((notification, index) => {
      console.log(
        `${index + 1}. [${notification.Type}] ${notification.Message} (${notification.Timestamp})`,
      );
    });

    return topTen;
  } catch (error: any) {
    console.error("✗ Error generating priority inbox:", error.message);
    throw error;
  }
}

/**
 * Get priority weight for a notification type
 */
export function getPriorityWeight(type: Notification["Type"]): number {
  return PRIORITY_WEIGHTS[type];
}

export default generatePriorityInbox;
