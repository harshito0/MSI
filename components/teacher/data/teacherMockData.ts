export interface TeacherProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  avatarUrl: string;
  stream: 'Law' | 'JEE';
  cabin: string;
  assignedCourseCodes: string[];
  assignedSubjects: string[];
}

export interface TeacherCourse {
  id: string;
  code: string;
  title: string;
  stream: 'Law' | 'JEE';
  batch: string;
  totalStudents: number;
  progress: number;
  lecturesCompleted: number;
  totalLectures: number;
  nextLectureTime: string;
}

export interface TeacherContentItem {
  id: string;
  title: string;
  category: 'Video' | 'Notes' | 'PYQ' | 'Assignment' | 'Reference';
  courseCode: string;
  stream: 'Law' | 'JEE';
  uploadDate: string;
  isPublished: boolean;
  sizeOrDuration: string;
  downloadCount: number;
}

export interface AssessmentItem {
  id: string;
  title: string;
  courseCode: string;
  stream: 'Law' | 'JEE';
  type: 'Mock' | 'Formal';
  totalQuestions: number;
  marks: number;
  durationMinutes: number;
  negativeMarking: string;
  scheduledDate: string;
  status: 'Published' | 'Draft' | 'Completed';
  submissionsCount: number;
  averageScore?: number;
}

export interface StudentMonitoringRecord {
  id: string;
  name: string;
  rollNo: string;
  stream: 'Law' | 'JEE';
  batch: string;
  attendancePercentage: number;
  avgTestScore: number;
  assignmentsCompleted: number;
  totalAssignments: number;
  riskLevel: 'Safe' | 'Attention' | 'Critical';
}

export interface TeacherClassSchedule {
  id: string;
  subject: string;
  courseCode: string;
  stream: 'Law' | 'JEE';
  batch: string;
  time: string;
  day: string;
  venue: string;
  meetLink?: string;
  type: 'Theory Lecture' | 'Practical / Moot' | 'Tutorial';
  isLiveNow?: boolean;
}

export interface CommunicationPost {
  id: string;
  title: string;
  message: string;
  courseCode: string;
  stream: 'Law' | 'JEE';
  author: string;
  date: string;
  type: 'Announcement' | 'Class Update' | 'Resource Note';
}

export interface OneToOneSession {
  id: string;
  studentName: string;
  studentRoll: string;
  stream: 'Law' | 'JEE';
  topic: string;
  date: string;
  time: string;
  meetLink: string;
  status: 'Scheduled' | 'Completed';
}

// --------------------------------------------------------------------------
// Faculty Profiles (Demonstrating Role-Based Data Isolation)
// --------------------------------------------------------------------------

export const TEACHER_PROFILES: TeacherProfile[] = [
  {
    id: 'fac-law-01',
    name: 'Dr. Vikramaditya Sharma',
    title: 'Senior Professor of Procedural Law & Judicial Studies',
    department: 'School of Law & Judicial Services',
    email: 'dr.vikramaditya@msi-institutes.edu.in',
    phone: '+91 98112 34567',
    avatarUrl: '/images/faculty/faculty-1.webp',
    stream: 'Law',
    cabin: 'Chamber 204, Judicial Block A',
    assignedCourseCodes: ['LAW-PCS-101', 'LAW-CRPC-202'],
    assignedSubjects: [
      'Code of Criminal Procedure & BNSS 2023',
      'Constitutional Law of India & Landmark Verdicts',
    ],
  },
  {
    id: 'fac-jee-02',
    name: 'Er. Rajesh Verma',
    title: 'Associate Professor of Engineering Sciences',
    department: 'Department of Computer Science & Engineering',
    email: 'rajesh.verma@msi-institutes.edu.in',
    phone: '+91 98765 11223',
    avatarUrl: '/images/faculty/faculty-2.webp',
    stream: 'JEE',
    cabin: 'Lab 4, Ramanujan Tech Block',
    assignedCourseCodes: ['ENG-CS-101', 'ENG-MATH-201'],
    assignedSubjects: [
      'Advanced Data Structures & Algorithms',
      'Engineering Mathematics & Physics Mechanics',
    ],
  },
];

// --------------------------------------------------------------------------
// Courses (Filtered by Stream)
// --------------------------------------------------------------------------

