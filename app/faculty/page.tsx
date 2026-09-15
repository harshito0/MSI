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
import {
  BookOpen,
  Award,
  ArrowRight,
  Microscope,
  GraduationCap,
} from 'lucide-react';

interface FacultyMember {
  id: number;
  name: string;
  department: 'engineering' | 'law' | 'management';
  role: string;
  degree: string;
  experience: string;
  papers: string;
  specialty: string;
  avatar: string;
  researchTags: string[];
}

export default function FacultyPage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [activeDept, setActiveDept] = useState<'all' | 'engineering' | 'law' | 'management'>('all');

  const facultyMembers: FacultyMember[] = [
    {
      id: 1,
      name: 'Dr. Rajeshwar Sharma',
      department: 'engineering',
      role: 'Dean — Faculty of Engineering & Technology',
      degree: 'Ph.D. Computer Science, IIT Delhi',
      experience: '22+ Years',
      papers: '48 Publications',
      specialty: 'Machine Learning, High Performance Computing & Autonomous Robotics',
      avatar: '/images/avatars/avatar-3.webp',
      researchTags: ['Machine Learning', 'Robotics', 'HPC', 'Autonomous Systems'],
    },
    {
      id: 2,
      name: 'Prof. Ananya Mukherjee',
      department: 'law',
      role: 'Director — School of Legal Studies',
      degree: 'LL.D., National Law School of India',
      experience: '18+ Years',
      papers: '32 Publications',
      specialty: 'Constitutional Jurisprudence, International Arbitration & Corporate Law',
      avatar: '/images/avatars/avatar-2.webp',
      researchTags: ['Constitutional Law', 'Arbitration', 'Corporate Law'],
    },
    {
      id: 3,
      name: 'Dr. Vikramaditya Sen',
      department: 'management',
      role: 'Head — Department of Business Studies',
      degree: 'Ph.D. Economics, IIM Ahmedabad',
      experience: '20+ Years',
      papers: '29 Publications',
      specialty: 'Macroeconomic Strategy, Capital Markets & Venture Scaling',
      avatar: '/images/avatars/avatar-5.webp',
      researchTags: ['Capital Markets', 'Venture Finance', 'Macroeconomics'],
    },
    {
      id: 4,
      name: 'Dr. Priya Raghavan',
      department: 'engineering',
      role: 'Professor — Robotics & Mechatronics',
      degree: 'Ph.D. Embedded Robotics, IISc Bangalore',
      experience: '14+ Years',
      papers: '24 Publications',
      specialty: 'Industrial Automation, Edge AI Sensors & Drone Flight Dynamics',
      avatar: '/images/avatars/avatar-4.webp',
      researchTags: ['Automation', 'Edge AI', 'Drone Systems', 'IoT'],
    },
    {
      id: 5,
      name: 'Prof. Harishankar Dixit',
      department: 'law',
      role: 'Professor — Cyber Law & Intellectual Property',
      degree: 'LL.M., Harvard Law School • Ph.D. DU',
      experience: '16+ Years',
      papers: '36 Publications',
      specialty: 'Patent Law, Data Privacy Governance & Technology Regulations',
      avatar: '/images/avatars/avatar-1.webp',
      researchTags: ['Patent Law', 'Cyber Law', 'Data Privacy', 'IP Regulations'],
    },
    {
      id: 6,
      name: 'Dr. Meenakshi Sundaram',
      department: 'management',
      role: 'Professor — Financial Analytics & FinTech',
      degree: 'Ph.D. Applied Finance, FMS Delhi',
      experience: '15+ Years',
      papers: '21 Publications',
      specialty: 'Quantitative Financial Modeling, Algorithmic Risk & Banking Policy',
      avatar: '/images/avatars/avatar-2.webp',
      researchTags: ['FinTech', 'Quant Finance', 'Algorithmic Risk', 'Banking'],
    },
  ];

  const filteredFaculty =
    activeDept === 'all' ? facultyMembers : facultyMembers.filter((f) => f.department === activeDept);

  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#10233F] flex flex-col selection:bg-[#EFC988] selection:text-[#89190E]">
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      <main className="flex-grow">
        {/* Page Hero */}
        <PageHero
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Distinguished Faculty' },
          ]}
          eyebrow="Scholarly Mentorship"
          title="Our Distinguished Faculty"
          subtitle="Learn from acclaimed researchers, former judicial clerks, and corporate veterans who bring cutting-edge real-world insight into every classroom."
          bgImage="/images/hero-3.webp"
          className="pt-24 sm:pt-28"
        />

        {/* Aggregate Stats Strip */}
        <div className="bg-white border-b border-[#E8DCCB]">
          <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { target: 200, suffix: '+', label: 'Faculty Members', sub: 'Full & adjunct combined' },
                { target: 1000, suffix: '+', label: 'Research Papers', sub: 'Peer-reviewed journals' },
                { target: 18, suffix: ' Avg. Years', label: 'Teaching Experience', sub: 'Per faculty member' },
                { target: 45, suffix: '+', label: 'Patents Filed', sub: 'Industry innovations' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#89190E]">
                    <AnimatedCounter target={s.target} suffix={s.suffix} />
                  </div>
                  <div className="text-xs font-bold text-[#10233F] mt-1">{s.label}</div>
                  <div className="text-[11px] text-[#526174] mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">

          {/* Filter + Title Row */}
          <Reveal direction="up" className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Faculty Directory"
              title="Filter by Department"
              align="left"
              className="max-w-sm"
            />
            <div className="flex items-center space-x-2 bg-white p-2 rounded-2xl border border-[#E8DCCB] shadow-xs overflow-x-auto w-max">
              {(['all', 'engineering', 'law', 'management'] as const).map((dept) => {
                const labels: Record<string, string> = { all: 'All Faculty', engineering: 'Engineering', law: 'Law', management: 'Management' };
                return (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeDept === dept ? 'bg-[#89190E] text-white shadow-sm' : 'text-[#526174] hover:text-[#10233F]'
                    }`}
                  >
                    {labels[dept]}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredFaculty.map((member, idx) => (
              <Reveal key={member.id} direction="up" delay={idx * 60}>
                <TiltCard className="rounded-3xl h-full" intensity={6} glare shine>
                  <div className="bg-white border border-[#E8DCCB] rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:border-[#EFC988] transition-all duration-400 flex flex-col justify-between group h-full">
                    <div>
                      {/* Horizontal avatar + name row */}
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#EFC988] group-hover:border-[#89190E] relative bg-[#FFF3DD] flex-shrink-0 shadow-sm transition-all duration-300 group-hover:scale-105">
                          <Image src={member.avatar} alt={member.name} fill className="object-cover" sizes="80px" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl font-bold text-[#10233F] group-hover:text-[#89190E] transition-colors leading-tight">
                            {member.name}
                          </h3>
                          <p className="text-xs text-[#89190E] font-semibold mt-1">{member.role}</p>
                        </div>
                      </div>

                      <div className="bg-[#FFF9EF] p-3.5 rounded-2xl border border-[#E8DCCB] mb-5">
                        <span className="text-xs font-bold text-[#10233F] flex items-center">
                          <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-[#89190E]" />
                          {member.degree}
                        </span>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-white border border-[#E8DCCB] p-2.5 rounded-xl text-center">
                          <span className="text-[10px] text-[#526174] uppercase font-bold block">Experience</span>
                          <span className="font-serif text-sm font-bold text-[#89190E]">{member.experience}</span>
                        </div>
                        <div className="bg-white border border-[#E8DCCB] p-2.5 rounded-xl text-center">
                          <span className="text-[10px] text-[#526174] uppercase font-bold block">Research</span>
                          <span className="font-serif text-sm font-bold text-[#10233F]">{member.papers}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#526174] leading-relaxed mb-5">
                        <span className="font-bold text-[#10233F]">Areas of Focus: </span>
                        {member.specialty}
                      </p>

                      {/* Research Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {member.researchTags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-semibold bg-[#FFF3DD] text-[#89190E] border border-[#F7E5BF] px-2.5 py-0.5 rounded-full group-hover:bg-[#89190E]/10 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setIsEnquiryOpen(true)}
                      className="w-full h-11 rounded-xl bg-[#FFF9EF] hover:bg-[#89190E] hover:text-white text-[#89190E] border border-[#89190E]/40 font-semibold text-xs transition-all flex items-center justify-center space-x-1.5 group/btn"
                    >
                      <span>Connect for Mentorship</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {/* Join us CTA */}
          <Reveal direction="up">
            <div className="rounded-3xl bg-[#10233F] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#EFC988] block mb-2">Join MSI</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                  Interested in a Faculty Position?
                </h3>
                <p className="text-gray-300 text-sm mt-2 max-w-xl">
                  MSI actively recruits distinguished academics and industry practitioners. Submit your CV and research portfolio.
                </p>
              </div>
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="h-12 px-7 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white font-bold text-sm transition-all btn-hover-lift flex-shrink-0 flex items-center space-x-2"
              >
                <span>Submit Application</span>
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
