import { getSession } from "next-auth/react";
import { getCalendarEvents } from "../../lib/googleApi";
export default async function handler(req, res) {
const session = await getSession({ req });
if (!session) {
return res.status(401).json({ error: "Unauthorized" });
}
try {
const events = await getCalendarEvents(session.accessToken);
res.json({ events });
} catch (error) {
console.error("Error in /api/calendar:", error);
res.status(500).json({ error: "Failed to fetch calendar events" });
}
}