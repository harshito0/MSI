'use client';

import React, { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import TiltCard from '@/components/ui/TiltCard';
import {
  FlaskConical,
  Scale,
  Trophy,
  Globe,
  HeartHandshake,
  Microscope,
  Landmark,
  ShieldCheck,
} from 'lucide-react';

const reasons = [
  {
    icon: Trophy,
    title: 'Established Since 1995',
    desc: 'Over 30 years of dedicated law coaching experience, producing hundreds of successful judicial officers and law students.',
    accent: '#89190E',
  },
  {
    icon: FlaskConical,
    title: 'Expert Faculty Team',
    desc: '50+ certified professors and experienced legal professionals providing expert guidance for all competitive law exams.',
    accent: '#10233F',
  },
  {
    icon: Globe,
    title: 'PCS J & Judiciary Coaching',
    desc: 'Specialized coaching for PCS J (Civil Judge), ADJ and other Punjab & Haryana judicial services examinations.',
    accent: '#89190E',
  },
  {
    icon: Landmark,
    title: 'CLAT & AILET Preparation',
    desc: 'Structured law entrance coaching for CLAT, AILET, SLAT, LSAT India and all national law university entrance exams.',
    accent: '#10233F',
  },
  {
    icon: Scale,
    title: 'UGC NET Law Coaching',
    desc: 'Comprehensive UGC NET Law (Paper 1 & Paper 2) coaching with regular practice tests and detailed subject analysis.',
    accent: '#89190E',
  },
  {
    icon: HeartHandshake,
    title: 'Small Batch Approach',
    desc: 'Limited seats per batch ensuring individual attention and personalized mentorship for every enrolled student.',
    accent: '#10233F',
  },
  {
    icon: Microscope,
    title: 'Regular Mock Tests',
    desc: 'Rigorous schedule of weekly mock tests, previous year papers and detailed performance evaluation with faculty feedback.',
    accent: '#89190E',
  },
  {
    icon: ShieldCheck,
    title: '300+ Successful Selections',
    desc: 'Proven track record of over 300 selections in PCS J, CLAT, NLUs and other prestigious legal examinations.',
    accent: '#10233F',
  },
];

export default function WhyMSISection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-28 bg-[#FFF9EF]" aria-label="Why Choose MSI">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Heading */}
        <Reveal direction="up" className="text-center mb-14">
          <SectionHeading
            eyebrow="The MSI Difference"
            title="Why Students Choose MSI"
            subtitle="Every facet of MSI is designed to give you not just a degree, but a decisive competitive advantage in your chosen career."
          />
        </Reveal>

        {/* 2-column horizontal card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            const isActive = activeIdx === idx;
            return (
              <Reveal key={idx} direction="up" delay={idx * 50}>
                <TiltCard
                  className="rounded-3xl h-full"
                  intensity={6}
                  glare
                  shine
                >
                  {/* Horizontal card layout */}
                  <div
                    className={`relative bg-white rounded-3xl border transition-all duration-350 cursor-default overflow-hidden h-full ${
                      isActive
                        ? 'border-[#EFC988] shadow-2xl'
                        : 'border-[#E8DCCB] shadow-sm hover:border-[#EFC988] hover:shadow-xl'
                    }`}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onMouseLeave={() => setActiveIdx(null)}
                  >
                    {/* Animated background gradient on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-3xl"
                      style={{
                        background: `radial-gradient(ellipse at 0% 50%, ${reason.accent}06 0%, transparent 70%)`,
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 350ms ease',
                      }}
                    />

                    {/* Animated left border accent */}
                    <div
                      className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-all duration-400"
                      style={{
                        backgroundColor: reason.accent,
                        transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'top',
                        opacity: isActive ? 1 : 0,
                        transition: 'transform 350ms cubic-bezier(0.16,1,0.3,1), opacity 350ms ease',
                      }}
                    />

                    <div className="flex items-center gap-5 p-6 sm:p-7 relative z-10">
                      {/* Icon — left side */}
                      <div
                        className="flex-shrink-0 relative"
                        style={{
                          transform: isActive ? 'scale(1.12) rotate(-4deg)' : 'scale(1) rotate(0deg)',
                          transition: 'transform 350ms cubic-bezier(0.16,1,0.3,1)',
                        }}
                      >
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-350 shadow-sm"
                          style={{
                            backgroundColor: isActive ? reason.accent : '#FFF3DD',
                            color: isActive ? '#fff' : reason.accent,
                          }}
                        >
                          <Icon className="w-7 h-7" />
                        </div>

                        {/* Ripple ring on hover */}
                        {isActive && (
                          <span
                            className="absolute inset-0 rounded-2xl animate-ping"
                            style={{
                              border: `2px solid ${reason.accent}`,
                              opacity: 0.3,
                            }}
                          />
                        )}
                      </div>

                      {/* Content — right side */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-serif text-lg font-bold leading-tight transition-colors duration-300 mb-1"
                          style={{ color: isActive ? reason.accent : '#10233F' }}
                        >
                          {reason.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#526174] leading-relaxed">
                          {reason.desc}
                        </p>

                        {/* Expanding gold underline */}
                        <div
                          className="mt-3 h-[2px] bg-[#EFC988] rounded-full transition-all duration-500 ease-out"
                          style={{ width: isActive ? '60%' : '24px' }}
                        />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
