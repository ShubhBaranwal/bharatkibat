import AdminSidebar from '@/components/ui/adminComponent/AdminSidebar';
import React from 'react';

export default function AdminSidebarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <AdminSidebar />
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
