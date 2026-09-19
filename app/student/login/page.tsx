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
  UserCheck,
  Globe,
  AlertCircle,
  GraduationCap,
} from 'lucide-react';
import { DEMO_STUDENTS } from '@/components/student/data/studentMockData';

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('aarav.sharma@msi-institutes.edu.in');
  const [password, setPassword] = useState('Judiciary@2025');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Please provide both your institutional email and password.');
      return;
    }

    setIsLoading(true);
    // Simulate authentication delay
    setTimeout(() => {
      // Set session marker in localStorage if available
      try {
        localStorage.setItem('msi_student_logged_in', 'true');
        localStorage.setItem('msi_active_student_email', email);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
      router.push('/student/dashboard');
    }, 650);
  };

  const handleQuickDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Demo@MSI2025');
    setIsLoading(true);
    setTimeout(() => {
      try {
        localStorage.setItem('msi_student_logged_in', 'true');
        localStorage.setItem('msi_active_student_email', demoEmail);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
      router.push('/student/dashboard');
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] flex flex-col justify-between selection:bg-[#EFC988] selection:text-[#89190E] relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#89190E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#EFC988]/20 rounded-full blur-3xl pointer-events-none" />

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
              Group of Institutes
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href="/teacher/login"
            className="flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-xl bg-white border border-[#E8DCCB] hover:border-[#10233F] text-xs font-semibold text-[#10233F] transition-all shadow-xs"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#89190E]" />
            <span>Faculty Login</span>
          </Link>

          <Link
            href="/"
            className="flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-xl bg-white border border-[#E8DCCB] hover:border-[#89190E] text-xs font-semibold text-[#526174] hover:text-[#89190E] transition-all shadow-xs"
          >
            <Globe className="w-3.5 h-3.5 text-[#89190E]" />
            <span>Website</span>
          </Link>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-white border border-[#E8DCCB] rounded-3xl p-7 sm:p-9 shadow-2xl hud-bracket relative">
          
          {/* Card Top Icon & Title */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF3DD] border border-[#EFC988] text-[#89190E] flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-[#89190E] uppercase font-bold">
              Student Academic Portal
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#10233F] mt-1">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-[#526174] mt-1.5">
              Enter your student Gmail or institutional ID to access your dashboard, lectures & tests.
            </p>
          </div>

          {/* Quick Demo Login Presets */}
          <div className="mt-5 p-3 rounded-2xl bg-[#FFF9EF] border border-[#E8DCCB]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#89190E] block mb-2 text-center">
              Quick 1-Click Demo Profiles
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('aarav.sharma@msi-institutes.edu.in')}
                className="p-2 rounded-xl bg-white hover:bg-[#89190E] text-[#10233F] hover:text-white border border-[#E8DCCB] text-left transition-all text-xs font-semibold group shadow-xs"
              >
                <span className="block font-bold text-[11px] group-hover:text-white">
                  Aarav Sharma
                </span>
                <span className="text-[10px] text-[#526174] group-hover:text-white/80 block truncate">
                  PCS-J Judiciary Batch
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('meera.sen@msi-institutes.edu.in')}
                className="p-2 rounded-xl bg-white hover:bg-[#89190E] text-[#10233F] hover:text-white border border-[#E8DCCB] text-left transition-all text-xs font-semibold group shadow-xs"
              >
                <span className="block font-bold text-[11px] group-hover:text-white">
                  Meera Sen
                </span>
                <span className="text-[10px] text-[#526174] group-hover:text-white/80 block truncate">
                  CLAT Supreme Batch
                </span>
              </button>
            </div>
          </div>

          {/* Error message alert */}
          {errorMessage && (
            <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#10233F] mb-1.5">
                Institutional Email / Gmail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#526174] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@msi-institutes.edu.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8DCCB] bg-[#FFF9EF]/40 text-xs sm:text-sm text-[#10233F] focus:outline-none focus:border-[#89190E] focus:ring-1 focus:ring-[#89190E] transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#10233F]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link has been dispatched to your registered student Gmail ID.')}
                  className="text-[11px] text-[#89190E] font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#526174] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E8DCCB] bg-[#FFF9EF]/40 text-xs sm:text-sm text-[#10233F] focus:outline-none focus:border-[#89190E] focus:ring-1 focus:ring-[#89190E] transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#526174] hover:text-[#10233F]"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 text-[#526174] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#E8DCCB] text-[#89190E] focus:ring-[#89190E]"
                />
                <span>Remember this terminal</span>
              </label>
              <span className="text-[11px] text-[#526174]">256-Bit SSL Encrypted</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#89190E]/30 btn-chamfered active:scale-98 disabled:opacity-75 cursor-pointer"
            >
              {isLoading ? (
                <span>Validating Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security & Regulatory Footnote */}
          <div className="mt-6 pt-5 border-t border-[#E8DCCB] flex items-center justify-center space-x-2 text-[11px] text-[#526174]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Official Maharaja Surajmal Institute Student Directory</span>
          </div>

        </div>
      </main>

      {/* Footer Strip */}
      <footer className="relative z-10 py-4 text-center text-xs text-[#526174] border-t border-[#E8DCCB]/60">
        © {new Date().getFullYear()} Maharaja Surajmal Institute. All rights reserved. • Kharar, Mohali, Punjab.
      </footer>
    </div>
  );
}
