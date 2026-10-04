'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, ShieldCheck, Scale, Award } from 'lucide-react';

interface SplashScreenProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export default function SplashScreen({
  onComplete,
  minDurationMs = 2000,
}: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [statusMessage, setStatusMessage] = useState('INITIALIZING LEGAL ARCHIVES...');

  useEffect(() => {
    // Check if user already saw the splash screen in this session to avoid annoyance on every route
    const hasSeen = typeof window !== 'undefined' && sessionStorage.getItem('msi_splash_viewed');
    
    // Duration: 2s on first load, or snappy 1s if already viewed
    const targetDuration = hasSeen ? 1100 : minDurationMs;
    const startTime = performance.now();
    let animationFrameId: number;

    const milestones = [
      { at: 20, text: 'INDEXING CONSTITUTIONAL PRECEDENTS...' },
      { at: 45, text: 'CALIBRATING PCS J & CLAT MODULES...' },
      { at: 75, text: 'LOADING PANJAB UNIVERSITY LAW ARCHIVES...' },
      { at: 90, text: 'CRAFTING LEGAL BRILLIANCE...' },
      { at: 100, text: 'WELCOME TO MSI INSTITUTES' },
    ];

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const raw = Math.min((elapsed / targetDuration) * 100, 100);
      const currentInt = Math.floor(raw);

      setProgress(currentInt);

      const found = milestones.find((m) => currentInt <= m.at) || milestones[milestones.length - 1];
      setStatusMessage(found.text);

      if (raw < 100) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('msi_splash_viewed', 'true');
        }
        // Brief hold on 100% for satisfaction before curtain exit
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setShouldRender(false);
            if (onComplete) onComplete();
          }, 800);
        }, 220);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [minDurationMs, onComplete]);

  // Fast skip trigger
  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('msi_splash_viewed', 'true');
    }
    setProgress(100);
    setStatusMessage('WELCOME TO MSI INSTITUTES');
    setIsExiting(true);
    setTimeout(() => {
      setShouldRender(false);
      if (onComplete) onComplete();
    }, 400);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[99999999] select-none flex flex-col items-center justify-between bg-[#08101E] text-white overflow-hidden transition-all duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      aria-label="MSI Group of Institutes Splash Screen"
      role="dialog"
      aria-modal="true"
    >
      {/* ── Background Blueprint Grid ──────────────────────── */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

      {/* ── Ambient Radial Flares ──────────────────────────── */}
      {/* Crimson Royal Flare (Top Left) */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#89190E]/30 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />

      {/* Champagne Gold Flare (Bottom Right) */}
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-[#EFC988]/20 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />

      {/* Center Core Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#EFC988]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* ── HUD Corner Registration Ticks ──────────────────── */}
      <span className="hud-dot-tl" style={{ top: 24, left: 24 }} />
      <span className="hud-dot-tr" style={{ top: 24, right: 24 }} />
      <span className="hud-dot-bl" style={{ bottom: 24, left: 24 }} />
      <span className="hud-dot-br" style={{ bottom: 24, right: 24 }} />

      {/* Top Gold Horizon Beam */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EFC988] to-transparent opacity-90" />

      {/* ══════════════════════════════════════════════════════ */}
      {/* 1. TOP HEADER HUD                                     */}
      {/* ══════════════════════════════════════════════════════ */}
      <header className="relative z-20 w-full max-w-[1400px] px-6 sm:px-12 pt-8 sm:pt-10 flex items-center justify-between text-xs font-mono tracking-widest text-[#EFC988]">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#89190E] animate-ping" />
          <span className="text-[#FFF9EF]/90 uppercase font-bold text-[11px] sm:text-xs">
            MSI // JUDICIAL & LEGAL ARCHIVES
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="group flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#89190E] text-[#FFF9EF] border border-[#E8DCCB]/30 hover:border-[#89190E] transition-all duration-300 text-[11px] font-bold tracking-wider cursor-pointer"
        >
          <span>SKIP INTRO</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </header>

      {/* ══════════════════════════════════════════════════════ */}
      {/* 2. CENTER SPLASH HERO: CREST + BRAND + COUNTER       */}
      {/* ══════════════════════════════════════════════════════ */}
      <main className="relative z-20 flex flex-col items-center justify-center text-center my-auto px-6 max-w-3xl">
        {/* Animated Concentric Golden Orbital Crest */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center mb-6">
          {/* Rotating Outer Dashed Golden Halo */}
          <div
            className="absolute inset-0 rounded-full border border-dashed border-[#EFC988]/50 animate-spin"
            style={{ animationDuration: '20s' }}
          />

          {/* Counter-Rotating Crimson Orbit */}
          <div
            className="absolute inset-2.5 rounded-full border border-[#89190E]/70 animate-spin"
            style={{ animationDuration: '14s', animationDirection: 'reverse' }}
          />

          {/* Inner Glowing Ring */}
          <div className="absolute inset-5 rounded-full border-2 border-[#EFC988]/90 shadow-[0_0_30px_rgba(239,201,136,0.4)]" />

          {/* Official MSI Seal Image */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-2xl p-1 bg-[#0A1322]/90 backdrop-blur-md border border-[#EFC988]/60 transition-transform duration-500 hover:scale-105">
            <Image
              src="/images/msi-crest.png"
              alt="MSI Group of Institutes Crest"
              fill
              priority
              className="object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
              sizes="(max-width: 640px) 112px, 128px"
            />
          </div>

          {/* Satellite Orbit Dot */}
          <div
            className="absolute inset-0 rounded-full animate-spin pointer-events-none"
            style={{ animationDuration: '5s' }}
          >
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#EFC988] shadow-[0_0_14px_#EFC988]" />
          </div>
        </div>

        {/* Established Eyebrow Badge */}
        <div className="inline-flex items-center space-x-2.5 px-3.5 py-1 rounded-full bg-[#EFC988]/10 border border-[#EFC988]/30 mb-3">
          <Sparkles className="w-3 h-3 text-[#EFC988]" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#EFC988] uppercase">
            EST. 1995 • KHARAR, MOHALI
          </span>
        </div>

        {/* Grand Typography Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#EFC988] via-[#FFF9EF] to-[#EFC988] tracking-tight leading-none mb-2">
          MSI GROUP OF INSTITUTES
        </h1>

        {/* Subtitle Legal Motto */}
        <p className="font-serif text-sm sm:text-base text-white/80 font-medium tracking-wider mb-6">
          Crafting Legal Brilliance, Creating a Better Nation
        </p>

        {/* ── Dynamic Percentage Counter & Progress Track ───── */}
        <div className="w-full max-w-[320px] sm:max-w-[400px]">
          {/* Large Serif Percentage Number */}
          <div className="flex items-baseline justify-center space-x-1 mb-2">
            <span className="font-serif text-5xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_20px_rgba(239,201,136,0.35)] tabular-nums">
              {String(progress).padStart(2, '0')}
            </span>
            <span className="font-serif text-2xl sm:text-3xl text-[#EFC988] font-bold">
              %
            </span>
          </div>

          {/* Cycling Status Label */}
          <div className="h-5 flex items-center justify-center mb-3">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#EFC988] uppercase transition-all duration-300">
              {statusMessage}
            </span>
          </div>

          {/* Progress Bar with Flare */}
          <div className="relative h-[3.5px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#89190E] via-[#EFC988] to-[#FFFFFF] rounded-full transition-all duration-100 ease-out shadow-[0_0_14px_#EFC988]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Bottom HUD Metadata Indicators */}
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-white/40 mt-2 tracking-wider">
            <span>PCS J · CLAT · PU LAW</span>
            <span>300+ SELECTIONS</span>
          </div>
        </div>
      </main>

      {/* ══════════════════════════════════════════════════════ */}
      {/* 3. FOOTER HINT & BOTTOM BEAM                          */}
      {/* ══════════════════════════════════════════════════════ */}
      <footer className="relative z-20 w-full max-w-[1400px] px-6 sm:px-12 pb-8 sm:pb-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-[11px] text-white/50 tracking-wider">
          Premier Legal Coaching Destination in Kharar, Mohali, Punjab
        </p>

        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center space-x-1.5 hover:text-[#EFC988] transition-colors cursor-pointer">
          <span>Click anywhere or press Esc to enter</span>
          <span className="text-[#EFC988]">→</span>
        </div>
      </footer>

      {/* Bottom Glowing Accent Beam */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#89190E] via-[#EFC988] to-[#89190E] opacity-90" />
    </div>
  );
}
