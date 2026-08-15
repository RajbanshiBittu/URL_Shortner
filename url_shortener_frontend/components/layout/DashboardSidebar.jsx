'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Link as LinkIcon,
  BarChart3,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

export function DashboardSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      active: pathname === '/dashboard',
    },
    {
      label: 'My URLs',
      href: '/dashboard/urls',
      icon: LinkIcon,
      active: pathname.startsWith('/dashboard/urls'),
    },
    {
      label: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      active: pathname === '/dashboard/analytics',
    },
  ];

  const accountItems = [
    {
      label: 'Profile',
      href: '/dashboard/profile',
      icon: User,
      active: pathname === '/dashboard/profile',
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      active: pathname === '/dashboard/settings',
    },
  ];

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg hover:bg-gray-100"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 z-30',
          !open && 'md:translate-x-0 -translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">/</span>
            </div>
            <span className="font-bold text-xl text-gray-900">SlashURL</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-2 mb-8">
            <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main
            </p>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm font-medium',
                  item.active
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="space-y-2">
            <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Account
            </p>
            {accountItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm font-medium',
                  item.active
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition text-sm font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
