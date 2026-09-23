'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Bell,
  Search,
  LogOut,
  ChevronDown,
  Globe,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  User,
  Menu,
} from 'lucide-react';
import { StudentProfile, StudentNotification } from './data/studentMockData';

interface StudentHeaderProps {
  student: StudentProfile;
  notifications: StudentNotification[];
  onOpenNotifications?: () => void;
  onLogout: () => void;
  onToggleSidebar?: () => void;
  onSwitchStudent?: (studentId: string) => void;
}

export default function StudentHeader({
  student,
  notifications,
  onLogout,
  onToggleSidebar,
}: StudentHeaderProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-[#E8DCCB] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
      {/* Left: Mobile trigger & Portal Brand */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-[#10233F] hover:bg-[#FFF9EF] border border-[#E8DCCB]"
          aria-label="Toggle Sidebar Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link href="/student/dashboard" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/images/msi-crest.png"
              alt="MSI Official Seal"
              fill
              className="object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="font-serif font-bold text-sm sm:text-lg text-[#10233F] tracking-tight leading-none truncate block">
                MSI Student Portal
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#89190E]/10 text-[#89190E] border border-[#89190E]/20 flex-shrink-0">
                Active Session
              </span>
            </div>
            <p className="text-[11px] text-[#526174] tracking-wide mt-0.5 font-medium hidden sm:block truncate">
              {student.batch}
            </p>
          </div>
        </Link>
      </div>

      {/* Right: Back to Website, Notifications, Profile Menu */}
      <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
        {/* Return to Public Website */}
        <Link
          href="/"
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-[#E8DCCB] hover:border-[#89190E] text-xs font-semibold text-[#526174] hover:text-[#89190E] bg-[#FFF9EF]/50 transition-colors"
          title="Return to Main Campus Website"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Main Website</span>
        </Link>

        {/* Notifications Bell with Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2.5 rounded-xl border border-[#E8DCCB] hover:border-[#89190E] hover:bg-[#FFF9EF] text-[#10233F] transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4 text-[#10233F]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#89190E] text-white text-[10px] font-bold flex items-center justify-center animate-pulse-gold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifs && (
            <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white border border-[#E8DCCB] rounded-2xl shadow-xl p-4 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DCCB]">
                <div className="flex items-center space-x-2">
                  <span className="font-serif font-bold text-sm text-[#10233F]">Circulars & Notices</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#89190E] text-white font-bold">
                    {notifications.length} Total
                  </span>
                </div>
                <span className="text-xs text-[#526174]">Official Broadcasts</span>
              </div>

              <div className="divide-y divide-[#E8DCCB]/60 max-h-72 overflow-y-auto mt-2">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 px-1 hover:bg-[#FFF9EF]/80 rounded-xl transition-colors">
                    <div className="flex items-start justify-between">
                      <h5 className="text-xs font-bold text-[#10233F] leading-snug">{n.title}</h5>
                      <span className="text-[10px] text-[#526174] flex-shrink-0 ml-2">{n.date}</span>
                    </div>
                    <p className="text-[11px] text-[#526174] mt-1 leading-normal">{n.message}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 mt-2 border-t border-[#E8DCCB] text-center">
                <button
                  onClick={() => setShowNotifs(false)}
                  className="text-xs font-semibold text-[#89190E] hover:underline"
                >
                  Close Circulars Tray
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Student Profile Quick Pill */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-[#E8DCCB] hover:border-[#89190E] bg-[#FFF9EF]/80 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#89190E] text-white font-serif font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
              {student.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-[#10233F] block leading-tight group-hover:text-[#89190E]">
                {student.name}
              </span>
              <span className="text-[10px] font-mono text-[#526174] block leading-tight">
                {student.enrollmentNo}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#526174] hidden sm:block" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-64 max-w-xs bg-white border border-[#E8DCCB] rounded-2xl shadow-xl p-3 z-50 animate-fadeIn space-y-2">
              <div className="px-3 py-2 bg-[#FFF9EF] rounded-xl border border-[#E8DCCB]">
                <p className="text-xs font-bold text-[#10233F]">{student.name}</p>
                <p className="text-[11px] text-[#526174] font-mono truncate">{student.email}</p>
                <p className="text-[10px] text-[#89190E] font-medium mt-1">Roll No: {student.rollNo}</p>
              </div>

              <div className="pt-1">
                <Link
                  href="/"
                  className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-[#526174] hover:text-[#10233F] hover:bg-[#FFF9EF] rounded-xl transition-colors"
                >
                  <Globe className="w-4 h-4 text-[#89190E]" />
                  <span>Public Institute Website</span>
                </Link>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-xl transition-colors mt-1"
                >
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span>Sign Out Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
