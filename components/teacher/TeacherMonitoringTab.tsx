'use client';

import React, { useState } from 'react';
import {
  Activity,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Search,
  Filter,
  BarChart3,
  CalendarCheck,
  Award,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { StudentMonitoringRecord, TeacherCourse } from './data/teacherMockData';

interface TeacherMonitoringTabProps {
  students: StudentMonitoringRecord[];
  courses: TeacherCourse[];
  stream: 'Law' | 'JEE';
}

export default function TeacherMonitoringTab({
  students,
  courses,
  stream,
}: TeacherMonitoringTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'All' | 'Safe' | 'Attention' | 'Critical'>('All');
  const [selectedStudent, setSelectedStudent] = useState<StudentMonitoringRecord | null>(null);

  const filteredStudents = students.filter((s) => {
    if (riskFilter !== 'All' && s.riskLevel !== riskFilter) return false;
    if (searchQuery.trim() && !s.name.toLowerCase().includes(searchQuery.toLowerCase()) && !s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const safeCount = students.filter((s) => s.riskLevel === 'Safe').length;
  const attentionCount = students.filter((s) => s.riskLevel === 'Attention').length;
  const criticalCount = students.filter((s) => s.riskLevel === 'Critical').length;

  return (
    <div className="space-y-6">
      {/* 1. Header & Summary Grid */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-[#10233F] via-[#162d50] to-[#89190E] text-white shadow-xl hud-bracket relative overflow-hidden">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-[#EFC988]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#EFC988] uppercase font-bold">
                Student Progress, Attendance & Risk Diagnostic Cell
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1.5">
              Academic Cohort Monitoring • {stream} Stream
            </h2>
            <p className="text-white/80 text-xs sm:text-sm mt-2 leading-relaxed">
              Real-time monitoring of lecture attendance, internal test marks, and regulatory Bar Council compliance across enrolled students.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-center min-w-[100px]">
              <span className="text-[10px] font-mono uppercase text-emerald-200 block">Safe ({'>'}75%)</span>
              <span className="font-serif text-2xl font-bold text-white mt-0.5 block">{safeCount}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-center min-w-[100px]">
              <span className="text-[10px] font-mono uppercase text-amber-200 block">Borderline</span>
              <span className="font-serif text-2xl font-bold text-white mt-0.5 block">{attentionCount}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-400/30 text-center min-w-[100px]">
              <span className="text-[10px] font-mono uppercase text-rose-200 block">Critical</span>
              <span className="font-serif text-2xl font-bold text-white mt-0.5 block">{criticalCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="p-5 rounded-3xl bg-white border border-[#E8DCCB] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#526174] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student name or roll no..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E8DCCB] bg-[#FFF9EF]/40 text-xs text-[#10233F] focus:outline-none focus:border-[#89190E]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#526174]">Filter Attendance Risk:</span>
          {(['All', 'Safe', 'Attention', 'Critical'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRiskFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                riskFilter === r
                  ? 'bg-[#10233F] text-white shadow-xs'
                  : 'bg-[#FFF9EF] text-[#526174] hover:text-[#10233F]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Student Roster Table */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DCCB] shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DCCB]">
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#10233F]">
            Enrolled Student Performance Ledger ({filteredStudents.length})
          </h3>
          <span className="text-xs text-[#526174]">
            Enforcing stream isolation: {stream} students only
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF9EF] text-[#10233F] border-b border-[#E8DCCB]">
              <tr>
                <th className="p-3 font-serif font-bold">Student Name & Roll</th>
                <th className="p-3 font-serif font-bold">Batch Assignment</th>
                <th className="p-3 font-serif font-bold">Attendance %</th>
                <th className="p-3 font-serif font-bold">Diagnostic Average</th>
                <th className="p-3 font-serif font-bold">Assignments</th>
                <th className="p-3 font-serif font-bold text-right">Regulatory Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DCCB]/60">
              {filteredStudents.map((stu) => (
                <tr
                  key={stu.id}
                  onClick={() => setSelectedStudent(stu)}
                  className="hover:bg-[#FFF9EF]/40 transition-colors cursor-pointer"
                >
                  <td className="p-3">
                    <span className="font-bold text-[#10233F] block">{stu.name}</span>
                    <span className="font-mono text-[10px] text-[#526174]">{stu.rollNo}</span>
                  </td>
                  <td className="p-3 text-[#526174]">{stu.batch}</td>
                  <td className="p-3">
                    <span
                      className={`font-mono font-bold ${
                        stu.attendancePercentage >= 75
                          ? 'text-emerald-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {stu.attendancePercentage}%
                    </span>
                  </td>
                  <td className="p-3 font-serif font-bold text-[#10233F]">
                    {stu.avgTestScore}%
                  </td>
                  <td className="p-3 text-[#526174]">
                    {stu.assignmentsCompleted} / {stu.totalAssignments} Submitted
                  </td>
                  <td className="p-3 text-right">
                    <span
                      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        stu.riskLevel === 'Safe'
                          ? 'bg-emerald-100 text-emerald-800'
                          : stu.riskLevel === 'Attention'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800 animate-pulse'
                      }`}
                    >
                      {stu.riskLevel === 'Safe' && <CheckCircle2 className="w-3 h-3" />}
                      {stu.riskLevel === 'Attention' && <AlertTriangle className="w-3 h-3" />}
                      {stu.riskLevel === 'Critical' && <AlertTriangle className="w-3 h-3" />}
                      <span>{stu.riskLevel === 'Safe' ? 'Compliant' : stu.riskLevel === 'Attention' ? 'Near Shortage' : 'Shortage Alert'}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Student History Drawer Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#10233F]/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white border border-[#E8DCCB] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-[#E8DCCB]">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#89190E]">
                  Detailed Student Academic History
                </span>
                <h3 className="font-serif text-xl font-bold text-[#10233F]">
                  {selectedStudent.name}
                </h3>
                <p className="text-xs text-[#526174]">
                  Roll: {selectedStudent.rollNo} • {selectedStudent.batch}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 text-[#526174] hover:text-[#10233F]"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FFF9EF] border border-[#E8DCCB]">
                <span className="text-[#526174] block">Statutory Attendance</span>
                <span className="font-serif text-xl font-bold text-[#89190E]">
                  {selectedStudent.attendancePercentage}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FFF9EF] border border-[#E8DCCB]">
                <span className="text-[#526174] block">Diagnostic Avg</span>
                <span className="font-serif text-xl font-bold text-[#10233F]">
                  {selectedStudent.avgTestScore}%
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFF3DD] border border-[#EFC988] text-xs text-[#89190E]">
              <strong>Faculty Action Note:</strong> Student is flagged as <strong>{selectedStudent.riskLevel}</strong>. You may schedule a personalized 1-on-1 counsel session in the Communication tab.
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 rounded-xl bg-[#10233F] text-white text-xs font-bold"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
