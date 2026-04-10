import { google } from "googleapis";
let cachedAuth = null;
async function getGoogleAuth(accessToken) {
if (!accessToken) {
throw new Error("No access token provided");
}
const oauth2Client = new google.auth.OAuth2(
process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
process.env.GOOGLE_CLIENT_SECRET,
process.env.NEXT_PUBLIC_REDIRECT_URI + "/api/auth/callback"
);
oauth2Client.setCredentials({
access_token: accessToken,
});
return oauth2Client;
}
export async function getSheetData(sheetId, range, accessToken) {
try {
const auth = await getGoogleAuth(accessToken);
const sheets = google.sheets({ version: "v4", auth });
const response = await sheets.spreadsheets.values.get({
  spreadsheetId: sheetId,
  range: range,
});

return response.data.values || [];
} catch (error) {
console.error("Error reading sheets:", error);
throw error;
}
}
export async function getCalendarEvents(accessToken) {
try {
const auth = await getGoogleAuth(accessToken);
const calendar = google.calendar({ version: "v3", auth });
const now = new Date();
const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

const response = await calendar.events.list({
  calendarId: "primary",
  timeMin: now.toISOString(),
  timeMax: thirtyDaysLater.toISOString(),
  maxResults: 20,
  singleEvents: true,
  orderBy: "startTime",
});

return response.data.items || [];
} catch (error) {
console.error("Error reading calendar:", error);
throw error;
}
}