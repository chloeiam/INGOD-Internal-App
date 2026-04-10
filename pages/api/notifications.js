import { getSession } from "next-auth/react";
import { getSheetData } from "../../lib/googleApi";
export default async function handler(req, res) {
const session = await getSession({ req });
if (!session) {
return res.status(401).json({ error: "Unauthorized" });
}
try {
const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID_NOTIFICATIONS;
const range = "Notifications";
const data = await getSheetData(
  sheetId,
  range,
  session.accessToken
);

if (!data || data.length === 0) {
  return res.json({ notifications: [] });
}

// 跳過header row
const notifications = data.slice(1).map((row) => ({
  title: row[0] || "",
  message: row[1] || "",
  date: row[2] || "",
}));

res.json({ notifications });
} catch (error) {
console.error("Error in /api/notifications:", error);
res.status(500).json({ error: "Failed to fetch notifications" });
}
}