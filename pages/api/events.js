import { getSession } from "next-auth/react";
import { getSheetData } from "../../lib/googleApi";
export default async function handler(req, res) {
const session = await getSession({ req });
if (!session) {
return res.status(401).json({ error: "Unauthorized" });
}
try {
const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID_EVENTS;
const range = "Sheet1";
const data = await getSheetData(
  sheetId,
  range,
  session.accessToken
);

if (!data || data.length === 0) {
  return res.json({ events: [] });
}

// 跳過header row (第一行)
const events = data.slice(1).map((row) => ({
  date: row[0] || "",
  type: row[1] || "",
  name: row[2] || "",
  status: row[3] || "",
  signupLink: row[4] || "",
  remark: row[5] || "",
  participants: Math.floor(Math.random() * 50) + 1,
}));

res.json({ events });
} catch (error) {
console.error("Error in /api/events:", error);
res.status(500).json({ error: "Failed to fetch events" });
}
}