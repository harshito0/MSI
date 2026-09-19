export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  enrollmentNo: string;
  rollNo: string;
  batch: string;
  courseTitle: string;
  semester: string;
  avatarUrl: string;
  bloodGroup: string;
  address: string;
  guardianName: string;
  guardianContact: string;
  admissionDate: string;
  validUntil: string;
}

export interface ActiveCourse {
  id: string;
  code: string;
  title: string;
  faculty: string;
  progress: number;
  totalLectures: number;
  attendedLectures: number;
  isEnrolled: boolean;
  validUntil: string;
  category: string;
  accentColor: string;
  status: 'Active' | 'Locked' | 'Completed';
}

export interface TimetableClass {
  id: string;
  subject: string;
  code: string;
  faculty: string;
  time: string;
  day: string;
  room: string;
  type: 'Lecture' | 'Moot Court' | 'Tutorial' | 'Test Series';
  isLiveNow?: boolean;
  joinLink?: string;
}

export interface StudentNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'academic' | 'exam' | 'fee' | 'urgent';
  read: boolean;
}

export interface RecordedVideo {
  id: string;
  title: string;
  subject: string;
  faculty: string;
  duration: string;
  uploadDate: string;
  videoUrl: string;
  thumbnail: string;
  isLocked?: boolean;
  topics: string[];
}

export interface NotePDF {
  id: string;
  title: string;
  subject: string;
  faculty: string;
  fileSize: string;
  uploadDate: string;
  downloadUrl: string;
  category: 'Class Notes' | 'Bare Act' | 'Summary' | 'Case Compendium';
  pages: number;
  isLocked?: boolean;
}

export interface PYQItem {
  id: string;
  examName: string;
  year: number;
  subject: string;
  hasSolutions: boolean;
  totalQuestions: number;
  paperType: 'Prelims' | 'Mains';
  downloadUrl: string;
  isLocked?: boolean;
}

export interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  assignedDate: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  maxMarks: number;
  scoredMarks?: number;
  facultyRemarks?: string;
  submittedFile?: string;
}

export interface AttendanceSubject {
  subject: string;
  code: string;
  total: number;
  attended: number;
  percentage: number;
  faculty: string;
}

export interface AttendanceLogEntry {
  id: string;
  date: string;
  day: string;
  subject: string;
  time: string;
  status: 'Present' | 'Absent' | 'Excused';
  markedBy: string;
}

export interface TestItem {
  id: string;
  title: string;
  subject: string;
  type: 'Mock' | 'Formal' | 'Timed';
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  scheduledDate: string;
  status: 'Available' | 'Completed' | 'Upcoming';
  scoredMarks?: number;
  percentile?: number;
  rank?: string;
  isLocked?: boolean;
}

export interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  subject: string;
}

export interface FeeBreakdownItem {
  category: string;
  amount: number;
  status: 'Paid' | 'Pending';
  dueDate?: string;
}

export interface FeeTransaction {
  id: string;
  receiptNo: string;
  date: string;
  amount: number;
  mode: 'UPI' | 'Net Banking' | 'Debit Card' | 'Bank Transfer';
  status: 'Successful' | 'Pending';
  remarks: string;
}

// --------------------------------------------------------------------------
// Sample Student Profiles
// --------------------------------------------------------------------------

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'msi-stu-001',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@msi-institutes.edu.in',
  phone: '+91 98765 43210',
  dob: '2002-08-14',
  age: 23,
  gender: 'Male',
  enrollmentNo: 'MSI-2025-LAW-042',
  rollNo: '25-JUD-042',
  batch: 'PCS-J Comprehensive Batch (2025-26)',
  courseTitle: 'Judicial Services Exam Preparation & LL.B. Honors',
  semester: 'Semester V (Judiciary Stream)',
  avatarUrl: '/images/avatars/avatar-1.webp',
  bloodGroup: 'B+',
  address: 'H.No. 402, Judicial Officers Enclave, Sector 71, Mohali, Punjab - 160071',
  guardianName: 'Sh. Rajesh Sharma (District Sessions Advocate)',
  guardianContact: '+91 98140 11223',
  admissionDate: '01 July 2024',
  validUntil: '31 July 2026',
};

