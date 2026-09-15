'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import TiltCard from '@/components/ui/TiltCard';
import { ArrowRight, Clock, Calendar, Tag } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Innovations in AI: How MSI Undergrads Built an Autonomous Drone Swarm Rig',
    categoryLabel: 'Technology & AI',
    date: 'September 2026',
    readTime: '5 min read',
    excerpt:
      'Computer science and robotics students at MSI built an autonomous swarm rig in our high-performance computing facility.',
    author: 'Dr. Rajeshwar Sharma',
    authorRole: 'Dean of Engineering',
    avatar: '/images/avatars/avatar-3.webp',
    accentColor: '#89190E',
  },
  {
    id: 2,
    title: 'National Moot Court Victory: MSI Law Delegation Triumphs on Constitutional Rights',
    categoryLabel: 'Legal Jurisprudence',
    date: 'August 2026',
    readTime: '6 min read',
    excerpt:
      'An inside look at our integrated law students formulating appellate arguments before a 5-judge Supreme Court bench.',
    author: 'Prof. Ananya Mukherjee',
    authorRole: 'Director, School of Law',
    avatar: '/images/avatars/avatar-2.webp',
    accentColor: '#10233F',
  },
  {
    id: 3,
    title: 'Navigating Venture Incubation: How 3 Student Startups Secured Seed Grants',
    categoryLabel: 'Business & Startups',
    date: 'August 2026',
    readTime: '4 min read',
    excerpt:
      'From fintech to circular economy logistics, MSI business students show how mentorship converts into venture backing.',
    author: 'Dr. Vikramaditya Sen',
    authorRole: 'Head of Management',
    avatar: '/images/avatars/avatar-5.webp',
    accentColor: '#89190E',
  },
];

export default function BlogPreview() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-28 bg-[#FFF9EF]" aria-label="Blog Preview">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Heading */}
        <Reveal
          direction="up"
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
        >
          <SectionHeading
            eyebrow="Scholarly Thought & Stories"
            title="From the MSI Gazette"
            subtitle="Research findings, competition victories, and campus updates from our faculty and students."
            align="left"
            className="max-w-xl"
          />
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-sm font-bold text-[#89190E] hover:text-[#65130D] transition-colors group flex-shrink-0"
          >
            <span>Read all articles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* Horizontal article cards — stacked list */}
        <div className="flex flex-col gap-5">
          {articles.map((article, idx) => {
            const isActive = activeIdx === idx;
            return (
              <Reveal key={article.id} direction="up" delay={idx * 80}>
                <TiltCard className="rounded-3xl" intensity={4} glare shine>
                  <Link href="/blog" className="block">
                    <article
                      className="relative bg-white rounded-3xl border overflow-hidden transition-all duration-350 cursor-pointer"
                      style={{
                        borderColor: isActive ? article.accentColor + '50' : '#E8DCCB',
                        boxShadow: isActive
                          ? `0 20px 60px ${article.accentColor}12, 0 4px 16px rgba(0,0,0,0.05)`
                          : '0 1px 3px rgba(0,0,0,0.04)',
                      }}
                      onMouseEnter={() => setActiveIdx(idx)}
                      onMouseLeave={() => setActiveIdx(null)}
                    >
                      {/* Animated progress-style top border */}
                      <div
                        className="absolute top-0 left-0 h-[3px] rounded-full transition-all duration-500"
                        style={{
                          backgroundColor: article.accentColor,
                          width: isActive ? '100%' : '0%',
                          transition: 'width 500ms cubic-bezier(0.16,1,0.3,1)',
                        }}
                      />

                      {/* Background radial wash */}
                      <div
                        className="absolute inset-0 pointer-events-none rounded-3xl"
                        style={{
                          background: `radial-gradient(ellipse at 5% 50%, ${article.accentColor}06 0%, transparent 55%)`,
                          opacity: isActive ? 1 : 0,
                          transition: 'opacity 350ms ease',
                        }}
                      />

                      {/* Horizontal layout */}
                      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 sm:p-8">
                        {/* Author avatar — LEFT */}
                        <div className="flex-shrink-0">
                          <div
                            className="relative transition-all duration-400"
                            style={{
                              transform: isActive ? 'scale(1.08) rotate(3deg)' : 'scale(1) rotate(0deg)',
                            }}
                          >
                            <div
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden relative shadow-md"
                              style={{
                                border: `2.5px solid ${isActive ? article.accentColor : '#EFC988'}`,
                                transition: 'border-color 300ms ease',
                              }}
                            >
                              <Image
                                src={article.avatar}
                                alt={article.author}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Main content — MIDDLE */}
                        <div className="flex-1 min-w-0">
                          {/* Meta row */}
                          <div className="flex items-center flex-wrap gap-2 mb-2.5">
                            <span
                              className="text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border transition-all duration-300"
                              style={{
                                color: article.accentColor,
                                backgroundColor: isActive ? article.accentColor + '12' : '#FFF3DD',
                                borderColor: isActive ? article.accentColor + '35' : '#F7E5BF',
                              }}
                            >
                              {article.categoryLabel}
                            </span>
                            <span className="text-[11px] text-[#526174] flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#89190E]" />
                              {article.readTime}
                            </span>
                            <span className="text-[11px] text-[#526174] flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {article.date}
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            className="font-serif text-lg sm:text-xl font-bold leading-snug mb-2 transition-colors duration-300"
                            style={{ color: isActive ? article.accentColor : '#10233F' }}
                          >
                            {article.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-xs sm:text-sm text-[#526174] leading-relaxed line-clamp-2">
                            {article.excerpt}
                          </p>

                          {/* Author line */}
                          <div className="mt-3 flex items-center gap-1.5 text-xs text-[#526174]">
                            <span className="font-bold text-[#10233F]">{article.author}</span>
                            <span>·</span>
                            <span>{article.authorRole}</span>
                          </div>
                        </div>

                        {/* Read CTA — RIGHT */}
                        <div className="flex-shrink-0 flex items-center sm:self-center">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-350"
                            style={{
                              backgroundColor: isActive ? article.accentColor : '#FFF3DD',
                              color: isActive ? '#fff' : article.accentColor,
                              transform: isActive ? 'translateX(0px)' : 'translateX(-4px)',
                              opacity: isActive ? 1 : 0.6,
                            }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
