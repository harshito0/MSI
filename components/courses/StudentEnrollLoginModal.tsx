'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Zap,
} from 'lucide-react';
import { UdemyCourse, enrollStudentAction } from '@/lib/lmsStore';

interface StudentEnrollLoginModalProps {
  isOpen: boolean;
  course: UdemyCourse | null;
  onClose: () => void;
  onLoginSuccess: (course: UdemyCourse) => void;
}

export default function StudentEnrollLoginModal({
  isOpen,
  course,
  onClose,
  onLoginSuccess,
}: StudentEnrollLoginModalProps) {
  const [email, setEmail] = useState('aarav.sharma@msi-institutes.edu.in');
  const [password, setPassword] = useState('Judiciary@2025');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !course) return null;

  const performEnrollment = (userEmail: string) => {
    try {
      localStorage.setItem('msi_student_logged_in', 'true');
      localStorage.setItem('msi_active_student_email', userEmail);
    } catch (err) {
      console.error(err);
    }
    // Enroll student in course
    enrollStudentAction('msi-stu-001', course.id, 'self');
    setIsLoading(false);
    onLoginSuccess(course);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both student email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      performEnrollment(email);
    }, 500);
  };

  const handleQuickDemoStudent = () => {
    setIsLoading(true);
    setEmail('aarav.sharma@msi-institutes.edu.in');
    setPassword('Judiciary@2025');
    setTimeout(() => {
      performEnrollment('aarav.sharma@msi-institutes.edu.in');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#10233F]/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border-2 border-[#E8DCCB] my-8 animate-fadeIn flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-[#FFF3DD] text-[#10233F] border border-[#E8DCCB] flex items-center justify-center transition-all cursor-pointer shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#10233F] via-[#1a345c] to-[#89190E] p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#EFC988]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-1 flex items-center justify-center flex-shrink-0">
              <div className="relative w-full h-full">
                <Image
                  src="/images/msi-crest.png"
                  alt="MSI Crest"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#EFC988] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#EFC988] font-bold">
                  Student Verification Required
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                Login as Student to Enroll
              </h2>
            </div>
          </div>
        </div>

        {/* Course Target Capsule */}
        <div className="p-5 bg-[#FFF9EF] border-b border-[#E8DCCB] flex items-center gap-3.5">
          <div className="relative w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-[#E8DCCB]">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-mono uppercase font-bold text-[#89190E] bg-[#FFF3DD] border border-[#EFC988] px-2 py-0.5 rounded-full">
              {course.category}
            </span>
            <h3 className="font-serif text-xs sm:text-sm font-bold text-[#10233F] truncate mt-1">
              {course.title}
            </h3>
            <p className="text-[11px] text-emerald-800 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Free 100% Enrollment with Student Credentials</span>
            </p>
          </div>
        </div>

        {/* Login Form Body */}
        <div className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#10233F] mb-1">
                Institutional Student Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#526174] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@msi-institutes.edu.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DCCB] bg-white text-xs text-[#10233F] focus:outline-none focus:border-[#89190E]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#10233F] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#526174] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E8DCCB] bg-white text-xs text-[#10233F] focus:outline-none focus:border-[#89190E]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#526174] hover:text-[#10233F]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md shadow-[#89190E]/20 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <span>Logging In & Enrolling...</span>
              ) : (
                <>
                  <span>Log In & Enroll Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo 1-Click Login Option */}
          <div className="pt-2 border-t border-[#E8DCCB]/60">
            <span className="text-[11px] text-[#526174] block text-center mb-2">
              For instant grading & test preview:
            </span>
            <button
              type="button"
              onClick={handleQuickDemoStudent}
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-[#FFF3DD] hover:bg-[#EFC988] border border-[#EFC988] text-xs font-bold text-[#89190E] flex items-center justify-center space-x-1.5 transition-all shadow-2xs cursor-pointer active:scale-98"
            >
              <Zap className="w-3.5 h-3.5 text-[#89190E] fill-[#89190E]" />
              <span>Instant 1-Click Demo Login (Aarav Sharma)</span>
            </button>
          </div>

          {/* Bottom Links */}
          <div className="pt-2 text-center text-xs text-[#526174] space-y-1">
            <p>
              New student at MSI?{' '}
              <Link
                href={`/student/login?tab=signup&enrollCourseId=${course.id}`}
                onClick={onClose}
                className="font-bold text-[#89190E] hover:underline"
              >
                Create Student Account →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
