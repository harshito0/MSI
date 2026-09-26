'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import EnquiryModal from '@/components/modals/EnquiryModal';
import UdemyCourseModal from '@/components/courses/UdemyCourseModal';
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
  Scale,
  Award,
  ClipboardList,
  FileText,
  UserCheck,
  CreditCard,
  Landmark,
  Send,
  Sparkles,
  Phone,
  Star,
  PlayCircle,
  Search,
  SlidersHorizontal,
  ExternalLink,
} from 'lucide-react';
import {
  UdemyCourse,
  getStoredCourses,
  getStoredEnrollments,
  enrollStudentAction,
  LMS_SYNC_EVENT,
} from '@/lib/lmsStore';

interface ClassroomCourse {
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
  const [selectedCourse, setSelectedCourse] = useState('PCS J — Punjab Judicial Services');
  const [selectedDept, setSelectedDept] = useState<'all' | 'law' | 'management'>('all');

  // Udemy LMS State
  const [udemyCourses, setUdemyCourses] = useState<UdemyCourse[]>([]);
  const [selectedUdemyCategory, setSelectedUdemyCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeUdemyModalCourse, setActiveUdemyModalCourse] = useState<UdemyCourse | null>(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeStudentId = 'msi-stu-001'; // Default student Aarav Sharma

  const loadLmsData = () => {
    const courses = getStoredCourses();
    setUdemyCourses(courses);
    const enrollments = getStoredEnrollments();
    const enrolled = enrollments
      .filter((e) => e.studentId === activeStudentId)
      .map((e) => e.courseId);
    setEnrolledCourseIds(enrolled);
  };

  useEffect(() => {
    loadLmsData();

    const handleSync = () => {
      loadLmsData();
    };

    window.addEventListener(LMS_SYNC_EVENT, handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener(LMS_SYNC_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleInstantEnroll = (course: UdemyCourse, e: React.MouseEvent) => {
    e.stopPropagation();
    enrollStudentAction(activeStudentId, course.id, 'self');
    loadLmsData();
    showToast(`✓ Enrolled in ${course.title}! Available in your Student Portal.`);
  };

  // Filter Udemy courses
  const filteredUdemyCourses = udemyCourses.filter((course) => {
    if (selectedUdemyCategory !== 'all' && course.category !== selectedUdemyCategory) {
      return false;
    }
    if (
      searchQuery &&
      !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !course.headline.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !course.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'Judiciary', label: 'Judiciary (PCS J)' },
    { id: 'Law Entrance', label: 'CLAT & AILET' },
    { id: 'Criminal Law', label: 'Criminal Law & BNSS' },
    { id: 'Cyber Law', label: 'Cyber & AI Law' },
  ];

  const classroomCourses: ClassroomCourse[] = [
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
  ];

  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#10233F] flex flex-col selection:bg-[#EFC988] selection:text-[#89190E]">
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* Floating Success Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-[#10233F] text-white border-2 border-[#EFC988] shadow-2xl flex items-center space-x-3 animate-fadeIn">
          <Sparkles className="w-5 h-5 text-[#EFC988] flex-shrink-0" />
          <div>
            <span className="text-xs sm:text-sm font-semibold block">{toastMessage}</span>
            <Link
              href="/student/dashboard"
              className="text-xs text-[#EFC988] underline font-bold mt-1 inline-block"
            >
              Open in Student Learning Hub →
            </Link>
          </div>
        </div>
      )}

      <main className="flex-grow">
        {/* Full-Bleed Page Hero */}
        <PageHero
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Academic Programs & LMS' },
          ]}
          eyebrow="MSI Online & On-Campus Learning Suite"
          title="Courses & Online Video Programs"
          subtitle="Explore our Udemy-style online video masterclasses and full-time judiciary coaching batches led by distinguished retired judges and senior legal scholars."
          bgImage="/images/hero-2.webp"
          className="pt-24 sm:pt-28"
        >
          {/* Quick Jump Bar */}
          <div className="flex items-center flex-wrap gap-2">
            <a
              href="#udemy-catalog"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#EFC988] text-[#10233F] hover:bg-[#ffe0a3] transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <PlayCircle className="w-4 h-4 text-[#89190E]" />
              <span>Browse Udemy Video Courses ({udemyCourses.length})</span>
            </a>

            <a
              href="#classroom-batches"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all flex items-center space-x-1.5"
            >
              <Landmark className="w-4 h-4 text-[#EFC988]" />
              <span>Classroom Coaching Batches</span>
            </a>

            <Link
              href="/super-admin"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 text-[#EFC988] hover:bg-white/20 border border-[#EFC988]/30 transition-all flex items-center space-x-1.5"
            >
              <Award className="w-4 h-4 text-[#EFC988]" />
              <span>Super Admin Portal</span>
            </Link>
          </div>
        </PageHero>

        {/* ------------------------------------------------------------------
            1. UDEMY-STYLE ONLINE VIDEO COURSES SECTION (User Request Focus)
            ------------------------------------------------------------------ */}
        <section id="udemy-catalog" className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-[#89190E] uppercase mb-1">
                <Sparkles className="w-4 h-4 text-[#89190E]" />
                <span>Self-Paced Udemy Masterclasses</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#10233F]">
                Udemy-Style Online Video Programs
              </h2>
              <p className="text-xs sm:text-sm text-[#526174] mt-1 max-w-2xl">
                Enroll with 1 click to unlock complete video modules, Bare Act case summaries, notes, and interactive Q&A in your Student Portal.
              </p>
            </div>

            <Link
              href="/student/dashboard"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#10233F] hover:bg-[#1a345c] text-white text-xs font-bold transition-all shadow-sm self-start md:self-auto"
            >
              <UserCheck className="w-4 h-4 text-[#EFC988]" />
              <span>Go to My Enrolled Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E8DCCB] shadow-xs mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedUdemyCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedUdemyCategory === cat.id
                      ? 'bg-[#89190E] text-white shadow-sm'
                      : 'bg-[#FFF9EF] text-[#526174] hover:text-[#10233F] border border-[#E8DCCB]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-[#526174] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search judicial topics, CPC, BNSS, CLAT..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8DCCB] bg-[#FFF9EF]/50 text-xs text-[#10233F] focus:outline-none focus:border-[#89190E]"
              />
            </div>

          </div>

          {/* Udemy Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filteredUdemyCourses.map((course, idx) => {
              const isEnrolled = enrolledCourseIds.includes(course.id);

              return (
                <Reveal key={course.id} direction="up" delay={idx * 60}>
                  <div
                    onClick={() => setActiveUdemyModalCourse(course)}
                    className="bg-white rounded-3xl border border-[#E8DCCB] overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer h-full"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <div className="relative aspect-video w-full overflow-hidden bg-black/10">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Badge */}
                        {course.badge && (
                          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-[#EFC988] text-[#10233F] px-2.5 py-0.5 rounded-md shadow-xs">
                            {course.badge}
                          </span>
                        )}

                        {/* Play Overlay */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-white/90 text-[#89190E] flex items-center justify-center shadow-lg">
                            <PlayCircle className="w-7 h-7 fill-[#89190E] text-white" />
                          </div>
                        </div>

                        {/* Duration chip */}
                        <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold text-white bg-black/75 px-2 py-0.5 rounded-md backdrop-blur-xs">
                          {course.totalDuration}
                        </span>
                      </div>

                      {/* Course Card Body */}
                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] text-[#526174]">
                          <span className="font-mono text-[#89190E] font-bold uppercase">
                            {course.category}
                          </span>
                          <span>{course.level}</span>
                        </div>

                        <h3 className="font-serif text-base font-bold text-[#10233F] group-hover:text-[#89190E] transition-colors leading-snug line-clamp-2">
                          {course.title}
                        </h3>

                        <p className="text-xs text-[#526174] line-clamp-2 leading-relaxed">
                          {course.headline}
                        </p>

                        {/* Instructor line */}
                        <div className="text-xs text-[#526174] flex items-center space-x-1.5 pt-1">
                          <UserCheck className="w-3.5 h-3.5 text-[#89190E]" />
                          <span className="truncate">{course.instructorName}</span>
                        </div>

                        {/* Rating row */}
                        <div className="flex items-center space-x-1.5 text-xs text-[#10233F] font-bold pt-1">
                          <span className="text-[#89190E] font-mono">{course.rating.toFixed(1)}</span>
                          <div className="flex text-[#EFC988]">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < Math.floor(course.rating)
                                    ? 'fill-[#EFC988] text-[#EFC988]'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-[#526174] font-normal">
                            ({course.reviewCount.toLocaleString()})
                          </span>
                        </div>

                        {/* Price & Free badge */}
                        <div className="pt-2 flex items-baseline space-x-2">
                          <span className="font-serif text-lg font-bold text-[#10233F]">
                            ₹{course.price.toLocaleString()}
                          </span>
                          <span className="text-xs line-through text-[#526174]">
                            ₹{course.originalPrice.toLocaleString()}
                          </span>
                          {course.isFreeForMsiStudents && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                              Free for MSI Students
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-5 pt-0 border-t border-[#E8DCCB]/60 mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveUdemyModalCourse(course);
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-[#FFF9EF] hover:bg-[#FFF3DD] text-[#10233F] border border-[#E8DCCB] text-xs font-bold transition-all text-center cursor-pointer"
                      >
                        Curriculum
                      </button>

                      {isEnrolled ? (
                        <Link
                          href="/student/dashboard"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all text-center flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Enrolled ✓</span>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handleInstantEnroll(course, e)}
                          className="flex-1 py-2.5 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white text-xs font-bold transition-all text-center flex items-center justify-center space-x-1 shadow-sm cursor-pointer"
                        >
                          <span>Enroll Now</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </section>

        {/* ------------------------------------------------------------------
            2. CLASSROOM ADMISSION BATCHES SECTION
            ------------------------------------------------------------------ */}
        <section id="classroom-batches" className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 py-12 border-t border-[#E8DCCB]">
          
          <SectionHeading
            eyebrow="On-Campus Coaching"
            title="Classroom Entrance & Judicial Batches"
            subtitle="Full-time classroom batches with daily mock judgment drafting, moot court simulations, and individual faculty mentorship."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {classroomCourses.map((course, idx) => (
              <Reveal key={course.id} direction="up" delay={idx * 60}>
                <div className="bg-white rounded-3xl p-8 border border-[#E8DCCB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#89190E] bg-[#FFF3DD] border border-[#F7E5BF] px-3 py-1 rounded-full">
                        {course.level}
                      </span>
                      <span className="text-xs font-semibold text-[#526174] flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#89190E]" />
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#10233F] mb-2">
                      {course.name}
                    </h3>
                    <span className="text-xs text-[#526174] block mb-4">
                      {course.school} • {course.intake}
                    </span>

                    <div className="bg-[#FFF9EF] p-3 rounded-2xl border border-[#E8DCCB] text-xs text-[#10233F] mb-6">
                      <span className="font-bold text-[#89190E] block mb-0.5">Eligibility:</span>
                      {course.eligibility}
                    </div>

                    <div className="space-y-2 mb-6">
                      <span className="text-xs font-bold uppercase text-[#10233F] tracking-wider block">
                        Key Highlights:
                      </span>
                      {course.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start space-x-2 text-xs text-[#526174]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#89190E] flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#E8DCCB] flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedCourse(course.name);
                        setIsEnquiryOpen(true);
                      }}
                      className="flex-1 h-11 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-sm cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Enquire Batch</span>
                    </button>

                    <a
                      href={`https://wa.me/919815502444?text=${encodeURIComponent(
                        `Hello MSI Admissions Team, I want to enquire about ${course.name} batch details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center transition-all shadow-sm cursor-pointer"
                      title="Chat on WhatsApp"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Under Courses Action Strip (Helpline) */}
          <Reveal direction="up" className="my-14">
            <div className="rounded-3xl bg-gradient-to-r from-[#10233F] via-[#162f55] to-[#10233F] p-7 sm:p-10 text-white border border-[#EFC988]/30 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#EFC988]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="text-center lg:text-left">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#EFC988] bg-white/10 px-3 py-1 rounded-full mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#EFC988]" />
                    Direct Admissions Helpline
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                    Confused Between Online Masterclasses & Classroom Batches?
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
                    Talk directly to our senior academic counselors for one-on-one exam strategy, syllabus details, and batch start dates.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => {
                      setSelectedCourse('Direct Course Admissions Enquiry');
                      setIsEnquiryOpen(true);
                    }}
                    className="h-12 px-6 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enquire Now</span>
                  </button>

                  <a
                    href="https://wa.me/919815502444?text=Hello%20MSI%20Admissions%20Team%2C%20I%20have%20questions%20about%20your%20courses."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Admission Process Steps */}
          <Reveal direction="up" className="mb-20">
            <SectionHeading
              eyebrow="How to Apply"
              title="Admission Process"
              subtitle="Five straightforward steps to secure your place at MSI Group of Institutes."
              className="mb-14"
            />
            <div className="relative">
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
                        <span className="text-xs font-extrabold text-[#EFC988] block mb-1">
                          STEP {step.step}
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#10233F] mb-2 group-hover:text-[#89190E] transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-[11px] text-[#526174] leading-relaxed">{step.desc}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>

        </section>
      </main>

      <Footer />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialCourse={selectedCourse}
      />

      {/* Udemy Course Details & Preview Modal */}
      <UdemyCourseModal
        course={activeUdemyModalCourse}
        isOpen={!!activeUdemyModalCourse}
        onClose={() => setActiveUdemyModalCourse(null)}
        activeStudentId={activeStudentId}
        onEnrollSuccess={(c) => {
          loadLmsData();
          showToast(`✓ Enrolled in ${c.title}!`);
        }}
      />
    </div>
  );
}
