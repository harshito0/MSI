'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import HeroSlider from '@/components/home/HeroSlider';
import FeatureStrip from '@/components/home/FeatureStrip';
import StatsSection from '@/components/home/StatsSection';
import WhyMSISection from '@/components/home/WhyMSISection';
import RecruiterMarquee from '@/components/home/RecruiterMarquee';
import CampusExperienceTabs from '@/components/home/CampusExperienceTabs';
import FacultySpotlight from '@/components/home/FacultySpotlight';
import AchieversTestimonials from '@/components/home/AchieversTestimonials';
import BlogPreview from '@/components/home/BlogPreview';
import AdmissionsCountdownCTA from '@/components/home/AdmissionsCountdownCTA';
import BlueprintStencilBand from '@/components/home/BlueprintStencilBand';
import TypewriterHeroBand from '@/components/home/TypewriterHeroBand';
import Footer from '@/components/footer/Footer';
import EnquiryModal from '@/components/modals/EnquiryModal';
import VideoModal from '@/components/modals/VideoModal';
import TiltCard from '@/components/ui/TiltCard';
import Reveal from '@/components/ui/Reveal';
import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Shield,
  Sparkles,
  Layers,
  Cpu,
  Scale,
} from 'lucide-react';

export default function HomePage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#FFF9EF] flex flex-col selection:bg-[#EFC988] selection:text-[#89190E]">
      {/* Floating Glassmorphism Navbar with Active State & Admissions Ticker */}
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* Main Content Flow */}
      <main className="flex-grow">
        {/* Full-Width Auto-Slide Hero Carousel */}
        <HeroSlider
          onOpenVideo={() => setIsVideoOpen(true)}
          onOpenEnquiry={() => setIsEnquiryOpen(true)}
        />

        {/* Floating Feature Strip */}
        <FeatureStrip />

        {/* Animated Stats Counters on Navy Background */}
        <StatsSection />

        {/* ✦ ChainGPT-Inspired: Giant Stencil Scroll + HUD Grid Cards */}
        <BlueprintStencilBand />

        {/* Why Choose MSI — 8-Card Feature Grid */}
        <WhyMSISection />

        {/* ✦ ChainGPT-Inspired: Typewriter + Blueprint Grid + Chamfered CTAs */}
        <TypewriterHeroBand onOpenEnquiry={() => setIsEnquiryOpen(true)} />

        {/* Corporate Alliances & Infinite Recruiter Marquee */}
        <RecruiterMarquee />

        {/* Academic Excellence Overview Section — Horizontal Program Cards */}
        <section className="py-24 px-6 sm:px-10 lg:px-16 max-w-[1380px] mx-auto select-none">
          <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center space-x-3 mb-3">
              <span className="h-[2px] w-8 bg-[#EFC988] rounded-full" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#89190E] uppercase">
                Academic Disciplines
              </span>
              <span className="h-[2px] w-8 bg-[#EFC988] rounded-full" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#10233F] tracking-tight">
              Pioneering Programs for Modern Minds
            </h2>
            <p className="mt-4 text-[#526174] text-base sm:text-lg">
              Industry-aligned curricula, world-class faculties, and immersive research opportunities across disciplines.
            </p>
          </Reveal>

          {/* Horizontal program cards — upgraded with blueprint-card + HUD styling */}
          {[
            {
              icon: Scale,
              badge: 'Judiciary Coaching',
              num: '01',
              title: 'PCS J — Punjab Civil Judge',
              desc: 'Expert coaching for Punjab & Haryana Judicial Services with daily judgment writing, mock tests & personal faculty attention.',
              programs: ['Civil Judge (JD) Coaching', 'JMFC — Judicial Magistrate Prep', 'ADJ & Sessions Court Preparation'],
              accentColor: '#89190E',
              bgBlob: 'bg-[#89190E]/5',
              statLabel: '100+', statSub: 'PCS J Selections',
            },
            {
              icon: GraduationCap,
              badge: 'Law Entrance',
              num: '02',
              title: 'CLAT & AILET Coaching',
              desc: 'Structured preparation for all 24 NLUs — CLAT, AILET, SLAT, LSAT India — with full syllabus coverage and weekly mock tests.',
              programs: ['CLAT — Common Law Admission Test', 'AILET — NLU Delhi Entrance', 'SLAT & LSAT India Coaching'],
              accentColor: '#10233F',
              bgBlob: 'bg-[#EFC988]/10',
              statLabel: '150+', statSub: 'NLU Admissions',
            },
            {
              icon: Award,
              badge: 'Postgraduate Law',
              num: '03',
              title: 'UGC NET & LLM Entrance',
              desc: 'Complete UGC NET Law (Paper 1 + Paper 2) coaching and LLM entrance preparation for NLU, PU, DU and state universities.',
              programs: ['UGC NET Law — JRF Focused', 'LLM Entrance (CLAT PG, PU, DU)', 'HPS J — Himachal Pradesh Judiciary'],
              accentColor: '#89190E',
              bgBlob: 'bg-[#89190E]/4',
              statLabel: '50+', statSub: 'NET/JRF Cleared',
            },
          ].map((card, cIdx) => {
            const Icon = card.icon;
            return (
              <Reveal key={cIdx} direction="up" delay={cIdx * 80}>
                <div className="blueprint-card rounded-3xl mb-6 overflow-hidden group">
                  {/* Blueprint dot grid on hover */}
                  <div className="absolute inset-0 blueprint-dot-grid opacity-0 group-hover:opacity-40 transition-opacity duration-400 pointer-events-none rounded-3xl" />

                  {/* HUD number badge — top right corner like ChainGPT */}
                  <div className="absolute top-5 right-5 z-10 flex items-center gap-1.5 opacity-40 group-hover:opacity-80 transition-opacity">
                    <span className="w-1.5 h-1.5 rounded-sm" style={{ background: card.accentColor }} />
                    <span className="grid-number-badge">{card.num}</span>
                  </div>

                  {/* Animated bottom bar */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px] transition-all duration-600 ease-out z-10"
                    style={{ background: `linear-gradient(90deg, ${card.accentColor}, #EFC988)`, width: '0%' }}
                    ref={el => {
                      if (!el) return;
                      const parent = el.parentElement;
                      if (!parent) return;
                      parent.addEventListener('mouseenter', () => (el.style.width = '100%'));
                      parent.addEventListener('mouseleave', () => (el.style.width = '0%'));
                    }}
                  />

                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 p-7 sm:p-8">
                    {/* Icon block */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-3">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-350 group-hover:scale-110 group-hover:rotate-3 hud-bracket"
                        style={{ backgroundColor: card.accentColor + '12', color: card.accentColor }}
                      >
                        <Icon className="w-10 h-10" />
                      </div>
                      <div
                        className="text-center px-3 py-1.5 rounded-xl text-xs border"
                        style={{ backgroundColor: card.accentColor + '10', borderColor: card.accentColor + '25' }}
                      >
                        <span className="font-serif font-extrabold block" style={{ color: card.accentColor }}>{card.statLabel}</span>
                        <span className="mono-accent text-[9px] text-[#526174] font-medium">{card.statSub}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <span className="mono-accent text-[10px] font-bold uppercase tracking-[0.2em] bg-[#FFF9EF] border border-[#E8DCCB] px-3.5 py-1 rounded-full" style={{ color: card.accentColor }}>
                        {card.badge}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-3 mb-2 group-hover:text-[#89190E] transition-colors text-[#10233F]">
                        {card.title}
                      </h3>
                      <p className="text-[#526174] text-sm leading-relaxed mb-5">{card.desc}</p>
                      <ul className="space-y-2">
                        {card.programs.map((prog, pIdx) => (
                          <li key={pIdx} className="flex items-center text-xs sm:text-sm text-[#10233F] font-medium">
                            <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: card.accentColor }} />
                            {prog}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA — chamfered style */}
                    <div className="flex-shrink-0 flex flex-row sm:flex-col gap-3">
                      <Link
                        href="/courses"
                        className="btn-chamfered h-11 px-5 font-bold text-xs flex items-center gap-1.5 text-white"
                        style={{ backgroundColor: card.accentColor }}
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setIsEnquiryOpen(true)}
                        className="btn-chamfered h-11 px-5 font-bold text-xs border transition-colors duration-200"
                        style={{ borderColor: card.accentColor + '50', color: card.accentColor }}
                      >
                        Enquire →
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </section>

        {/* Campus Life & Facilities Interactive Tabs */}
        <CampusExperienceTabs
          onOpenVideo={() => setIsVideoOpen(true)}
          onOpenEnquiry={() => setIsEnquiryOpen(true)}
        />

        {/* Faculty Spotlight — 3 Department Heads */}
        <FacultySpotlight />

        {/* Achievers Hall of Fame & Testimonials */}
        <AchieversTestimonials />

        {/* MSI Gazette — Blog Article Previews */}
        <BlogPreview />

        {/* Admissions Fast-Track Countdown CTA Banner */}
        <AdmissionsCountdownCTA
          onOpenEnquiry={() => setIsEnquiryOpen(true)}
        />
      </main>

      {/* Global Institutional Footer */}
      <Footer />

      {/* Interactive Modals */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}
