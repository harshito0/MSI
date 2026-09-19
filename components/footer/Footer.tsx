'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Award,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#10233F] text-white pt-20 pb-12 border-t border-[#E8DCCB]/20 overflow-hidden select-none">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#89190E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#EFC988]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Accreditation & Regulatory Accolades Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 mb-12 border-b border-white/10">
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <Award className="w-8 h-8 text-[#EFC988] flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Since 1995</div>
              <div className="text-[11px] text-gray-400">30 Years of Law Coaching</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <ShieldCheck className="w-8 h-8 text-[#EFC988] flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Punjab Govt. Recognized</div>
              <div className="text-[11px] text-gray-400">Registered Coaching Institute</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <ShieldCheck className="w-8 h-8 text-[#EFC988] flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">50+ Expert Tutors</div>
              <div className="text-[11px] text-gray-400">Certified Legal Professionals</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <Award className="w-8 h-8 text-[#EFC988] flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">300+ Selections</div>
              <div className="text-[11px] text-gray-400">PCS J, CLAT, UGC NET & more</div>
            </div>
          </div>
        </div>

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Crest, Mission & Newsletter */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-14 h-14 relative flex-shrink-0">
                <Image
                  src="/images/msi-crest.png"
                  alt="MSI Official Seal"
                  fill
                  className="object-contain brightness-110 drop-shadow-md"
                />
              </div>
              <div>
                <h4 className="font-serif text-2xl font-bold tracking-tight text-white">
                  MSI Group of Institutes
                </h4>
                <p className="text-xs text-[#EFC988] font-medium tracking-wide">
                  Shaping Legal Brilliance Since 1995
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed max-w-md mb-6">
              Leading coaching institute for PCS J (Judiciary), CLAT, AILET, UGC NET (Law), LLM and all competitive law examinations — serving students from Punjab, Haryana & Himachal Pradesh since 1995.
            </p>

            {/* Newsletter Subscription */}
            <div className="max-w-md">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#EFC988] block mb-2">
                Stay Updated with Admissions & Research
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 h-11 px-4 text-xs sm:text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#EFC988] transition-colors"
                />
                <button
                  type="submit"
                  className="h-11 px-5 bg-[#89190E] hover:bg-[#65130D] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition-all btn-hover-lift flex-shrink-0"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5 ml-1" />
                </button>
              </form>
              {subscribed && (
                <div className="mt-2 flex items-center space-x-1.5 text-xs text-emerald-400 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Thank you! You are subscribed to official MSI updates.</span>
                </div>
              )}
            </div>
          </div>

          {/* Col 3: Academic Exploration */}
          <div>
            <h5 className="font-serif text-base font-bold text-[#EFC988] mb-4 uppercase tracking-wider">
              Our Courses
            </h5>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/courses" className="hover:text-[#EFC988] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">PCS J — Judicial Services</span>
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#EFC988] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">CLAT & Law Entrance Coaching</span>
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#EFC988] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">UGC NET (Law) Coaching</span>
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#EFC988] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">AILET / LSAT India Prep</span>
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#EFC988] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">LLM Entrance Coaching</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation */}
          <div>
            <h5 className="font-serif text-base font-bold text-[#EFC988] mb-4 uppercase tracking-wider">
              Quick Links
            </h5>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-[#EFC988] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">About MSI Group</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-[#EFC988] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Distinguished Faculty</span>
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-[#EFC988] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Placements & Results</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#EFC988] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Campus Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#EFC988] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Campus News & Research</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#EFC988] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Admissions Desk</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Admissions Desk */}
          <div>
            <h5 className="font-serif text-base font-bold text-[#EFC988] mb-4 uppercase tracking-wider">
              Contact & Visit
            </h5>
            <div className="space-y-3.5 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#EFC988] flex-shrink-0 mt-1" />
                <span className="leading-relaxed">
                  Near Bus Stand, Kharar, Dist. Mohali, Punjab — 140301
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#EFC988] flex-shrink-0" />
                <span>+91 98155 02444 / 98155 03444</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#EFC988] flex-shrink-0" />
                <span>msiinstitutes@gmail.com</span>
              </div>
              <div className="pt-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Admissions Helpline Active (9am - 6pm)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} MSI Group of Institutes, Kharar. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-[#EFC988] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/student/login" className="hover:text-[#EFC988] transition-colors">
              Student Portal
            </Link>
            <Link href="/teacher/login" className="hover:text-[#EFC988] transition-colors">
              Faculty Portal
            </Link>
            <Link href="/reception/login" className="hover:text-[#EFC988] transition-colors font-semibold text-[#EFC988]">
              Reception / VMS
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#89190E] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
