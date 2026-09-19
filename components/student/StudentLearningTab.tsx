'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  UploadCloud,
  ExternalLink,
  Lock,
  Download,
  Play,
  CheckCircle2,
  Clock,
  Filter,
  Layers,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import {
  RecordedVideo,
  NotePDF,
  PYQItem,
  AssignmentItem,
} from './data/studentMockData';

interface StudentLearningTabProps {
  videos: RecordedVideo[];
  notes: NotePDF[];
  pyqs: PYQItem[];
  assignments: AssignmentItem[];
  onPlayVideo: (video: RecordedVideo) => void;
  onSubmitAssignment: (assignment: AssignmentItem) => void;
}

export default function StudentLearningTab({
  videos,
  notes,
  pyqs,
  assignments,
  onPlayVideo,
  onSubmitAssignment,
}: StudentLearningTabProps) {
  const [subSection, setSubSection] = useState<
    'all' | 'videos' | 'notes' | 'pyqs' | 'assignments' | 'reference'
  >('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedPyqYear, setSelectedPyqYear] = useState<number | 'all'>('all');

  const subjects = [
    'All Subjects',
    'Code of Criminal Procedure',
    'Constitutional Law',
    'Law of Evidence',
    'Civil Procedure Code',
  ];

  // Filtered lists
  const filteredVideos = videos.filter((v) => {
    if (selectedSubject !== 'all' && v.subject !== selectedSubject) return false;
    return true;
  });

  const filteredNotes = notes.filter((n) => {
    if (selectedSubject !== 'all' && n.subject !== selectedSubject) return false;
    return true;
  });

  const filteredPyqs = pyqs.filter((p) => {
    if (selectedPyqYear !== 'all' && p.year !== selectedPyqYear) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with Subject & Section Filters */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DCCB] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#E8DCCB]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#89190E]" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#10233F]">
                Academic Learning & Research Hub
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#526174] mt-1">
              Curated judicial lectures, annotated Bare Act digests, PYQs, and research assignments.
            </p>
          </div>

          {/* Subject Filter Dropdown */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-[#89190E]" />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="p-2 rounded-xl border border-[#E8DCCB] bg-[#FFF9EF] text-xs font-semibold text-[#10233F] focus:outline-none focus:border-[#89190E]"
            >
              <option value="all">All Disciplines & Subjects</option>
              <option value="Code of Criminal Procedure">Code of Criminal Procedure (CrPC)</option>
              <option value="Constitutional Law">Constitutional Law</option>
              <option value="Law of Evidence">Law of Evidence</option>
              <option value="Civil Procedure Code">Civil Procedure Code (CPC)</option>
            </select>
          </div>
        </div>

        {/* Sub-section Pill Switcher */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {[
            { id: 'all', label: 'All Resources', count: videos.length + notes.length + pyqs.length },
            { id: 'videos', label: 'Recorded Lectures', count: videos.length },
            { id: 'notes', label: 'Notes & PDFs', count: notes.length },
            { id: 'pyqs', label: 'Previous Year Papers (PYQs)', count: pyqs.length },
            { id: 'assignments', label: 'Assignments', count: assignments.length },
            { id: 'reference', label: 'Reference & Bare Acts', count: 4 },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSubSection(item.id as typeof subSection)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                subSection === item.id
                  ? 'bg-[#89190E] text-white shadow-xs'
                  : 'bg-[#FFF9EF] text-[#526174] hover:text-[#10233F] hover:bg-[#E8DCCB]/60'
              }`}
            >
              <span>{item.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  subSection === item.id ? 'bg-white/20 text-white' : 'bg-[#E8DCCB] text-[#526174]'
                }`}
              >
                {item.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Course Entitlement Rule Reminder Banner */}
      <div className="p-4 rounded-2xl bg-[#FFF3DD] border border-[#EFC988] flex items-center justify-between text-xs text-[#89190E]">
        <div className="flex items-center space-x-2.5">
          <ShieldAlert className="w-4 h-4 text-[#89190E] flex-shrink-0" />
          <span>
            <strong>Course Entitlement Active:</strong> Access restricted to active verified batch enrollment (#MSI-2025-LAW-042). Unentitled elective modules remain server-side locked.
          </span>
        </div>
      </div>

      {/* 1. Recorded Videos Section */}
      {(subSection === 'all' || subSection === 'videos') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="w-5 h-5 text-[#89190E]" />
              <h3 className="font-serif text-lg font-bold text-[#10233F]">
                Recorded Video Lectures & High Court Case Discussions
              </h3>
            </div>
            <span className="text-xs text-[#526174]">
              {filteredVideos.length} Available Lectures
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className={`rounded-3xl border overflow-hidden transition-all bg-white flex flex-col justify-between shadow-xs ${
                  video.isLocked
                    ? 'border-neutral-200 opacity-75'
                    : 'border-[#E8DCCB] hover:border-[#89190E] hover:shadow-md'
                }`}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video w-full bg-neutral-900 group">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  {video.isLocked ? (
                    <div className="absolute inset-0 bg-neutral-950/70 flex flex-col items-center justify-center text-white p-4 text-center">
                      <Lock className="w-8 h-8 text-amber-400 mb-2" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Unentitled Module
                      </span>
                      <span className="text-[10px] text-white/70 mt-1">
                        Requires Advanced Elective Tier
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onPlayVideo(video)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors"
                      aria-label="Play video"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#89190E] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                        <Play className="w-5 h-5 text-[#EFC988] ml-0.5 fill-current" />
                      </div>
                    </button>
                  )}
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-white font-mono text-[10px]">
                    {video.duration}
                  </span>
                </div>

                {/* Video Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#89190E]">
                      {video.subject}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#10233F] mt-1 leading-snug line-clamp-2">
                      {video.title}
                    </h4>
                    <p className="text-xs text-[#526174] mt-1">Faculty: {video.faculty}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E8DCCB] flex items-center justify-between">
                    <span className="text-[10px] text-[#526174]">{video.uploadDate}</span>
                    {video.isLocked ? (
                      <button
                        onClick={() => alert('Entitlement notice: This course module is locked by server-side policy. Contact MSI academic office to upgrade enrollment.')}
                        className="text-xs font-bold text-neutral-500 hover:text-neutral-800"
                      >
                        Request Access
                      </button>
                    ) : (
                      <button
                        onClick={() => onPlayVideo(video)}
                        className="text-xs font-bold text-[#89190E] hover:underline flex items-center space-x-1"
                      >
                        <span>Watch Lecture</span>
                        <Play className="w-3 h-3 ml-1 fill-current" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Notes & PDFs Section */}
      {(subSection === 'all' || subSection === 'notes') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-[#89190E]" />
              <h3 className="font-serif text-lg font-bold text-[#10233F]">
                Annotated Class Notes, Bare Acts & Case Compendiums
              </h3>
            </div>
            <span className="text-xs text-[#526174]">
              {filteredNotes.length} Documents
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`p-4 sm:p-5 rounded-2xl border bg-white flex items-start justify-between gap-4 transition-all shadow-xs ${
                  note.isLocked
                    ? 'border-neutral-200 opacity-75'
                    : 'border-[#E8DCCB] hover:border-[#89190E]'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div
                    className={`p-3 rounded-xl flex-shrink-0 ${
                      note.isLocked
                        ? 'bg-neutral-100 text-neutral-400'
                        : 'bg-[#FFF3DD] text-[#89190E]'
                    }`}
                  >
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#FFF9EF] text-[#89190E] border border-[#E8DCCB]">
                        {note.category}
                      </span>
                      <span className="text-[11px] text-[#526174]">{note.pages} Pages</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#10233F] mt-1.5">
                      {note.title}
                    </h4>
                    <p className="text-xs text-[#526174] mt-0.5">
                      {note.subject} • Faculty: {note.faculty}
                    </p>
                    <p className="text-[11px] text-[#526174] mt-1">
                      File Size: {note.fileSize} • Uploaded {note.uploadDate}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {note.isLocked ? (
                    <span className="inline-flex items-center space-x-1 text-xs text-neutral-400 px-2.5 py-1.5 border border-dashed border-neutral-300 rounded-xl">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => alert(`Downloading ${note.title} (${note.fileSize})... Verified under Enrollment #MSI-2025-LAW-042.`)}
                      className="px-3.5 py-2 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Previous Year Questions (PYQs) Section */}
      {(subSection === 'all' || subSection === 'pyqs') && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#89190E]" />
              <h3 className="font-serif text-lg font-bold text-[#10233F]">
                Previous Year Question Papers (PYQs) with Solutions
              </h3>
            </div>

            {/* Year Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-[#526174]">Filter by Year:</span>
              <div className="flex items-center space-x-1">
                {(['all', 2024, 2023] as const).map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedPyqYear(yr)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedPyqYear === yr
                        ? 'bg-[#10233F] text-white'
                        : 'bg-white border border-[#E8DCCB] text-[#526174]'
                    }`}
                  >
                    {yr === 'all' ? 'All Years' : yr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPyqs.map((pyq) => (
              <div
                key={pyq.id}
                className={`p-5 rounded-2xl border bg-white flex flex-col justify-between shadow-xs ${
                  pyq.isLocked
                    ? 'border-neutral-200 opacity-75'
                    : 'border-[#E8DCCB] hover:border-[#10233F]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#10233F] text-white">
                      {pyq.year} {pyq.paperType}
                    </span>
                    {pyq.hasSolutions && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        ✓ With Answers
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#10233F] mt-2 leading-snug">
                    {pyq.examName}
                  </h4>
                  <p className="text-xs text-[#526174] mt-1">{pyq.subject}</p>
                  <p className="text-[11px] text-[#526174] mt-1">
                    Total Questions: {pyq.totalQuestions} Questions
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8DCCB] flex items-center justify-between">
                  {pyq.isLocked ? (
                    <span className="text-xs text-neutral-400 font-semibold flex items-center space-x-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Special Fellowship Tier</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => alert(`Opening ${pyq.examName} ${pyq.year} with answer explanations...`)}
                      className="text-xs font-bold text-[#89190E] hover:underline flex items-center space-x-1"
                    >
                      <span>View Solved Paper</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Assignments Section */}
      {(subSection === 'all' || subSection === 'assignments') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UploadCloud className="w-5 h-5 text-[#89190E]" />
              <h3 className="font-serif text-lg font-bold text-[#10233F]">
                Academic Assignments & Judgment Drafting Submissions
              </h3>
            </div>
            <span className="text-xs text-[#526174]">
              {assignments.length} Assigned
            </span>
          </div>

          <div className="space-y-3.5">
            {assignments.map((asg) => (
              <div
                key={asg.id}
                className="p-5 rounded-2xl bg-white border border-[#E8DCCB] hover:border-[#89190E] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        asg.status === 'Graded'
                          ? 'bg-emerald-100 text-emerald-800'
                          : asg.status === 'Submitted'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      Status: {asg.status}
                    </span>
                    <span className="text-xs text-[#526174] font-medium">{asg.subject}</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#10233F]">
                    {asg.title}
                  </h4>
                  <p className="text-xs text-[#526174]">
                    Assigned: {asg.assignedDate} • Due Date:{' '}
                    <strong className="text-[#89190E]">{asg.dueDate}</strong> • Max Marks: {asg.maxMarks}
                  </p>
                  {asg.facultyRemarks && (
                    <div className="p-2.5 rounded-xl bg-[#FFF9EF] border border-[#E8DCCB] text-xs text-[#10233F] mt-2">
                      <strong>Faculty Evaluation Remarks:</strong> {asg.facultyRemarks}
                      {asg.scoredMarks !== undefined && (
                        <span className="ml-2 font-bold text-emerald-700">
                          (Awarded: {asg.scoredMarks}/{asg.maxMarks} Marks)
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0">
                  {asg.status === 'Pending' ? (
                    <button
                      onClick={() => onSubmitAssignment(asg)}
                      className="px-4 py-2 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      Submit Research Draft
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      Draft Uploaded ✓
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Reference Material Section */}
      {(subSection === 'all' || subSection === 'reference') && (
        <div className="p-6 rounded-3xl bg-[#FFF9EF] border border-[#E8DCCB]">
          <div className="flex items-center space-x-2 pb-3 border-b border-[#E8DCCB]">
            <BookOpen className="w-5 h-5 text-[#89190E]" />
            <h3 className="font-serif text-base font-bold text-[#10233F]">
              Reference Material & Legal Citation Repositories
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="p-4 rounded-2xl bg-white border border-[#E8DCCB]">
              <span className="text-[10px] font-mono uppercase font-bold text-[#89190E]">E-Library</span>
              <h5 className="font-serif font-bold text-xs sm:text-sm text-[#10233F] mt-1">
                Supreme Court Weekly (SCW) Judgments 2024
              </h5>
              <p className="text-[11px] text-[#526174] mt-1">Full ratio decidendi search portal access</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E8DCCB]">
              <span className="text-[10px] font-mono uppercase font-bold text-[#89190E]">Standard Treatise</span>
              <h5 className="font-serif font-bold text-xs sm:text-sm text-[#10233F] mt-1">
                Ratanlal & Dhirajlal on Law of Crimes
              </h5>
              <p className="text-[11px] text-[#526174] mt-1">Digital commentary with latest amendments</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E8DCCB]">
              <span className="text-[10px] font-mono uppercase font-bold text-[#89190E]">Bare Act Reader</span>
              <h5 className="font-serif font-bold text-xs sm:text-sm text-[#10233F] mt-1">
                Official Ministry of Law Legislative Acts
              </h5>
              <p className="text-[11px] text-[#526174] mt-1">Authentic bilingual Hindi & English drafts</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E8DCCB]">
              <span className="text-[10px] font-mono uppercase font-bold text-[#89190E]">Moot Research</span>
              <h5 className="font-serif font-bold text-xs sm:text-sm text-[#10233F] mt-1">
                International Law Moot Memorial Archive
              </h5>
              <p className="text-[11px] text-[#526174] mt-1">Winning memorials from NLSIU & Philip Jessup</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