export const DEMO_STUDENTS: StudentProfile[] = [
  INITIAL_STUDENT_PROFILE,
  {
    id: 'msi-stu-002',
    name: 'Meera Sen',
    email: 'meera.sen@msi-institutes.edu.in',
    phone: '+91 98123 99887',
    dob: '2004-11-22',
    age: 21,
    gender: 'Female',
    enrollmentNo: 'MSI-2025-CLAT-108',
    rollNo: '25-CLAT-018',
    batch: 'CLAT & AILET Supreme Batch 2025-26',
    courseTitle: 'CLAT / AILET 5-Year Integrated Law Coaching',
    semester: 'Foundation Year 2',
    avatarUrl: '/images/avatars/avatar-2.webp',
    bloodGroup: 'O+',
    address: 'Tower 4, Green Lotus Avenue, Kharar-Mohali Road, Punjab - 140301',
    guardianName: 'Dr. Sunita Sen',
    guardianContact: '+91 98722 33445',
    admissionDate: '15 June 2024',
    validUntil: '30 June 2026',
  },
];

// --------------------------------------------------------------------------
// Active & Locked Courses (Course Entitlement Rule)
// --------------------------------------------------------------------------

export const ACTIVE_COURSES: ActiveCourse[] = [
  {
    id: 'crs-01',
    code: 'LAW-PCS-101',
    title: 'Punjab Judicial Services (PCS J) Master Foundation',
    faculty: 'Hon. Retd. Justice K.L. Verma & Dr. Vikramaditya',
    progress: 74,
    totalLectures: 140,
    attendedLectures: 104,
    isEnrolled: true,
    validUntil: '31 July 2026',
    category: 'Judiciary',
    accentColor: '#89190E',
    status: 'Active',
  },
  {
    id: 'crs-02',
    code: 'LAW-CRPC-202',
    title: 'Code of Criminal Procedure & BNSS 2023 Provisions',
    faculty: 'Adv. R.K. Singla (Senior High Court Advocate)',
    progress: 82,
    totalLectures: 60,
    attendedLectures: 49,
    isEnrolled: true,
    validUntil: '31 July 2026',
    category: 'Criminal Law',
    accentColor: '#10233F',
    status: 'Active',
  },
  {
    id: 'crs-03',
    code: 'LAW-CONST-301',
    title: 'Constitutional Law of India & Landmark Apex Verdicts',
    faculty: 'Prof. Ananya Roy (Ph.D. NLSIU)',
    progress: 68,
    totalLectures: 50,
    attendedLectures: 34,
    isEnrolled: true,
    validUntil: '31 July 2026',
    category: 'Constitutional Law',
    accentColor: '#89190E',
    status: 'Active',
  },
  {
    id: 'crs-04',
    code: 'LAW-JUD-ADV-909',
    title: 'Apex Judgment Writing & High Court Moot Specialization',
    faculty: 'Executive Judicial Committee',
    progress: 0,
    totalLectures: 36,
    attendedLectures: 0,
    isEnrolled: false, // Course Entitlement Rule: Server-side locked
    validUntil: 'N/A (Requires Add-on Enrollment)',
    category: 'Advanced Elective',
    accentColor: '#526174',
    status: 'Locked',
  },
];

// --------------------------------------------------------------------------
// Timetable & Upcoming Classes
// --------------------------------------------------------------------------

