'use client';

import React from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#10233F]/75 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-[#10233F] border border-[#E8DCCB]/30 rounded-3xl overflow-hidden shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-title"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 relative">
              <Image
                src="/images/msi-crest.png"
                alt="MSI Crest"
                fill
                className="object-contain"
              />
            </div>
            <span id="video-title" className="text-white font-medium text-sm sm:text-base">
              Campus Life at MSI — Crafting Legal & Technical Brilliance
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <Image
            src="/images/hero-1.webp"
            alt="MSI Campus Video Thumbnail"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <div className="w-20 h-20 rounded-full bg-[#89190E] border-4 border-[#EFC988] flex items-center justify-center text-white shadow-2xl mb-4 animate-pulse">
              <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <h4 className="text-white text-xl sm:text-2xl font-serif font-bold">
              Welcome to MSI Campus Tour
            </h4>
            <p className="text-[#F7E5BF] text-xs sm:text-sm mt-1 max-w-md">
              Discover cutting-edge laboratories, world-class moot courts, and an inspiring academic ecosystem.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-white/5 flex items-center justify-between text-xs text-white/60">
          <span>Duration: 4:32 min</span>
          <button
            onClick={onClose}
            className="text-[#EFC988] hover:underline font-medium"
          >
            Close preview
          </button>
        </div>
      </div>
    </div>
  );
}
