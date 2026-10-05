import React, { forwardRef, useState } from 'react';
import { Sparkles, Layers, Image as ImageIcon } from 'lucide-react';

const PersonalizedCard = forwardRef(({ student }, ref) => {
  const [viewMode, setViewMode] = useState('template'); // 'template' | 'custom'

  const name = student?.full_name || 'ESTEEMED FRESHER';
  const rollNo = student?.roll_no || '';
  const branch = student?.branch || 'AIML';
  const section = student?.section || '';

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Mode Switcher Buttons */}
      <div className="no-export flex items-center justify-center gap-2 bg-slate-900/80 p-1.5 rounded-full border border-amber-500/30 backdrop-blur-md">
        <button
          onClick={() => setViewMode('template')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all ${
            viewMode === 'template'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-300 hover:text-amber-300'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          AUTHENTIC INVITATION POSTER
        </button>

        <button
          onClick={() => setViewMode('custom')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all ${
            viewMode === 'custom'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-300 hover:text-amber-300'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          GLASS DYNAMIC CARD
        </button>
      </div>

      {/* Main Exportable Container */}
      <div
        ref={ref}
        id="export-invitation-card"
        className="relative w-full max-w-[620px] mx-auto aspect-[1/1.52] rounded-[24px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)] border border-amber-500/40 select-none bg-slate-950"
      >
        {/* =========================================
            MODE 1: AUTHENTIC REFERENCE TEMPLATE OVERLAY
           ========================================= */}
        {viewMode === 'template' && (
          <div className="relative w-full h-full">
            {/* Reference invitation background image */}
            <img
              src="/reference_invitation.jpeg"
              alt="Sri Vasavi Freshers Day 2K26 Invitation"
              className="w-full h-full object-cover object-center"
            />

            {/* Student Name Overlay Box under CORDIALLY INVITES */}
            <div className="absolute top-[17.5%] left-0 right-0 px-6 sm:px-10 flex flex-col items-center text-center pointer-events-none">
              <div className="w-full max-w-[480px] bg-slate-950/85 backdrop-blur-md border-y-2 border-amber-400/80 py-2.5 px-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.9)] flex flex-col items-center">
                <p className="text-[9px] sm:text-[11px] font-serif-luxury font-bold tracking-[0.3em] text-amber-300 uppercase mb-0.5">
                  ✦ SPECIAL GUEST INVITEE ✦
                </p>
                <h2 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl font-black text-gold-shimmer tracking-wider uppercase drop-shadow-[0_2px_10px_rgba(212,175,55,0.6)] leading-tight break-words max-w-full">
                  {name}
                </h2>
                {rollNo && (
                  <p className="font-sans-modern text-[10px] sm:text-xs font-bold text-slate-200 tracking-[0.2em] uppercase mt-1">
                    ROLL NO: <span className="text-amber-300 font-mono">{rollNo}</span> {section ? `• SEC ${section}` : ''}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            MODE 2: GLASS DYNAMIC CINEMATIC CARD
           ========================================= */}
        {viewMode === 'custom' && (
          <div
            className="w-full h-full flex flex-col justify-between text-center p-6 sm:p-8"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 15%, rgba(212, 175, 55, 0.18) 0%, transparent 60%),
                radial-gradient(circle at 50% 85%, rgba(212, 175, 55, 0.14) 0%, transparent 50%),
                linear-gradient(180deg, #070910 0%, #0A0D18 40%, #0E1222 100%)
              `
            }}
          >
            {/* Outer Filigree Gold Border */}
            <div className="absolute inset-3 border-2 border-amber-500/60 rounded-[18px] pointer-events-none z-10 flex flex-col justify-between p-2">
              <div className="absolute inset-1 border border-amber-400/30 rounded-[14px]" />
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-amber-400" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-amber-400" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-amber-400" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-amber-400" />
            </div>

            {/* Top Header */}
            <div className="relative z-20 pt-3">
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-[0.15em] uppercase">
                SRI VASAVI
              </h2>
              <p className="font-serif-luxury text-xs sm:text-sm font-medium text-slate-300 tracking-[0.2em] uppercase mt-0.5">
                Engineering College (A)
              </p>

              <div className="flex items-center justify-center gap-2 my-2.5 w-44 mx-auto">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />
                <div className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />
              </div>

              <p className="font-serif-luxury text-xs sm:text-sm font-bold text-amber-300/90 tracking-[0.2em] uppercase">
                DEPARTMENT OF AIML
              </p>
              <p className="font-serif-luxury text-[10px] sm:text-xs font-semibold text-slate-400 tracking-[0.3em] uppercase mt-1">
                CORDIALLY INVITES
              </p>
            </div>

            {/* Personalized Student Name */}
            <div className="relative z-20 my-auto py-2 px-2">
              <div className="inline-block relative">
                <div className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-black text-gold-shimmer tracking-wider uppercase drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)] border-y border-amber-500/30 py-2 px-4 max-w-full break-words">
                  {name}
                </div>
                {rollNo && (
                  <p className="font-sans-modern text-[10px] sm:text-xs font-bold text-amber-400/90 tracking-[0.25em] uppercase mt-1.5">
                    ROLL NO: {rollNo} {section ? `(SEC ${section})` : ''}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-3 my-3 w-56 mx-auto">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                <span className="text-amber-400 text-xs">❖</span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              </div>

              <p className="font-serif-luxury text-[10px] sm:text-xs text-slate-300 tracking-[0.25em] uppercase mb-1">
                AN INVITATION TO BEGIN A NEW CHAPTER
              </p>

              <p className="font-serif-luxury text-[9px] sm:text-[10px] text-slate-400 tracking-[0.3em] uppercase">
                TO THE
              </p>

              <div className="relative -mt-2">
                <div className="font-script text-5xl sm:text-7xl md:text-8xl text-gold-shimmer leading-none drop-shadow-lg">
                  Freshers’
                </div>
                <p className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 uppercase tracking-widest leading-tight -mt-3 sm:-mt-5">
                  PARTY
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 mt-1.5">
                <span className="text-amber-400 text-xs">♦</span>
                <div className="h-[1px] w-8 bg-amber-400/60" />
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-gold-gradient tracking-widest">
                  2K26
                </span>
                <div className="h-[1px] w-8 bg-amber-400/60" />
                <span className="text-amber-400 text-xs">♦</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="relative z-20 pb-2">
              <div className="grid grid-cols-3 gap-2 border-y border-amber-500/30 py-3 mb-3 bg-amber-950/20 rounded-xl">
                <div className="flex flex-col items-center border-r border-amber-500/20 px-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">WEDNESDAY</span>
                  <span className="font-serif-luxury text-base sm:text-lg font-bold text-slate-100 leading-tight">14</span>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">OCT 2026</span>
                </div>

                <div className="flex flex-col items-center border-r border-amber-500/20 px-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">TIMING</span>
                  <span className="font-sans-modern text-xs sm:text-sm font-bold text-amber-300 mt-1">9:30 AM</span>
                  <span className="text-[9px] text-slate-400">TO 4:30 PM</span>
                </div>

                <div className="flex flex-col items-center px-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">VENUE</span>
                  <span className="font-serif-luxury text-xs sm:text-sm font-bold text-slate-100 leading-tight mt-1">YNS</span>
                  <span className="text-[9px] font-bold text-slate-300 uppercase">AUDITORIUM</span>
                </div>
              </div>

              <p className="font-sans-modern text-[10px] sm:text-xs font-semibold text-slate-300 uppercase tracking-wider">
                DRESS CODE: <span className="text-amber-300 font-bold">COLLEGE UNIFORM</span>
              </p>

              <p className="font-serif-luxury text-[10px] italic text-slate-400 mt-1">
                Organized by
              </p>
              <p className="font-serif-luxury text-[11px] sm:text-xs font-bold text-slate-100 tracking-wider uppercase">
                DEPARTMENT OF AIML / CAI / CSD
              </p>

              <div className="flex flex-col items-center mt-3 pt-2 border-t border-amber-500/20">
                <span className="font-serif-luxury text-xs font-bold text-amber-400 tracking-[0.25em] uppercase">
                  aikyam
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default PersonalizedCard;