export const UPCOMING_CLASSES: TimetableClass[] = [
  {
    id: 'tt-01',
    subject: 'Code of Criminal Procedure (BNSS Transition)',
    code: 'CRPC-202',
    faculty: 'Adv. R.K. Singla',
    time: '09:30 AM – 11:00 AM',
    day: 'Today',
    room: 'Lecture Hall 3A (Judiciary Wing)',
    type: 'Lecture',
    isLiveNow: true,
    joinLink: 'https://meet.google.com/msi-crpc-live',
  },
  {
    id: 'tt-02',
    subject: 'Constitutional Writs & Fundamental Rights Analysis',
    code: 'CONST-301',
    faculty: 'Prof. Ananya Roy',
    time: '11:30 AM – 01:00 PM',
    day: 'Today',
    room: 'Smart Moot Court Hall A',
    type: 'Moot Court',
    isLiveNow: false,
    joinLink: 'https://meet.google.com/msi-const-live',
  },
  {
    id: 'tt-03',
    subject: 'Indian Evidence Act: Expert Testimony & Admissions',
    code: 'EVID-104',
    faculty: 'Dr. Hardeep Gill',
    time: '02:00 PM – 03:30 PM',
    day: 'Today',
    room: 'Seminar Room 2',
    type: 'Tutorial',
    isLiveNow: false,
  },
  {
    id: 'tt-04',
    subject: 'PCS J Prelims Mock Speed Drill (Paper 1)',
    code: 'MOCK-TEST-12',
    faculty: 'Exam Evaluation Cell',
    time: '10:00 AM – 12:00 PM',
    day: 'Tomorrow',
    room: 'Online Portal / Exam Hall B',
    type: 'Test Series',
  },
];

// --------------------------------------------------------------------------
// Notifications
// --------------------------------------------------------------------------

export const STUDENT_NOTIFICATIONS: StudentNotification[] = [
  {
    id: 'notif-1',
    title: 'Punjab PCS (Judicial Branch) 2025 Notification Released',
    message: 'Official High Court syllabus revision has been integrated into Module 4. Check new lectures.',
    date: '2 hours ago',
    type: 'exam',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Mid-Semester Timed Mock Test #12 is Live',
    message: 'Mock test on Indian Penal Code & BNSS comparison is now open. Test duration: 5 minutes.',
    date: 'Yesterday',
    type: 'academic',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Installment 2 Payment Receipt Generated',
    message: 'Official institutional receipt #MSI/2025/RC-8841 of ₹45,000 is available for download in Fees tab.',
    date: '3 days ago',
    type: 'fee',
    read: true,
  },
  {
    id: 'notif-4',
    title: 'Holiday Notice: Martyrdom Day Observed',
    message: 'Campus physical classes remain suspended on Monday. Live online webinars will proceed as scheduled.',
    date: '5 days ago',
    type: 'urgent',
    read: true,
  },
];

// --------------------------------------------------------------------------
// Learning: Recorded Videos
// --------------------------------------------------------------------------

export const RECORDED_VIDEOS: RecordedVideo[] = [
  {
    id: 'vid-01',
    title: 'CrPC Section 154 to 173: FIR, Police Investigation & Case Dairy Procedure',
    subject: 'Code of Criminal Procedure',
    faculty: 'Adv. R.K. Singla',
    duration: '1h 18m',
    uploadDate: '14 Sep 2025',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: '/images/hero-1.webp',
    topics: ['Concept of Cognizable Offense', 'Zero FIR Jurisprudence', 'Evidentiary Value of Case Diary'],
  },
  {
    id: 'vid-02',
    title: 'Constitutional Basic Structure Doctrine: Kesavananda to Present Era',
    subject: 'Constitutional Law',
    faculty: 'Prof. Ananya Roy',
    duration: '1h 42m',
    uploadDate: '12 Sep 2025',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: '/images/hero-2.webp',
    topics: ['Article 368 Constraints', 'Minerva Mills Doctrine', 'Judicial Review Sovereignty'],
  },
  {
    id: 'vid-03',
    title: 'Indian Evidence Act: Dying Declarations & Section 32 Exceptions',
    subject: 'Law of Evidence',
    faculty: 'Dr. Hardeep Gill',
    duration: '54m',
    uploadDate: '09 Sep 2025',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: '/images/hero-3.webp',
    topics: ['Nemo Moriturus Praesumitur Mentire', 'Corroboration Rules', 'Multiple Dying Declarations'],
  },
  {
    id: 'vid-04',
    title: 'Civil Procedure Code: Res Judicata (Sec 11) vs Res Sub-Judice (Sec 10)',
    subject: 'Civil Procedure Code',
    faculty: 'Justice K.L. Verma',
    duration: '1h 05m',
    uploadDate: '05 Sep 2025',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: '/images/gallery/campus-1.webp',
    topics: ['Constructive Res Judicata', 'Explanation IV & VIII', 'Applicability in Writ Petitions'],
  },
  {
    id: 'vid-05',
    title: 'High Court Advanced Judgment Writing — Civil & Criminal Appeals',
    subject: 'Apex Judicial Practice',
    faculty: 'Guest Bench Faculty',
    duration: '2h 10m',
    uploadDate: '01 Sep 2025',
    videoUrl: '',
    thumbnail: '/images/gallery/campus-2.webp',
    isLocked: true, // Course Entitlement Rule
    topics: ['Appellate Marshaling', 'Framing of Legal Issues', 'Sentencing Rationale Formulation'],
  },
];

