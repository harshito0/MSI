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
import {
  Trophy,
  Target,
  Star,
  Award,
  TrendingUp,
  Download,
  Building2,
  CheckCircle2,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

export default function ResultsPage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [activeStream, setActiveStream] = useState<'all' | 'engineering' | 'law' | 'management'>('all');

  const macroStats = [
    { metric: 98.4, suffix: '%', label: 'Overall Placement Rate', icon: TrendingUp, detail: 'Across all departments', decimals: 1 },
    { metric: 42, suffix: ' LPA', label: 'Highest Package', icon: Trophy, detail: 'Google Cloud Architecture' },
    { metric: 12.8, suffix: ' LPA', label: 'Average CTC', icon: Award, detail: 'Top 50% percentile', decimals: 1 },
    { metric: 150, suffix: '+', label: 'Fortune 500 Recruiters', icon: Building2, detail: 'Annual on-campus drives' },
    { metric: 10, suffix: '', label: 'National Moot Rank', icon: Target, detail: 'Bar Council of India Index', prefix: 'Top ' },
    { metric: 45, suffix: '+', label: 'Funded Patents', icon: Star, detail: 'Indian Patent Journal' },
  ];

  const studentPlacements = [
    { name: 'Aarav Singhania', branch: 'B.Tech CSE & AI', category: 'engineering', company: 'Google Cloud', package: '42.0 LPA', role: 'Cloud Architect', year: '2025', image: '/images/avatars/avatar-1.webp' },
    { name: 'Priyanka Sen', branch: 'B.A. LL.B. (Hons)', category: 'law', company: 'Cyril Amarchand Mangaldas', package: '24.5 LPA', role: 'Corporate Associate', year: '2024', image: '/images/avatars/avatar-2.webp' },
    { name: 'Simran Kaur', branch: 'B.Tech Robotics', category: 'engineering', company: 'Amazon Web Services', package: '36.5 LPA', role: 'DevOps Engineer', year: '2025', image: '/images/avatars/avatar-4.webp' },
    { name: 'Rohan Mathur', branch: 'MBA Strategic Finance', category: 'management', company: 'Deloitte Consulting', package: '21.0 LPA', role: 'Strategy Consultant', year: '2025', image: '/images/avatars/avatar-3.webp' },
    { name: 'Devansh Verma', branch: 'B.B.A. LL.B. (Hons)', category: 'law', company: 'Trilegal', package: '22.0 LPA', role: 'Corporate Counsel', year: '2024', image: '/images/avatars/avatar-5.webp' },
    { name: 'Ananya Deshmukh', branch: 'BBA International Business', category: 'management', company: 'Ernst & Young (EY)', package: '18.5 LPA', role: 'Risk Analyst', year: '2025', image: '/images/avatars/avatar-2.webp' },
  ];

  const streamRecords = [
    {
      stream: 'School of Engineering & Technology',
      placement: 99.1,
      highest: '42.0 LPA',
      average: '13.4 LPA',
      recruiters: ['Google', 'Microsoft', 'Amazon', 'Adobe', 'TCS Ninja', 'Infosys AI'],
    },
    {
      stream: 'School of Law & Jurisprudence',
      placement: 97.8,
      highest: '24.5 LPA',
      average: '11.8 LPA',
      recruiters: ['Cyril Amarchand Mangaldas', 'Trilegal', 'Khaitan & Co', 'AZB & Partners', 'SC Chambers'],
    },
    {
      stream: 'Department of Business Studies',
      placement: 98.5,
      highest: '21.0 LPA',
      average: '12.2 LPA',
      recruiters: ['Deloitte', 'EY', 'PwC', 'KPMG', 'HDFC Bank', 'ICICI Securities'],
    },
  ];

  const filteredPlacements =
    activeStream === 'all' ? studentPlacements : studentPlacements.filter((p) => p.category === activeStream);

  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#10233F] flex flex-col selection:bg-[#EFC988] selection:text-[#89190E]">
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      <main className="flex-grow">
        {/* Page Hero */}
        <PageHero
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Placements & Academic Results' },
          ]}
          eyebrow="Excellence in Numbers"
          title="Placement Records & Accolades"
          subtitle="Consistently outperforming national benchmarks. MSI students transform academic excellence into distinguished careers."
          bgImage="/images/hero-1.webp"
          className="pt-24 sm:pt-28"
        >
          <button
            onClick={() => setIsEnquiryOpen(true)}
            className="h-12 px-6 rounded-xl bg-[#EFC988] hover:bg-[#EFC988]/90 text-[#10233F] font-bold text-sm flex items-center space-x-2.5 transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Download Placement Report 2025</span>
          </button>
        </PageHero>

        <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">

          {/* 6 Macro Stats */}
          <Reveal direction="up" className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {macroStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <Reveal key={idx} direction="up" delay={idx * 60}>
                    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DCCB] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-center">
                      <div className="w-10 h-10 rounded-xl bg-[#FFF3DD] text-[#89190E] flex items-center justify-center mb-3 group-hover:bg-[#89190E] group-hover:text-white transition-all mx-auto">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#10233F] group-hover:text-[#89190E] transition-colors">
                        {stat.prefix || ''}
                        <AnimatedCounter target={stat.metric} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
                      </div>
                      <div className="text-xs font-bold text-[#10233F] mt-1">{stat.label}</div>
                      <div className="text-[11px] text-[#526174] mt-0.5">{stat.detail}</div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Reveal>

          {/* Discipline-Wise with Progress Bars */}
          <Reveal direction="up" className="mb-20">
            <SectionHeading
              eyebrow="Departmental Track Record"
              title="Discipline-Wise Placement Highlights"
              align="left"
              className="mb-10"
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {streamRecords.map((rec, rIdx) => (
                <Reveal key={rIdx} direction="up" delay={rIdx * 80}>
                  <div className="bg-white rounded-3xl p-8 border border-[#E8DCCB] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#10233F] mb-6 pb-4 border-b border-[#E8DCCB]">
                        {rec.stream}
                      </h3>

                      {/* Placement Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-xs font-bold mb-2">
                          <span className="text-[#526174]">Placement Rate</span>
                          <span className="text-[#89190E]">{rec.placement}%</span>
                        </div>
                        <div className="h-2.5 bg-[#FFF3DD] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#89190E] to-[#EFC988] rounded-full transition-all duration-1000"
                            style={{ width: `${rec.placement}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-6 text-center">
                        <div className="bg-[#FFF9EF] p-3 rounded-2xl border border-[#E8DCCB]">
                          <span className="text-[10px] text-[#526174] uppercase font-bold block">Highest CTC</span>
                          <span className="font-serif text-lg font-bold text-[#10233F]">{rec.highest}</span>
                        </div>
                        <div className="bg-[#FFF9EF] p-3 rounded-2xl border border-[#E8DCCB]">
                          <span className="text-[10px] text-[#526174] uppercase font-bold block">Average CTC</span>
                          <span className="font-serif text-lg font-bold text-[#89190E]">{rec.average}</span>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-[#10233F] block mb-3">Key Hiring Partners:</span>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {rec.recruiters.map((recruiter, cIdx) => (
                          <span key={cIdx} className="text-xs bg-white text-[#10233F] border border-[#E8DCCB] px-3 py-1 rounded-xl font-medium">
                            {recruiter}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setIsEnquiryOpen(true)}
                      className="w-full h-11 rounded-xl bg-[#FFF9EF] hover:bg-[#89190E] hover:text-white text-[#89190E] border border-[#89190E]/30 font-semibold text-xs transition-all flex items-center justify-center space-x-1.5"
                    >
                      <span>Request Full Department Report</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Hall of Fame */}
          <Reveal direction="up" className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <SectionHeading
                eyebrow="Student Achievers"
                title="Hall of Fame: Premier Placements"
                align="left"
              />
              <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-[#E8DCCB] shadow-xs overflow-x-auto">
                {(['all', 'engineering', 'law', 'management'] as const).map((stream) => {
                  const labels: Record<string, string> = { all: 'All', engineering: 'Engineering', law: 'Law', management: 'Management' };
                  return (
                    <button
                      key={stream}
                      onClick={() => setActiveStream(stream)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeStream === stream ? 'bg-[#89190E] text-white' : 'text-[#526174] hover:text-[#10233F]'}`}
                    >
                      {labels[stream]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlacements.map((p, idx) => (
                <Reveal key={idx} direction="up" delay={idx * 60}>
                  <div className="bg-white rounded-3xl p-6 border border-[#E8DCCB] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden relative border-2 border-[#EFC988] flex-shrink-0 shadow-sm">
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-base text-[#10233F] truncate">{p.name}</h4>
                        <span className="text-xs font-extrabold text-[#89190E] ml-2 flex-shrink-0">{p.package}</span>
                      </div>
                      <span className="text-xs text-[#526174] block mt-0.5 truncate">{p.branch}</span>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="font-bold text-[#10233F] truncate">{p.company}</span>
                        <span className="text-[11px] text-[#526174] ml-2 flex-shrink-0">{p.role}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal direction="up">
            <div className="rounded-3xl bg-[#10233F] p-8 sm:p-12 text-white text-center relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Step Into a Future of High Achievement</h3>
                <p className="text-gray-300 text-sm sm:text-base mb-8">
                  Join MSI Group of Institutes and benefit from personalized career coaching, corporate internships, and national placement access.
                </p>
                <button
                  onClick={() => setIsEnquiryOpen(true)}
                  className="h-12 px-8 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white font-bold text-sm transition-all btn-hover-lift shadow-lg inline-flex items-center space-x-2"
                >
                  <span>Apply for Admissions 2026</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </div>
  );
}
