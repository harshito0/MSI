'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Cpu,
  BookOpen,
  Scale,
  Dumbbell,
  Landmark,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface Facility {
  id: string;
  name: string;
  icon: any;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  features: string[];
  statLabel: string;
  statValue: string;
}

interface CampusExperienceTabsProps {
  onOpenVideo?: () => void;
  onOpenEnquiry?: () => void;
}

export default function CampusExperienceTabs({
  onOpenVideo,
  onOpenEnquiry,
}: CampusExperienceTabsProps) {
  const [activeTab, setActiveTab] = useState<string>('robotics');

  const facilities: Facility[] = [
    {
      id: 'robotics',
      name: 'Robotics & AI Center',
      icon: Cpu,
      title: 'State-of-the-Art Robotics & AI Innovation Hub',
      subtitle: 'Where Futuristic Ideas Take Shape',
      image: '/images/hero-2.webp',
      description:
        'Equipped with autonomous robotics workstations, IoT edge devices, GPU-powered computer vision rigs, and rapid-prototyping 3D printers for interdisciplinary research.',
      features: [
        'Dedicated GPU clusters for deep learning models',
        'Industry 4.0 automation & drone simulation testing',
        'Patented student inventions & startup incubator support',
      ],
      statLabel: 'Research Projects Funded',
      statValue: '45+',
    },
    {
      id: 'library',
      name: 'Central Academic Library',
      icon: BookOpen,
      title: 'Scholarly Sanctuary with 100,000+ Volumes',
      subtitle: 'The Heart of Intellectual Curiosity',
      image: '/images/hero-3.webp',
      description:
        'A multi-level architectural landmark featuring acoustic study pods, digital subscription access to IEEE, LexisNexis, JSTOR, and round-the-clock research assistance.',
      features: [
        'Comprehensive digital catalog with remote database access',
        'Quiet collaborative discussion rooms with AV displays',
        'Rare manuscript preservation & legal archives',
      ],
      statLabel: 'Digital & Print Journals',
      statValue: '12,000+',
    },
    {
      id: 'campus',
      name: 'Main Green Campus',
      icon: Landmark,
      title: 'Lush 15-Acre Eco-Friendly University Grounds',
      subtitle: 'A Vibrant Community in the Heart of Delhi',
      image: '/images/hero-1.webp',
      description:
        'Sprawling lawns, solar-powered infrastructure, open-air amphitheaters for debate and theatre, high-speed Wi-Fi, and welcoming student recreational squares.',
      features: [
        '100% solar powered academic blocks with green certification',
        'Amphitheater for annual cultural fests & hackathons',
        'On-campus health center, modern hostels, and dining halls',
      ],
      statLabel: 'Campus Community',
      statValue: '16,000+',
    },
    {
      id: 'mootcourt',
      name: 'Moot Court Hall',
      icon: Scale,
      title: 'National Standard Simulated High Court',
      subtitle: 'Nurturing India’s Next Generation of Jurists',
      image: '/images/hero-2.webp',
      description:
        'Designed to mirror the Supreme Court of India, giving law students real-world advocacy experience, national moot competition hosting, and clinical legal aid sessions.',
      features: [
        'Live streaming & court transcription technology',
        'Judges bench accommodating 5-member judicial panels',
        'Host to the annual MSI National Moot Court Competition',
      ],
      statLabel: 'National Trophies Won',
      statValue: '28+',
    },
    {
      id: 'sports',
      name: 'Sports & Athletic Arena',
      icon: Dumbbell,
      title: 'Olympic-Standard Indoor & Outdoor Sports Arena',
      subtitle: 'Fostering Grit, Fitness, and Team Spirit',
      image: '/images/hero-3.webp',
      description:
        'Comprehensive athletic facilities including basketball courts, badminton arena, cricket pavilion, fully equipped gymnasium, and certified trainers.',
      features: [
        'Multi-sport indoor stadium with synthetic flooring',
        'Professional athletic coaching & inter-university tournaments',
        'Physiotherapy & wellness center on campus',
      ],
      statLabel: 'Annual Sports Medals',
      statValue: '60+',
    },
  ];

  const currentFacility = facilities.find((f) => f.id === activeTab) || facilities[0];

  return (
    <section className="py-24 px-6 sm:px-10 lg:px-16 max-w-[1380px] mx-auto select-none">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-3 mb-3">
          <span className="h-[2px] w-8 bg-[#EFC988] rounded-full" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#89190E] uppercase">
            Campus Ecosystem & Life
          </span>
          <span className="h-[2px] w-8 bg-[#EFC988] rounded-full" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#10233F] tracking-tight">
          Spaces Crafted for Boundless Ambition
        </h2>
        <p className="mt-4 text-[#526174] text-base sm:text-lg">
          Take a deep dive into our specialized laboratories, majestic libraries, and athletic spaces designed to stimulate minds and build holistic leaders.
        </p>
      </div>

      {/* Tab Navigation Buttons */}
      <div className="flex items-center justify-start lg:justify-center space-x-2 sm:space-x-3 overflow-x-auto pb-4 mb-10 scrollbar-none">
        {facilities.map((facility) => {
          const Icon = facility.icon;
          const isActive = facility.id === activeTab;
          return (
            <button
              key={facility.id}
              onClick={() => setActiveTab(facility.id)}
              className={`flex items-center space-x-2.5 px-5 py-3 rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-300 flex-shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-[#89190E] text-white shadow-lg shadow-[#89190E]/25 -translate-y-0.5'
                  : 'bg-white text-[#10233F] hover:bg-[#FFF3DD] border border-[#E8DCCB] hover:border-[#89190E]/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#EFC988]' : 'text-[#89190E]'}`} />
              <span>{facility.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Card */}
      <div className="bg-white rounded-3xl border border-[#E8DCCB] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-500">
        {/* Left Visual Image Showcase (7 cols) */}
        <div className="relative lg:col-span-7 h-[360px] sm:h-[460px] lg:h-[520px] overflow-hidden group">
          <Image
            key={currentFacility.id}
            src={currentFacility.image}
            alt={currentFacility.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 animate-fadeIn"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10233F]/80 via-transparent to-transparent pointer-events-none" />

          {/* Floating Live Badge */}
          <div className="absolute top-6 left-6 z-20 flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white text-xs font-bold text-[#10233F]">
            <Sparkles className="w-3.5 h-3.5 text-[#89190E]" />
            <span>{currentFacility.name}</span>
          </div>

          {/* Virtual Tour Play Button */}
          <button
            onClick={onOpenVideo}
            className="absolute bottom-6 left-6 z-20 flex items-center space-x-2.5 px-5 py-2.5 rounded-xl bg-white/95 hover:bg-white text-[#89190E] text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="w-6 h-6 rounded-full bg-[#89190E] text-white flex items-center justify-center">
              <Play className="w-3 h-3 fill-white ml-0.5" />
            </div>
            <span>Watch 360° Video Tour</span>
          </button>

          {/* Floating Metric Pill */}
          <div className="absolute bottom-6 right-6 z-20 bg-[#10233F]/90 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl text-white text-right hidden sm:block">
            <div className="font-serif text-2xl font-bold text-[#EFC988]">
              {currentFacility.statValue}
            </div>
            <div className="text-[11px] text-gray-300">{currentFacility.statLabel}</div>
          </div>
        </div>

        {/* Right Details Description (5 cols) */}
        <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-[#FFF9EF]/40">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#89190E] bg-[#FFF3DD] border border-[#F7E5BF] px-3 py-1 rounded-full inline-block mb-3">
              {currentFacility.subtitle}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#10233F] leading-tight mb-4">
              {currentFacility.title}
            </h3>
            <p className="text-[#526174] text-sm sm:text-base leading-relaxed mb-6">
              {currentFacility.description}
            </p>

            {/* Key Bullet Highlights */}
            <div className="space-y-3 mb-8">
              {currentFacility.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#89190E] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#10233F] font-medium leading-normal">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Actions */}
          <div className="pt-6 border-t border-[#E8DCCB] flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenEnquiry}
              className="h-11 px-6 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white text-xs sm:text-sm font-semibold transition-all btn-hover-lift flex items-center space-x-2"
            >
              <span>Schedule Campus Visit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenVideo}
              className="h-11 px-5 rounded-xl bg-white hover:bg-[#FFF3DD] text-[#89190E] border border-[#89190E]/40 text-xs sm:text-sm font-semibold transition-all"
            >
              Explore Virtually
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