// --------------------------------------------------------------------------
// Learning: Notes & PDFs
// --------------------------------------------------------------------------

export const NOTES_PDFS: NotePDF[] = [
  {
    id: 'pdf-01',
    title: 'Comprehensive Study Digest: CrPC vs Bharatiya Nagarik Suraksha Sanhita',
    subject: 'Code of Criminal Procedure',
    faculty: 'Adv. R.K. Singla',
    fileSize: '4.8 MB',
    uploadDate: '15 Sep 2025',
    downloadUrl: '#',
    category: 'Class Notes',
    pages: 48,
  },
  {
    id: 'pdf-02',
    title: 'The Constitution of India: Ready Reckoner with 106 Constitutional Amendments',
    subject: 'Constitutional Law',
    faculty: 'Prof. Ananya Roy',
    fileSize: '6.2 MB',
    uploadDate: '10 Sep 2025',
    downloadUrl: '#',
    category: 'Bare Act',
    pages: 94,
  },
  {
    id: 'pdf-03',
    title: 'Law of Evidence: 100 Landmark Apex Court Judgments (1950 - 2025)',
    subject: 'Law of Evidence',
    faculty: 'Dr. Hardeep Gill',
    fileSize: '3.4 MB',
    uploadDate: '08 Sep 2025',
    downloadUrl: '#',
    category: 'Case Compendium',
    pages: 36,
  },
  {
    id: 'pdf-04',
    title: 'CPC Orders & Rules Master Flowchart for Judicial Services Prelims',
    subject: 'Civil Procedure Code',
    faculty: 'Justice K.L. Verma',
    fileSize: '2.1 MB',
    uploadDate: '03 Sep 2025',
    downloadUrl: '#',
    category: 'Summary',
    pages: 22,
  },
  {
    id: 'pdf-05',
    title: 'Specialized Corporate & Arbitration Case Compendium (Premium Add-on)',
    subject: 'Corporate Jurisprudence',
    faculty: 'Corporate Law Cell',
    fileSize: '8.5 MB',
    uploadDate: '01 Sep 2025',
    downloadUrl: '#',
    category: 'Case Compendium',
    pages: 110,
    isLocked: true, // Course Entitlement Rule
  },
];

// --------------------------------------------------------------------------
// Learning: PYQs (Previous Year Questions)
// --------------------------------------------------------------------------

export const PYQS_LIST: PYQItem[] = [
  {
    id: 'pyq-01',
    examName: 'Punjab Civil Services (Judicial Branch) Prelims',
    year: 2024,
    subject: 'Comprehensive Law & Current Legal Knowledge',
    hasSolutions: true,
    totalQuestions: 125,
    paperType: 'Prelims',
    downloadUrl: '#',
  },
  {
    id: 'pyq-02',
    examName: 'Punjab Civil Services (Judicial Branch) Civil Law 1',
    year: 2023,
    subject: 'CPC, Contract Act, Partnership & Sale of Goods',
    hasSolutions: true,
    totalQuestions: 20,
    paperType: 'Mains',
    downloadUrl: '#',
  },
  {
    id: 'pyq-03',
    examName: 'Haryana Judicial Services (HCS Cadre) Prelims',
    year: 2024,
    subject: 'Criminal & Civil Law Combined Paper',
    hasSolutions: true,
    totalQuestions: 125,
    paperType: 'Prelims',
    downloadUrl: '#',
  },
  {
    id: 'pyq-04',
    examName: 'Delhi Judicial Service (DJS) Examination',
    year: 2023,
    subject: 'Constitutional & Procedural Law',
    hasSolutions: true,
    totalQuestions: 200,
    paperType: 'Prelims',
    downloadUrl: '#',
  },
  {
    id: 'pyq-05',
    examName: 'Supreme Court Special Bench Research Fellowship',
    year: 2024,
    subject: 'Constitutional Interpretation & Comparative Law',
    hasSolutions: true,
    totalQuestions: 100,
    paperType: 'Mains',
    downloadUrl: '#',
    isLocked: true, // Entitlement rule
  },
];

