import generatePriorityInbox from "./priorityInbox";
import { Notification } from "./types";

// Mock notifications data for testing when API is unavailable
const mockNotifications: Notification[] = [
  {
    ID: "event-001",
    Type: "Event",
    Message: "Tech Fest 2026 registrations open",
    Timestamp: "2026-06-04T10:00:00Z",
  },
  {
    ID: "result-001",
    Type: "Result",
    Message: "Mid-semester exam results published",
    Timestamp: "2026-06-03T15:30:00Z",
  },
  {
    ID: "placement-001",
    Type: "Placement",
    Message: "Amazon campus hiring drive scheduled",
    Timestamp: "2026-06-05T08:00:00Z",
  },
  {
    ID: "placement-002",
    Type: "Placement",
    Message: "Microsoft internship applications",
    Timestamp: "2026-06-04T14:20:00Z",
  },
  {
    ID: "result-002",
    Type: "Result",
    Message: "Assignment 3 grades available",
    Timestamp: "2026-06-02T16:45:00Z",
  },
  {
    ID: "event-002",
    Type: "Event",
    Message: "Coding competition registration closes",
    Timestamp: "2026-06-01T23:59:00Z",
  },
  {
    ID: "placement-003",
    Type: "Placement",
    Message: "Infosys freshers program updated",
    Timestamp: "2026-06-05T09:15:00Z",
  },
  {
    ID: "result-003",
    Type: "Result",
    Message: "Project submission deadline extended",
    Timestamp: "2026-05-31T12:00:00Z",
  },
  {
    ID: "event-003",
    Type: "Event",
    Message: "Guest lecture by industry expert",
    Timestamp: "2026-05-30T10:00:00Z",
  },
  {
    ID: "placement-004",
    Type: "Placement",
    Message: "TCS hiring for associate roles",
    Timestamp: "2026-06-05T07:30:00Z",
  },
  {
    ID: "event-004",
    Type: "Event",
    Message: "Sports day registration",
    Timestamp: "2026-05-29T09:00:00Z",
  },
  {
    ID: "result-004",
    Type: "Result",
    Message: "Final exam schedule released",
    Timestamp: "2026-05-28T11:00:00Z",
  },
];

async function main() {
  try {
    console.log("=".repeat(60));
    console.log("STAGE 1: PRIORITY INBOX IMPLEMENTATION (MOCK TEST)");
    console.log("=".repeat(60));
    console.log();

    // Step 1: Show all notifications
    console.log(
      `STEP 1: Input Notifications (${mockNotifications.length} total)`,
    );
    console.log("-".repeat(60));
    mockNotifications.forEach((notification, index) => {
      console.log(
        `${index + 1}. [${notification.Type}] ${notification.Message}`,
      );
    });
    console.log();

    // Step 2: Generate priority inbox
    console.log("STEP 2: Generating Priority Inbox");
    console.log("-".repeat(60));
    const priorityInbox = generatePriorityInbox(mockNotifications);
    console.log();

    // Step 3: Display summary
    console.log("STEP 3: Summary");
    console.log("-".repeat(60));
    console.log(`Total Notifications Processed: ${mockNotifications.length}`);
    console.log(`Priority Inbox Size: ${priorityInbox.length}`);
    console.log();

    // Step 4: Display distribution
    console.log("Priority Distribution in Top 10:");
    const distribution = {
      Placement: priorityInbox.filter((n) => n.Type === "Placement").length,
      Result: priorityInbox.filter((n) => n.Type === "Result").length,
      Event: priorityInbox.filter((n) => n.Type === "Event").length,
    };
    console.log(`  Placement (Weight: 3): ${distribution.Placement}`);
    console.log(`  Result (Weight: 2): ${distribution.Result}`);
    console.log(`  Event (Weight: 1): ${distribution.Event}`);
    console.log();

    // Step 5: Verify sorting order
    console.log("Verification - Checking Sort Order:");
    console.log("-".repeat(60));
    let isCorrectlySorted = true;
    for (let i = 0; i < priorityInbox.length - 1; i++) {
      const current = priorityInbox[i];
      const next = priorityInbox[i + 1];

      const currentWeight: Record<string, number> = {
        Placement: 3,
        Result: 2,
        Event: 1,
      };
      const currentPriority = currentWeight[current.Type];
      const nextPriority = currentWeight[next.Type];

      if (currentPriority < nextPriority) {
        isCorrectlySorted = false;
        console.log(
          `✗ Sort error at position ${i + 1}: ${current.Type} (${currentPriority}) before ${next.Type} (${nextPriority})`,
        );
      }

      // Check timestamp if same priority
      if (
        currentPriority === nextPriority &&
        new Date(current.Timestamp) < new Date(next.Timestamp)
      ) {
        isCorrectlySorted = false;
        console.log(
          `✗ Timestamp error at position ${i + 1}: older timestamp before newer`,
        );
      }
    }

    if (isCorrectlySorted) {
      console.log("✓ All notifications are correctly sorted!");
    }
    console.log();

    console.log("=".repeat(60));
    console.log("✓ STAGE 1 MOCK TEST COMPLETED SUCCESSFULLY");
    console.log("=".repeat(60));
  } catch (error: any) {
    console.error("\n✗ STAGE 1 MOCK TEST FAILED");
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
