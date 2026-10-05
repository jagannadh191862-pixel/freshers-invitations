import React from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import GuidelinesSection from './components/GuidelinesSection';
import InvitationSystemSection from './components/InvitationSystemSection';
import OrganizedByFooter from './components/OrganizedByFooter';

export default function App() {
  return (
    <div className="relative min-h-screen bg-black text-slate-100 font-sans-modern overflow-hidden">
      {/* Dynamic Particle Background */}
      <ParticleBackground />

      {/* Floating Header Navbar */}
      <Navbar />

      {/* Main Page Hierarchy */}
      <main className="relative z-10 space-y-12">
        {/* 1. HERO SECTION */}
        <HeroSection />

        {/* 2. THE DAY AWAITS - TIMELINE */}
        <TimelineSection />

        {/* 3. EVENT GUIDELINES */}
        <GuidelinesSection />

        {/* 4. YOUR INVITATION AWAITS - ROLL NUMBER & PERSONALIZED CARD */}
        <InvitationSystemSection />
      </main>

      {/* 5. ORGANIZED BY & FOOTER */}
      <OrganizedByFooter />
    </div>
  );
}
