'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import TiltCard from '@/components/ui/TiltCard';
import { ArrowRight, GraduationCap, BookOpen, Clock } from 'lucide-react';

const faculty = [
  {
    name: 'Adv. Rajesh Kumar',
    role: 'Head — Judiciary & PCS J Coaching',
    degree: 'LL.M., Panjab University Chandigarh',
    experience: '20+ Years',
    papers: '300+ Selections',
    specialty: 'Civil Law, Criminal Law, Evidence Act & Judicial Services Exam Preparation',
    avatar: '/images/avatars/avatar-3.webp',
    dept: 'Judiciary',
    accentColor: '#89190E',
    tags: ['PCS J', 'Civil Law', 'Evidence Act'],
  },
  {
    name: 'Adv. Supriya Sharma',
    role: 'Director — CLAT & AILET Division',
    degree: 'LL.B., Himachal Pradesh University',
    experience: '15+ Years',
    papers: '200+ NLU Selections',
    specialty: 'Legal Reasoning, General Knowledge, English & Law Entrance Exam Strategy',
    avatar: '/images/avatars/avatar-2.webp',
    dept: 'Law Entrance',
    accentColor: '#10233F',
    tags: ['CLAT', 'AILET', 'SLAT'],
  },
  {
    name: 'Prof. Deepak Verma',
    role: 'Head — UGC NET (Law) Division',
    degree: 'LL.M. + NET Qualified, GGU Bilaspur',
    experience: '12+ Years',
    papers: '150+ UGC NET Qualifications',
    specialty: 'Jurisprudence, Constitutional Law, International Law & UGC NET Paper 2',
    avatar: '/images/avatars/avatar-5.webp',
    dept: 'UGC NET',
    accentColor: '#89190E',
    tags: ['UGC NET', 'Constitutional Law', 'Jurisprudence'],
  },
];

