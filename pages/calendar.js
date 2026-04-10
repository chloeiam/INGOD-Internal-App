import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { Calendar } from "lucide-react";
export default function CalendarPage() {
const { data: session, status } = useSession();
const router = useRouter();
const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
if (status === "unauthenticated") {
router.push("/login");
}
}, [status, router]);
useEffect(() => {
if (status === "authenticated") {
fetchCalendarEvents();
}
}, [status]);
const fetchCalendarEvents = async () => {
try {
setLoading(true);
const res = await fetch("/api/calendar");
const data = await res.json();
setEvents(data.events || []);
} catch (error) {
console.error("Error fetching calendar:", error);
} finally {
setLoading(false);
}
};
if (status === "loading" || loading) {
return <LoadingSpinner />;
}
if (status === "unauthenticated") {
return null;
}
return (
<div className="min-h-screen bg-gray-50">
<Navbar user={session?.user} />
  <div className="max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
      <Calendar className="w-8 h-8 text-blue-500" />
      公司日曆
    </h1>

    <div className="space-y-4">
      {events.length > 0 ? (
        events.map((event, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {event.summary}
            </h2>
            <p className="text-gray-600 mt-2">
              📅{" "}
              {new Date(event.start.dateTime || event.start.date).toLocaleString(
                "zh-HK",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
            {event.location && (
              <p className="text-gray-600 mt-1">📍 {event.location}</p>
            )}
            {event.description && (
              <p className="text-gray-700 mt-3">{event.description}</p>
            )}
          </div>
        ))
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          <p>近期沒有日曆事件</p>
        </div>
      )}
    </div>
  </div>
</div>
);
}