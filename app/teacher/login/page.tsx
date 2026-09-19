'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Eye,
  EyeOff,
  GraduationCap,
  Globe,
  AlertCircle,
  Users,
} from 'lucide-react';
import { TEACHER_PROFILES } from '@/components/teacher/data/teacherMockData';

export default function TeacherLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('dr.vikramaditya@msi-institutes.edu.in');
  const [password, setPassword] = useState('Faculty@MSI2025');
  const [showPassword, setShowPassword] = useState(false);
  const [department, setDepartment] = useState<'Law' | 'JEE'>('Law');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Please provide your faculty email credentials.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        localStorage.setItem('msi_teacher_logged_in', 'true');
        localStorage.setItem('msi_active_teacher_email', email);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
      router.push('/teacher/dashboard');
    }, 600);
  };

  const handleQuickDemo = (facultyEmail: string, stream: 'Law' | 'JEE') => {
    setEmail(facultyEmail);
    setPassword('Faculty@MSI2025');
    setDepartment(stream);
    setIsLoading(true);
    setTimeout(() => {
      try {
        localStorage.setItem('msi_teacher_logged_in', 'true');
        localStorage.setItem('msi_active_teacher_email', facultyEmail);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
      router.push('/teacher/dashboard');
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] flex flex-col justify-between selection:bg-[#EFC988] selection:text-[#89190E] relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#10233F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#89190E]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Simple Header */}
      <header className="relative z-10 px-6 sm:px-12 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-12 h-12 transition-transform group-hover:scale-105">
            <Image
              src="/images/msi-crest.png"
              alt="MSI Official Seal"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-serif font-bold text-lg text-[#10233F] tracking-tight block leading-none">
              MSI
            </span>
            <span className="text-[10px] tracking-wider text-[#89190E] font-bold uppercase block mt-0.5">
              Faculty & Academic Directorate
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-3">
          <Link
            href="/student/login"
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E8DCCB] hover:border-[#10233F] text-xs font-semibold text-[#10233F] transition-all shadow-xs"
          >
            <Users className="w-3.5 h-3.5 text-[#EFC988]" />
            <span>Student Portal</span>
          </Link>

          <Link
            href="/"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E8DCCB] hover:border-[#89190E] text-xs font-semibold text-[#526174] hover:text-[#89190E] transition-all shadow-xs"
          >
            <Globe className="w-3.5 h-3.5 text-[#89190E]" />
            <span>Main Website</span>
          </Link>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-white border border-[#E8DCCB] rounded-3xl p-7 sm:p-9 shadow-2xl hud-bracket relative">
          
          {/* Top Title & Icon */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#10233F] border border-[#EFC988]/40 text-[#EFC988] flex items-center justify-center mx-auto mb-3 shadow-xs">
              <GraduationCap className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-[#89190E] uppercase font-bold">
              Faculty & Teacher Portal
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#10233F] mt-1">
              Teacher Sign In
            </h1>
            <p className="text-xs text-[#526174] mt-1.5">
              Access your assigned batches, lecture schedules, student monitoring & tests.
            </p>
          </div>

          {/* Quick 1-Click Demo Faculty Switcher */}
          <div className="mt-5 p-3 rounded-2xl bg-[#FFF9EF] border border-[#E8DCCB]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#89190E] block mb-2 text-center">
              Demonstrate Stream Data Isolation
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('dr.vikramaditya@msi-institutes.edu.in', 'Law')}
                className="p-2 rounded-xl bg-white hover:bg-[#89190E] text-[#10233F] hover:text-white border border-[#E8DCCB] text-left transition-all text-xs font-semibold group shadow-xs"
              >
                <span className="block font-bold text-[11px] group-hover:text-white">
                  Dr. Vikramaditya
                </span>
                <span className="text-[10px] text-[#89190E] group-hover:text-white/90 block font-mono font-bold">
                  Law / Judicial Faculty
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('rajesh.verma@msi-institutes.edu.in', 'JEE')}
                className="p-2 rounded-xl bg-white hover:bg-[#10233F] text-[#10233F] hover:text-white border border-[#E8DCCB] text-left transition-all text-xs font-semibold group shadow-xs"
              >
                <span className="block font-bold text-[11px] group-hover:text-white">
                  Er. Rajesh Verma
                </span>
                <span className="text-[10px] text-blue-700 group-hover:text-white/90 block font-mono font-bold">
                  JEE / Tech Faculty
                </span>
              </button>
            </div>
            <p className="text-[9px] text-[#526174] mt-2 text-center italic">
              *Enforcing: JEE teacher cannot see CLAT/Law students and vice-versa.
            </p>
          </div>

          {errorMessage && (
            <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#10233F] mb-1.5">
                Faculty Email ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#526174] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@msi-institutes.edu.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8DCCB] bg-[#FFF9EF]/40 text-xs sm:text-sm text-[#10233F] focus:outline-none focus:border-[#89190E] transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#10233F] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#526174] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E8DCCB] bg-[#FFF9EF]/40 text-xs sm:text-sm text-[#10233F] focus:outline-none focus:border-[#89190E] transition-all font-mono"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#10233F] hover:bg-[#1c355e] text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#10233F]/20 btn-chamfered active:scale-98 disabled:opacity-75 cursor-pointer"
            >
              {isLoading ? (
                <span>Verifying Faculty Credentials...</span>
              ) : (
                <>
                  <span>Sign In as Faculty</span>
                  <ArrowRight className="w-4 h-4 text-[#EFC988]" />
                </>
              )}
            </button>
          </form>

          {/* Footer Security Badge */}
          <div className="mt-6 pt-5 border-t border-[#E8DCCB] flex items-center justify-center space-x-2 text-[11px] text-[#526174]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Maharaja Surajmal Institute Faculty Academic Directorate</span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-[#526174] border-t border-[#E8DCCB]/60">
        © {new Date().getFullYear()} Maharaja Surajmal Institute. All rights reserved.
      </footer>
    </div>
  );
}
