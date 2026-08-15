'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ChevronDown, LogOut, User, Settings } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 md:left-64 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 z-20">
      <div className="flex-1" />

      {/* User Menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 text-white font-semibold text-sm">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <ChevronDown
            size={16}
            className={`transition ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              onClick={() => setOpen(false)}
            >
              <User size={16} />
              Profile
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              onClick={() => setOpen(false)}
            >
              <Settings size={16} />
              Settings
            </Link>
            <div className="border-t border-gray-200 my-1" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
