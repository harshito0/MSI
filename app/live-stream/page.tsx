'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import BunnyPlayer from '@/components/stream/BunnyPlayer';
import {
  Radio,
  Users,
  MessageSquare,
  Send,
  BookOpen,
  Award,
  CheckCircle2,
  Share2,
  Clock,
  Sparkles,
  ChevronLeft,
  Square,
  RotateCcw,
  Camera,
  Mic,
  MicOff,
  ScreenShare,
  ShieldCheck,
  FileText,
  Download,
  AlertCircle,
} from 'lucide-react';

function LiveStreamContent() {
  const searchParams = useSearchParams();
  const videoIdParam = searchParams.get('videoId');
  const libraryId = searchParams.get('lib') || '389201';
  const lectureTitle = searchParams.get('title') || 'CLAT UG Foundation: Passage-Based Deduction & Landmark SC Jurisprudence';

  // Live state
  const [isLive, setIsLive] = useState(true);
  const [streamEnded, setStreamEnded] = useState(false);
  const [activeSource, setActiveSource] = useState<'hall' | 'camera' | 'screen'>('hall');
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [micMuted, setMicMuted] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [viewerCount, setViewerCount] = useState(142);
  const [showConfirmEnd, setShowConfirmEnd] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Dr. Ekta Gahlawat (Faculty)', text: 'Welcome students. Today we are dissecting Principle-Fact applications from recent Constitution Bench rulings.', time: '10:02 AM', isTeacher: true },
    { sender: 'Aarav Sharma', text: 'Good morning Ma’am! Ready with Section 11 notes.', time: '10:03 AM', isTeacher: false },
    { sender: 'Meera Sen', text: 'Audio and video are crystal clear on the Bunny Stream player.', time: '10:04 AM', isTeacher: false },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Synchronize stream events with Teacher Studio across browser tabs
  useEffect(() => {
    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel('msi_live_stream_channel');
      bc.onmessage = (event) => {
        if (event.data?.type === 'STREAM_ENDED') {
          handleEndStream(false);
        } else if (event.data?.type === 'STREAM_STARTED') {
          setIsLive(true);
          setStreamEnded(false);
        }
      };
    } catch {
      // BroadcastChannel not available in all environments
    }

    return () => {
      bc?.close();
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Handle Turn on Faculty Camera & Mic directly
  const handleStartCamera = async () => {
    try {
      if (mediaStream) {
        mediaStream.getTracks().forEach((t) => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      setActiveSource('camera');
      setIsLive(true);
      setStreamEnded(false);
    } catch (err: any) {
      alert(`Camera access denied or unavailable: ${err.message}. Switching back to Lecture Hall stream.`);
      setActiveSource('hall');
    }
  };

  // Handle Screen Sharing
  const handleStartScreenShare = async () => {
    try {
      if (mediaStream) {
        mediaStream.getTracks().forEach((t) => t.stop());
      }
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      setMediaStream(stream);
      setActiveSource('screen');
      setIsLive(true);
      setStreamEnded(false);
      stream.getVideoTracks()[0].onended = () => {
        setActiveSource('hall');
        setMediaStream(null);
      };
    } catch (err: any) {
      console.log('Screen share cancelled', err);
    }
  };

  // End Stream Handler ("isko end karo")
  const handleEndStream = (broadcast = true) => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
    setIsLive(false);
    setStreamEnded(true);
    setShowConfirmEnd(false);

    if (broadcast) {
      try {
        const bc = new BroadcastChannel('msi_live_stream_channel');
        bc.postMessage({ type: 'STREAM_ENDED', timestamp: Date.now() });
        bc.close();
      } catch {}
    }
  };

  // Restart / Resume Stream
  const handleRestartStream = () => {
    setStreamEnded(false);
    setIsLive(true);
    setActiveSource('hall');
    try {
      const bc = new BroadcastChannel('msi_live_stream_channel');
      bc.postMessage({ type: 'STREAM_STARTED', timestamp: Date.now() });
      bc.close();
    } catch {}
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'You (Student)',
        text: inputMessage,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        isTeacher: false,
      },
    ]);
    setInputMessage('');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 space-y-6 sm:space-y-8">
      
      {/* 1. Top Header Bar with Live Badge & End Stream Control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E8DCCB]">
        <div className="space-y-1.5">
          <Link
            href="/student"
            className="text-xs font-bold text-[#89190E] hover:underline flex items-center space-x-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Back to Student Portal</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {isLive ? (
              <span className="inline-flex items-center space-x-1.5 bg-rose-600 text-white text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full animate-pulse shadow-md shadow-rose-600/30">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>ON AIR • LIVE BROADCAST</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 bg-gray-800 text-white text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                <span>STREAM CONCLUDED</span>
              </span>
            )}

            <span className="text-xs font-mono text-[#526174] bg-[#FFF3DD] border border-[#EFC988] px-2.5 py-0.5 rounded-md font-semibold">
              Bunny.net Stream Engine
            </span>
          </div>

          <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#10233F] leading-tight">
            {lectureTitle}
          </h1>
        </div>

        {/* Action Controls: End Stream & Attendance */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Viewer Pill */}
          <div className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white border border-[#E8DCCB] text-xs font-mono font-bold text-[#10233F] shadow-xs">
            <Users className="w-3.5 h-3.5 text-[#89190E]" />
            <span>{isLive ? `${viewerCount} Live Viewers` : '142 Attended'}</span>
          </div>

          {/* Mark Attendance Button */}
          <button
            onClick={() => setAttendanceMarked(true)}
            disabled={attendanceMarked}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer ${
              attendanceMarked
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{attendanceMarked ? 'Attendance Recorded ✓' : 'Mark Attendance'}</span>
          </button>

          {/* End Stream / Restart Stream Button ("isko end karo") */}
          {isLive ? (
            <button
              onClick={() => setShowConfirmEnd(true)}
              className="px-4 py-2 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-[#89190E]/20 active:scale-98 cursor-pointer"
              title="Conclude live broadcast for all attendees"
            >
              <Square className="w-3.5 h-3.5 fill-white" />
              <span>End Stream</span>
            </button>
          ) : (
            <button
              onClick={handleRestartStream}
              className="px-4 py-2 rounded-xl bg-[#10233F] hover:bg-[#1a345c] text-white text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#EFC988]" />
              <span>Restart Live Broadcast</span>
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal to End Stream */}
      {showConfirmEnd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-[#E8DCCB] shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-[#89190E]">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-serif text-lg font-bold text-[#10233F]">
                Conclude Live Stream?
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#526174] leading-relaxed">
              Ending this broadcast will immediately disconnect live transmission for all <strong>{viewerCount} students</strong>, finalize the electronic attendance register, and archive the recorded lecture to your Bunny.net Video Library.
            </p>
            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowConfirmEnd(false)}
                className="px-4 py-2 rounded-xl border border-[#E8DCCB] hover:bg-gray-50 text-xs font-bold text-[#10233F] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEndStream(true)}
                className="px-4 py-2 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white text-xs font-bold shadow-md cursor-pointer flex items-center space-x-1.5"
              >
                <Square className="w-3.5 h-3.5 fill-white" />
                <span>Confirm End Stream</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Live Stage & Chat Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left Column (8 cols): Player / Stream View */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Active Source Bar (Faculty Controls) */}
          <div className="p-3 bg-[#FFF9EF] border border-[#E8DCCB] rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[#10233F]">Live Stream Mode:</span>
              <button
                onClick={() => {
                  if (mediaStream) mediaStream.getTracks().forEach((t) => t.stop());
                  setMediaStream(null);
                  setActiveSource('hall');
                }}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeSource === 'hall'
                    ? 'bg-[#89190E] text-white font-bold'
                    : 'bg-white border border-[#E8DCCB] text-[#10233F] hover:bg-gray-50'
                }`}
              >
                Auditorium Masterclass
              </button>
              <button
                onClick={handleStartCamera}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer flex items-center space-x-1 ${
                  activeSource === 'camera'
                    ? 'bg-[#89190E] text-white font-bold'
                    : 'bg-white border border-[#E8DCCB] text-[#10233F] hover:bg-gray-50'
                }`}
              >
                <Camera className="w-3 h-3" />
                <span>Faculty Camera</span>
              </button>
              <button
                onClick={handleStartScreenShare}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer flex items-center space-x-1 ${
                  activeSource === 'screen'
                    ? 'bg-[#89190E] text-white font-bold'
                    : 'bg-white border border-[#E8DCCB] text-[#10233F] hover:bg-gray-50'
                }`}
              >
                <ScreenShare className="w-3 h-3" />
                <span>Share Screen</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-[#526174]">
              Status: <strong className={isLive ? 'text-emerald-700' : 'text-gray-500'}>{isLive ? 'STREAMING ACTIVE' : 'OFFLINE'}</strong>
            </div>
          </div>

          {/* Video Player Shell */}
          {streamEnded ? (
            /* Stream Ended / Summary State */
            <div className="rounded-3xl border-2 border-[#E8DCCB] bg-gradient-to-br from-[#10233F] to-[#1a345c] p-8 sm:p-12 text-white text-center space-y-5 shadow-2xl relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-[#EFC988]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#EFC988] font-bold">
                  Lecture Broadcast Complete
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Live Session Successfully Concluded
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
                  The faculty has ended this live streaming transmission. The full recording is now being transcoded on Bunny.net Stream for on-demand playback.
                </p>
              </div>

              {/* Session Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto pt-2 text-left">
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-gray-400 block font-mono">Duration</span>
                  <span className="font-bold text-sm font-serif">48 mins 12s</span>
                </div>
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-gray-400 block font-mono">Attendance</span>
                  <span className="font-bold text-sm font-serif text-emerald-400">142 Present</span>
                </div>
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-gray-400 block font-mono">VOD Storage</span>
                  <span className="font-bold text-sm font-serif text-[#EFC988]">Bunny Stream</span>
                </div>
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-gray-400 block font-mono">Resolution</span>
                  <span className="font-bold text-sm font-serif">1080p HD</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleRestartStream}
                  className="px-5 py-2.5 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white text-xs font-bold transition-all shadow-lg cursor-pointer flex items-center space-x-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#EFC988]" />
                  <span>Resume Live Transmission</span>
                </button>
              </div>
            </div>
          ) : (
            /* Active Live Stream Player */
            <BunnyPlayer
              videoId={videoIdParam || undefined}
              mediaStream={mediaStream}
              libraryId={libraryId}
              title={lectureTitle}
              isLive={isLive}
              autoplay={true}
              viewerCount={viewerCount}
              onEnded={() => handleEndStream(false)}
            />
          )}

          {/* Academic Handout & Landmark Citations Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8DCCB] space-y-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E8DCCB]">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-[#89190E] uppercase tracking-wider bg-[#FFF3DD] px-2.5 py-0.5 rounded-md">
                  Official Handout Synchronized
                </span>
                <h3 className="font-serif text-lg font-bold text-[#10233F]">
                  Constitutional Principles & Landmark Case Briefs
                </h3>
              </div>
              <button
                onClick={() => alert('Official Lecture Compendium PDF downloaded.')}
                className="px-3.5 py-1.5 rounded-xl bg-[#FFF9EF] hover:bg-[#FFF3DD] text-[#89190E] border border-[#EFC988] text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Handout (PDF)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#E8DCCB] space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#10233F] flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#89190E]" />
                  <span>Ratio Decidendi Breakdown</span>
                </h4>
                <p className="text-[#526174] leading-relaxed">
                  Focus on the legal principle upon which the court decided the factual controversy. Ignore obiter statements that merely illustrate background context.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#E8DCCB] space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#10233F] flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-[#89190E]" />
                  <span>Principle-Fact Boundary Rules</span>
                </h4>
                <p className="text-[#526174] leading-relaxed">
                  Strictly apply only the given legal principle. Do not assume or import external statutory exceptions unless explicitly stated in the factual matrix.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Live Classroom Discussion / Q&A */}
        <div className="lg:col-span-4 flex flex-col h-[650px] rounded-3xl bg-white border border-[#E8DCCB] shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="p-4 bg-[#FFF9EF] border-b border-[#E8DCCB] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-[#89190E]" />
              <h3 className="font-serif font-bold text-sm text-[#10233F]">
                Live Classroom Discussion
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
              Faculty Active
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5]/60">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl text-xs space-y-1 transition-all ${
                  msg.isTeacher
                    ? 'bg-[#FFF3DD] border border-[#EFC988] text-[#10233F] shadow-xs'
                    : 'bg-white border border-[#E8DCCB] text-[#10233F]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <strong className={msg.isTeacher ? 'text-[#89190E]' : 'text-[#10233F]'}>
                    {msg.sender}
                  </strong>
                  <span className="text-gray-400 font-mono">{msg.time}</span>
                </div>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#E8DCCB] flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={isLive ? "Ask faculty a legal doubt..." : "Stream concluded. Comments locked."}
              disabled={!isLive}
              className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-[#FFF9EF] border border-[#E8DCCB] text-[#10233F] focus:outline-none focus:ring-1 focus:ring-[#89190E] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!isLive || !inputMessage.trim()}
              className="p-2.5 rounded-xl bg-[#89190E] hover:bg-[#65130D] disabled:opacity-40 text-white transition-colors cursor-pointer"
              title="Post Doubt to Faculty"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}

export default function LiveStreamPage() {
  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#10233F] flex flex-col selection:bg-[#EFC988] selection:text-[#89190E]">
      <Navbar />
      <main className="flex-grow pt-20">
        <Suspense fallback={<div className="p-12 text-center text-sm font-mono text-[#89190E]">Initializing Live Stream Hall...</div>}>
          <LiveStreamContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
