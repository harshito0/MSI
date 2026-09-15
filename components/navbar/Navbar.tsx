'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Sparkles, User, Bell } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <div className="flex items-center space-x-2 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#EFC988] animate-pulse-beacon" />
          <span className="font-semibold tracking-wide">New Batch Starting Soon — 2025</span>
          <span className="hidden sm:inline text-[#EFC988]">•</span>
          <span className="hidden sm:inline text-white/90">
            PCS J, CLAT, AILET, UGC NET (Law) Coaching | Kharar, Mohali
          </span>
          <button
            onClick={onOpenEnquiry}
            className="ml-2 underline font-bold hover:text-[#EFC988] transition-colors"
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
              ? 'w-[94%] sm:w-[86%] lg:w-[82%] max-w-[1240px] h-[64px] rounded-[24px] px-5 sm:px-7 glass-navbar-scrolled'
              : 'w-[96%] sm:w-[94%] lg:w-[92%] max-w-[1380px] h-[82px] sm:h-[88px] rounded-[30px] sm:rounded-[36px] px-6 sm:px-8 glass-navbar'
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
                scrolled ? 'w-[44px] h-[44px]' : 'w-[58px] h-[58px] sm:w-[66px] sm:h-[66px]'
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
            <div className="ml-2.5 hidden sm:block">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-[#10233F] block leading-none">
                MSI
              </span>
              <span className="text-[10px] tracking-wider text-[#89190E] font-semibold uppercase block mt-0.5">
                Group of Institutes
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Items with Active Indicator */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-3.5 py-2 text-[14px] lg:text-[15px] font-semibold tracking-normal rounded-xl transition-all duration-200 group ${
                    active
                      ? 'text-[#89190E] bg-[#89190E]/5'
                      : 'text-[#10233F] hover:text-[#89190E] hover:bg-[#FFF9EF]/80'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#89190E] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <button
              onClick={onOpenEnquiry}
              className={`font-semibold text-[#89190E] bg-white/80 hover:bg-white border border-[#89190E]/40 hover:border-[#89190E] rounded-[13px] transition-all duration-200 shadow-sm hover:shadow active:scale-98 flex items-center space-x-1.5 ${
                scrolled ? 'h-[40px] px-4 text-xs sm:text-sm' : 'h-[46px] px-5 text-sm'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#89190E]" />
              <span>Portal Login</span>
            </button>

            <button
              onClick={onOpenEnquiry}
              className={`group font-semibold text-white bg-[#89190E] hover:bg-[#65130D] rounded-[13px] flex items-center space-x-2 transition-all duration-200 btn-hover-lift active:scale-98 shadow-md shadow-[#89190E]/20 ${
                scrolled ? 'h-[40px] px-4 text-xs sm:text-sm' : 'h-[46px] px-5 text-sm'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EFC988] transition-transform duration-300 group-hover:rotate-12" />
              <span>Enquire Now</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile / Tablet Menu Trigger */}
          <div className="flex xl:hidden items-center space-x-2">
            <button
              onClick={onOpenEnquiry}
              className="inline-flex text-xs font-bold text-white bg-[#89190E] px-3.5 py-2 rounded-xl shadow-sm active:scale-95"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#10233F] hover:text-[#89190E] hover:bg-white/80 rounded-xl transition-colors"
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

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenEnquiry) onOpenEnquiry();
                  }}
                  className="w-full h-11 flex items-center justify-center font-semibold text-sm text-[#89190E] bg-white border border-[#89190E] rounded-xl hover:bg-[#FFF9EF] transition-all"
                >
                  Portal Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenEnquiry) onOpenEnquiry();
                  }}
                  className="w-full h-11 flex items-center justify-center space-x-1.5 font-semibold text-sm text-white bg-[#89190E] hover:bg-[#65130D] rounded-xl shadow-md transition-all"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
