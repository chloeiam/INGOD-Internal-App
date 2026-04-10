import { ExternalLink } from "lucide-react";

export default function EventCard({ event }) {
  let color = "bg-gray-100 text-gray-800";
  
  if (event.status === "籌備中") color = "bg-yellow-100 text-yellow-800";
  if (event.status === "招募中") color = "bg-blue-100 text-blue-800";
  if (event.status === "已滿額") color = "bg-red-100 text-red-800";

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex gap-3 mb-3">
        <span className={color + " text-xs font-semibold px-3 py-1 rounded-full"}>
          {event.status}
        </span>
        <span className="text-xs text-gray-500">{event.type}</span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {event.name}
      </h3>

      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <p>📅 {event.date}</p>
        {event.remark && <p>📝 {event.remark}</p>}
      </div>

      {event.signupLink && (
        
          href={event.signupLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700"
        >
          立即報名
        </a>
      )}
    </div>
  );
}