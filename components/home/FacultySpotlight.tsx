'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import TiltCard from '@/components/ui/TiltCard';
import { ArrowRight, GraduationCap, Clock, ShieldCheck, Star } from 'lucide-react';

const faculty = [
  {
    name: 'Dr. Ekta Gahlawat',
    role: 'Faculty – Legal Studies',
    degree: 'Ph.D. in Law, LL.M. (Jurisprudence)',
    experience: '14+ Years',
    papers: 'MSI/LEGSTUDIES-/01',
    specialty: 'Constitutional Law, Law of Torts & Passage-Based Principle-Fact Application',
    avatar: '/images/avatars/avatar-2.webp',
    dept: 'Legal Reasoning',
    accentColor: '#89190E',
    tags: ['CLAT Legal', 'Constitutional Law', 'Torts'],
  },
  {
    name: 'Mr. Anurag Dwivedi',
    role: 'Faculty – GK & Current Affairs',
    degree: 'M.A. International Relations (JNU), M.Phil.',
    experience: '12+ Years',
    papers: 'MSI/GKCA/01 (180 Sessions)',
    specialty: 'Supreme Court Constitution-Bench Reasoning, Geopolitics & Static GK',
    avatar: '/images/avatars/avatar-1.webp',
    dept: 'Current Affairs & GK',
    accentColor: '#10233F',
    tags: ['GK & CA', 'Geopolitics', 'Static GK'],
  },
  {
    name: 'Ms. Riya Hooda',
    role: 'Faculty – Logical Reasoning',
    degree: 'M.Sc. Mathematics, Analytical Specialist',
    experience: '10+ Years',
    papers: 'MSI/LR/01 (126 Sessions)',
    specialty: 'Critical Reasoning, Assumption-Negation Rule & Analytical Puzzles',
    avatar: '/images/avatars/avatar-4.webp',
    dept: 'Logical Reasoning',
    accentColor: '#89190E',
    tags: ['Logical Reasoning', 'Critical Reasoning', 'Puzzles'],
  },
  {
    name: 'Dr. Vikramaditya Sharma',
    role: 'Senior Professor of Procedural Law',
    degree: 'Ph.D. Constitutional Jurisprudence, LL.M (Gold Medalist)',
    experience: '18+ Years',
    papers: 'MSI/PCSJ/01 Course Director',
    specialty: 'Procedural Laws (CPC, CrPC, BNSS 2023), Judgment Writing & Judicial Mentorship',
    avatar: '/images/faculty/faculty-1.webp',
    dept: 'Judiciary & PCS J',
    accentColor: '#10233F',
    tags: ['PCS J', 'BNSS 2023', 'Judgment Drafting'],
  },
];

export default function FacultySpotlight() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      className="py-20 sm:py-28 bg-[#FFF9EF]/40 border-t border-[#E8DCCB] relative overflow-hidden"
      aria-label="Faculty Spotlight"
    >
      {/* Ambient background blur */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#89190E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#EFC988]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Heading row */}
        <Reveal
          direction="up"
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14"
        >
          <SectionHeading
            eyebrow="Scholarly Mentorship"
            title="Distinguished Faculty Leaders"
            subtitle="Learn from acclaimed legal researchers, constitutional scholars, and judicial mentors."
            align="left"
            className="max-w-xl"
          />
          <Link
            href="/faculty"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#89190E] hover:text-white border border-[#E8DCCB] text-xs font-bold text-[#89190E] transition-all shadow-xs group flex-shrink-0"
          >
            <span>Meet All Faculty</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* 4-Column Portrait Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {faculty.map((member, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <Reveal key={idx} direction="up" delay={idx * 80}>
                <TiltCard className="rounded-3xl h-full" intensity={5} glare shine>
                  <div
                    className="bg-white rounded-3xl border border-[#E8DCCB] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group relative"
                    style={{
                      borderColor: isHovered ? member.accentColor + '50' : '#E8DCCB',
                    }}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {/* Top Accent Gradient Line */}
                    <div
                      className="h-1.5 w-full transition-all duration-300"
                      style={{
                        background: `linear-gradient(90deg, ${member.accentColor}, #EFC988, ${member.accentColor})`,
                      }}
                    />

                    {/* Top Avatar Banner */}
                    <div className="relative p-6 pb-4 bg-gradient-to-b from-[#FFF9EF] via-[#FFF9EF]/60 to-white border-b border-[#E8DCCB]/50 text-center">
                      {/* Department & Verified Badge Row */}
                      <div className="flex items-center justify-between gap-1.5 mb-4">
                        <span
                          className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border"
                          style={{
                            backgroundColor: member.accentColor + '10',
                            color: member.accentColor,
                            borderColor: member.accentColor + '30',
                          }}
                        >
                          {member.dept}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      </div>

                      {/* Avatar Frame */}
                      <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#EFC988] shadow-md group-hover:scale-105 group-hover:border-[#89190E] transition-all duration-300 bg-white">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 112px, 128px"
                        />
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 pt-4 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Name */}
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#10233F] group-hover:text-[#89190E] transition-colors leading-snug">
                          {member.name}
                        </h3>
                        <p className="text-xs text-[#526174] font-medium mt-1 mb-3 line-clamp-1">
                          {member.role}
                        </p>

                        {/* Degree */}
                        <div className="flex items-start gap-1.5 text-xs text-[#10233F] mb-3">
                          <GraduationCap className="w-4 h-4 text-[#89190E] flex-shrink-0 mt-0.5" />
                          <span className="font-semibold line-clamp-2 leading-tight">
                            {member.degree}
                          </span>
                        </div>

                        {/* Stats Box: Exp & Rating */}
                        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-[#FFF9EF] border border-[#E8DCCB] text-center my-3 shadow-2xs">
                          <div>
                            <span className="text-[10px] text-[#526174] uppercase font-bold block">Experience</span>
                            <span className="font-serif text-sm font-bold text-[#10233F] flex items-center justify-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-[#89190E]" />
                              {member.experience}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#526174] uppercase font-bold block">Rating</span>
                            <span className="font-serif text-sm font-bold text-amber-600 flex items-center justify-center gap-1 mt-0.5">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              4.9 ★
                            </span>
                          </div>
                        </div>

                        {/* Research Specialty */}
                        <p className="text-xs text-[#526174] leading-relaxed line-clamp-2 mb-3">
                          <strong className="text-[#10233F]">Focus: </strong>
                          {member.specialty}
                        </p>

                        {/* Topic Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {member.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FFF3DD] text-[#89190E] border border-[#F7E5BF]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-3 border-t border-[#E8DCCB]/60">
                        <Link
                          href="/faculty"
                          className="w-full h-10 rounded-xl bg-white hover:bg-[#89190E] text-[#10233F] hover:text-white border border-[#E8DCCB] hover:border-[#89190E] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-xs group-hover:shadow-md cursor-pointer active:scale-98"
                        >
                          <span>View Profile</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
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
