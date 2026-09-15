'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import EnquiryModal from '@/components/modals/EnquiryModal';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import {
  BookOpen,
  GraduationCap,
  Clock,
  CheckCircle2,
  ArrowRight,
  Download,
  Cpu,
  Scale,
  Award,
  ClipboardList,
  FileText,
  UserCheck,
  CreditCard,
  Landmark,
} from 'lucide-react';

interface Course {
  id: string;
  name: string;
  department: 'engineering' | 'law' | 'management';
  school: string;
  level: string;
  duration: string;
  intake: string;
  eligibility: string;
  highlights: string[];
  careerRoles: string[];
}

const admissionSteps = [
  { icon: FileText, step: '01', title: 'Check Eligibility', desc: 'Review program-specific academic requirements and entrance exam scores.' },
  { icon: ClipboardList, step: '02', title: 'Online Application', desc: 'Fill the MSI online application form at admissions.msi-institutes.edu.in' },
  { icon: UserCheck, step: '03', title: 'Document Submission', desc: 'Upload marksheets, entrance scores, and identity proof for verification.' },
  { icon: Landmark, step: '04', title: 'Counselling Session', desc: 'Attend a personal program counselling session with academic advisors.' },
  { icon: CreditCard, step: '05', title: 'Enrolment & Fees', desc: 'Complete fee payment and report to campus on the designated joining date.' },
];

