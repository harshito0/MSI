'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Clock,
  Award,
  AlertCircle,
  CreditCard,
  Video,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import {
  StudentProfile,
  ActiveCourse,
  TimetableClass,
  StudentNotification,
  TestItem,
} from './data/studentMockData';
import { StudentModuleTab } from './StudentSidebar';

interface StudentDashboardTabProps {
  student: StudentProfile;
  courses: ActiveCourse[];
  upcomingClasses: TimetableClass[];
  notifications: StudentNotification[];
  tests: TestItem[];
  onNavigateTab: (tab: StudentModuleTab) => void;
  onStartTest: (test: TestItem) => void;
}

export default function StudentDashboardTab({
  student,
  courses,
  upcomingClasses,
  notifications,
  tests,
  onNavigateTab,
  onStartTest,
}: StudentDashboardTabProps) {
  const activeEnrolledCourses = courses.filter((c) => c.isEnrolled);
  const avgProgress = Math.round(
    activeEnrolledCourses.reduce((acc, c) => acc + c.progress, 0) /
      (activeEnrolledCourses.length || 1)
  );

  const availableTest = tests.find((t) => t.status === 'Available');

  return (
    <div className="space-y-7">
      {/* 1. Welcome & High-Yield Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-linear-to-r from-[#10233F] via-[#162d50] to-[#89190E] text-white overflow-hidden shadow-xl hud-bracket">
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EFC988]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EFC988] animate-pulse-beacon" />
              <span className="text-[11px] font-mono tracking-widest text-[#EFC988] uppercase font-bold">
                Maharaja Surajmal Institute • Academic Semester V
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-2 tracking-tight">
              Welcome back, {student.name.split(' ')[0]}
            </h1>
            <p className="text-white/80 text-xs sm:text-sm mt-2 leading-relaxed">
              Your overall course syllabus progress is at{' '}
              <strong className="text-[#EFC988] font-bold">{avgProgress}%</strong>. You have{' '}
              <strong>{upcomingClasses.filter((c) => c.day === 'Today').length} lectures scheduled today</strong> and 1 high-yield mock test pending evaluation.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-5">
              <button
                onClick={() => onNavigateTab('learning')}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white text-xs sm:text-sm font-bold flex items-center space-x-2 shadow-md shadow-[#89190E]/30 btn-chamfered active:scale-98 transition-all"
              >
                <BookOpen className="w-4 h-4 text-[#EFC988]" />
                <span>Resume Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {availableTest && (
                <button
                  onClick={() => onStartTest(availableTest)}
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/30 flex items-center space-x-2 backdrop-blur-xs transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#EFC988]" />
                  <span>Launch Live Mock Test</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics Capsule */}
          <div className="flex flex-row md:flex-col gap-3 sm:gap-4 flex-shrink-0">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[120px]">
              <span className="text-[10px] font-mono tracking-wider uppercase text-white/70 block">
                Attendance
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#EFC988] mt-0.5 block">
                84.6%
              </span>
              <span className="text-[9px] text-emerald-300 font-semibold">Above 75% Mandate</span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[120px]">
              <span className="text-[10px] font-mono tracking-wider uppercase text-white/70 block">
                Batch Rank
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5 block">
                03 / 120
              </span>
              <span className="text-[9px] text-[#EFC988] font-semibold">94.2 Percentile</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Row: Progress, Classes, Tests, Fee Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Courses & Progress */}
        <div
          onClick={() => onNavigateTab('learning')}
          className="p-5 rounded-3xl bg-white border border-[#E8DCCB] hover:border-[#89190E] transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-[#89190E]/10 text-[#89190E] group-hover:bg-[#89190E] group-hover:text-white transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-[#89190E]">{activeEnrolledCourses.length} Active</span>
          </div>
          <h3 className="font-serif text-base font-bold text-[#10233F] mt-3">
            Active Courses
          </h3>
          <p className="text-xs text-[#526174] mt-0.5">
            Syllabus avg completion: {avgProgress}%
          </p>
          <div className="w-full h-2 bg-[#FFF3DD] rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-[#89190E] rounded-full transition-all"
              style={{ width: `${avgProgress}%` }}
            />
          </div>
        </div>

        {/* Card 2: Upcoming Classes Today */}
        <div
          onClick={() => onNavigateTab('dashboard')}
          className="p-5 rounded-3xl bg-white border border-[#E8DCCB] hover:border-[#10233F] transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-[#10233F]/10 text-[#10233F] group-hover:bg-[#10233F] group-hover:text-white transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Today
            </span>
          </div>
          <h3 className="font-serif text-base font-bold text-[#10233F] mt-3">
            Upcoming Classes
          </h3>
          <p className="text-xs text-[#526174] mt-0.5">
            {upcomingClasses.filter((c) => c.day === 'Today').length} Lectures remaining
          </p>
          <div className="mt-3 text-[11px] font-semibold text-[#89190E] flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Next: 09:30 AM (CrPC)</span>
          </div>
        </div>

        {/* Card 3: Tests & Mock Exams */}
        <div
          onClick={() => onNavigateTab('tests')}
          className="p-5 rounded-3xl bg-white border border-[#E8DCCB] hover:border-[#EFC988] transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-[#FFF3DD] text-[#89190E] group-hover:bg-[#EFC988] transition-colors">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold bg-[#89190E] text-white px-2 py-0.5 rounded-md">
              1 Open
            </span>
          </div>
          <h3 className="font-serif text-base font-bold text-[#10233F] mt-3">
            Tests & Evaluations
          </h3>
          <p className="text-xs text-[#526174] mt-0.5">
            5-Question Timed Mock #12
          </p>
          <div className="mt-3 text-[11px] font-semibold text-emerald-700 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Last Test: 86/100 (94.2%)</span>
          </div>
        </div>

        {/* Card 4: Fee Status */}
        <div
          onClick={() => onNavigateTab('fees')}
          className="p-5 rounded-3xl bg-white border border-[#E8DCCB] hover:border-[#89190E] transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-800 group-hover:bg-amber-100 transition-colors">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700">
              ₹85,000 Paid
            </span>
          </div>
          <h3 className="font-serif text-base font-bold text-[#10233F] mt-3">
            Fee Status
          </h3>
          <p className="text-xs text-[#526174] mt-0.5">
            Due: ₹40,000 (15 Oct)
          </p>
          <div className="mt-3 text-[11px] font-semibold text-[#89190E] flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Valid till 31 Jul 2026</span>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        
        {/* Left Column (2 spans): Active Courses + Today's Timetable */}
        <div className="lg:col-span-2 space-y-7">
          
          {/* Active Courses Subsection */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DCCB] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DCCB]">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#89190E]" />
                  <h3 className="font-serif text-lg font-bold text-[#10233F]">
                    Active Courses & Syllabus
                  </h3>
                </div>
                <p className="text-xs text-[#526174] mt-0.5">
                  Linked to active student enrollment ID #{student.enrollmentNo}
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('learning')}
                className="text-xs font-bold text-[#89190E] hover:underline flex items-center space-x-1"
              >
                <span>View All Modules</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Courses List */}
            <div className="divide-y divide-[#E8DCCB]/60 mt-2">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#FFF3DD] text-[#89190E]">
                        {course.code}
                      </span>
                      <span className="text-xs text-[#526174]">{course.category}</span>
                      {!course.isEnrolled && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 border border-neutral-300 flex items-center space-x-1">
                          <Lock className="w-2.5 h-2.5" />
                          <span>Entitlement Locked</span>
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#10233F] mt-1 group-hover:text-[#89190E] transition-colors">
                      {course.title}
                    </h4>
                    <p className="text-xs text-[#526174] mt-0.5">{course.faculty}</p>

                    {/* Progress Bar */}
                    {course.isEnrolled ? (
                      <div className="mt-3 max-w-md">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-[#526174]">
                            Lectures: {course.attendedLectures} / {course.totalLectures}
                          </span>
                          <span className="font-bold text-[#89190E]">{course.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#FFF3DD] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#89190E] rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-neutral-500 mt-2 italic">
                        Course entitlement rule: Contact administrator to unlock syllabus modules.
                      </p>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    {course.isEnrolled ? (
                      <button
                        onClick={() => onNavigateTab('learning')}
                        className="px-4 py-2 rounded-xl bg-[#FFF9EF] hover:bg-[#89190E] text-[#89190E] hover:text-white border border-[#E8DCCB] text-xs font-bold transition-all"
                      >
                        Enter Course
                      </button>
                    ) : (
                      <span className="text-xs text-neutral-400 font-semibold px-3 py-1.5 border border-dashed border-neutral-300 rounded-xl">
                        Locked
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today & Upcoming Classes Timetable */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DCCB] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DCCB]">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-[#89190E]" />
                <h3 className="font-serif text-lg font-bold text-[#10233F]">
                  Academic Timetable & Live Lectures
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#89190E] bg-[#FFF3DD] px-2.5 py-1 rounded-lg">
                Today: {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            </div>

            <div className="space-y-3.5 mt-4">
              {upcomingClasses.map((cls) => (
                <div
                  key={cls.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    cls.isLiveNow
                      ? 'bg-[#FFF9EF] border-[#89190E] ring-1 ring-[#89190E]/30'
                      : 'bg-white border-[#E8DCCB] hover:border-[#10233F]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#10233F] text-white">
                        {cls.time}
                      </span>
                      <span className="text-xs font-semibold text-[#89190E]">{cls.type}</span>
                      {cls.isLiveNow && (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                          <span>Happening Now</span>
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#10233F]">
                      {cls.subject}
                    </h4>
                    <p className="text-xs text-[#526174]">
                      Faculty: <strong>{cls.faculty}</strong> • Venue: {cls.room}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {cls.joinLink ? (
                      <a
                        href={cls.joinLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-xs"
                      >
                        <Video className="w-3.5 h-3.5 text-[#EFC988]" />
                        <span>Join Live Hall</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => onNavigateTab('learning')}
                        className="px-4 py-2 rounded-xl bg-[#FFF9EF] hover:bg-white text-[#10233F] border border-[#E8DCCB] text-xs font-semibold transition-colors"
                      >
                        View Syllabus
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (1 span): Notifications, Live Tests Card, Fee Status Alert */}
        <div className="space-y-7">
          
          {/* Notifications & Circulars Tile */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8DCCB] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DCCB]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#89190E]" />
                <h3 className="font-serif text-base font-bold text-[#10233F]">
                  Official Notices
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#526174]">Live Broadcast</span>
            </div>

            <div className="divide-y divide-[#E8DCCB]/60 mt-2 space-y-2">
              {notifications.map((n) => (
                <div key={n.id} className="pt-2.5 pb-1">
                  <div className="flex items-start justify-between">
                    <h5 className="text-xs font-bold text-[#10233F] leading-snug">{n.title}</h5>
                  </div>
                  <p className="text-[11px] text-[#526174] mt-1 leading-normal">{n.message}</p>
                  <span className="text-[10px] text-[#89190E] font-medium block mt-1">{n.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timed Test Diagnostic Callout */}
          {availableTest && (
            <div className="p-6 rounded-3xl bg-linear-to-br from-[#89190E] to-[#65130D] text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#EFC988]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="relative">
                <span className="text-[10px] font-mono tracking-widest text-[#EFC988] uppercase font-bold block">
                  Diagnostic Assessment Ready
                </span>
                <h4 className="font-serif text-lg font-bold text-white mt-1">
                  {availableTest.title}
                </h4>
                <p className="text-xs text-white/80 mt-1">
                  Duration: {availableTest.durationMinutes} mins • {availableTest.totalQuestions} Questions • Real-time scoring
                </p>

                <button
                  onClick={() => onStartTest(availableTest)}
                  className="mt-4 w-full py-2.5 rounded-xl bg-white text-[#89190E] hover:bg-[#FFF9EF] text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#89190E]" />
                  <span>Start Timed Test Now</span>
                </button>
              </div>
            </div>
          )}

          {/* Fee Status Summary Card */}
          <div className="p-6 rounded-3xl bg-[#FFF9EF] border border-[#E8DCCB]">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-[#89190E]" />
              <h4 className="font-serif text-base font-bold text-[#10233F]">
                Institutional Fee Summary
              </h4>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DCCB]">
                <span className="text-[#526174]">Total Course Fee:</span>
                <span className="font-mono font-bold text-[#10233F]">₹1,25,000</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DCCB]">
                <span className="text-[#526174]">Total Paid (Receipted):</span>
                <span className="font-mono font-bold text-emerald-700">₹85,000</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DCCB]">
                <span className="text-[#526174]">Pending Balance:</span>
                <span className="font-mono font-bold text-[#89190E]">₹40,000</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[#526174]">Next Installment Due:</span>
                <span className="font-bold text-[#10233F]">15 Oct 2025</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('fees')}
              className="mt-4 w-full py-2 rounded-xl bg-white border border-[#89190E] text-[#89190E] hover:bg-[#FFF3DD] text-xs font-bold transition-colors"
            >
              View Payment Ledger & Receipts →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
