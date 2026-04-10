import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar({ user }) {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          INGOD
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-gray-700 text-sm">{user && user.name}</span>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            登出
          </button>
        </div>
      </div>
    </nav>
  );
}