export default function FacultySpotlight() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section
      className="py-24 sm:py-28 bg-white border-t border-[#E8DCCB]"
      aria-label="Faculty Spotlight"
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Heading row */}
        <Reveal
          direction="up"
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
        >
          <SectionHeading
            eyebrow="Scholarly Mentorship"
            title="Distinguished Faculty Leaders"
            subtitle="Learn from acclaimed researchers, former judicial clerks, and corporate veterans."
            align="left"
            className="max-w-xl"
          />
          <Link
            href="/faculty"
            className="inline-flex items-center space-x-2 text-sm font-bold text-[#89190E] hover:text-[#65130D] transition-colors group flex-shrink-0"
          >
            <span>Meet all faculty</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* Horizontal faculty cards — stacked vertically, each card is horizontal */}
        <div className="flex flex-col gap-6">
          {faculty.map((member, idx) => {
            const isActive = activeIdx === idx;
            return (
              <Reveal key={idx} direction="up" delay={idx * 90}>
                <TiltCard className="rounded-3xl" intensity={5} glare shine>
                  <div
                    className="relative bg-[#FFF9EF] rounded-3xl border overflow-hidden transition-all duration-350 cursor-default"
                    style={{
                      borderColor: isActive ? member.accentColor + '60' : '#E8DCCB',
                      boxShadow: isActive
                        ? `0 20px 60px ${member.accentColor}15, 0 4px 16px rgba(0,0,0,0.06)`
                        : '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onMouseLeave={() => setActiveIdx(null)}
                  >
                    {/* Animated top accent bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, ${member.accentColor}, #EFC988, ${member.accentColor})`,
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 450ms cubic-bezier(0.16,1,0.3,1)',
                      }}
                    />

                    {/* Background wash */}
                    <div
                      className="absolute inset-0 pointer-events-none rounded-3xl"
                      style={{
                        background: `radial-gradient(ellipse at 80% 50%, ${member.accentColor}06 0%, transparent 60%)`,
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 400ms ease',
                      }}
                    />

                    {/* Horizontal layout */}
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 sm:p-8">
                      {/* Avatar + dept label — LEFT */}
                      <div className="flex-shrink-0 flex flex-col items-center gap-2">
                        <div
                          className="relative transition-all duration-400"
                          style={{
                            transform: isActive ? 'scale(1.06)' : 'scale(1)',
                          }}
                        >
                          <div
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden relative shadow-md"
                            style={{
                              border: `2.5px solid ${isActive ? member.accentColor : '#EFC988'}`,
                              transition: 'border-color 300ms ease',
                            }}
                          >
                            <Image
                              src={member.avatar}
                              alt={member.name}
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                          </div>
                          {/* Orbiting dot */}
                          {isActive && (
                            <span
                              className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm animate-spin"
                              style={{
                                backgroundColor: member.accentColor,
                                animationDuration: '3s',
                              }}
                            />
                          )}
                        </div>
                        <span
                          className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: isActive ? member.accentColor : '#FFF3DD',
                            color: isActive ? '#fff' : member.accentColor,
                          }}
                        >
                          {member.dept}
                        </span>
                      </div>

                      {/* Main content — MIDDLE */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-serif text-xl sm:text-2xl font-bold leading-tight mb-1 transition-colors duration-300"
                          style={{ color: isActive ? member.accentColor : '#10233F' }}
                        >
                          {member.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-[#526174] mb-3">
                          {member.role}
                        </p>

                        <div className="flex items-center gap-1.5 mb-3">
                          <GraduationCap className="w-3.5 h-3.5 text-[#89190E] flex-shrink-0" />
                          <span className="text-xs font-medium text-[#10233F]">{member.degree}</span>
                        </div>

                        <p className="text-xs text-[#526174] leading-relaxed line-clamp-2 mb-3">
                          <span className="font-bold text-[#10233F]">Research: </span>
                          {member.specialty}
                        </p>

                        {/* Research tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {member.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border transition-all duration-300"
                              style={{
                                backgroundColor: isActive ? member.accentColor + '12' : '#FFF3DD',
                                color: member.accentColor,
                                borderColor: isActive ? member.accentColor + '40' : '#F7E5BF',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats + CTA — RIGHT */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-3 sm:ml-4 flex-shrink-0">
                        <div className="flex gap-3 sm:flex-col sm:gap-3">
                          <div
                            className="text-center rounded-2xl px-4 py-2.5 border transition-all duration-300"
                            style={{
                              backgroundColor: isActive ? '#fff' : 'transparent',
                              borderColor: isActive ? '#E8DCCB' : 'transparent',
                            }}
                          >
                            <div className="flex items-center gap-1 mb-0.5">
                              <Clock className="w-3 h-3 text-[#89190E]" />
                              <span className="text-[10px] text-[#526174] uppercase font-bold">Exp.</span>
                            </div>
                            <span className="font-serif text-base font-bold text-[#10233F]">{member.experience}</span>
                          </div>
                          <div
                            className="text-center rounded-2xl px-4 py-2.5 border transition-all duration-300"
                            style={{
                              backgroundColor: isActive ? '#fff' : 'transparent',
                              borderColor: isActive ? '#E8DCCB' : 'transparent',
                            }}
                          >
                            <div className="flex items-center gap-1 mb-0.5">
                              <BookOpen className="w-3 h-3 text-[#89190E]" />
                              <span className="text-[10px] text-[#526174] uppercase font-bold">Papers</span>
                            </div>
                            <span className="font-serif text-base font-bold" style={{ color: member.accentColor }}>
                              {member.papers}
                            </span>
                          </div>
                        </div>

                        <Link
                          href="/faculty"
                          className="h-10 px-5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all duration-300 flex-shrink-0"
                          style={{
                            backgroundColor: isActive ? member.accentColor : '#fff',
                            color: isActive ? '#fff' : member.accentColor,
                            border: `1.5px solid ${isActive ? member.accentColor : '#E8DCCB'}`,
                            transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                          }}
                        >
                          <span>Profile</span>
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