// --------------------------------------------------------------------------
// Learning: Assignments
// --------------------------------------------------------------------------

export const ASSIGNMENTS_LIST: AssignmentItem[] = [
  {
    id: 'asg-01',
    title: 'Judgment Analysis on Anticipatory Bail in Economic Offences',
    subject: 'Code of Criminal Procedure',
    assignedDate: '08 Sep 2025',
    dueDate: '22 Sep 2025',
    status: 'Pending',
    maxMarks: 20,
  },
  {
    id: 'asg-02',
    title: 'Drafting of Special Leave Petition (SLP) under Article 136',
    subject: 'Constitutional Law',
    assignedDate: '01 Sep 2025',
    dueDate: '15 Sep 2025',
    status: 'Submitted',
    maxMarks: 25,
    submittedFile: 'Aarav_Sharma_SLP_Article136_Draft.pdf',
    facultyRemarks: 'Under faculty review by Prof. Ananya Roy.',
  },
  {
    id: 'asg-03',
    title: 'Analysis of Res Judicata among Co-Defendants with Apex Citations',
    subject: 'Civil Procedure Code',
    assignedDate: '18 Aug 2025',
    dueDate: '28 Aug 2025',
    status: 'Graded',
    maxMarks: 20,
    scoredMarks: 18.5,
    facultyRemarks: 'Exceptional structural analysis. Clear differentiation of Mahboob Sahab v. Syed Ismail verdict.',
    submittedFile: 'Aarav_Sharma_ResJudicata_Assignment.pdf',
  },
];

// --------------------------------------------------------------------------
// Attendance: Subject Breakdown & Logs
// --------------------------------------------------------------------------

export const ATTENDANCE_SUBJECTS: AttendanceSubject[] = [
  {
    subject: 'Code of Criminal Procedure & BNSS',
    code: 'CRPC-202',
    total: 44,
    attended: 39,
    percentage: 88.6,
    faculty: 'Adv. R.K. Singla',
  },
  {
    subject: 'Constitutional Law of India',
    code: 'CONST-301',
    total: 38,
    attended: 32,
    percentage: 84.2,
    faculty: 'Prof. Ananya Roy',
  },
  {
    subject: 'Law of Evidence & Admissibility',
    code: 'EVID-104',
    total: 32,
    attended: 27,
    percentage: 84.3,
    faculty: 'Dr. Hardeep Gill',
  },
  {
    subject: 'Civil Procedure Code & Specific Relief',
    code: 'CPC-102',
    total: 40,
    attended: 31,
    percentage: 77.5,
    faculty: 'Justice K.L. Verma',
  },
  {
    subject: 'Moot Court Advocacy & Judgment Writing',
    code: 'MOOT-501',
    total: 16,
    attended: 15,
    percentage: 93.7,
    faculty: 'Visiting Judicial Bench',
  },
];

