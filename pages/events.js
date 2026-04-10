import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Search, Filter } from "lucide-react";
export default function EventsPage() {
const { data: session, status } = useSession();
const router = useRouter();
const [events, setEvents] = useState([]);
const [filteredEvents, setFilteredEvents] = useState([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState("");
const [selectedType, setSelectedType] = useState("all");
const [selectedStatus, setSelectedStatus] = useState("all");
useEffect(() => {
if (status === "unauthenticated") {
router.push("/login");
}
}, [status, router]);
useEffect(() => {
if (status === "authenticated") {
fetchEvents();
}
}, [status]);
const fetchEvents = async () => {
try {
setLoading(true);
const res = await fetch("/api/events");
const data = await res.json();
setEvents(data.events || []);
setFilteredEvents(data.events || []);
} catch (error) {
console.error("Error fetching events:", error);
} finally {
setLoading(false);
}
};
useEffect(() => {
let filtered = events;
if (searchTerm) {
  filtered = filtered.filter(
    (e) =>
      e.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

if (selectedType !== "all") {
  filtered = filtered.filter((e) => e.type === selectedType);
}

if (selectedStatus !== "all") {
  filtered = filtered.filter((e) => e.status === selectedStatus);
}

setFilteredEvents(filtered);
}, [searchTerm, selectedType, selectedStatus, events]);
if (status === "loading" || loading) {
return <LoadingSpinner />;
}
if (status === "unauthenticated") {
return null;
}
const types = [...new Set(events.map((e) => e.type))].filter(Boolean);
const statuses = [...new Set(events.map((e) => e.status))].filter(Boolean);
return (
<div className="min-h-screen bg-gray-50">
<Navbar user={session?.user} />
  <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">所有活動</h1>

    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜尋活動..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">所有類型</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">所有狀態</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>

    {filteredEvents.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, idx) => (
          <EventCard key={idx} event={event} />
        ))}
      </div>
    ) : (
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        <p>沒有找到符合條件的活動</p>
      </div>
    )}
  </div>
</div>
);
}