export default function CoursesPage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<'all' | 'engineering' | 'law' | 'management'>('all');

  const courses: Course[] = [
    {
      id: 'pcs-j',
      name: 'PCS J — Punjab Judicial Services (Civil Judge)',
      department: 'law',
      school: 'Judiciary Coaching Division',
      level: 'Competitive Exam Coaching',
      duration: '1 Year / 2 Year Batches',
      intake: 'Limited Seats',
      eligibility: 'LL.B. Degree (3-Year or 5-Year) from any recognized university',
      highlights: [
        'Expert coaching for Punjab & Haryana Judicial Services (PCS J)',
        'Daily judgment writing practice with individual faculty evaluation',
        'Previous year paper analysis and mock tests every week',
      ],
      careerRoles: ['Civil Judge (JD)', 'Judicial Magistrate (JMFC)', 'ADJ', 'District Judge'],
    },
    {
      id: 'clat',
      name: 'CLAT — Common Law Admission Test Coaching',
      department: 'law',
      school: 'Law Entrance Coaching Division',
      level: 'Entrance Exam Coaching',
      duration: '6 Months / 1 Year Batches',
      intake: 'Limited Seats',
      eligibility: '10+2 (any stream) with minimum 45% marks (40% for SC/ST)',
      highlights: [
        'Covers all CLAT sections: GK, English, Legal Reasoning, Logical Reasoning, Maths',
        'Full-length weekly mock tests based on latest CLAT pattern',
        'Guidance for all 24 NLUs — NLU Delhi, NLU Jodhpur, NLU Kolkata & more',
      ],
      careerRoles: ['NLU Student', 'B.A. LL.B.', 'B.Com LL.B.', 'B.B.A. LL.B.'],
    },
    {
      id: 'ailet',
      name: 'AILET & SLAT — Law Entrance Coaching',
      department: 'law',
      school: 'Law Entrance Coaching Division',
      level: 'Entrance Exam Coaching',
      duration: '3 Months / 6 Months Batches',
      intake: 'Limited Seats',
      eligibility: '10+2 (any stream) with 50% marks',
      highlights: [
        'AILET-specific preparation for NLU Delhi — India\'s most competitive law entrance',
        'SLAT and LSAT India coverage for private law university admissions',
        'Intensive GK capsules, English enhancement and legal aptitude drills',
      ],
      careerRoles: ['NLU Delhi Student', 'SLS Pune Student', 'JGLS Student', 'Law Graduate'],
    },
    {
      id: 'ugc-net',
      name: 'UGC NET — Law (Paper 1 & Paper 2)',
      department: 'law',
      school: 'UGC NET Coaching Division',
      level: 'Competitive Exam Coaching',
      duration: '6 Months Crash / 1 Year Regular',
      intake: 'Limited Seats',
      eligibility: 'LL.M. or LL.B. with 55% (50% for SC/ST/OBC) from a recognized university',
      highlights: [
        'Complete Paper 1 coaching: Teaching Aptitude, Research, Reasoning & GK',
        'Paper 2: Constitutional Law, Jurisprudence, International Law, Criminal Law & more',
        'JRF-focused preparation with 150+ successful UGC NET qualifiers from MSI',
      ],
      careerRoles: ['Assistant Professor (Law)', 'UGC JRF Awardee', 'PhD Candidate', 'Law Lecturer'],
    },
    {
      id: 'hps-j',
      name: 'HPS J — Himachal Pradesh Judicial Services',
      department: 'law',
      school: 'Judiciary Coaching Division',
      level: 'Competitive Exam Coaching',
      duration: '1 Year Batch',
      intake: 'Limited Seats',
      eligibility: 'LL.B. Degree from any recognized university + HP domicile (preferred)',
      highlights: [
        'State-specific HP Law and HP Tenancy Act coverage',
        'Subject-wise coaching: CPC, CrPC, IPC, Evidence, Civil Law',
        'Regular mock tests on HP Judiciary pattern with answer writing sessions',
      ],
      careerRoles: ['Civil Judge (HP)', 'JMFC (HP)', 'ADJ Himachal Pradesh', 'District Judge'],
    },
    {
      id: 'llm-entrance',
      name: 'LLM Entrance Coaching (NLU & State Universities)',
      department: 'management',
      school: 'Postgraduate Law Division',
      level: 'Entrance Exam Coaching',
      duration: '3 Months Intensive',
      intake: 'Limited Seats',
      eligibility: 'LL.B. Degree (3-Year or 5-Year) with minimum 55% marks',
      highlights: [
        'Preparation for CLAT (PG), NLU LLM entrance, Panjab University LLM and more',
        'Specialization focus areas: Constitutional Law, Criminal Law, Corporate Law',
        'Guidance for DU, PU, HP University, GNDU LLM admissions',
      ],
      careerRoles: ['LLM Student', 'Law Lecturer', 'Legal Researcher', 'Judicial Officer'],
    },
  ];


  const filteredCourses =
    selectedDept === 'all' ? courses : courses.filter((c) => c.department === selectedDept);

  const deptIcons = { engineering: Cpu, law: Scale, management: Award };

  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#10233F] flex flex-col selection:bg-[#EFC988] selection:text-[#89190E]">
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      <main className="flex-grow">
        {/* Full-Bleed Page Hero */}
        <PageHero
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Academic Programs' },
          ]}
          eyebrow="Expert Legal Coaching Since 1995"
          title="Our Coaching Programs"
          subtitle="Every coaching course at MSI is designed by expert legal faculty with years of exam-specific experience — for maximum selection probability."
          bgImage="/images/hero-2.webp"
          className="pt-24 sm:pt-28"
        >
          {/* Inline dept filter in hero */}
          <div className="flex items-center flex-wrap gap-2">
            {(['all', 'law', 'management'] as const).map((dept) => {
              const labels: Record<string, string> = { all: 'All Courses', law: 'Judiciary & CLAT', management: 'LLM & Postgraduate' };
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept as 'all' | 'engineering' | 'law' | 'management')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    selectedDept === dept
                      ? 'bg-[#EFC988] text-[#10233F] shadow-sm'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  <span>{labels[dept]}</span>
                </button>
              );
            })}
          </div>
        </PageHero>

        <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-24">

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {filteredCourses.map((course, idx) => (
              <Reveal key={course.id} direction="up" delay={idx * 60}>
                <div className="bg-white rounded-3xl p-8 border border-[#E8DCCB] shadow-sm hover:shadow-2xl transition-all duration-400 hover:-translate-y-1.5 flex flex-col justify-between group h-full">
                  <div>
                    {/* Level & Duration */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#89190E] bg-[#FFF3DD] border border-[#F7E5BF] px-3 py-1 rounded-full">
                        {course.level}
                      </span>
                      <span className="text-xs font-semibold text-[#526174] flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#89190E]" />
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#10233F] group-hover:text-[#89190E] transition-colors leading-tight mb-2">
                      {course.name}
                    </h3>
                    <span className="text-xs font-medium text-[#526174] block mb-4">
                      {course.school} • {course.intake}
                    </span>

                    <div className="bg-[#FFF9EF] p-3 rounded-2xl border border-[#E8DCCB] text-xs text-[#10233F] mb-6 font-medium">
                      <span className="font-bold text-[#89190E] block mb-0.5">Eligibility:</span>
                      {course.eligibility}
                    </div>

                    <div className="space-y-2 mb-6">
                      <span className="text-xs font-bold uppercase text-[#10233F] tracking-wider block">Key Highlights:</span>
                      {course.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start space-x-2 text-xs text-[#526174]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#89190E] flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mb-6">
                      <span className="text-xs font-bold uppercase text-[#10233F] tracking-wider block mb-2">Career Horizons:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.careerRoles.map((role, rIdx) => (
                          <span key={rIdx} className="text-[11px] bg-white border border-[#E8DCCB] text-[#10233F] px-2.5 py-0.5 rounded-lg font-medium">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#E8DCCB] flex items-center justify-between gap-3">
                    <button
                      onClick={() => setIsEnquiryOpen(true)}
                      className="flex-1 h-11 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all btn-hover-lift"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsEnquiryOpen(true)}
                      className="h-11 px-4 rounded-xl bg-[#FFF9EF] hover:bg-white text-[#89190E] border border-[#89190E]/30 font-semibold text-xs transition-all"
                      title="Download Syllabus"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Admission Process */}
          <Reveal direction="up" className="mb-20">
            <SectionHeading
              eyebrow="How to Apply"
              title="Admission Process"
              subtitle="Five straightforward steps to secure your place at MSI Group of Institutes."
              className="mb-14"
            />
            <div className="relative">
              {/* Connector line */}
              <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#89190E] via-[#EFC988] to-[#89190E] z-0" />
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
                {admissionSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <Reveal key={idx} direction="up" delay={idx * 80}>
                      <div className="group bg-white border border-[#E8DCCB] rounded-3xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#EFC988]">
                        <div className="w-14 h-14 rounded-2xl bg-[#FFF3DD] text-[#89190E] flex items-center justify-center mb-4 mx-auto group-hover:bg-[#89190E] group-hover:text-white transition-all">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-extrabold text-[#EFC988] block mb-1">STEP {step.step}</span>
                        <h4 className="font-serif text-base font-bold text-[#10233F] mb-2 group-hover:text-[#89190E] transition-colors">{step.title}</h4>
                        <p className="text-[11px] text-[#526174] leading-relaxed">{step.desc}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal direction="up">
            <div className="rounded-3xl bg-[#10233F] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#EFC988] block mb-2">Academic Counseling</span>
                 <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                  Not Sure Which Course Is Right For Your Goal?
                </h3>
                <p className="text-gray-300 text-sm mt-2 max-w-xl">
                  Book a free 1-on-1 counseling session with our senior faculty. We'll assess your background and guide you to the best exam preparation strategy.
                </p>
              </div>
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="h-12 px-7 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white font-bold text-sm transition-all btn-hover-lift flex-shrink-0"
              >
                Request Free Counseling
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