export const ATTENDANCE_LOGS: AttendanceLogEntry[] = [
  {
    id: 'att-1',
    date: '18 Sep 2025',
    day: 'Thursday',
    subject: 'Code of Criminal Procedure (BNSS)',
    time: '09:30 AM',
    status: 'Present',
    markedBy: 'Biometric RFID Portal',
  },
  {
    id: 'att-2',
    date: '17 Sep 2025',
    day: 'Wednesday',
    subject: 'Constitutional Law of India',
    time: '11:30 AM',
    status: 'Present',
    markedBy: 'Faculty Sign-In',
  },
  {
    id: 'att-3',
    date: '16 Sep 2025',
    day: 'Tuesday',
    subject: 'Civil Procedure Code',
    time: '02:00 PM',
    status: 'Absent',
    markedBy: 'Biometric RFID Portal',
  },
  {
    id: 'att-4',
    date: '15 Sep 2025',
    day: 'Monday',
    subject: 'Law of Evidence',
    time: '10:00 AM',
    status: 'Present',
    markedBy: 'Faculty Sign-In',
  },
  {
    id: 'att-5',
    date: '12 Sep 2025',
    day: 'Friday',
    subject: 'Moot Court Practical Workshop',
    time: '02:30 PM',
    status: 'Present',
    markedBy: 'Adv. R.K. Singla',
  },
  {
    id: 'att-6',
    date: '11 Sep 2025',
    day: 'Thursday',
    subject: 'Constitutional Law of India',
    time: '11:30 AM',
    status: 'Excused',
    markedBy: 'Dean Academic Leave Cell',
  },
];

// --------------------------------------------------------------------------
// Tests & Assessments Data
// --------------------------------------------------------------------------

export const TESTS_LIST: TestItem[] = [
  {
    id: 'test-01',
    title: 'PCS J Prelims High-Yield Timed Mock Test (Set #12)',
    subject: 'Constitutional Law & CrPC Procedural Speed Drill',
    type: 'Timed',
    durationMinutes: 5,
    totalQuestions: 5,
    totalMarks: 20,
    scheduledDate: 'Available Now',
    status: 'Available',
  },
  {
    id: 'test-02',
    title: 'Mid-Semester Formal Examination — Semester V',
    subject: 'Indian Evidence Act & Criminal Jurisprudence',
    type: 'Formal',
    durationMinutes: 120,
    totalQuestions: 50,
    totalMarks: 100,
    scheduledDate: '02 Sep 2025',
    status: 'Completed',
    scoredMarks: 86,
    percentile: 94.2,
    rank: '3rd in Institute Batch',
  },
  {
    id: 'test-03',
    title: 'Subject Drill: Civil Procedure Orders & Injunctions',
    subject: 'Civil Procedure Code',
    type: 'Mock',
    durationMinutes: 30,
    totalQuestions: 25,
    totalMarks: 50,
    scheduledDate: '25 Aug 2025',
    status: 'Completed',
    scoredMarks: 44,
    percentile: 91.0,
    rank: '7th in Institute Batch',
  },
  {
    id: 'test-04',
    title: 'All-India Open Judicial Mock Examination (Prelims Standard)',
    subject: 'Full Syllabus (15 Core Acts)',
    type: 'Timed',
    durationMinutes: 120,
    totalQuestions: 125,
    totalMarks: 125,
    scheduledDate: 'Upcoming: 28 Sep 2025',
    status: 'Upcoming',
  },
  {
    id: 'test-05',
    title: 'High Court Judicial Clerkship & Research Exam Simulation',
    subject: 'Constitutional Drafting & Ratio Decidendi Extraction',
    type: 'Formal',
    durationMinutes: 180,
    totalQuestions: 4,
    totalMarks: 100,
    scheduledDate: '15 Oct 2025',
    status: 'Upcoming',
    isLocked: true, // Entitlement Rule
  },
];

