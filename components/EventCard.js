import { ExternalLink, MapPin, Users } from "lucide-react";
export default function EventCard({ event }) {
const statusColorMap = {
籌備中: "bg-yellow-100 text-yellow-800",
招募中: "bg-blue-100 text-blue-800",
已滿額: "bg-red-100 text-red-800",
已完成: "bg-gray-100 text-gray-800",
已取消: "bg-gray-100 text-gray-800",
};
const statusColor = statusColorMap[event.status] || "bg-gray-100 text-gray-800";
return (
<div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
<div className="p-6">
<div className="flex items-start justify-between mb-3">
<span className={text-xs font-semibold px-3 py-1 rounded-full ${statusColor}}>
{event.status}
</span>
<span className="text-xs text-gray-500">{event.type}</span>
</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      {event.name}
    </h3>

    <div className="space-y-2 mb-4 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <span>📅</span>
        <span>{event.date}</span>
      </div>
      {event.remark && (
        <div className="flex items-center gap-2">
          <span>📝</span>
          <span>{event.remark}</span>
        </div>
      )}
    </div>

    {event.signupLink && (
      <a
        href={event.signupLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
      >
        立即報名
        <ExternalLink className="w-4 h-4" />
      </a>
    )}
  </div>
</div>
);
}