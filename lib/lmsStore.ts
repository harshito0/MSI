'use client';

// ============================================================================
// MSI LMS & Udemy Experience Central Data Store
// Real-time synchronization across Student, Teacher, and Super Admin portals
// ============================================================================

export interface UdemyLecture {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  videoUrl: string;
  preview: boolean;
  summary: string;
  resources?: {
    title: string;
    type: 'pdf' | 'doc' | 'notes';
    size: string;
    downloadUrl: string;
  }[];
}

export interface UdemySection {
  id: string;
  title: string;
  duration: string;
  lectures: UdemyLecture[];
}

export interface UdemyCourse {
  id: string;
  slug: string;
  title: string;
  headline: string;
  description: string;
  category: 'Judiciary' | 'Law Entrance' | 'Criminal Law' | 'Constitutional Law' | 'Cyber Law' | 'Postgraduate';
  department: 'law' | 'management' | 'engineering';
  badge?: 'Bestseller' | 'Highest Rated' | 'Hot & New' | 'Recommended';
  rating: number;
  reviewCount: number;
  totalDuration: string;
  totalLectures: number;
  level: 'All Levels' | 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  price: number;
  originalPrice: number;
  isFreeForMsiStudents: boolean;
  instructorId: string;
  instructorName: string;
  instructorTitle: string;
  instructorAvatar: string;
  whatYouWillLearn: string[];
  requirements: string[];
  sections: UdemySection[];
  updatedDate: string;
  language: string;
  isPublished: boolean;
}

export interface TeacherApprovalRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  department: string;
  designation: string;
  qualifications: string;
  experienceYears: number;
  stream: 'Law' | 'JEE';
  bio: string;
  specialization: string;
  sampleLectureTitle: string;
  sampleLectureDuration: string;
  status: 'approved' | 'pending' | 'rejected' | 'suspended';
  applicationDate: string;
  approvedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
  assignedCourseIds: string[];
  rating: number;
  studentsCount: number;
}

export interface CourseEnrollment {
  studentId: string;
  courseId: string;
  enrolledAt: string;
  progressPercentage: number;
  completedLectureIds: string[];
  assignedBy: 'self' | 'super-admin' | 'teacher';
  assignedByName?: string;
  assignedNote?: string;
  certificateIssued?: boolean;
  lastActiveLectureId?: string;
}

// ----------------------------------------------------------------------------
// Initial Seed Data
// ----------------------------------------------------------------------------