// Sample Interactive Timed Test Questions (for active demo test taking)
export const TIMED_MOCK_QUESTIONS: TestQuestion[] = [
  {
    id: 1,
    question: 'Under which provision of the Constitution of India is the power of Judicial Review fundamentally rooted?',
    options: [
      'Article 13(2)',
      'Article 368',
      'Article 352',
      'Article 248',
    ],
    correctIndex: 0,
    explanation: 'Article 13(2) mandates that the State shall not make any law which takes away or abridges the rights conferred by Part III, forming the bedrock of Judicial Review.',
    subject: 'Constitutional Law',
  },
  {
    id: 2,
    question: 'Under Section 154 of the Code of Criminal Procedure, an FIR can be lodged relating to which category of offences?',
    options: [
      'Only Non-Cognizable offences',
      'Only Cognizable offences',
      'Both Cognizable and Non-Cognizable offences',
      'Only offences punishable with capital punishment',
    ],
    correctIndex: 1,
    explanation: 'Section 154 CrPC exclusively pertains to information in cognizable cases given orally or in writing to an officer in charge of a police station.',
    subject: 'Criminal Procedure',
  },
  {
    id: 3,
    question: 'Which of the following is NOT an exception to the Doctrine of Res Judicata under Section 11 of the CPC?',
    options: [
      'Judgment obtained by fraud or collusion',
      'Court lacking inherent subject-matter jurisdiction',
      'Change in subsequent circumstances and cause of action',
      'The previous suit was decreed ex-parte on merits',
    ],
    correctIndex: 3,
    explanation: 'An ex-parte decree passed on merits by a competent court operates as res judicata unless set aside according to law.',
    subject: 'Civil Procedure Code',
  },
  {
    id: 4,
    question: 'Under the Indian Evidence Act, Section 27 operates as an exception to which of the following sections?',
    options: [
      'Sections 24, 25 and 26',
      'Sections 32 and 33',
      'Sections 45 and 47',
      'Sections 118 and 120',
    ],
    correctIndex: 0,
    explanation: 'Section 27 is a proviso/exception to Sections 24, 25, and 26, allowing evidence of information leading to the discovery of a fact from an accused in police custody.',
    subject: 'Law of Evidence',
  },
  {
    id: 5,
    question: 'Which landmark Supreme Court judgment firmly established the "Basic Structure Doctrine" limiting the amending power of Parliament?',
    options: [
      'Golaknath v. State of Punjab (1967)',
      'Kesavananda Bharati v. State of Kerala (1973)',
      'Minerva Mills v. Union of India (1980)',
      'Indira Nehru Gandhi v. Raj Narain (1975)',
    ],
    correctIndex: 1,
    explanation: 'In Kesavananda Bharati (1973), a 13-judge bench established that Parliament cannot alter the basic structure or framework of the Constitution under Article 368.',
    subject: 'Constitutional Law',
  },
];

// --------------------------------------------------------------------------
// Fees & Accounts Data
// --------------------------------------------------------------------------

export const FEE_BREAKDOWN: FeeBreakdownItem[] = [
  { category: 'Tuition & Academic Faculty Fee (Annual)', amount: 75000, status: 'Paid' },
  { category: 'Judicial Test Series & Diagnostic Portal Access', amount: 15000, status: 'Paid' },
  { category: 'E-Library, SC/HC Law Compendium & Bare Acts', amount: 10000, status: 'Paid' },
  { category: 'Moot Court Advocacy & Judicial Mentorship Lab', amount: 15000, status: 'Pending', dueDate: '15 Oct 2025' },
  { category: 'University Examination Registration & Bar Council Fee', amount: 10000, status: 'Pending', dueDate: '15 Oct 2025' },
];

export const FEE_TRANSACTIONS: FeeTransaction[] = [
  {
    id: 'tx-1',
    receiptNo: 'MSI/2025/RC-8841',
    date: '10 Jul 2025',
    amount: 50000,
    mode: 'UPI',
    status: 'Successful',
    remarks: 'Installment 1: Admission & 1st Semester Tuition Fee',
  },
  {
    id: 'tx-2',
    receiptNo: 'MSI/2025/RC-9214',
    date: '14 Aug 2025',
    amount: 35000,
    mode: 'Net Banking',
    status: 'Successful',
    remarks: 'Installment 2: Test Series & E-Library Subscriptions',
  },
];

export const FEE_SUMMARY = {
  totalFee: 125000,
  paidFee: 85000,
  pendingFee: 40000,
  nextDueDate: '15 Oct 2025',
  academicYear: '2025 – 2026',
  scholarshipApplied: 'Merit Academic Concession (₹10,000 deducted)',
  courseValidity: 'Valid until 31 July 2026',
};
