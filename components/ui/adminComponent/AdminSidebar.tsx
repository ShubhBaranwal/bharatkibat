import Link from 'next/link';


const AdminSidebar = () => {
    return (<aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-yellow-400">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            <Link href="/admin" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Dashboard
            </Link>
            <Link href="/admin/category" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Category
            </Link>
            <Link href="/admin/content" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Content
            </Link>
            {/* <Link href="/admin/users" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Users
            </Link>
            <Link href="/admin/settings" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Settings
            </Link> */}
        </nav>
        <div className="p-4 border-t border-gray-700">
            <Link href="/" className="block px-4 py-2 text-center bg-red-600 hover:bg-red-500 rounded transition-colors">
                Logout
            </Link>
        </div>
    </aside>
    )
}

export default AdminSidebar;