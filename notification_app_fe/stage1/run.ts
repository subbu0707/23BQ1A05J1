import dotenv from "dotenv";
import fetchNotifications from "./fetchNotifications";
import generatePriorityInbox from "./priorityInbox";

// Load environment variables
dotenv.config({ path: "../.env" });

async function main() {
  try {
    console.log("=".repeat(50));
    console.log("STAGE 1: PRIORITY INBOX IMPLEMENTATION");
    console.log("=".repeat(50));
    console.log();

    // Get access token from environment
    const accessToken = process.env.ACCESS_TOKEN;

    if (!accessToken) {
      throw new Error("ACCESS_TOKEN not found in environment variables");
    }

    // Step 1: Fetch all notifications
    console.log("STEP 1: Fetching Notifications");
    console.log("-".repeat(50));
    const allNotifications = await fetchNotifications(accessToken);
    console.log();

    // Step 2: Generate priority inbox
    console.log("STEP 2: Generating Priority Inbox");
    console.log("-".repeat(50));
    const priorityInbox = generatePriorityInbox(allNotifications);
    console.log();

    // Step 3: Display summary
    console.log("STEP 3: Summary");
    console.log("-".repeat(50));
    console.log(`Total Notifications Fetched: ${allNotifications.length}`);
    console.log(`Priority Inbox Size: ${priorityInbox.length}`);
    console.log();

    // Step 4: Display distribution
    console.log("Priority Distribution:");
    const distribution = {
      Placement: priorityInbox.filter((n) => n.Type === "Placement").length,
      Result: priorityInbox.filter((n) => n.Type === "Result").length,
      Event: priorityInbox.filter((n) => n.Type === "Event").length,
    };
    console.log(`  Placement: ${distribution.Placement}`);
    console.log(`  Result: ${distribution.Result}`);
    console.log(`  Event: ${distribution.Event}`);
    console.log();

    console.log("=".repeat(50));
    console.log("✓ STAGE 1 COMPLETED SUCCESSFULLY");
    console.log("=".repeat(50));
  } catch (error: any) {
    console.error("\n✗ STAGE 1 FAILED");
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