export const ALL_TEACHER_COURSES: TeacherCourse[] = [
  // Law Courses
  {
    id: 'crs-t-01',
    code: 'LAW-PCS-101',
    title: 'Punjab Judicial Services (PCS J) Master Foundation',
    stream: 'Law',
    batch: 'Batch Alpha 2025-26',
    totalStudents: 64,
    progress: 74,
    lecturesCompleted: 104,
    totalLectures: 140,
    nextLectureTime: 'Today, 09:30 AM',
  },
  {
    id: 'crs-t-02',
    code: 'LAW-CRPC-202',
    title: 'Code of Criminal Procedure & Bharatiya Nagarik Suraksha Sanhita',
    stream: 'Law',
    batch: 'Judiciary Honors Stream',
    totalStudents: 52,
    progress: 82,
    lecturesCompleted: 49,
    totalLectures: 60,
    nextLectureTime: 'Today, 11:30 AM',
  },
  // JEE / Engineering Courses
  {
    id: 'crs-t-03',
    code: 'ENG-CS-101',
    title: 'Advanced Computer Science & Distributed Systems',
    stream: 'JEE',
    batch: 'B.Tech CS Batch 2025',
    totalStudents: 78,
    progress: 68,
    lecturesCompleted: 42,
    totalLectures: 62,
    nextLectureTime: 'Today, 10:00 AM',
  },
  {
    id: 'crs-t-04',
    code: 'ENG-MATH-201',
    title: 'Applied Engineering Physics & Calculus Mechanics',
    stream: 'JEE',
    batch: 'Engineering Pre-Major',
    totalStudents: 65,
    progress: 58,
    lecturesCompleted: 35,
    totalLectures: 60,
    nextLectureTime: 'Tomorrow, 02:00 PM',
  },
];

// --------------------------------------------------------------------------
// Content Items (Publish / Unpublish toggle)
// --------------------------------------------------------------------------

export const ALL_TEACHER_CONTENT: TeacherContentItem[] = [
  // Law Content
  {
    id: 'cnt-01',
    title: 'CrPC Section 154 to 173: FIR, Police Investigation & Case Dairy Procedure',
    category: 'Video',
    courseCode: 'LAW-CRPC-202',
    stream: 'Law',
    uploadDate: '14 Sep 2025',
    isPublished: true,
    sizeOrDuration: '1h 18m',
    downloadCount: 148,
  },
  {
    id: 'cnt-02',
    title: 'Comparative Analysis Digest: CrPC 1973 vs BNSS 2023 Procedural Shift',
    category: 'Notes',
    courseCode: 'LAW-CRPC-202',
    stream: 'Law',
    uploadDate: '15 Sep 2025',
    isPublished: true,
    sizeOrDuration: '4.8 MB (PDF)',
    downloadCount: 192,
  },
  {
    id: 'cnt-03',
    title: 'Punjab Civil Services Judicial Prelims 2024 Solved Papers with Key',
    category: 'PYQ',
    courseCode: 'LAW-PCS-101',
    stream: 'Law',
    uploadDate: '10 Sep 2025',
    isPublished: true,
    sizeOrDuration: '125 Questions',
    downloadCount: 220,
  },
  {
    id: 'cnt-04',
    title: 'Drafting Assignment: Anticipatory Bail Petition under Section 438',
    category: 'Assignment',
    courseCode: 'LAW-CRPC-202',
    stream: 'Law',
    uploadDate: '08 Sep 2025',
    isPublished: true,
    sizeOrDuration: 'Max 20 Marks',
    downloadCount: 52,
  },
  {
    id: 'cnt-05',
    title: 'Advanced Judicial Clerkship Judgment Marshalling (Draft Syllabus)',
    category: 'Reference',
    courseCode: 'LAW-PCS-101',
    stream: 'Law',
    uploadDate: '18 Sep 2025',
    isPublished: false, // Unpublished Draft
    sizeOrDuration: '8.4 MB (PDF)',
    downloadCount: 0,
  },

  // JEE Content
  {
    id: 'cnt-06',
    title: 'Distributed Hash Tables & Consistent Hashing Principles',
    category: 'Video',
    courseCode: 'ENG-CS-101',
    stream: 'JEE',
    uploadDate: '12 Sep 2025',
    isPublished: true,
    sizeOrDuration: '1h 05m',
    downloadCount: 88,
  },
  {
    id: 'cnt-07',
    title: 'Thermodynamics & Classical Kinematics Problem Sheet #4',
    category: 'Notes',
    courseCode: 'ENG-MATH-201',
    stream: 'JEE',
    uploadDate: '14 Sep 2025',
    isPublished: true,
    sizeOrDuration: '3.2 MB (PDF)',
    downloadCount: 75,
  },
];

// --------------------------------------------------------------------------
// Assessments
// --------------------------------------------------------------------------

