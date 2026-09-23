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
  Send,
  Phone,
} from 'lucide-react';

export default function HomePage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('PCS J — Punjab Civil Judge Coaching');

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

                    {/* CTA — chamfered style with Enquire Now & WhatsApp */}
                    <div className="flex-shrink-0 flex flex-wrap sm:flex-col gap-2.5 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          setSelectedCourse(card.title);
                          setIsEnquiryOpen(true);
                        }}
                        className="btn-chamfered h-10 sm:h-11 px-4 font-bold text-xs bg-[#89190E] hover:bg-[#65130D] text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm flex-1 sm:flex-none"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Enquire Now</span>
                      </button>

                      <a
                        href={`https://wa.me/919815502444?text=${encodeURIComponent(
                          `Hello MSI Admissions Team, I want to enquire about ${card.title} batch details and curriculum.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-chamfered h-10 sm:h-11 px-4 font-bold text-xs bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm flex-1 sm:flex-none"
                        title="Chat on WhatsApp"
                      >
                        <svg
                          className="w-3.5 h-3.5 fill-white"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12.031 2C6.498 2 2 6.497 2 12.032c0 1.996.586 3.864 1.6 5.438L2 22l4.673-1.562a10.007 10.007 0 0 0 5.358 1.564h.005c5.531 0 10.029-4.498 10.029-10.032 0-2.68-1.043-5.2-2.935-7.093A9.96 9.96 0 0 0 12.031 2Zm0 18.361h-.004a8.318 8.318 0 0 1-4.24-1.163l-.304-.18-3.155 1.054 1.073-3.076-.197-.315a8.324 8.324 0 0 1-1.278-4.45c0-4.606 3.748-8.354 8.356-8.354 2.232 0 4.33.87 5.908 2.45a8.293 8.293 0 0 1 2.446 5.904c0 4.608-3.748 8.356-8.36 8.356Zm4.582-6.257c-.251-.126-1.487-.734-1.718-.817-.23-.084-.397-.126-.565.126-.168.251-.649.817-.796.985-.147.168-.293.189-.544.063-.251-.126-1.06-.391-2.02-1.246-.746-.665-1.25-1.488-1.397-1.74-.146-.251-.016-.387.11-.512.113-.112.251-.293.376-.44.126-.147.168-.252.252-.42.083-.168.042-.314-.021-.44-.063-.125-.565-1.362-.774-1.865-.204-.49-.411-.423-.565-.431l-.481-.008c-.168 0-.44.063-.67.314-.23.252-.88.86-.88 2.096 0 1.237.901 2.431 1.026 2.599.126.168 1.773 2.707 4.296 3.796.6.26 1.068.415 1.433.531.602.191 1.15.164 1.583.1.482-.072 1.487-.608 1.696-1.194.21-.587.21-1.09.147-1.195-.063-.105-.23-.167-.481-.293Z" />
                        </svg>
                        <span>WhatsApp</span>
                      </a>

                      <Link
                        href="/courses"
                        className="btn-chamfered h-10 sm:h-11 px-4 font-bold text-xs border border-[#E8DCCB] text-[#10233F] hover:border-[#89190E] hover:text-[#89190E] flex items-center justify-center gap-1 transition-all flex-1 sm:flex-none"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* Under Courses Banner (Enquire Now & WhatsApp) */}
          <Reveal direction="up" className="mt-8">
            <div className="rounded-3xl bg-gradient-to-r from-[#10233F] via-[#162f55] to-[#10233F] p-6 sm:p-8 text-white border border-[#EFC988]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#EFC988] block mb-1">
                  Admissions Consultation
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  Targeting PCS J, CLAT or UGC NET 2026?
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-lg">
                  Speak directly with our academic mentors to choose the ideal batch and test series.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCourse('Admissions General Enquiry');
                    setIsEnquiryOpen(true);
                  }}
                  className="h-11 px-5 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enquire Now</span>
                </button>

                <a
                  href="https://wa.me/919815502444?text=Hello%20MSI%20Admissions%20Team%2C%20I%20want%20to%20enquire%20about%20your%20coaching%20programs."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 fill-white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.031 2C6.498 2 2 6.497 2 12.032c0 1.996.586 3.864 1.6 5.438L2 22l4.673-1.562a10.007 10.007 0 0 0 5.358 1.564h.005c5.531 0 10.029-4.498 10.029-10.032 0-2.68-1.043-5.2-2.935-7.093A9.96 9.96 0 0 0 12.031 2Zm0 18.361h-.004a8.318 8.318 0 0 1-4.24-1.163l-.304-.18-3.155 1.054 1.073-3.076-.197-.315a8.324 8.324 0 0 1-1.278-4.45c0-4.606 3.748-8.354 8.356-8.354 2.232 0 4.33.87 5.908 2.45a8.293 8.293 0 0 1 2.446 5.904c0 4.608-3.748 8.356-8.36 8.356Zm4.582-6.257c-.251-.126-1.487-.734-1.718-.817-.23-.084-.397-.126-.565.126-.168.251-.649.817-.796.985-.147.168-.293.189-.544.063-.251-.126-1.06-.391-2.02-1.246-.746-.665-1.25-1.488-1.397-1.74-.146-.251-.016-.387.11-.512.113-.112.251-.293.376-.44.126-.147.168-.252.252-.42.083-.168.042-.314-.021-.44-.063-.125-.565-1.362-.774-1.865-.204-.49-.411-.423-.565-.431l-.481-.008c-.168 0-.44.063-.67.314-.23.252-.88.86-.88 2.096 0 1.237.901 2.431 1.026 2.599.126.168 1.773 2.707 4.296 3.796.6.26 1.068.415 1.433.531.602.191 1.15.164 1.583.1.482-.072 1.487-.608 1.696-1.194.21-.587.21-1.09.147-1.195-.063-.105-.23-.167-.481-.293Z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <a
                  href="tel:+919815502444"
                  className="h-11 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center space-x-1.5 border border-white/20 transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: +91 98155 02444</span>
                </a>
              </div>
            </div>
          </Reveal>
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
        initialCourse={selectedCourse}
      />
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}
