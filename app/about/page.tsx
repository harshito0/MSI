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
  Award,
  Compass,
  Shield,
  Target,
  CheckCircle2,
  ArrowRight,
  Quote,
  BookOpen,
  Users,
  Building,
} from 'lucide-react';

export default function AboutPage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const milestones = [
    { year: '1999', title: 'Foundation & Genesis', desc: 'Established with a founding charter to deliver premier, values-driven higher education in New Delhi.' },
    { year: '2008', title: 'Accreditation Milestone', desc: 'Awarded highest NAAC "A" grade accreditation and state-of-the-art campus expansion.' },
    { year: '2016', title: 'Robotics & Advanced Labs', desc: 'Inaugurated dedicated research clusters for IoT, embedded systems, and automated computing.' },
    { year: '2021', title: 'National Moot Sovereignty', desc: 'Law wing achieved national top ranking with consecutive pan-India appellate court wins.' },
    { year: '2026', title: 'Global AI Hub & Beyond', desc: 'Over 16,000 active students and 150+ international recruiter tie-ups across tech, law, and business.' },
  ];

  const pillars = [
    { title: 'Academic Rigor', desc: 'Strict adherence to global university benchmarks, continuous peer-reviewed research, and experiential pedagogy.', icon: Award },
    { title: 'Uncompromising Integrity', desc: 'Instilling ethical foundations, social responsibility, and national service values in every future leader.', icon: Shield },
    { title: 'Global Innovation', desc: 'Fostering interdisciplinary problem-solving across robotics, intellectual property law, and venture building.', icon: Compass },
    { title: 'Holistic Development', desc: 'Olympic-level athletic arenas, literary forums, cultural fests, and mental wellness mentorship on campus.', icon: Target },
  ];

  const leadership = [
    {
      name: 'Padma Bhushan Dr. R.K. Gupta',
      role: 'Chancellor & Founder',
      desc: 'Former Secretary, Ministry of Education. Architect of MSI\'s founding charter and values system.',
      avatar: '/images/avatars/avatar-3.webp',
    },
    {
      name: 'Prof. Sanjay Mehrotra',
      role: 'Vice Chancellor',
      desc: 'IIT Delhi alumnus with 30+ years in academic leadership and research policy.',
      avatar: '/images/avatars/avatar-5.webp',
    },
    {
      name: 'Dr. Deepa Krishnamurthy',
      role: 'Dean of Academic Affairs',
      desc: 'Harvard-trained educator reshaping MSI\'s curriculum design and faculty development.',
      avatar: '/images/avatars/avatar-2.webp',
    },
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
          eyebrow="Our Heritage & Destiny"
          title="Educating Minds, Empowering the Nation"
          subtitle="Founded in 1999, MSI has shaped over 16,000 scholars across engineering, law, and management — and continues to set national benchmarks."
          bgImage="/images/hero-1.webp"
          className="pt-24 sm:pt-28"
        />

        {/* Quick Stats Bar */}
        <div className="bg-white border-b border-[#E8DCCB]">
          <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { prefix: '', target: 25, suffix: '+ Years', label: 'Academic Legacy' },
                { prefix: '', target: 16000, suffix: '+', label: 'Active Students' },
                { prefix: '', target: 150, suffix: '+', label: 'Recruiter Network' },
                { prefix: 'NAAC ', target: 0, suffix: 'A+', label: 'Accredited Grade', static: 'NAAC A+' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#89190E]">
                    {s.static ? (
                      s.static
                    ) : (
                      <AnimatedCounter target={s.target} suffix={s.suffix} />
                    )}
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
          <Reveal direction="up" className="max-w-3xl mb-20">
            <p className="text-[#526174] text-lg leading-relaxed mb-5">
              Founded with an unwavering conviction that education is the ultimate catalyst for human elevation, Maharaja Surajmal Institute (MSI) stands as a beacon of academic distinction, research, and character building in India.
            </p>
            <p className="text-[#526174] text-base leading-relaxed">
              From robotic workstations and high-court simulated moot rooms to lush green courtyards fostering intellectual dialogue, MSI provides over 16,000 students with the ecosystem to dream audaciously and lead globally.
            </p>
          </Reveal>

          {/* Vision & Mission */}
          <Reveal direction="up" className="mb-24">
            <SectionHeading
              eyebrow="Purpose & Direction"
              title="Vision & Mission"
              className="mb-12"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative bg-[#10233F] rounded-3xl p-8 sm:p-10 text-white overflow-hidden">
                <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-[#EFC988]/10" />
                <div className="absolute bottom-0 left-0 w-40 h-1 bg-gradient-to-r from-[#EFC988] to-transparent rounded-full" />
                <Quote className="w-10 h-10 text-[#EFC988]/30 mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-4 text-[#EFC988]">Our Vision</h3>
                <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                  To be India's most trusted private institution — producing ethical, innovative, and globally competitive graduates who contribute meaningfully to society, the economy, and the nation's progress.
                </p>
              </div>
              <div className="relative bg-white border border-[#E8DCCB] rounded-3xl p-8 sm:p-10 overflow-hidden">
                <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-[#89190E]/5" />
                <div className="absolute bottom-0 left-0 w-40 h-1 bg-gradient-to-r from-[#89190E] to-transparent rounded-full" />
                <Quote className="w-10 h-10 text-[#89190E]/20 mb-4" />
                <h3 className="font-serif text-2xl font-bold text-[#10233F] mb-4">Our Mission</h3>
                <ul className="space-y-3">
                  {[
                    'Deliver industry-aligned, research-driven curricula across all disciplines',
                    'Instil strong ethical foundations and national values in every student',
                    'Foster interdisciplinary innovation through state-of-the-art infrastructure',
                    'Build a diverse, inclusive, and globally connected academic community',
                  ].map((m, i) => (
                    <li key={i} className="flex items-start space-x-2.5 text-sm text-[#526174]">
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
              eyebrow="Foundational Values"
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
                        {/* Horizontal inner: icon left, text right */}
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

          {/* Leadership */}
          <Reveal direction="up" className="mb-24">
            <SectionHeading
              eyebrow="Institutional Leadership"
              title="The People Who Lead MSI"
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((leader, idx) => (
                <Reveal key={idx} direction="up" delay={idx * 80}>
                  <TiltCard className="rounded-3xl h-full" intensity={6} glare shine>
                    <div className="bg-white border border-[#E8DCCB] rounded-3xl p-8 hover:shadow-xl hover:border-[#EFC988] transition-all duration-300 group h-full">
                      <div className="flex items-center space-x-4 mb-5">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden relative border-2 border-[#EFC988] flex-shrink-0 group-hover:border-[#89190E] transition-colors">
                          <Image src={leader.avatar} alt={leader.name} fill className="object-cover group-hover:scale-110 transition-transform duration-400" sizes="80px" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-bold text-[#10233F] group-hover:text-[#89190E] transition-colors leading-tight">{leader.name}</h3>
                          <p className="text-xs text-[#89190E] font-semibold mt-1">{leader.role}</p>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-[#526174] leading-relaxed">{leader.desc}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Historical Timeline */}
          <Reveal direction="up" className="mb-24">
            <SectionHeading
              eyebrow="Milestones"
              title="A Quarter Century of Evolution"
              className="mb-14"
            />
            <div className="relative border-l-2 border-[#E8DCCB] ml-4 sm:ml-32 pl-6 sm:pl-10 space-y-12">
              {milestones.map((m, mIdx) => (
                <Reveal key={mIdx} direction="right" delay={mIdx * 80}>
                  <div className="relative group">
                    <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-[#89190E] group-hover:scale-125 transition-transform shadow-xs" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#89190E] flex-shrink-0 sm:-ml-28 sm:w-20 text-left sm:text-right">
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
                <span className="text-xs font-bold uppercase tracking-widest text-[#EFC988] block mb-2">Begin Your Journey</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold">Become Part of Our Inspiring Community</h3>
                <p className="text-gray-300 text-sm mt-2 max-w-xl">
                  Admissions for the 2026-27 academic session are now open for Engineering, Law, and Management programs.
                </p>
              </div>
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="h-12 px-7 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white font-bold text-sm transition-all btn-hover-lift flex-shrink-0 flex items-center space-x-2"
              >
                <span>Apply for Admissions</span>
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
