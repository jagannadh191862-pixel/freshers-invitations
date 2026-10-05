import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Shirt, ChevronDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between items-center text-center overflow-hidden z-10 px-4">
      {/* Glowing background orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-amber-600/20 via-amber-400/15 to-transparent blur-[120px] pointer-events-none rounded-full animate-float-slow" />
      <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-cyan-600/10 blur-[100px] pointer-events-none rounded-full animate-float-delayed" />

      {/* College Header Branding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center gap-1.5 mt-4"
      >
        <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs text-amber-300 font-medium tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span>DEPARTMENT OF AIML / CAI / CSD</span>
        </div>

        <h2 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl font-bold tracking-widest text-slate-100 uppercase mt-2">
          SRI VASAVI
        </h2>
        <div className="flex items-center gap-2">
          <span className="font-sans-modern text-xs sm:text-sm tracking-widest text-slate-300 uppercase font-light">
            Engineering College (A)
          </span>
          <span className="text-[11px] font-bold text-amber-400 font-serif-luxury tracking-widest lowercase border border-amber-400/50 bg-amber-500/10 px-2 py-0.5 rounded-full shadow-sm shadow-amber-500/20">
            aikyam
          </span>
        </div>

        {/* Decorative gold ornament divider */}
        <div className="flex items-center justify-center gap-3 mt-3 w-48">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
          <div className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-sm shadow-amber-400" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
        </div>
      </motion.div>

      {/* Hero Center Title */}
      <div className="my-auto py-8 max-w-5xl mx-auto flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif-luxury text-xs sm:text-sm md:text-base font-semibold text-amber-300/90 tracking-[0.3em] uppercase mb-4"
        >
          AN INVITATION TO BEGIN A NEW CHAPTER
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative"
        >
          <div className="font-script text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-gold-shimmer leading-none drop-shadow-[0_10px_35px_rgba(212,175,55,0.4)] select-none">
            Freshers’
          </div>
          <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-wider text-slate-100 leading-none -mt-4 sm:-mt-8 md:-mt-12 uppercase drop-shadow-2xl">
            PARTY
          </h1>
        </motion.div>

        {/* 2K26 Tag with Diamond Flourishes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center gap-4 mt-2 sm:mt-4"
        >
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-400" />
          <div className="text-amber-400 text-xs sm:text-sm font-bold">♦</div>
          <span className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-gold-gradient tracking-widest">
            2K26
          </span>
          <div className="text-amber-400 text-xs sm:text-sm font-bold">♦</div>
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-400" />
        </motion.div>
      </div>

      {/* Key Event Information Pills */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="w-full max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-6"
      >
        <div className="glass-card rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 border-amber-500/20 hover:border-amber-400/50 transition-colors">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] tracking-wider text-slate-400 uppercase font-bold">DATE</p>
            <p className="font-sans-modern font-bold text-xs sm:text-sm text-slate-100">14 OCT 2026</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 border-amber-500/20 hover:border-amber-400/50 transition-colors">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] tracking-wider text-slate-400 uppercase font-bold">TIMING</p>
            <p className="font-sans-modern font-bold text-xs sm:text-sm text-slate-100">9:30 AM – 4:30 PM</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 border-amber-500/20 hover:border-amber-400/50 transition-colors">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] tracking-wider text-slate-400 uppercase font-bold">VENUE</p>
            <p className="font-sans-modern font-bold text-xs sm:text-sm text-slate-100">YNS AUDITORIUM</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 border-amber-500/20 hover:border-amber-400/50 transition-colors">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Shirt className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] tracking-wider text-slate-400 uppercase font-bold">DRESS CODE</p>
            <p className="font-sans-modern font-bold text-xs sm:text-sm text-amber-300">COLLEGE UNIFORM</p>
          </div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#timeline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors font-sans-modern tracking-widest uppercase group mt-2"
      >
        <span>SCROLL TO ENTER THE EXPERIENCE</span>
        <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce group-hover:scale-125 transition-transform" />
      </motion.a>
    </section>
  );
}
