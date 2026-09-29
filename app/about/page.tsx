'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import EnquiryModal from '@/components/modals/EnquiryModal';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import TiltCard from '@/components/ui/TiltCard';
import LeadershipShowcase from '@/components/about/LeadershipShowcase';
import {
  Award,
  Compass,
  Shield,
  Target,
  CheckCircle2,
  ArrowRight,
  Quote,
  BookOpen,
  Users,
  Scale,
  Sparkles,
  BookCheck,
  ShieldCheck,
} from 'lucide-react';

export default function AboutPage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const milestones = [
    { year: 'Genesis', title: 'Founding Vision of Excellence', desc: 'Conceived by visionary founder Mr. Shamsher Gahlawat to establish an educational ecosystem where knowledge, skill, character, and opportunity converge.' },
    { year: 'Curriculum', title: 'Pedagogical Precision in Law', desc: 'Introduced rigorous passage-based analytical training, moving beyond rote learning to deep conceptual profundity in Constitutional, Civil, and Criminal law.' },
    { year: 'Judiciary', title: 'Judicial Services & High Court Mastery', desc: 'Pioneered procedural law training (CrPC, CPC, Evidence, BNSS 2023) and High Court judgment writing under experienced advocates and legal scholars.' },
    { year: 'Publications', title: 'MSI Master Book & Aspirant Kits', desc: 'Launched the authoritative 6-Book Master Series, comprehensive current affairs compendiums, and multi-tier sectional mock tests.' },
    { year: '2026–27', title: 'Transformative Legal Education', desc: 'Leading candidates toward National Law Universities (NLUs), Judicial Magistrate positions (PCS J), and Higher Judicial Services (ADJ).' },
  ];

  const pillars = [
    { title: 'Academic Rigour', desc: 'Integrating conceptual profundity, analytical reasoning, contemporary awareness, and relentless examination practice.', icon: Award },
    { title: 'Intellectual Agility', desc: 'Moving deliberately beyond rote learning to empower students to interrogate concepts and construct coherent legal arguments.', icon: Compass },
    { title: 'Judicial Integrity', desc: 'Instilling uncompromising professional ethics, constitutional fidelity, and a deep commitment to serving justice with responsibility.', icon: Shield },
    { title: 'Measurable Achievement', desc: 'Transforming knowledge into competence, competence into confidence, and confidence into consistent rank-holding results.', icon: Target },
  ];



  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#10233F] flex flex-col selection:bg-[#EFC988] selection:text-[#89190E]">
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      <main className="flex-grow">
        {/* Full-Bleed Page Hero */}
        <PageHero
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'About MSI Group of Institutes' },
          ]}
          eyebrow="Intellectually Driven & Professionally Oriented"
          title="Redefining Competitive Legal Education"
          subtitle="Dedicated to cultivating academic excellence, competitive competence, and disciplined ambition with a specialized focus on Law, CLAT UG, and Judicial Services."
          bgImage="/images/hero-1.webp"
          className="pt-24 sm:pt-28"
        />

        {/* Quick Stats Bar */}
        <div className="bg-white border-b border-[#E8DCCB]">
          <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { prefix: '', target: 9, suffix: ' Specialized', label: 'Flagship Programs' },
                { prefix: '', target: 6, suffix: ' Volumes', label: 'MSI Master Books Series' },
                { prefix: '', target: 180, suffix: ' Sessions', label: 'Comprehensive Handouts' },
                { prefix: '', target: 100, suffix: '%', label: 'Passage-Based Practice' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#89190E]">
                    <AnimatedCounter target={s.target} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-[#526174] font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About body */}
        <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-24">

          {/* Description */}
          <Reveal direction="up" className="max-w-4xl mb-20">
            <span className="text-xs font-mono font-bold tracking-widest text-[#89190E] uppercase block mb-2">
              Institutional Profile
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10233F] mb-6">
              A Distinguished Centre of Competitive Education
            </h2>
            <p className="text-[#526174] text-base sm:text-lg leading-relaxed mb-5">
              MSI Group of Institutes is an intellectually driven and professionally oriented educational institution committed to redefining the paradigm of competitive education through academic rigour, pedagogical precision, and uncompromising standards of excellence. Established with the conviction that meaningful education must transcend the mechanical transmission of information, MSI endeavours to cultivate intellectually curious, analytically astute, and academically resilient individuals capable of navigating the increasingly demanding landscape of competitive examinations.
            </p>
            <p className="text-[#526174] text-base leading-relaxed">
              With a specialised academic orientation towards law, legal education, entrance examinations, judiciary, and allied competitive domains, MSI has developed a comprehensive learning ecosystem that harmoniously integrates conceptual profundity, critical reasoning, contemporary awareness, strategic preparation, and sustained academic practice. Our pedagogy is deliberately structured to move beyond rote learning, encouraging students to interrogate concepts, decipher complexities, construct coherent arguments, and apply knowledge with precision in examination-oriented situations.
            </p>
          </Reveal>

          {/* Core Philosophy Banner */}
          <Reveal direction="up" className="mb-24">
            <div className="rounded-3xl bg-gradient-to-br from-[#10233F] to-[#1a345c] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-[#EFC988]/30">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#EFC988]/10 blur-3xl pointer-events-none" />
              <Quote className="w-12 h-12 text-[#EFC988]/40 mb-4" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#EFC988] uppercase block mb-2">
                Our Academic Philosophy
              </span>
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug mb-4">
                “Education should not merely inform the mind; it should transform the manner in which the mind perceives, reasons, questions, and responds.”
              </blockquote>
              <p className="text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed">
                Accordingly, MSI strives to foster an educational culture characterised by intellectual curiosity, academic integrity, disciplined perseverance, and an enduring pursuit of excellence.
              </p>
            </div>
          </Reveal>

          {/* Vision & Mission */}
          <Reveal direction="up" className="mb-24">
            <SectionHeading
              eyebrow="Purpose & Direction"
              title="Vision & Mission"
              className="mb-12"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative bg-[#10233F] rounded-3xl p-8 sm:p-10 text-white overflow-hidden shadow-sm">
                <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-[#EFC988]/10" />
                <div className="absolute bottom-0 left-0 w-40 h-1 bg-gradient-to-r from-[#EFC988] to-transparent rounded-full" />
                <Scale className="w-10 h-10 text-[#EFC988] mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-4 text-[#EFC988]">Our Vision</h3>
                <p className="text-white/90 leading-relaxed text-sm sm:text-base mb-4">
                  MSI ultimately envisions an institution where <strong>knowledge becomes competence</strong>, <strong>competence becomes confidence</strong>, and <strong>confidence is translated into achievement</strong>.
                </p>
                <p className="text-white/75 leading-relaxed text-xs sm:text-sm">
                  Through an unwavering commitment to academic excellence and student development, MSI aspires to emerge as a distinguished centre of competitive education, preparing not merely examination candidates, but intellectually capable individuals equipped to pursue consequential academic and professional futures.
                </p>
              </div>

              <div className="relative bg-white border border-[#E8DCCB] rounded-3xl p-8 sm:p-10 overflow-hidden shadow-sm">
                <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-[#89190E]/5" />
                <div className="absolute bottom-0 left-0 w-40 h-1 bg-gradient-to-r from-[#89190E] to-transparent rounded-full" />
                <BookCheck className="w-10 h-10 text-[#89190E] mb-4" />
                <h3 className="font-serif text-2xl font-bold text-[#10233F] mb-4">Our Academic Framework</h3>
                <ul className="space-y-3">
                  {[
                    'Expert mentorship and systematically curated MSI Master Books & Notes',
                    'Intensive classroom instruction with passage-based analytical drills',
                    'Comprehensive mock examinations with continuous performance evaluation',
                    'Personalised doubt resolution and 1-on-1 strategic academic monitoring',
                    'Developing intellectual agility, decision-making, and examination temperament',
                  ].map((m, i) => (
                    <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#526174]">
                      <CheckCircle2 className="w-4 h-4 text-[#89190E] flex-shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* 4 Core Pillars */}
          <Reveal direction="up" className="mb-24">
            <SectionHeading
              eyebrow="Foundational Pillars"
              title="The Four Pillars of MSI"
              className="mb-12"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <Reveal key={idx} direction="up" delay={idx * 80}>
                    <TiltCard className="rounded-3xl h-full" intensity={7} glare shine>
                      <div className="bg-white rounded-3xl p-8 border border-[#E8DCCB] shadow-sm hover:shadow-xl hover:border-[#EFC988] transition-all duration-300 group h-full flex flex-col">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#FFF3DD] text-[#89190E] flex items-center justify-center group-hover:bg-[#89190E] group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg] flex-shrink-0">
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="font-serif text-lg font-bold text-[#10233F] mt-1 group-hover:text-[#89190E] transition-colors leading-tight">
                            {p.title}
                          </h3>
                        </div>
                        <p className="text-xs text-[#526174] leading-relaxed flex-grow">{p.desc}</p>
                        <div className="mt-4 h-[2px] w-6 bg-[#EFC988] rounded-full group-hover:w-full transition-all duration-500" />
                      </div>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </Reveal>

          {/* Leadership Showcase Section */}
          <LeadershipShowcase />

          {/* Historical Timeline */}
          <Reveal direction="up" className="mb-24">
            <SectionHeading
              eyebrow="Milestones & Evolution"
              title="Journey of Academic Distinction"
              className="mb-14"
            />
            <div className="relative border-l-2 border-[#E8DCCB] ml-4 sm:ml-32 pl-6 sm:pl-10 space-y-12">
              {milestones.map((m, mIdx) => (
                <Reveal key={mIdx} direction="right" delay={mIdx * 80}>
                  <div className="relative group">
                    <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-[#89190E] group-hover:scale-125 transition-transform shadow-xs" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                      <span className="font-serif text-lg sm:text-xl font-bold text-[#89190E] flex-shrink-0 sm:-ml-28 sm:w-20 text-left sm:text-right">
                        {m.year}
                      </span>
                      <div>
                        <h4 className="font-serif text-xl font-bold text-[#10233F] group-hover:text-[#89190E] transition-colors">{m.title}</h4>
                        <p className="text-sm text-[#526174] mt-1 max-w-2xl leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Institutional CTA */}
          <Reveal direction="up">
            <div className="rounded-3xl bg-[#10233F] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#EFC988] block mb-2">Begin Your Legal Journey</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold">Prepare with MSI’s Proven Academic Ecosystem</h3>
                <p className="text-gray-300 text-sm mt-2 max-w-xl">
                  Enrolments are currently open for CLAT UG, AILET, PU Law, PCS J, and Judicial Services batches.
                </p>
              </div>
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="h-12 px-7 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white font-bold text-sm transition-all btn-hover-lift flex-shrink-0 flex items-center space-x-2 cursor-pointer"
              >
                <span>Enquire for Admissions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />

      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </div>
  );
}
