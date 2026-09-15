'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Scale, GraduationCap, BookOpen, Award, Users, TrendingUp } from 'lucide-react';

const STENCIL_WORDS_1 = [
  'PCS-J', '◆', 'CLAT', '◆', 'AILET', '◆', 'UGC-NET', '◆', 'JUDICIARY', '◆',
  'PCS-J', '◆', 'CLAT', '◆', 'AILET', '◆', 'UGC-NET', '◆', 'JUDICIARY', '◆',
];
const STENCIL_WORDS_2 = [
  'LEGAL', '◆', 'COACHING', '◆', 'KHARAR', '◆', 'EST.1995', '◆', 'MOHALI',  '◆',
  'LEGAL', '◆', 'COACHING', '◆', 'KHARAR', '◆', 'EST.1995', '◆', 'MOHALI',  '◆',
];

const gridCells = [
  {
    num: '01',
    icon: Scale,
    title: 'PCS J — Judiciary',
    desc: 'Expert coaching for Punjab & Haryana Civil Judge exams with daily judgment writing.',
    accent: '#89190E',
  },
  {
    num: '02',
    icon: GraduationCap,
    title: 'CLAT & AILET',
    desc: 'Targeted law entrance preparation for all 24 NLUs and top private law schools.',
    accent: '#10233F',
  },
  {
    num: '03',
    icon: BookOpen,
    title: 'UGC NET — Law',
    desc: 'Full Paper 1 + Paper 2 coverage with JRF-focused strategy and mock tests.',
    accent: '#89190E',
  },
  {
    num: '04',
    icon: Award,
    title: 'HPS J — HP Judiciary',
    desc: 'State-specific Himachal Pradesh judicial services exam coaching.',
    accent: '#10233F',
  },
  {
    num: '05',
    icon: Users,
    title: 'Small Batches',
    desc: 'Limited seats ensuring personalised attention and direct faculty interaction.',
    accent: '#89190E',
  },
  {
    num: '06',
    icon: TrendingUp,
    title: '300+ Selections',
    desc: 'Proven track record since 1995 across judiciary, NLU and UGC exams.',
    accent: '#10233F',
  },
];

interface HudCellProps {
  num: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  accent: string;
  index: number;
}

function HudCell({ num, icon: Icon, title, desc, accent, index }: HudCellProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative border border-[#E8DCCB] p-5 sm:p-6 cursor-default overflow-hidden group transition-all duration-400 blueprint-card rounded-2xl"
      style={{
        background: hovered ? `${accent}08` : 'white',
        borderColor: hovered ? `${accent}40` : '#E8DCCB',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Blueprint dot grid on hover */}
      <div
        className="absolute inset-0 blueprint-dot-grid transition-opacity duration-400 rounded-2xl"
        style={{ opacity: hovered ? 0.5 : 0 }}
      />

      {/* Top row: number + icon */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        {/* HUD number */}
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
            style={{ background: accent, boxShadow: hovered ? `0 0 8px ${accent}80` : 'none' }}
          />
          <span className="grid-number-badge">{num}</span>
        </div>
        {/* Icon */}
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-350"
          style={{
            background: hovered ? accent : `${accent}12`,
            color: hovered ? '#fff' : accent,
            transform: hovered ? 'scale(1.1) rotate(-4deg)' : 'scale(1)',
          }}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h4
          className="font-serif font-bold text-base sm:text-lg leading-tight mb-1.5 transition-colors duration-300"
          style={{ color: hovered ? accent : '#10233F' }}
        >
          {title}
        </h4>
        <p className="text-[11px] sm:text-xs text-[#526174] leading-relaxed">{desc}</p>
      </div>

      {/* Gold scan line on hover */}
      <div
        className="absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${accent}, #EFC988)`,
          width: hovered ? '100%' : '0%',
        }}
      />

      {/* Staggered entry animation delay */}
      <style>{`
        .hud-cell-${index} { animation-delay: ${index * 80}ms; }
      `}</style>
    </div>
  );
}

