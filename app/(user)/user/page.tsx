export default function UserPage() {
    return (
        <div className="space-y-6">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Welcome back, User!</h2>
                    <p className="mt-2 text-gray-600">Here is your personal dashboard overview.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1 */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">My Subscriptions</h3>
                    <p className="mt-2 text-gray-500">You are subscribed to the Premium Plan.</p>
                    <button className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-100">
                        Manage Subscription
                    </button>
                </div>

                {/* Card 2 */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900">Recent Notifications</h3>
                    <ul className="mt-2 space-y-2">
                        <li className="text-sm text-gray-500">• Your profile was updated successfully.</li>
                        <li className="text-sm text-gray-500">• New feature alert: Dark mode is now available.</li>
                        <li className="text-sm text-gray-500">• Payment receipt for December 2025.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
