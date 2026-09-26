'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  User,
  GraduationCap,
  ShieldAlert,
  ChevronDown,
  UserPlus,
  LogIn,
  Layers,
} from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside listener for portals dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPortalDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if link is active
  const isLinkActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Top Admissions Notification Ticker (visible when at the very top) */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-[#89190E] text-[#FFF9EF] text-[11px] sm:text-xs py-1.5 px-4 font-medium transition-all duration-300 flex items-center justify-center overflow-hidden select-none ${
          scrolled ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="flex items-center space-x-2 animate-fadeIn max-w-full px-2 truncate">
          <span className="w-2 h-2 rounded-full bg-[#EFC988] animate-pulse-beacon flex-shrink-0" />
          <span className="font-semibold tracking-wide truncate text-[11px] sm:text-xs">
            New Batch Starting Soon — 2025
          </span>
          <span className="hidden md:inline text-[#EFC988]">•</span>
          <span className="hidden md:inline text-white/90">
            PCS J, CLAT, AILET, UGC NET (Law) Coaching | Kharar, Mohali
          </span>
          <button
            onClick={onOpenEnquiry}
            className="ml-1 sm:ml-2 underline font-bold hover:text-[#EFC988] transition-colors whitespace-nowrap flex-shrink-0 cursor-pointer"
          >
            Enquire Now →
          </button>
        </div>
      </div>

      {/* Main Floating Capsule Header */}
      <header
        className={`fixed left-0 right-0 z-40 flex justify-center pointer-events-none transition-all duration-400 ease-out ${
          scrolled ? 'top-2 sm:top-3' : 'top-7 sm:top-9'
        }`}
      >
        <div
          className={`pointer-events-auto flex items-center justify-between transition-all duration-400 ease-out mx-auto ${
            scrolled
              ? 'w-[96%] sm:w-[90%] lg:w-[86%] max-w-[1340px] h-[60px] sm:h-[64px] rounded-[22px] sm:rounded-[24px] px-3.5 sm:px-6 glass-navbar-scrolled'
              : 'w-[98%] sm:w-[95%] lg:w-[92%] max-w-[1400px] h-[72px] sm:h-[88px] rounded-[24px] sm:rounded-[36px] px-4 sm:px-8 glass-navbar'
          }`}
        >
          {/* MSI Crest Logo */}
          <Link
            href="/"
            className="relative flex items-center flex-shrink-0 transition-transform duration-300 hover:scale-105 group"
            aria-label="MSI Homepage"
          >
            <div
              className={`relative transition-all duration-400 ease-out ${
                scrolled ? 'w-[40px] h-[40px] sm:w-[44px] sm:h-[44px]' : 'w-[50px] h-[50px] sm:w-[66px] sm:h-[66px]'
              }`}
            >
              <Image
                src="/images/msi-crest.png"
                alt="MSI Official Seal"
                fill
                priority
                className="object-contain drop-shadow-sm group-hover:brightness-105"
              />
            </div>
            <div className="ml-2 sm:ml-2.5 hidden sm:block">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-[#10233F] block leading-none">
                MSI
              </span>
              <span className="text-[10px] tracking-wider text-[#89190E] font-semibold uppercase block mt-0.5">
                Group of Institutes
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Items */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-3 py-2 text-[14px] lg:text-[14.5px] font-semibold tracking-normal rounded-xl transition-all duration-200 group ${
                    active
                      ? 'text-[#89190E] bg-[#89190E]/5'
                      : 'text-[#10233F] hover:text-[#89190E] hover:bg-[#FFF9EF]/80'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-[#89190E] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons (With Fix for Disappearing Portal / Sign Up) */}
          <div className="hidden xl:flex items-center space-x-2.5 flex-shrink-0">
            
            {/* 1. Portals Dropdown (Never Disappears - Hover bridge + Clickable Toggle) */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setPortalDropdownOpen(true)}
              onMouseLeave={() => setPortalDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                className={`font-semibold text-[#89190E] bg-white hover:bg-[#FFF9EF] border border-[#89190E]/40 hover:border-[#89190E] rounded-xl transition-all duration-200 shadow-xs flex items-center space-x-1.5 cursor-pointer ${
                  scrolled ? 'h-[38px] px-3 text-xs' : 'h-[44px] px-3.5 text-xs'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#89190E]" />
                <span>Portals</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#89190E] transition-transform duration-200 ${
                    portalDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Container with Padding Bridge so mouse hover doesn't break */}
              <div
                className={`absolute right-0 top-full pt-2 w-64 z-50 transition-all duration-200 ${
                  portalDropdownOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="bg-white border-2 border-[#E8DCCB] rounded-2xl shadow-2xl p-2.5 space-y-1">
                  
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#89190E] font-bold border-b border-[#E8DCCB]">
                    Active Learning Portals
                  </div>

                  <Link
                    href="/student/dashboard"
                    onClick={() => setPortalDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-[#FFF9EF] text-xs font-semibold text-[#10233F] transition-colors group"
                  >
                    <User className="w-4 h-4 text-[#89190E] group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="block font-bold">Student Portal</span>
                      <span className="text-[10px] text-[#526174]">My Learning & Tests</span>
                    </div>
                  </Link>

                  <Link
                    href="/teacher/dashboard"
                    onClick={() => setPortalDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-[#FFF9EF] text-xs font-semibold text-[#10233F] transition-colors group"
                  >
                    <GraduationCap className="w-4 h-4 text-[#89190E] group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="block font-bold">Faculty Portal</span>
                      <span className="text-[10px] text-[#526174]">Classes & Curriculums</span>
                    </div>
                  </Link>

                  <Link
                    href="/super-admin"
                    onClick={() => setPortalDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-[#FFF3DD]/60 hover:bg-[#FFF3DD] text-xs font-semibold text-[#89190E] transition-colors group"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#89190E] text-[#EFC988] flex items-center justify-center text-[10px] font-bold">
                      ★
                    </span>
                    <div>
                      <span className="block font-bold">Super Admin Hub</span>
                      <span className="text-[10px] text-[#89190E]/80">Teacher Approvals & LMS</span>
                    </div>
                  </Link>

                  <div className="border-t border-[#E8DCCB] pt-1.5 mt-1 grid grid-cols-2 gap-1.5">
                    <Link
                      href="/student/login"
                      onClick={() => setPortalDropdownOpen(false)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#FFF9EF] hover:bg-[#FFF3DD] text-[11px] font-bold text-[#10233F] text-center flex items-center justify-center space-x-1"
                    >
                      <LogIn className="w-3 h-3 text-[#89190E]" />
                      <span>Log In</span>
                    </Link>
                    <Link
                      href="/student/login?tab=signup"
                      onClick={() => setPortalDropdownOpen(false)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#89190E] hover:bg-[#65130D] text-[11px] font-bold text-white text-center flex items-center justify-center space-x-1"
                    >
                      <UserPlus className="w-3 h-3 text-[#EFC988]" />
                      <span>Sign Up</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Direct Portal Login Button */}
            <Link
              href="/student/login"
              className={`font-semibold text-[#10233F] hover:text-[#89190E] bg-white/70 hover:bg-white border border-[#E8DCCB] hover:border-[#89190E] rounded-xl transition-all duration-200 shadow-xs flex items-center space-x-1.5 ${
                scrolled ? 'h-[38px] px-3 text-xs' : 'h-[44px] px-3.5 text-xs'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-[#89190E]" />
              <span>Log In</span>
            </Link>

            {/* 3. Direct Sign Up Button (NEW - High Priority) */}
            <Link
              href="/student/login?tab=signup"
              className={`font-bold text-[#89190E] bg-[#FFF3DD] hover:bg-[#EFC988] border border-[#EFC988] hover:border-[#d4a85b] rounded-xl transition-all duration-200 shadow-xs flex items-center space-x-1.5 ${
                scrolled ? 'h-[38px] px-3 text-xs' : 'h-[44px] px-3.5 text-xs'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 text-[#89190E]" />
              <span>Sign Up</span>
            </Link>

            {/* 4. Enquire Now CTA Button */}
            <button
              onClick={onOpenEnquiry}
              className={`group font-semibold text-white bg-[#89190E] hover:bg-[#65130D] rounded-xl flex items-center space-x-1.5 transition-all duration-200 btn-hover-lift active:scale-98 shadow-md shadow-[#89190E]/20 cursor-pointer ${
                scrolled ? 'h-[38px] px-3.5 text-xs' : 'h-[44px] px-4 text-xs'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EFC988] transition-transform duration-300 group-hover:rotate-12" />
              <span>Enquire</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile / Tablet Menu Trigger */}
          <div className="flex xl:hidden items-center space-x-2">
            <Link
              href="/student/login?tab=signup"
              className="inline-flex text-xs font-bold text-[#89190E] bg-[#FFF3DD] border border-[#EFC988] px-2.5 py-1.5 rounded-xl shadow-xs"
            >
              Sign Up
            </Link>
            <button
              onClick={onOpenEnquiry}
              className="inline-flex text-xs font-bold text-white bg-[#89190E] px-3 py-1.5 rounded-xl shadow-xs"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#10233F] hover:text-[#89190E] hover:bg-white/80 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-4 top-[85px] sm:top-[98px] pointer-events-auto xl:hidden bg-white/95 backdrop-blur-2xl border border-[#E8DCCB] rounded-3xl p-6 shadow-2xl transition-all animate-fadeIn z-50">
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col space-y-1 border-b border-[#E8DCCB]/60 pb-3">
                {NAV_ITEMS.map((item) => {
                  const active = isLinkActive(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3.5 py-2.5 text-base font-semibold rounded-xl transition-colors flex items-center justify-between ${
                        active
                          ? 'text-[#89190E] bg-[#FFF3DD]'
                          : 'text-[#10233F] hover:text-[#89190E] hover:bg-[#FFF9EF]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && <span className="w-2 h-2 rounded-full bg-[#89190E]" />}
                    </Link>
                  );
                })}
              </div>

              {/* Portals links in mobile */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono uppercase font-bold text-[#89190E] px-2 block">
                  Academy Portals
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    href="/student/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-[#FFF9EF] border border-[#E8DCCB] text-center text-xs font-bold text-[#10233F]"
                  >
                    Student
                  </Link>
                  <Link
                    href="/teacher/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-[#FFF9EF] border border-[#E8DCCB] text-center text-xs font-bold text-[#10233F]"
                  >
                    Faculty
                  </Link>
                  <Link
                    href="/super-admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-[#FFF3DD] border border-[#EFC988] text-center text-xs font-bold text-[#89190E]"
                  >
                    Super Admin
                  </Link>
                </div>
              </div>

              {/* Login and Sign Up Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/student/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full h-11 flex items-center justify-center font-bold text-xs sm:text-sm text-[#10233F] bg-white border border-[#E8DCCB] rounded-xl hover:bg-[#FFF9EF] transition-all"
                >
                  Portal Log In
                </Link>
                <Link
                  href="/student/login?tab=signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full h-11 flex items-center justify-center font-bold text-xs sm:text-sm text-white bg-[#89190E] hover:bg-[#65130D] rounded-xl shadow-md transition-all"
                >
                  Sign Up / Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