export const ALL_ASSESSMENTS: AssessmentItem[] = [
  // Law Assessments
  {
    id: 'asmt-01',
    title: 'PCS J Prelims High-Yield Timed Mock Test (Set #12)',
    courseCode: 'LAW-PCS-101',
    stream: 'Law',
    type: 'Mock',
    totalQuestions: 25,
    marks: 100,
    durationMinutes: 30,
    negativeMarking: '+4 / -1 Mark Penalty',
    scheduledDate: 'Available Live',
    status: 'Published',
    submissionsCount: 48,
    averageScore: 78.4,
  },
  {
    id: 'asmt-02',
    title: 'Mid-Semester Formal Examination — Semester V Law',
    courseCode: 'LAW-CRPC-202',
    stream: 'Law',
    type: 'Formal',
    totalQuestions: 50,
    marks: 100,
    durationMinutes: 120,
    negativeMarking: 'No Negative Marking (Subjective + Objective)',
    scheduledDate: '28 Sep 2025',
    status: 'Published',
    submissionsCount: 52,
    averageScore: 82.1,
  },
  {
    id: 'asmt-03',
    title: 'Law of Evidence Section 27 to 32 Speed Diagnostic',
    courseCode: 'LAW-PCS-101',
    stream: 'Law',
    type: 'Mock',
    totalQuestions: 15,
    marks: 60,
    durationMinutes: 15,
    negativeMarking: '+4 / -1 Mark Penalty',
    scheduledDate: 'Draft (Pending Dean Review)',
    status: 'Draft',
    submissionsCount: 0,
  },

  // JEE Assessments
  {
    id: 'asmt-04',
    title: 'Data Structures & Algorithmic Time Complexity Mid-Term',
    courseCode: 'ENG-CS-101',
    stream: 'JEE',
    type: 'Formal',
    totalQuestions: 30,
    marks: 100,
    durationMinutes: 90,
    negativeMarking: 'Standard Technical Marking',
    scheduledDate: '30 Sep 2025',
    status: 'Published',
    submissionsCount: 74,
    averageScore: 74.6,
  },
];

// --------------------------------------------------------------------------
// Students Enrolled in Teacher Batches (Stream Isolation Demonstration)
// --------------------------------------------------------------------------

export const ALL_STUDENT_MONITORING: StudentMonitoringRecord[] = [
  // Law Students (Visible to Dr. Vikramaditya Sharma)
  {
    id: 'stu-law-01',
    name: 'Aarav Sharma',
    rollNo: '25-JUD-042',
    stream: 'Law',
    batch: 'PCS-J Comprehensive Batch 2025-26',
    attendancePercentage: 88.6,
    avgTestScore: 86.0,
    assignmentsCompleted: 3,
    totalAssignments: 3,
    riskLevel: 'Safe',
  },
  {
    id: 'stu-law-02',
    name: 'Meera Sen',
    rollNo: '25-CLAT-018',
    stream: 'Law',
    batch: 'CLAT Supreme Batch',
    attendancePercentage: 92.4,
    avgTestScore: 91.5,
    assignmentsCompleted: 3,
    totalAssignments: 3,
    riskLevel: 'Safe',
  },
  {
    id: 'stu-law-03',
    name: 'Kabir Gill',
    rollNo: '25-JUD-089',
    stream: 'Law',
    batch: 'PCS-J Comprehensive Batch 2025-26',
    attendancePercentage: 71.2,
    avgTestScore: 68.0,
    assignmentsCompleted: 1,
    totalAssignments: 3,
    riskLevel: 'Attention', // Near 75% threshold
  },
  {
    id: 'stu-law-04',
    name: 'Simran Kaur',
    rollNo: '25-JUD-012',
    stream: 'Law',
    batch: 'PCS-J Comprehensive Batch 2025-26',
    attendancePercentage: 64.0,
    avgTestScore: 58.5,
    assignmentsCompleted: 1,
    totalAssignments: 3,
    riskLevel: 'Critical', // Below 75% mandate
  },
  {
    id: 'stu-law-05',
    name: 'Devansh Verma',
    rollNo: '25-JUD-105',
    stream: 'Law',
    batch: 'Judiciary Honors Stream',
    attendancePercentage: 84.0,
    avgTestScore: 88.0,
    assignmentsCompleted: 3,
    totalAssignments: 3,
    riskLevel: 'Safe',
  },

  // JEE / Engineering Students (Visible to Er. Rajesh Verma)
  {
    id: 'stu-jee-01',
    name: 'Rohan Mehta',
    rollNo: '25-ENG-007',
    stream: 'JEE',
    batch: 'B.Tech CS Batch 2025',
    attendancePercentage: 91.0,
    avgTestScore: 89.5,
    assignmentsCompleted: 4,
    totalAssignments: 4,
    riskLevel: 'Safe',
  },
  {
    id: 'stu-jee-02',
    name: 'Ananya Gupta',
    rollNo: '25-ENG-034',
    stream: 'JEE',
    batch: 'B.Tech CS Batch 2025',
    attendancePercentage: 85.5,
    avgTestScore: 84.0,
    assignmentsCompleted: 4,
    totalAssignments: 4,
    riskLevel: 'Safe',
  },
  {
    id: 'stu-jee-03',
    name: 'Aditya Roy',
    rollNo: '25-ENG-082',
    stream: 'JEE',
    batch: 'Engineering Pre-Major',
    attendancePercentage: 68.0,
    avgTestScore: 62.0,
    assignmentsCompleted: 2,
    totalAssignments: 4,
    riskLevel: 'Critical',
  },
];

