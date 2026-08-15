'use client';

import { ProtectedRoute } from '@/middleware/ProtectedRoute';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="md:ml-64 pt-16">
          <DashboardHeader />
          <main className="p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
