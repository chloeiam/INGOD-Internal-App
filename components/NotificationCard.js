export default function NotificationCard({ notification }) {
  return (
    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
      <h3 className="font-semibold text-orange-900">
        {notification.title}
      </h3>
      <p className="text-orange-800 text-sm mt-1">
        {notification.message}
      </p>
      {notification.date && (
        <p className="text-orange-600 text-xs mt-2">
          {notification.date}
        </p>
      )}
    </div>
  );
}