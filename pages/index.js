import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import NotificationCard from "../components/NotificationCard";
import LoadingSpinner from "../components/LoadingSpinner";
import {
Calendar,
AlertCircle,
Users,
TrendingUp,
Clock,
} from "lucide-react";
export default function Dashboard() {
const { data: session, status } = useSession();
const router = useRouter();
const [events, setEvents] = useState([]);
const [notifications, setNotifications] = useState([]);
const [calendarEvents, setCalendarEvents] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
if (status === "unauthenticated") {
router.push("/login");
}
}, [status, router]);
useEffect(() => {
if (status === "authenticated") {
fetchData();
}
}, [status]);
const fetchData = async () => {
try {
setLoading(true);
const [eventsRes, notifRes, calendarRes] = await Promise.all([
fetch("/api/events"),
fetch("/api/notifications"),
fetch("/api/calendar"),
]);
  const eventsData = await eventsRes.json();
  const notifData = await notifRes.json();
  const calendarData = await calendarRes.json();

  setEvents(eventsData.events || []);
  setNotifications(notifData.notifications || []);
  setCalendarEvents(calendarData.events || []);
} catch (error) {
  console.error("Error fetching data:", error);
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
const upcomingEvents = events.filter(
(e) => e.status !== "已完成" && e.status !== "已取消"
);
return (
<div className="min-h-screen bg-gray-50">
<Navbar user={session?.user} />
  <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">
        歡迎回來, {session?.user?.name?.split(" ")[0] || "用戶"}! 👋
      </h1>
      <p className="text-gray-600 mt-2">
        {new Date().toLocaleDateString("zh-HK", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">即將活動</p>
            <p className="text-2xl font-bold text-gray-900">
              {upcomingEvents.length}
            </p>
          </div>
          <Calendar className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">通知</p>
            <p className="text-2xl font-bold text-gray-900">
              {notifications.length}
            </p>
          </div>
          <AlertCircle className="w-8 h-8 text-orange-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">總報名</p>
            <p className="text-2xl font-bold text-gray-900">
              {events.reduce(
                (sum, e) => sum + (parseInt(e.participants || 0) || 0),
                0
              )}
            </p>
          </div>
          <Users className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">活躍度</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round((upcomingEvents.length / Math.max(events.length, 1)) * 100)}
              %
            </p>
          </div>
          <TrendingUp className="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </div>

    {notifications.length > 0 && (
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-orange-500" />
          重要通知
        </h2>
        <div className="space-y-3">
          {notifications.slice(0, 3).map((notif, idx) => (
            <NotificationCard key={idx} notification={notif} />
          ))}
        </div>
      </div>
    )}

    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-500" />
          即將舉行的活動
        </h2>
        <a
          href="/events"
          className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
        >
          查看全部 →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingEvents.slice(0, 6).map((event, idx) => (
          <EventCard key={idx} event={event} />
        ))}
      </div>
      {upcomingEvents.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          目前沒有即將舉行的活動
        </div>
      )}
    </div>

    {calendarEvents.length > 0 && (
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-500" />
          日曆事件
        </h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y">
            {calendarEvents.slice(0, 5).map((event, idx) => (
              <div key={idx} className="p-4 hover:bg-gray-50 transition">
                <h3 className="font-semibold text-gray-900">
                  {event.summary}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(
                    event.start.dateTime || event.start.date
                  ).toLocaleDateString("zh-HK")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
</div>
);
}