// --------------------------------------------------------------------------
// Class Schedules
// --------------------------------------------------------------------------

export const ALL_TEACHER_SCHEDULES: TeacherClassSchedule[] = [
  // Law Schedule
  {
    id: 'sch-01',
    subject: 'Code of Criminal Procedure (BNSS Transition)',
    courseCode: 'LAW-CRPC-202',
    stream: 'Law',
    batch: 'PCS-J Judiciary Honors',
    time: '09:30 AM – 11:00 AM',
    day: 'Today',
    venue: 'Lecture Hall 3A (Judiciary Wing)',
    meetLink: 'https://meet.google.com/msi-crpc-live',
    type: 'Theory Lecture',
    isLiveNow: true,
  },
  {
    id: 'sch-02',
    subject: 'Constitutional Law: Basic Structure & Article 368 Limits',
    courseCode: 'LAW-PCS-101',
    stream: 'Law',
    batch: 'Batch Alpha 2025-26',
    time: '11:30 AM – 01:00 PM',
    day: 'Today',
    venue: 'Smart Moot Court Hall A',
    meetLink: 'https://meet.google.com/msi-const-live',
    type: 'Practical / Moot',
    isLiveNow: false,
  },
  {
    id: 'sch-03',
    subject: 'Judgment Drafting Practice Session & Marshaling of Evidence',
    courseCode: 'LAW-PCS-101',
    stream: 'Law',
    batch: 'Batch Alpha 2025-26',
    time: '02:00 PM – 03:30 PM',
    day: 'Tomorrow',
    venue: 'Seminar Room 2',
    type: 'Tutorial',
    isLiveNow: false,
  },

  // JEE Schedule
  {
    id: 'sch-04',
    subject: 'Data Structures: Red-Black Trees & Balancing Rotations',
    courseCode: 'ENG-CS-101',
    stream: 'JEE',
    batch: 'B.Tech CS Batch 2025',
    time: '10:00 AM – 11:30 AM',
    day: 'Today',
    venue: 'Computing Lab 4',
    meetLink: 'https://meet.google.com/msi-eng-live',
    type: 'Theory Lecture',
    isLiveNow: true,
  },
];

// --------------------------------------------------------------------------
// Communication Announcements & 1-on-1 Sessions
// --------------------------------------------------------------------------

export const ALL_COMMUNICATIONS: CommunicationPost[] = [
  {
    id: 'comm-01',
    title: 'High Court Syllabus Revision Integrated into Module 4',
    message: 'Students are advised to review the newly posted BNSS 2023 comparative notes before tomorrow morning moot session.',
    courseCode: 'LAW-CRPC-202',
    stream: 'Law',
    author: 'Dr. Vikramaditya Sharma',
    date: 'Today at 08:30 AM',
    type: 'Announcement',
  },
  {
    id: 'comm-02',
    title: 'Reminder: Anticipatory Bail Drafting Submission Closes Monday',
    message: 'Upload your drafts in the Assignment portal. Late submissions will attract a 2-mark deduction per day.',
    courseCode: 'LAW-CRPC-202',
    stream: 'Law',
    author: 'Dr. Vikramaditya Sharma',
    date: 'Yesterday at 04:15 PM',
    type: 'Class Update',
  },
  {
    id: 'comm-03',
    title: 'Lab 4 Compiler Setup for Concurrent Threads',
    message: 'Make sure your terminals have gcc-13 and pthread development headers configured before Thursday lab.',
    courseCode: 'ENG-CS-101',
    stream: 'JEE',
    author: 'Er. Rajesh Verma',
    date: '16 Sep 2025',
    type: 'Resource Note',
  },
];

export const ALL_ONE_TO_ONE_SESSIONS: OneToOneSession[] = [
  {
    id: 'oto-01',
    studentName: 'Kabir Gill',
    studentRoll: '25-JUD-089',
    stream: 'Law',
    topic: 'Attendance recovery & Res Judicata clarification',
    date: 'Today',
    time: '04:00 PM – 04:30 PM',
    meetLink: 'https://meet.google.com/msi-doubt-kabir',
    status: 'Scheduled',
  },
  {
    id: 'oto-02',
    studentName: 'Simran Kaur',
    studentRoll: '25-JUD-012',
    stream: 'Law',
    topic: 'Academic remedial mentorship & exam eligibility counsel',
    date: 'Tomorrow',
    time: '03:30 PM – 04:00 PM',
    meetLink: 'https://meet.google.com/msi-doubt-simran',
    status: 'Scheduled',
  },
];
