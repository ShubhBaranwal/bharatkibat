// app/(admin)/layout.tsx
import "../globals.css";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md fixed h-full p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-4">
          <Link href="/admin" className="block text-gray-700 hover:text-black">
            Dashboard
          </Link>

          <Link href="/admin/news" className="block text-gray-700 hover:text-black">
            All News
          </Link>

          <Link href="/admin/news/create" className="block text-gray-700 hover:text-black">
            Create News
          </Link>

          <Link href="/admin/categories" className="block text-gray-700 hover:text-black">
            Categories
          </Link>

          <Link href="/admin/users" className="block text-gray-700 hover:text-black">
            Users
          </Link>

          <Link href="/admin/logout" className="block text-red-600 hover:text-red-800">
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 w-full p-8">{children}</main>
    </div>
    </body>
    </html>
  );
}