export const INITIAL_UDEMY_COURSES: UdemyCourse[] = [
  {
    id: 'crs-udemy-pcsj',
    slug: 'pcs-j-comprehensive-masterclass',
    title: 'PCS J Comprehensive Foundation: Civil Judge & Judicial Magistrate Exam Masterclass',
    headline: 'Master Constitutional Law, Procedural Laws (CPC, CrPC, Evidence), Judgment Writing & Substantive Legal Reasoning for Judicial Services',
    description: 'Designed exclusively by senior judicial scholars and retired judges, this comprehensive flagship curriculum prepares law aspirants for Punjab, Haryana, Himachal Pradesh, and Delhi Judicial Services. Includes rigorous case law breakdowns, high court judgment drafting, and speed drills.',
    category: 'Judiciary',
    department: 'law',
    badge: 'Bestseller',
    rating: 4.9,
    reviewCount: 1840,
    totalDuration: '48 total hours',
    totalLectures: 24,
    level: 'All Levels',
    thumbnail: '/images/courses/pcsj.jpg',
    price: 3499,
    originalPrice: 9999,
    isFreeForMsiStudents: true,
    instructorId: 'fac-law-01',
    instructorName: 'Dr. Vikramaditya Sharma',
    instructorTitle: 'Senior Professor of Procedural Law & Former Judicial Advisor',
    instructorAvatar: '/images/faculty/faculty-1.webp',
    updatedDate: 'September 2026',
    language: 'English & Hindi (Bilingual)',
    isPublished: true,
    whatYouWillLearn: [
      'Comprehensive command over CrPC, CPC, and Indian Evidence Act frameworks',
      'Civil Court and Criminal Magistrate Judgment writing techniques with real case files',
      'Landmark Supreme Court and High Court verdicts with ratio decidendi analysis',
      'Techniques to conquer Prelims negative marking and structural Mains answers',
      'Bare Act section mapping and cross-referencing tricks for lightning recall',
      'Viva-voce / Personality interview simulation strategies for Judicial Boards'
    ],
    requirements: [
      'Pursuing or completed LL.B (3-year or 5-year degree) from any recognized university',
      'Basic understanding of Indian legal structure and bare act reading habits',
      'Laptop or smartphone with internet for lecture streaming and assignment submissions'
    ],
    sections: [
      {
        id: 'sec-1',
        title: 'Module 1: Constitutional Foundations & Judicial Review',
        duration: '11 hours 20 mins',
        lectures: [
          {
            id: 'lec-1-1',
            title: '01. Preamble Jurisprudence & Basic Structure Doctrine Masterclass',
            duration: '42:15',
            durationSeconds: 2535,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            preview: true,
            summary: 'Evolution of Basic Structure doctrine from Shankari Prasad, Golaknath to Kesavananda Bharati and Minerva Mills.',
            resources: [
              { title: 'Constitutional_Basic_Structure_Digest.pdf', type: 'pdf', size: '2.4 MB', downloadUrl: '#' },
              { title: 'Kesavananda_Bharati_Ratio_Analysis.pdf', type: 'notes', size: '1.1 MB', downloadUrl: '#' }
            ]
          },
          {
            id: 'lec-1-2',
            title: '02. Article 21 Evolution: Right to Privacy, Dignity & Speedy Trial',
            duration: '38:40',
            durationSeconds: 2320,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            preview: true,
            summary: 'In-depth review of Maneka Gandhi v. UOI, Puttaswamy judgment and expanding frontiers of life and personal liberty.',
            resources: [
              { title: 'Article_21_Landmark_Compendium.pdf', type: 'pdf', size: '3.1 MB', downloadUrl: '#' }
            ]
          },
          {
            id: 'lec-1-3',
            title: '03. Writ Jurisprudence: Habeas Corpus, Mandamus, Certiorari & Quo Warranto',
            duration: '35:10',
            durationSeconds: 2110,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            preview: false,
            summary: 'Detailed study of Article 32 vs Article 226 powers, locus standi relaxations and Public Interest Litigation (PIL).'
          },
          {
            id: 'lec-1-4',
            title: '04. Ordinance Making Power & Judicial Review of Executive Discretion',
            duration: '29:50',
            durationSeconds: 1790,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            preview: false,
            summary: 'DC Wadhwa and Krishna Kumar Singh verdicts: scope and limitation of executive ordinances.'
          }
        ]
      },
      {
        id: 'sec-2',
        title: 'Module 2: Code of Civil Procedure (CPC 1908) Essentials',
        duration: '14 hours 45 mins',
        lectures: [
          {
            id: 'lec-2-1',
            title: '05. Res Judicata & Constructive Res Judicata (Section 11 Analysis)',
            duration: '46:18',
            durationSeconds: 2778,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            preview: true,
            summary: 'Explanations I through VIII of Section 11 dissected with real trial court illustrations and mock problems.'
          },
          {
            id: 'lec-2-2',
            title: '06. Order VII Rule 11: Rejection of Plaint Grounds & Procedure',
            duration: '33:25',
            durationSeconds: 2005,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
            preview: false,
            summary: 'Procedural application of Order 7 Rule 11, barred by law, cause of action test, and limitation aspects.'
          },
          {
            id: 'lec-2-3',
            title: '07. Temporary Injunctions: Order 39 Rules 1 & 2 Triad Principles',
            duration: '40:12',
            durationSeconds: 2412,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
            preview: false,
            summary: 'Prima facie case, irreparable loss, and balance of convenience - judicial exercise of discretion.'
          }
        ]
      },
      {
        id: 'sec-3',
        title: 'Module 3: High Court Judgment Writing & Order Framing',
        duration: '12 hours 10 mins',
        lectures: [
          {
            id: 'lec-3-1',
            title: '08. Framing of Issues in Civil Suits: Order XIV Practice Workshop',
            duration: '52:00',
            durationSeconds: 3120,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            preview: true,
            summary: 'Issues of law vs issues of fact. Hands-on drafting exercise with Punjab & Haryana High Court model answers.'
          },
          {
            id: 'lec-3-2',
            title: '09. Criminal Charge Framing & Magistrate Cognizance Protocol',
            duration: '48:30',
            durationSeconds: 2910,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
            preview: false,
            summary: 'Step-by-step charge drafting for Section 302, 307, 376 IPC and joint liability under Section 34/149.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs-udemy-clat',
    slug: 'clat-ailet-supreme-coaching',
    title: 'CLAT & AILET Supreme Crack Course: Legal Reasoning & Logical Aptitude',
    headline: 'Complete guidance for 24 National Law Universities (NLUs) — Legal Reasoning, Current Affairs, English & Quantitative Drills',
    description: 'The definitive crash & regular preparation suite for CLAT UG, AILET, SLAT, and LSAT India. Includes reading comprehension strategies, critical legal reasoning drills, and speed testing.',
    category: 'Law Entrance',
    department: 'law',
    badge: 'Highest Rated',
    rating: 4.8,
    reviewCount: 2130,
    totalDuration: '36 total hours',
    totalLectures: 18,
    level: 'Beginner',
    thumbnail: '/images/courses/clat.jpg',
    price: 2499,
    originalPrice: 7999,
    isFreeForMsiStudents: true,
    instructorId: 'fac-law-01',
    instructorName: 'Dr. Vikramaditya Sharma',
    instructorTitle: 'Dean of Law Entrance Academy',
    instructorAvatar: '/images/faculty/faculty-1.webp',
    updatedDate: 'September 2026',
    language: 'English',
    isPublished: true,
    whatYouWillLearn: [
      'Techniques to solve passage-based legal reasoning questions in under 45 seconds',
      'Law of Torts, Contracts, Constitutional principles and Criminal law foundations',
      'Logical reasoning tricks: syllogisms, assumptions, inferences, and paradoxes',
      'Monthly GK capsules and high-yield editorial summaries for CLAT 2026',
      'Time management formulas for 120 questions in 120 minutes'
    ],
    requirements: [
      'Students in 11th, 12th standard or high school graduates intending to crack Law Entrance',
      'No prior legal knowledge required - starting from absolute ground fundamentals'
    ],
    sections: [
      {
        id: 'sec-clat-1',
        title: 'Section 1: Passage-Based Legal Aptitude Strategies',
        duration: '9 hours 15 mins',
        lectures: [
          {
            id: 'lec-clat-1-1',
            title: '01. Principle-Fact Mastery vs Passage Inferences: The CLAT Shift',
            duration: '36:12',
            durationSeconds: 2172,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            preview: true,
            summary: 'Understanding how Consortium of NLUs frames comprehension traps in legal reasoning.'
          },
          {
            id: 'lec-clat-1-2',
            title: '02. Law of Torts for Entrance Exams: Negligence, Defamation & Nuisance',
            duration: '44:00',
            durationSeconds: 2640,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            preview: false,
            summary: 'Strict liability vs Absolute liability (Rylands v. Fletcher & MC Mehta).',
            resources: [
              { title: 'Torts_Cheat_Sheet_CLAT.pdf', type: 'pdf', size: '1.8 MB', downloadUrl: '#' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'crs-udemy-bnss',
    slug: 'criminal-law-bnss-ipc-masterclass',
    title: 'Criminal Law Revolution: Bharatiya Nagarik Suraksha Sanhita (BNSS 2023) & IPC Masterclass',
    headline: 'Complete comparative analysis of Old Criminal Law vs New Criminal Laws with Bail jurisprudence and Police investigation powers',
    description: 'An authoritative, fast-track guide navigating the new criminal codes: Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA). Critical for practicing advocates and judicial aspirants.',
    category: 'Criminal Law',
    department: 'law',
    badge: 'Hot & New',
    rating: 4.9,
    reviewCount: 940,
    totalDuration: '28 total hours',
    totalLectures: 16,
    level: 'Intermediate',
    thumbnail: '/images/courses/bnss.jpg',
    price: 1999,
    originalPrice: 5999,
    isFreeForMsiStudents: true,
    instructorId: 'fac-law-03',
    instructorName: 'Adv. Simran Kaur (Pending Approval)',
    instructorTitle: 'Harvard Law Alumna & Criminal Defense Specialist',
    instructorAvatar: '/images/faculty/faculty-3.webp',
    updatedDate: 'September 2026',
    language: 'Hindi & English',
    isPublished: true,
    whatYouWillLearn: [
      'Comparative section-by-section breakdown between CrPC 1973 and BNSS 2023',
      'Electronic FIR, Zero FIR, and digital investigation mandates in Indian policing',
      'Arrest guidelines under Section 35 BNSS and statutory safeguards for accused',
      'Bail and Anticipatory Bail jurisprudence under BNSS Section 482 & 483',
      'Community service as punishment and victim compensation reforms'
    ],
    requirements: [
      'Familiarity with basic criminal law terminology and police investigation stages'
    ],
    sections: [
      {
        id: 'sec-bnss-1',
        title: 'Section 1: The New Criminal Justice Architecture',
        duration: '7 hours 40 mins',
        lectures: [
          {
            id: 'lec-bnss-1-1',
            title: '01. BNSS vs CrPC: 20 Paradigm Shifts Every Lawyer Must Know',
            duration: '45:30',
            durationSeconds: 2730,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            preview: true,
            summary: 'Comprehensive overview of key legislative shifts, timelines for inquiry, trial, and judgment delivery.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs-udemy-cyber',
    slug: 'cyber-law-data-privacy-ai-regulation',
    title: 'Cyber Law, Digital Evidence & AI Regulations in Indian Jurisprudence',
    headline: 'Information Technology Act 2000, Section 65B Electronic Evidence Certification, Digital Personal Data Protection (DPDP 2023) & AI Compliance',
    description: 'Explore the modern legal landscape where technology and constitutional rights collide. Learn about cybersecurity liabilities, cloud subpoenas, Section 65B electronic certificate admissibility, and the DPDP Act 2023 framework.',
    category: 'Cyber Law',
    department: 'law',
    badge: 'Recommended',
    rating: 4.7,
    reviewCount: 620,
    totalDuration: '22 total hours',
    totalLectures: 14,
    level: 'All Levels',
    thumbnail: '/images/courses/cyber.jpg',
    price: 1899,
    originalPrice: 4999,
    isFreeForMsiStudents: true,
    instructorId: 'fac-law-03',
    instructorName: 'Adv. Simran Kaur (Pending Approval)',
    instructorTitle: 'Cyber Jurist & Technology Law Consultant',
    instructorAvatar: '/images/faculty/faculty-3.webp',
    updatedDate: 'September 2026',
    language: 'English',
    isPublished: true,
    whatYouWillLearn: [
      'Drafting Section 65B Electronic Evidence Certificates with foolproof admissibility',
      'DPDP Act 2023 compliance obligations for data fiduciaries and consent managers',
      'Investigating cyber crimes: phishing, ransomware, cryptocurrency tracing, and intermediary liability',
      'Artificial Intelligence intellectual property and copyright disputes'
    ],
    requirements: [
      'Basic curiosity about internet laws and digital privacy'
    ],
    sections: [
      {
        id: 'sec-cyber-1',
        title: 'Section 1: Electronic Evidence in Indian Courts',
        duration: '5 hours 30 mins',
        lectures: [
          {
            id: 'lec-cyber-1-1',
            title: '01. The Arjun Panditrao Supreme Court Ruling on Section 65B Dissected',
            duration: '38:15',
            durationSeconds: 2295,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            preview: true,
            summary: 'Mandatory nature of certificate for secondary electronic records: Hard drives, WhatsApp chats, CCTV footage.'
          }
        ]
      }
    ]
  }
];

// ----------------------------------------------------------------------------
// Teacher Profiles for Super Admin Approval Workflow
// ----------------------------------------------------------------------------

export const INITIAL_TEACHERS: TeacherApprovalRecord[] = [
  {
    id: 'fac-law-01',
    name: 'Dr. Vikramaditya Sharma',
    email: 'dr.vikramaditya@msi-institutes.edu.in',
    phone: '+91 98112 34567',
    avatarUrl: '/images/faculty/faculty-1.webp',
    department: 'School of Law & Judicial Services',
    designation: 'Senior Professor & Dean of Academic Affairs',
    qualifications: 'Ph.D. in Constitutional Jurisprudence (Delhi University), LL.M (Gold Medalist)',
    experienceYears: 18,
    stream: 'Law',
    bio: 'Former judicial advisor with 18+ years experience guiding top rankers in PCS-J, Delhi Judicial Services, and CLAT UG/PG.',
    specialization: 'Procedural Laws, CPC, Judgment Writing, Constitutional Law',
    sampleLectureTitle: 'Framing of Issues in Civil Suits & Res Judicata Principles',
    sampleLectureDuration: '42 mins',
    status: 'approved',
    applicationDate: '12 Jan 2025',
    approvedAt: '15 Jan 2025',
    approvedBy: 'Governing Board / Super Admin',
    assignedCourseIds: ['crs-udemy-pcsj', 'crs-udemy-clat'],
    rating: 4.9,
    studentsCount: 1420
  },
  {
    id: 'fac-jee-02',
    name: 'Er. Rajesh Verma',
    email: 'rajesh.verma@msi-institutes.edu.in',
    phone: '+91 98765 11223',
    avatarUrl: '/images/faculty/faculty-2.webp',
    department: 'Department of Computer Science & Engineering',
    designation: 'Associate Professor & Systems Lead',
    qualifications: 'M.Tech (IIT Roorkee), B.Tech CS (PEC Chandigarh)',
    experienceYears: 12,
    stream: 'JEE',
    bio: 'Specialist in Applied Engineering, Distributed Algorithms, and High-Throughput System Architecture.',
    specialization: 'Engineering Mechanics, Distributed Systems, Computational Logic',
    sampleLectureTitle: 'Dynamic Memory Allocation & Graph Traversal Optimization',
    sampleLectureDuration: '36 mins',
    status: 'approved',
    applicationDate: '20 Feb 2025',
    approvedAt: '22 Feb 2025',
    approvedBy: 'Governing Board / Super Admin',
    assignedCourseIds: [],
    rating: 4.8,
    studentsCount: 890
  },
  {
    id: 'fac-law-03',
    name: 'Adv. Simran Kaur',
    email: 'simran.kaur.adv@gmail.com',
    phone: '+91 98150 99441',
    avatarUrl: '/images/faculty/faculty-3.webp',
    department: 'School of Law & Judicial Services',
    designation: 'Visiting Senior Advocate & Cyber Jurist',
    qualifications: 'LL.M (Harvard Law School), B.A. LL.B. (Hons, NALSAR Hyderabad)',
    experienceYears: 9,
    stream: 'Law',
    bio: 'Practicing Advocate at Punjab & Haryana High Court specializing in Cyber Security litigation, DPDP Act 2023 compliance, and White Collar Criminal Defense.',
    specialization: 'BNSS Criminal Law, Cyber Law, Digital Evidence (Section 65B)',
    sampleLectureTitle: 'Admissibility of WhatsApp Encrypted Chats in Criminal Trial',
    sampleLectureDuration: '28 mins',
    status: 'pending',
    applicationDate: '24 September 2026',
    assignedCourseIds: ['crs-udemy-bnss', 'crs-udemy-cyber'],
    rating: 4.8,
    studentsCount: 0
  },
  {
    id: 'fac-law-04',
    name: 'Dr. Anirudh Sen',
    email: 'anirudh.sen.prosecution@yahoo.co.in',
    phone: '+91 98881 77221',
    avatarUrl: '/images/faculty/faculty-4.webp',
    department: 'Judiciary Coaching Division',
    designation: 'Former Public Prosecutor & Criminal Trial Specialist',
    qualifications: 'Ph.D. in Forensic Evidence (PU), LL.M (National Law School of India University)',
    experienceYears: 15,
    stream: 'Law',
    bio: '15 years of state prosecution experience handling over 400 murder and narcotics trials; renowned trainer for Judicial Magistrate candidates.',
    specialization: 'Law of Evidence, Cross-Examination Workshop, Forensic Criminology',
    sampleLectureTitle: 'Hostile Witness Management & Section 145 Impeachment Tactics',
    sampleLectureDuration: '34 mins',
    status: 'pending',
    applicationDate: '25 September 2026',
    assignedCourseIds: [],
    rating: 4.9,
    studentsCount: 0
  },
  {
    id: 'fac-law-05',
    name: 'Prof. Natasha Mehra',
    email: 'natasha.mehra.clat@msi-prep.org',
    phone: '+91 98720 44551',
    avatarUrl: '/images/faculty/faculty-5.webp',
    department: 'Law Entrance Coaching Division',
    designation: 'Chief Legal Aptitude Mentor',
    qualifications: 'LL.M (WBNUJS Kolkata), CLAT AIR 14 (Batch of 2017)',
    experienceYears: 7,
    stream: 'Law',
    bio: 'Celebrated CLAT mentor who has guided 280+ students into top NLUs (NLSIU, NALSAR, WBNUJS) with signature speed-reasoning techniques.',
    specialization: 'CLAT Reading Comprehension, Critical Reasoning, Legal Aptitude Passages',
    sampleLectureTitle: 'Cracking 35 Legal Reasoning Passages in Under 30 Minutes',
    sampleLectureDuration: '25 mins',
    status: 'pending',
    applicationDate: '26 September 2026',
    assignedCourseIds: [],
    rating: 4.9,
    studentsCount: 0
  }
];

// ----------------------------------------------------------------------------
// Initial Student Enrollments
// ----------------------------------------------------------------------------

export const INITIAL_ENROLLMENTS: CourseEnrollment[] = [
  {
    studentId: 'msi-stu-001', // Aarav Sharma
    courseId: 'crs-udemy-pcsj',
    enrolledAt: '10 July 2025',
    progressPercentage: 74,
    completedLectureIds: ['lec-1-1', 'lec-1-2', 'lec-2-1', 'lec-3-1'],
    assignedBy: 'super-admin',
    assignedByName: 'Dean / Super Admin Office',
    assignedNote: 'Directly assigned by Super Admin for 2025 PCS J High Court Mock Series preparation.',
    certificateIssued: false,
    lastActiveLectureId: 'lec-1-3'
  },
  {
    studentId: 'msi-stu-001', // Aarav Sharma
    courseId: 'crs-udemy-bnss',
    enrolledAt: '15 August 2025',
    progressPercentage: 42,
    completedLectureIds: ['lec-bnss-1-1'],
    assignedBy: 'self',
    certificateIssued: false,
    lastActiveLectureId: 'lec-bnss-1-1'
  },
  {
    studentId: 'msi-stu-002', // Meera Sen
    courseId: 'crs-udemy-clat',
    enrolledAt: '20 June 2025',
    progressPercentage: 88,
    completedLectureIds: ['lec-clat-1-1', 'lec-clat-1-2'],
    assignedBy: 'super-admin',
    assignedByName: 'Super Admin Office',
    assignedNote: 'Enrolled under MSI Merit Scholarship Cohort 2025.',
    certificateIssued: true,
    lastActiveLectureId: 'lec-clat-1-2'
  }
];

// ----------------------------------------------------------------------------
// LocalStorage Keys & Synchronization Event
// ----------------------------------------------------------------------------

const STORAGE_KEY_COURSES = 'msi_udemy_courses_v1';
const STORAGE_KEY_TEACHERS = 'msi_udemy_teachers_v1';
const STORAGE_KEY_ENROLLMENTS = 'msi_udemy_enrollments_v1';
export const LMS_SYNC_EVENT = 'msi_lms_store_updated';

// Trigger event when store changes
export function notifyLmsStoreChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(LMS_SYNC_EVENT));
  }
}

// ----------------------------------------------------------------------------
// Store Accessor Functions
// ----------------------------------------------------------------------------

// Courses
export function getStoredCourses(): UdemyCourse[] {
  if (typeof window === 'undefined') return INITIAL_UDEMY_COURSES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COURSES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(INITIAL_UDEMY_COURSES));
      return INITIAL_UDEMY_COURSES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_UDEMY_COURSES;
  }
}

export function saveStoredCourses(courses: UdemyCourse[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(courses));
    notifyLmsStoreChange();
  } catch (err) {
    console.error(err);
  }
}

// Teachers
export function getStoredTeachers(): TeacherApprovalRecord[] {
  if (typeof window === 'undefined') return INITIAL_TEACHERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEACHERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_TEACHERS, JSON.stringify(INITIAL_TEACHERS));
      return INITIAL_TEACHERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TEACHERS;
  }
}

export function saveStoredTeachers(teachers: TeacherApprovalRecord[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_TEACHERS, JSON.stringify(teachers));
    notifyLmsStoreChange();
  } catch (err) {
    console.error(err);
  }
}

// Enrollments
export function getStoredEnrollments(): CourseEnrollment[] {
  if (typeof window === 'undefined') return INITIAL_ENROLLMENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ENROLLMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ENROLLMENTS, JSON.stringify(INITIAL_ENROLLMENTS));
      return INITIAL_ENROLLMENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ENROLLMENTS;
  }
}

export function saveStoredEnrollments(enrollments: CourseEnrollment[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_ENROLLMENTS, JSON.stringify(enrollments));
    notifyLmsStoreChange();
  } catch (err) {
    console.error(err);
  }
}

// ----------------------------------------------------------------------------
// Core Business Logic Actions
// ----------------------------------------------------------------------------

/**
 * Super Admin Approves a Teacher Application
 */
export function approveTeacherAction(teacherId: string, approvedByName = 'Super Admin Officer') {
  const teachers = getStoredTeachers();
  const updated = teachers.map((t) => {
    if (t.id === teacherId) {
      return {
        ...t,
        status: 'approved' as const,
        approvedAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        approvedBy: approvedByName,
        rejectionReason: undefined
      };
    }
    return t;
  });
  saveStoredTeachers(updated);
  return updated;
}

/**
 * Super Admin Rejects a Teacher Application
 */
export function rejectTeacherAction(teacherId: string, reason: string) {
  const teachers = getStoredTeachers();
  const updated = teachers.map((t) => {
    if (t.id === teacherId) {
      return {
        ...t,
        status: 'rejected' as const,
        rejectionReason: reason || 'Application requires additional credential verification.'
      };
    }
    return t;
  });
  saveStoredTeachers(updated);
  return updated;
}

/**
 * Super Admin Assigns Courses to a Teacher
 */
export function assignCoursesToTeacherAction(teacherId: string, courseIds: string[]) {
  const teachers = getStoredTeachers();
  const updatedTeachers = teachers.map((t) => {
    if (t.id === teacherId) {
      return {
        ...t,
        assignedCourseIds: courseIds
      };
    }
    return t;
  });
  saveStoredTeachers(updatedTeachers);

  // Also update instructor on the course if relevant
  const teacher = teachers.find((t) => t.id === teacherId);
  if (teacher) {
    const courses = getStoredCourses();
    const updatedCourses = courses.map((c) => {
      if (courseIds.includes(c.id)) {
        return {
          ...c,
          instructorId: teacher.id,
          instructorName: teacher.name,
          instructorTitle: teacher.designation,
          instructorAvatar: teacher.avatarUrl
        };
      }
      return c;
    });
    saveStoredCourses(updatedCourses);
  }

  return updatedTeachers;
}

/**
 * Student Self-Enrolls in a Course (from Courses page)
 */
export function enrollStudentAction(
  studentId: string,
  courseId: string,
  assignedBy: 'self' | 'super-admin' | 'teacher' = 'self',
  assignedByName?: string,
  assignedNote?: string
): CourseEnrollment {
  const enrollments = getStoredEnrollments();
  const existing = enrollments.find((e) => e.studentId === studentId && e.courseId === courseId);
  if (existing) {
    return existing;
  }

  const newEnrollment: CourseEnrollment = {
    studentId,
    courseId,
    enrolledAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    progressPercentage: 0,
    completedLectureIds: [],
    assignedBy,
    assignedByName,
    assignedNote,
    certificateIssued: false
  };

  const updated = [...enrollments, newEnrollment];
  saveStoredEnrollments(updated);
  return newEnrollment;
}

/**
 * Super Admin or Teacher Assigns a Course to a Student
 */
export function assignCourseToStudentAction(
  studentId: string,
  courseId: string,
  assignedBy: 'super-admin' | 'teacher',
  assignedByName: string,
  assignedNote: string
) {
  return enrollStudentAction(studentId, courseId, assignedBy, assignedByName, assignedNote);
}

/**
 * Update Student's Lecture Progress
 */
export function toggleLectureCompletionAction(
  studentId: string,
  courseId: string,
  lectureId: string
) {
  const enrollments = getStoredEnrollments();
  const courses = getStoredCourses();
  const course = courses.find((c) => c.id === courseId);

  const updated = enrollments.map((enr) => {
    if (enr.studentId === studentId && enr.courseId === courseId) {
      const alreadyCompleted = enr.completedLectureIds.includes(lectureId);
      const newCompleted = alreadyCompleted
        ? enr.completedLectureIds.filter((id) => id !== lectureId)
        : [...enr.completedLectureIds, lectureId];

      const totalLecs = course ? course.sections.reduce((acc, s) => acc + s.lectures.length, 0) : 1;
      const progress = Math.min(100, Math.round((newCompleted.length / Math.max(1, totalLecs)) * 100));

      return {
        ...enr,
        completedLectureIds: newCompleted,
        progressPercentage: progress,
        lastActiveLectureId: lectureId,
        certificateIssued: progress >= 100 ? true : enr.certificateIssued
      };
    }
    return enr;
  });

  saveStoredEnrollments(updated);
  return updated;
}