export default function BlueprintStencilBand() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FFF9EF] select-none"
      aria-label="MSI Coaching Highlights"
    >
      {/* ── Blueprint grid background ───────────────────────── */}
      <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" />

      {/* ── HUD corner accent dots ───────────────────────────── */}
      <span className="hud-dot-tl" style={{ top: 12, left: 12 }} />
      <span className="hud-dot-tr" style={{ top: 12, right: 12 }} />
      <span className="hud-dot-bl" style={{ bottom: 12, left: 12 }} />
      <span className="hud-dot-br" style={{ bottom: 12, right: 12 }} />

      {/* ── Gold gradient top border ─────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EFC988] to-transparent" />

      {/* ══════════════════════════════════════════════════════ */}
      {/*  STENCIL MARQUEE ROW 1 — Scrolls left                 */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden pt-14 pb-4">
        <div
          className="stencil-track flex items-center gap-0"
          style={{ willChange: 'transform' }}
        >
          {[...STENCIL_WORDS_1, ...STENCIL_WORDS_1].map((word, i) => (
            <span
              key={i}
              className="text-[56px] sm:text-[80px] lg:text-[108px] font-black uppercase leading-none tracking-[0.02em] flex-shrink-0 px-6 sm:px-10"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: word === '◆'
                  ? '#EFC988'
                  : 'transparent',
                WebkitTextStroke: word === '◆'
                  ? 'none'
                  : '1.5px rgba(16,35,63,0.18)',
                textShadow: 'none',
                letterSpacing: word === '◆' ? '0.02em' : '0.04em',
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  STENCIL MARQUEE ROW 2 — Scrolls right (reverse)     */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden pb-4">
        <div className="stencil-track-reverse flex items-center gap-0">
          {[...STENCIL_WORDS_2, ...STENCIL_WORDS_2].map((word, i) => (
            <span
              key={i}
              className="text-[56px] sm:text-[80px] lg:text-[108px] font-black uppercase leading-none flex-shrink-0 px-6 sm:px-10"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: word === '◆'
                  ? '#89190E'
                  : 'transparent',
                WebkitTextStroke: word === '◆'
                  ? 'none'
                  : '1.5px rgba(137,25,14,0.16)',
                letterSpacing: word === '◆' ? '0.02em' : '0.04em',
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  GRID CELL SECTION — ChainGPT numbered cards          */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-20">

        {/* Section label row — like ChainGPT's pill + nav arrows */}
        <div
          className={`flex items-center justify-between mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Orange bracket accent — like ChainGPT's ■ bullets */}
            <span
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ background: '#89190E' }}
            />
            <span
              className="mono-accent text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#89190E]"
            >
              Our Coaching Programmes
            </span>
          </div>

          {/* HUD tick right side */}
          <div className="hidden sm:flex items-center gap-3 text-[10px] mono-accent text-[#526174] tracking-widest">
            <span className="h-[1px] w-10 bg-[#EFC988]" />
            <span>MSI — EST. 1995</span>
            <span className="h-[1px] w-10 bg-[#EFC988]" />
          </div>
        </div>

        {/* 6-cell grid — like ChainGPT's numbered program grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {gridCells.map((cell, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 90}ms` }}
            >
              <HudCell
                num={cell.num}
                icon={cell.icon}
                title={cell.title}
                desc={cell.desc}
                accent={cell.accent}
                index={idx}
              />
            </div>
          ))}
        </div>

        {/* Bottom HUD data row — mimics ChainGPT's data grid cells */}
        <div
          className={`mt-10 grid grid-cols-3 sm:grid-cols-6 gap-px bg-[#E8DCCB] rounded-2xl overflow-hidden border border-[#E8DCCB] transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {[
            { val: '300+', lab: 'Selections' },
            { val: '1995', lab: 'Founded' },
            { val: '50+',  lab: 'Tutors' },
            { val: '30+',  lab: 'Courses' },
            { val: '26+',  lab: 'Professors' },
            { val: '100%', lab: 'Dedication' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white px-4 py-4 text-center group hover:bg-[#10233F] transition-colors duration-300"
            >
              <div className="font-serif text-xl sm:text-2xl font-extrabold text-[#89190E] group-hover:text-[#EFC988] transition-colors leading-none mb-0.5">
                {stat.val}
              </div>
              <div className="mono-accent text-[9px] sm:text-[10px] text-[#526174] group-hover:text-white/60 uppercase tracking-widest transition-colors">
                {stat.lab}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Gold gradient bottom border ──────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EFC988] to-transparent" />
    </section>
  );
}
