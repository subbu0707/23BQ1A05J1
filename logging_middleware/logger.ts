import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function Log(
  stack: string,
  level: string,
  packageName: string,
  message: string,
) {
  try {
    const accessToken = process.env.ACCESS_TOKEN;

    if (!accessToken) {
      console.warn("ACCESS_TOKEN not found in environment variables");
      return null;
    }

    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.error("Error logging message:", error.message);
    throw error;
  }
}

export default Log;
