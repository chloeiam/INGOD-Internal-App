import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, Home, Calendar as CalendarIcon, List } from "lucide-react";
export default function Navbar({ user }) {
return (
<nav className="bg-white shadow-md">
<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
<div className="flex items-center gap-8">
<Link href="/" className="text-2xl font-bold text-blue-600">
INGOD
</Link>
<div className="hidden md:flex gap-6">
<Link
           href="/"
           className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
         >
<Home className="w-4 h-4" />
首頁
</Link>
<Link
           href="/events"
           className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
         >
<List className="w-4 h-4" />
活動
</Link>
<Link
           href="/calendar"
           className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
         >
<CalendarIcon className="w-4 h-4" />
日曆
</Link>
</div>
</div>
    <div className="flex items-center gap-4">
      <span className="text-gray-700 text-sm">{user?.name}</span>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
      >
        <LogOut className="w-4 h-4" />
        登出
      </button>
    </div>
  </div>
</nav>
);
}
