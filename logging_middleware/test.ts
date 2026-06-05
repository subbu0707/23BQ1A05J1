import dotenv from "dotenv";
import Log from "./logger";

dotenv.config();

async function testLogger() {
  try {
    console.log("Testing Logger...");
    const result = await Log(
      "frontend",
      "info",
      "utils",
      "Logger initialized and working",
    );

    console.log("\n✓ Log created successfully!");
    console.log("Response:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("✗ Logger test failed:", error);
  }
}

testLogger();
