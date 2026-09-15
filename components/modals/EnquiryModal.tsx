'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Undergraduate Engineering',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after success
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10233F]/60 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-[#FFF9EF] border border-[#E8DCCB] rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
      >
        {/* Top Decorative Maroon Band */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#89190E] via-[#EFC988] to-[#89190E]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#526174] hover:text-[#89190E] hover:bg-[#FFF3DD] rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#89190E] animate-bounce" />
            <h3 className="font-serif text-2xl font-bold text-[#10233F]">
              Thank You for Enquiring!
            </h3>
            <p className="text-[#526174] text-sm max-w-xs">
              Our admissions counselor will get in touch with you shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src="/images/msi-crest.png"
                  alt="MSI Crest"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 id="enquiry-title" className="font-serif text-2xl font-bold text-[#10233F]">
                  Admissions Enquiry
                </h3>
                <p className="text-xs text-[#526174]">
                  MSI Group of Institutes — Shape Your Tomorrow
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#10233F] uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-[#E8DCCB] rounded-xl text-sm text-[#10233F] focus:outline-none focus:border-[#89190E] focus:ring-1 focus:ring-[#89190E] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#10233F] uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-[#E8DCCB] rounded-xl text-sm text-[#10233F] focus:outline-none focus:border-[#89190E] focus:ring-1 focus:ring-[#89190E] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#10233F] uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-[#E8DCCB] rounded-xl text-sm text-[#10233F] focus:outline-none focus:border-[#89190E] focus:ring-1 focus:ring-[#89190E] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10233F] uppercase tracking-wider mb-1">
                  Program of Interest
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-[#E8DCCB] rounded-xl text-sm text-[#10233F] focus:outline-none focus:border-[#89190E] focus:ring-1 focus:ring-[#89190E] transition-all"
                >
                  <option>B.Tech — Computer Science & Engineering</option>
                  <option>B.Tech — AI & Robotics</option>
                  <option>BBA — Management & Entrepreneurship</option>
                  <option>B.A. LL.B. / B.B.A. LL.B. (5 Year Integrated)</option>
                  <option>BCA — Data Analytics & Cloud</option>
                  <option>Postgraduate MBA & Research</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10233F] uppercase tracking-wider mb-1">
                  Queries or Comments
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your academic goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-[#E8DCCB] rounded-xl text-sm text-[#10233F] focus:outline-none focus:border-[#89190E] focus:ring-1 focus:ring-[#89190E] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#89190E] hover:bg-[#65130D] text-white font-semibold rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Submit Admission Enquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
