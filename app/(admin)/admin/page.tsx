export const dynamic = "force-dynamic";
export default function AdminPage() {
    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
                <p className="text-gray-400 mt-1">Welcome back, Administrator.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stat Card 1 */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                    <h3 className="text-lg font-medium text-gray-300">Total Users</h3>
                    <p className="text-4xl font-bold text-yellow-400 mt-2">1,234</p>
                </div>

                {/* Stat Card 2 */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                    <h3 className="text-lg font-medium text-gray-300">Active Sessions</h3>
                    <p className="text-4xl font-bold text-green-400 mt-2">56</p>
                </div>

                {/* Stat Card 3 */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                    <h3 className="text-lg font-medium text-gray-300">Pending Reports</h3>
                    <p className="text-4xl font-bold text-red-400 mt-2">12</p>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <span className="text-gray-200">New user registration</span>
                        <span className="text-sm text-gray-400">2 mins ago</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <span className="text-gray-200">System update completed</span>
                        <span className="text-sm text-gray-400">1 hour ago</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <span className="text-gray-200">Database backup</span>
                        <span className="text-sm text-gray-400">3 hours ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
