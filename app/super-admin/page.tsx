'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Filter,
  Search,
  ExternalLink,
  Plus,
  Play,
  FileText,
  Sparkles,
  ArrowRight,
  UserCheck,
  Sliders,
  Settings,
  Activity,
  Layers,
  Award,
  Lock,
  RefreshCw,
} from 'lucide-react';
import {
  UdemyCourse,
  TeacherApprovalRecord,
  CourseEnrollment,
  getStoredCourses,
  getStoredTeachers,
  getStoredEnrollments,
  approveTeacherAction,
  rejectTeacherAction,
  assignCoursesToTeacherAction,
  assignCourseToStudentAction,
  LMS_SYNC_EVENT,
} from '@/lib/lmsStore';
import { DEMO_STUDENTS } from '@/components/student/data/studentMockData';

export default function SuperAdminPage() {
  const [teachers, setTeachers] = useState<TeacherApprovalRecord[]>([]);
  const [courses, setCourses] = useState<UdemyCourse[]>([]);
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [activeTab, setActiveTab] = useState<'teachers' | 'assignments' | 'courses' | 'audit'>('teachers');
  const [teacherFilter, setTeacherFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedDemoVideo, setSelectedDemoVideo] = useState<{ title: string; url: string } | null>(null);
  const [rejectingTeacher, setRejectingTeacher] = useState<TeacherApprovalRecord | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [assigningTeacher, setAssigningTeacher] = useState<TeacherApprovalRecord | null>(null);
  const [teacherSelectedCourseIds, setTeacherSelectedCourseIds] = useState<string[]>([]);

  // Student Assignment form state
  const [targetStudentId, setTargetStudentId] = useState('msi-stu-001');
  const [targetCourseId, setTargetCourseId] = useState('crs-udemy-pcsj');
  const [assignmentNote, setAssignmentNote] = useState('Mandatory preparatory course assigned by Dean Academic Affairs.');
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);

  // Success toast notice
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = () => {
    setTeachers(getStoredTeachers());
    setCourses(getStoredCourses());
    setEnrollments(getStoredEnrollments());
  };

  useEffect(() => {
    loadData();

    const handleSync = () => {
      loadData();
    };

    window.addEventListener(LMS_SYNC_EVENT, handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener(LMS_SYNC_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Filtered teachers list
  const filteredTeachers = teachers.filter((t) => {
    if (teacherFilter !== 'all' && t.status !== teacherFilter) return false;
    if (
      searchQuery &&
      !t.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !t.specialization.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !t.department.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const pendingCount = teachers.filter((t) => t.status === 'pending').length;
  const approvedCount = teachers.filter((t) => t.status === 'approved').length;

  // Actions
  const handleApprove = (teacherId: string, name: string) => {
    approveTeacherAction(teacherId, 'Prof. S.K. Pathak (Super Admin Director)');
    loadData();
    showToast(`✓ Faculty profile for ${name} has been APPROVED. They can now publish and teach courses!`);
  };

  const handleOpenRejectModal = (teacher: TeacherApprovalRecord) => {
    setRejectingTeacher(teacher);
    setRejectionReason('Additional bar council verification and credentials needed.');
  };

  const handleConfirmReject = () => {
    if (rejectingTeacher) {
      rejectTeacherAction(rejectingTeacher.id, rejectionReason);
      loadData();
      showToast(`Application for ${rejectingTeacher.name} marked as Rejected/Requires Revision.`);
      setRejectingTeacher(null);
    }
  };

  const handleOpenAssignTeacherModal = (teacher: TeacherApprovalRecord) => {
    setAssigningTeacher(teacher);
    setTeacherSelectedCourseIds(teacher.assignedCourseIds || []);
  };

  const handleConfirmAssignCoursesToTeacher = () => {
    if (assigningTeacher) {
      assignCoursesToTeacherAction(assigningTeacher.id, teacherSelectedCourseIds);
      loadData();
      showToast(`Updated assigned courses for ${assigningTeacher.name}.`);
      setAssigningTeacher(null);
    }
  };

  const handleAssignCourseToStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const student = DEMO_STUDENTS.find((s) => s.id === targetStudentId);
    const course = courses.find((c) => c.id === targetCourseId);

    if (student && course) {
      assignCourseToStudentAction(
        student.id,
        course.id,
        'super-admin',
        'Dean / Super Admin Office',
        assignmentNote
      );
      loadData();
      setAssignmentSuccess(true);
      showToast(`✓ Assigned ${course.title} to student ${student.name}!`);
      setTimeout(() => setAssignmentSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#10233F] flex flex-col selection:bg-[#EFC988] selection:text-[#89190E]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-2xl bg-[#10233F] text-white border-2 border-[#EFC988] shadow-2xl flex items-center space-x-3 animate-fadeIn">
          <Sparkles className="w-5 h-5 text-[#EFC988] flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Super Admin Top Header */}
      <header className="bg-[#10233F] text-white border-b border-[#EFC988]/30 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo & Portal Identity */}
          <div className="flex items-center space-x-3.5">
            <Link href="/" className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/images/msi-crest.png"
                alt="MSI Crest"
                fill
                className="object-contain"
              />
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#EFC988] font-bold">
                  Super Admin Console
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                  ROOT ACCESS
                </span>
              </div>
              <h1 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                Academic Governance & Faculty Verification Hub
              </h1>
            </div>
          </div>

          {/* Quick Cross-Portal Switcher Pills */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            <span className="text-gray-400 text-[11px] hidden lg:inline mr-1">Switch view:</span>
            <Link
              href="/student/dashboard"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center space-x-1.5"
            >
              <Users className="w-3.5 h-3.5 text-[#EFC988]" />
              <span>Student Portal (Aarav)</span>
            </Link>
            <Link
              href="/teacher/dashboard"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center space-x-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#EFC988]" />
              <span>Faculty Portal</span>
            </Link>
            <Link
              href="/courses"
              className="px-3 py-1.5 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white font-bold transition-colors flex items-center space-x-1.5 shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Udemy Courses</span>
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Top Operational Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-3xl bg-white border border-[#E8DCCB] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#526174] font-bold uppercase tracking-wider">
              <span>Faculty Applications</span>
              <GraduationCap className="w-4 h-4 text-[#89190E]" />
            </div>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="font-serif text-3xl font-bold text-[#10233F]">
                {teachers.length}
              </span>
              <span className="text-xs text-[#526174]">Total Registered</span>
            </div>
            <span className="text-[11px] text-[#526174] block mt-1">
              Law & Engineering Academic Divisions
            </span>
          </div>

          {/* Pending Approvals (User Highlight!) */}
          <div className={`p-5 rounded-3xl border shadow-sm transition-all ${
            pendingCount > 0
              ? 'bg-[#FFF3DD] border-[#EFC988] shadow-md shadow-[#EFC988]/30'
              : 'bg-white border-[#E8DCCB]'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#89190E]">
              <span>Pending Approvals</span>
              <AlertTriangle className="w-4 h-4 text-[#89190E] animate-bounce" />
            </div>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="font-serif text-3xl font-bold text-[#89190E]">
                {pendingCount}
              </span>
              <span className="text-xs font-bold text-amber-700">Awaiting Super Admin Decision</span>
            </div>
            <span className="text-[11px] text-[#89190E]/80 block mt-1 font-medium">
              Requires qualification & demo review
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#E8DCCB] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#526174] font-bold uppercase tracking-wider">
              <span>Approved Active Faculty</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="font-serif text-3xl font-bold text-emerald-700">
                {approvedCount}
              </span>
              <span className="text-xs text-emerald-600 font-bold">● Fully Verified</span>
            </div>
            <span className="text-[11px] text-[#526174] block mt-1">
              Authorized to teach & publish courses
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#E8DCCB] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#526174] font-bold uppercase tracking-wider">
              <span>Active Enrollments</span>
              <Users className="w-4 h-4 text-[#10233F]" />
            </div>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="font-serif text-3xl font-bold text-[#10233F]">
                {enrollments.length}
              </span>
              <span className="text-xs text-purple-700 font-bold">In {courses.length} Courses</span>
            </div>
            <span className="text-[11px] text-[#526174] block mt-1">
              Self-enrolled + Admin assigned
            </span>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8DCCB] pb-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('teachers')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'teachers'
                  ? 'bg-[#89190E] text-white shadow-md'
                  : 'bg-white hover:bg-[#FFF3DD] text-[#10233F] border border-[#E8DCCB]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Teacher Approvals & Directory</span>
              {pendingCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EFC988] text-[#10233F]">
                  {pendingCount} Pending
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('assignments')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'assignments'
                  ? 'bg-[#89190E] text-white shadow-md'
                  : 'bg-white hover:bg-[#FFF3DD] text-[#10233F] border border-[#E8DCCB]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Student Course Assignments</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'courses'
                  ? 'bg-[#89190E] text-white shadow-md'
                  : 'bg-white hover:bg-[#FFF3DD] text-[#10233F] border border-[#E8DCCB]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Udemy Course Catalog ({courses.length})</span>
            </button>
          </div>

          <button
            onClick={loadData}
            className="p-2.5 rounded-2xl bg-white hover:bg-[#FFF9EF] border border-[#E8DCCB] text-[#526174] hover:text-[#10233F] text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
            title="Refresh database"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>
        </div>

        {/* --------------------------------------------------------------------
            TAB 1: Teacher Approvals & Faculty Directory (Core User Request)
            -------------------------------------------------------------------- */}
        {activeTab === 'teachers' && (
          <div className="space-y-6">
            
            {/* Filter & Search Bar */}
            <div className="bg-white rounded-3xl border border-[#E8DCCB] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
              
              {/* Status Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'pending', label: `Pending Approvals (${pendingCount})` },
                  { id: 'approved', label: `Approved Active (${approvedCount})` },
                  { id: 'all', label: `All Teachers (${teachers.length})` },
                  { id: 'rejected', label: 'Rejected' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTeacherFilter(item.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      teacherFilter === item.id
                        ? 'bg-[#10233F] text-[#EFC988] shadow-sm'
                        : 'bg-[#FFF9EF] text-[#526174] hover:text-[#10233F] border border-[#E8DCCB]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-[#526174] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search faculty name, degree, subject..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E8DCCB] bg-[#FFF9EF]/50 text-xs focus:outline-none focus:border-[#89190E]"
                />
              </div>
            </div>

            {/* Teachers Cards List */}
            <div className="grid grid-cols-1 gap-6">
              {filteredTeachers.map((teacher) => {
                const isPending = teacher.status === 'pending';
                const isApproved = teacher.status === 'approved';
                const isRejected = teacher.status === 'rejected';

                return (
                  <div
                    key={teacher.id}
                    className={`rounded-3xl border-2 p-6 sm:p-7 transition-all duration-300 shadow-sm ${
                      isPending
                        ? 'bg-white border-[#EFC988] shadow-md'
                        : isApproved
                        ? 'bg-white border-[#E8DCCB] hover:border-emerald-300'
                        : 'bg-white border-rose-200'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      
                      {/* Left: Avatar & Bio Details */}
                      <div className="flex items-start space-x-4 sm:space-x-5 min-w-0">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#FFF3DD] border border-[#E8DCCB] flex-shrink-0">
                          <Image
                            src={teacher.avatarUrl}
                            alt={teacher.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0 space-y-1.5">
                          {/* Status Badge */}
                          <div className="flex flex-wrap items-center gap-2">
                            {isPending && (
                              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#89190E] bg-[#FFF3DD] border border-[#EFC988] px-3 py-0.5 rounded-full flex items-center space-x-1.5 animate-pulse">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Pending Super Admin Approval</span>
                              </span>
                            )}
                            {isApproved && (
                              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-0.5 rounded-full flex items-center space-x-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Super Admin Verified Faculty</span>
                              </span>
                            )}
                            {isRejected && (
                              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-800 bg-rose-50 border border-rose-300 px-3 py-0.5 rounded-full flex items-center space-x-1.5">
                                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                <span>Application Rejected</span>
                              </span>
                            )}

                            <span className="text-xs text-[#526174]">
                              Applied: {teacher.applicationDate}
                            </span>
                          </div>

                          {/* Name & Title */}
                          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#10233F]">
                            {teacher.name}
                          </h3>
                          <p className="text-xs font-semibold text-[#89190E]">
                            {teacher.designation} • {teacher.department}
                          </p>

                          {/* Qualifications & Experience */}
                          <div className="pt-2 text-xs space-y-1 text-[#526174]">
                            <p>
                              <strong className="text-[#10233F]">Qualifications:</strong>{' '}
                              {teacher.qualifications}
                            </p>
                            <p>
                              <strong className="text-[#10233F]">Specialization:</strong>{' '}
                              <span className="text-[#89190E] font-medium">{teacher.specialization}</span> ({teacher.experienceYears} Years Experience)
                            </p>
                            <p>
                              <strong className="text-[#10233F]">Bio:</strong> {teacher.bio}
                            </p>
                          </div>

                          {/* Demo Lecture Clip Trigger */}
                          <div className="pt-2 flex items-center space-x-3">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedDemoVideo({
                                  title: teacher.sampleLectureTitle,
                                  url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                                })
                              }
                              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#89190E] bg-[#FFF3DD] hover:bg-[#89190E] hover:text-white px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Watch Demo Lecture: &quot;{teacher.sampleLectureTitle}&quot;</span>
                            </button>
                            <span className="text-xs text-[#526174] font-mono">
                              ({teacher.sampleLectureDuration})
                            </span>
                          </div>

                          {/* Assigned Courses Strip */}
                          {teacher.assignedCourseIds && teacher.assignedCourseIds.length > 0 && (
                            <div className="pt-2 flex flex-wrap items-center gap-1.5">
                              <span className="text-[11px] font-bold text-[#10233F]">Assigned Courses:</span>
                              {teacher.assignedCourseIds.map((cId) => {
                                const c = courses.find((item) => item.id === cId);
                                return (
                                  <span
                                    key={cId}
                                    className="text-[11px] bg-[#FFF9EF] border border-[#E8DCCB] text-[#10233F] px-2.5 py-0.5 rounded-lg font-medium"
                                  >
                                    {c?.title || cId}
                                  </span>
                                );
                              })}
                            </div>
                          )}

                          {teacher.rejectionReason && (
                            <div className="mt-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                              <strong>Rejection / Action Required:</strong> {teacher.rejectionReason}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Super Admin Action Buttons */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0 self-stretch lg:self-start lg:w-48">
                        {isPending && (
                          <>
                            {/* APPROVE BUTTON */}
                            <button
                              type="button"
                              onClick={() => handleApprove(teacher.id, teacher.name)}
                              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98 cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Approve Faculty</span>
                            </button>

                            {/* REJECT BUTTON */}
                            <button
                              type="button"
                              onClick={() => handleOpenRejectModal(teacher)}
                              className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Reject / Revision</span>
                            </button>
                          </>
                        )}

                        {isApproved && (
                          <div className="space-y-2 w-full">
                            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center font-medium">
                              Approved on {teacher.approvedAt}
                            </div>

                            {/* Assign Courses Button */}
                            <button
                              type="button"
                              onClick={() => handleOpenAssignTeacherModal(teacher)}
                              className="w-full py-2.5 px-3 rounded-xl bg-[#10233F] hover:bg-[#1a345c] text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-[#EFC988]" />
                              <span>Assign Courses</span>
                            </button>
                          </div>
                        )}

                        {isRejected && (
                          <button
                            type="button"
                            onClick={() => handleApprove(teacher.id, teacher.name)}
                            className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Re-Evaluate & Approve</span>
                          </button>
                        )}

                        {/* Direct Contact info */}
                        <div className="pt-2 text-[11px] text-[#526174] border-t border-[#E8DCCB] space-y-0.5">
                          <span className="block truncate font-mono">{teacher.email}</span>
                          <span className="block font-mono">{teacher.phone}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* --------------------------------------------------------------------
            TAB 2: Student Course Assignments Hub (Fulfills Audio Requirements)
            -------------------------------------------------------------------- */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            
            {/* Assignment Creator Form Card */}
            <div className="bg-white rounded-3xl border border-[#E8DCCB] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center space-x-2 pb-3 border-b border-[#E8DCCB] mb-5">
                <Users className="w-5 h-5 text-[#89190E]" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#10233F]">
                    Assign Course Directly to Student
                  </h3>
                  <p className="text-xs text-[#526174]">
                    Super Admin can prescribe courses directly into any student&apos;s learning portal.
                  </p>
                </div>
              </div>

              {assignmentSuccess && (
                <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Course successfully assigned! The student will now see this unlocked in their dashboard.</span>
                </div>
              )}

              <form onSubmit={handleAssignCourseToStudent} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Student Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10233F] mb-1.5">
                    Select Target Student
                  </label>
                  <select
                    value={targetStudentId}
                    onChange={(e) => setTargetStudentId(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E8DCCB] bg-[#FFF9EF] text-xs font-semibold text-[#10233F] focus:outline-none focus:border-[#89190E]"
                  >
                    {DEMO_STUDENTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.rollNo} • {s.batch})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Course Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10233F] mb-1.5">
                    Select Course to Assign
                  </label>
                  <select
                    value={targetCourseId}
                    onChange={(e) => setTargetCourseId(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E8DCCB] bg-[#FFF9EF] text-xs font-semibold text-[#10233F] focus:outline-none focus:border-[#89190E]"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Action Button */}
                <div className="flex flex-col justify-end">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Assign Course to Student</span>
                  </button>
                </div>

                {/* Admin Note */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10233F] mb-1.5">
                    Super Admin Priority Directive / Academic Note
                  </label>
                  <input
                    type="text"
                    value={assignmentNote}
                    onChange={(e) => setAssignmentNote(e.target.value)}
                    placeholder="e.g. Mandatory requirement for PCS-J High Court trial test series..."
                    className="w-full p-3 rounded-xl border border-[#E8DCCB] bg-[#FFF9EF] text-xs text-[#10233F] focus:outline-none focus:border-[#89190E]"
                  />
                </div>

              </form>
            </div>

            {/* Current Active Enrollments Table */}
            <div className="bg-white rounded-3xl border border-[#E8DCCB] overflow-hidden shadow-xs">
              <div className="p-5 border-b border-[#E8DCCB] flex items-center justify-between">
                <h4 className="font-serif font-bold text-base text-[#10233F]">
                  Active Student Enrollments & Learning Progress
                </h4>
                <span className="text-xs text-[#526174] font-mono">
                  {enrollments.length} Total Enrolled
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FFF9EF] border-b border-[#E8DCCB] text-[#526174] font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Student</th>
                      <th className="p-3.5">Course Enrolled</th>
                      <th className="p-3.5">Enrollment Method</th>
                      <th className="p-3.5">Progress</th>
                      <th className="p-3.5">Enrolled Date</th>
                      <th className="p-3.5">Certificate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DCCB]/60">
                    {enrollments.map((enr, idx) => {
                      const student = DEMO_STUDENTS.find((s) => s.id === enr.studentId);
                      const course = courses.find((c) => c.id === enr.courseId);

                      return (
                        <tr key={idx} className="hover:bg-[#FFF9EF]/40 transition-colors">
                          <td className="p-3.5">
                            <span className="font-bold text-[#10233F] block">
                              {student?.name || enr.studentId}
                            </span>
                            <span className="text-[11px] text-[#526174] font-mono">
                              {student?.rollNo || 'Roll pending'}
                            </span>
                          </td>
                          <td className="p-3.5 max-w-xs">
                            <span className="font-semibold text-[#10233F] block truncate">
                              {course?.title || enr.courseId}
                            </span>
                            <span className="text-[10px] text-[#89190E] font-mono">
                              {course?.category}
                            </span>
                          </td>
                          <td className="p-3.5">
                            {enr.assignedBy === 'super-admin' ? (
                              <span className="px-2.5 py-1 rounded-full bg-[#89190E]/10 text-[#89190E] font-bold text-[10px] uppercase font-mono border border-[#89190E]/20">
                                Assigned by Super Admin
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] uppercase font-mono border border-emerald-200">
                                Self Enrolled
                              </span>
                            )}
                          </td>
                          <td className="p-3.5">
                            <div className="flex items-center space-x-2">
                              <div className="w-20 h-2 rounded-full bg-gray-200 overflow-hidden">
                                <div
                                  className="h-full bg-[#89190E] rounded-full"
                                  style={{ width: `${enr.progressPercentage}%` }}
                                />
                              </div>
                              <span className="font-mono font-bold text-[11px] text-[#10233F]">
                                {enr.progressPercentage}%
                              </span>
                            </div>
                          </td>
                          <td className="p-3.5 font-mono text-[#526174]">
                            {enr.enrolledAt}
                          </td>
                          <td className="p-3.5">
                            {enr.certificateIssued ? (
                              <span className="text-emerald-700 font-bold flex items-center space-x-1">
                                <Award className="w-3.5 h-3.5" />
                                <span>Issued</span>
                              </span>
                            ) : (
                              <span className="text-[#526174]">In Progress</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* --------------------------------------------------------------------
            TAB 3: Course Catalog Overview
            -------------------------------------------------------------------- */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl border border-[#E8DCCB] overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#10233F]/90 text-white font-mono text-[10px] font-bold">
                        {course.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <h4 className="font-serif font-bold text-base text-[#10233F] leading-tight">
                        {course.title}
                      </h4>
                      <p className="text-xs text-[#526174] line-clamp-2">
                        {course.headline}
                      </p>
                      <div className="pt-2 text-xs flex items-center justify-between text-[#526174]">
                        <span>Instructor: <strong>{course.instructorName}</strong></span>
                        <span className="font-mono text-[#89190E] font-bold">₹{course.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href="/courses"
                      className="w-full py-2.5 rounded-xl bg-[#FFF9EF] hover:bg-[#FFF3DD] text-[#89190E] border border-[#E8DCCB] text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <span>View Course on Public Catalog</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Demo Video Player Modal Popup */}
      {selectedDemoVideo && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <button
              onClick={() => setSelectedDemoVideo(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 cursor-pointer"
            >
              <XCircle className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full bg-black">
              <video
                src={selectedDemoVideo.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 bg-[#10233F] text-white flex items-center justify-between text-xs">
              <span className="font-semibold">{selectedDemoVideo.title}</span>
              <span className="text-[11px] font-mono text-[#EFC988]">Super Admin Lecture Verification</span>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {rejectingTeacher && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-rose-200 space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#10233F]">
              Reject / Request Revisions: {rejectingTeacher.name}
            </h3>
            <p className="text-xs text-[#526174]">
              Specify the reason for rejection or the required compliance documents.
            </p>
            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-rose-500"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setRejectingTeacher(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Courses to Teacher Modal */}
      {assigningTeacher && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-[#E8DCCB] space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-[#E8DCCB]">
              <BookOpen className="w-5 h-5 text-[#89190E]" />
              <div>
                <h3 className="font-serif font-bold text-base text-[#10233F]">
                  Assign Courses to {assigningTeacher.name}
                </h3>
                <p className="text-xs text-[#526174]">
                  Select the courses this faculty is authorized to teach and manage.
                </p>
              </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {courses.map((c) => {
                const checked = teacherSelectedCourseIds.includes(c.id);
                return (
                  <label
                    key={c.id}
                    className={`flex items-start space-x-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                      checked
                        ? 'bg-[#FFF3DD] border-[#EFC988]'
                        : 'bg-[#FFF9EF] border-[#E8DCCB] hover:bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTeacherSelectedCourseIds([...teacherSelectedCourseIds, c.id]);
                        } else {
                          setTeacherSelectedCourseIds(
                            teacherSelectedCourseIds.filter((id) => id !== c.id)
                          );
                        }
                      }}
                      className="mt-0.5 rounded text-[#89190E] focus:ring-[#89190E]"
                    />
                    <div className="min-w-0">
                      <span className="font-bold text-xs text-[#10233F] block">
                        {c.title}
                      </span>
                      <span className="text-[11px] text-[#526174] font-mono">
                        {c.category} • {c.totalDuration}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-[#E8DCCB]">
              <button
                type="button"
                onClick={() => setAssigningTeacher(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAssignCoursesToTeacher}
                className="px-4 py-2 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white text-xs font-bold"
              >
                Save Course Allocation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
