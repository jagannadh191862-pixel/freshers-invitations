import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, AlertCircle, Download, RefreshCw, CheckCircle2, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { searchStudentByRollNo, TOTAL_STUDENTS_COUNT } from '../data/studentsLookup';
import PersonalizedCard from './PersonalizedCard';

export default function InvitationSystemSection() {
  const [inputRollNo, setInputRollNo] = useState('');
  const [searching, setSearching] = useState(false);
  const [studentRecord, setStudentRecord] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const cardRef = useRef(null);
  const invitationSectionRef = useRef(null);

  // Sample roll numbers for user convenience
  const sampleRolls = ['26A85A6101', '26A81A6101', '26A81A6102', '26A81A6105'];

  const triggerGoldConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFF5C0', '#F5D77F', '#AA771C']
      });
    } catch (e) {
      console.log('Confetti error:', e);
    }
  };

  const handleGenerate = (e) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const cleanInput = inputRollNo.trim();
    if (!cleanInput) {
      setErrorMessage({
        title: 'Input Required',
        detail: 'Please enter your college roll number to proceed.'
      });
      return;
    }

    setSearching(true);

    setTimeout(() => {
      const found = searchStudentByRollNo(cleanInput);

      if (found) {
        setStudentRecord(found);
        setSearching(false);
        triggerGoldConfetti();

        // Smooth scroll to invitation card
        setTimeout(() => {
          if (invitationSectionRef.current) {
            invitationSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      } else {
        setSearching(false);
        setStudentRecord(null);
        setErrorMessage({
          title: 'Invitation not found',
          detail: 'Please check your roll number and try again.'
        });
      }
    }, 450);
  };

  const handleReset = () => {
    setStudentRecord(null);
    setInputRollNo('');
    setErrorMessage(null);
  };

  // High Resolution PNG Export
  const handleDownloadPNG = async () => {
    if (!cardRef.current || isExporting) return;
    setIsExporting(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
        filter: (node) => {
          // exclude buttons if any
          return !node.classList?.contains('no-export');
        }
      });

      const link = document.createElement('a');
      const filename = `Freshers_Party_2K26_Invitation_${studentRecord?.roll_no || 'Card'}.png`;
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('PNG Download failed:', err);
      alert('Could not export image directly. Please try taking a screenshot or try another browser.');
    } finally {
      setIsExporting(false);
    }
  };

  // PDF Export
  const handleDownloadPDF = async () => {
    if (!cardRef.current || isExporting) return;
    setIsExporting(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [600, 888]
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, 600, 888);
      pdf.save(`Freshers_Party_2K26_Invitation_${studentRecord?.roll_no || 'Card'}.pdf`);
    } catch (err) {
      console.error('PDF Download failed:', err);
      alert('Could not export PDF. Please download as PNG instead.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="invitation" ref={invitationSectionRef} className="relative py-24 z-10 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-amber-300 uppercase mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>PERSONALIZED INVITATION PORTAL</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-wider uppercase"
        >
          YOUR INVITATION <span className="text-gold-gradient">AWAITS</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 font-sans-modern text-xs sm:text-sm mt-3 max-w-md mx-auto"
        >
          Enter your official college roll number to unlock your customized Freshers’ Day 2K26 invitation pass.
        </motion.p>
      </div>

      {/* Verification Input Card */}
      {!studentRecord && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 sm:p-10 border-amber-500/30 max-w-xl mx-auto shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none" />

          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label htmlFor="roll-no-input" className="block text-xs font-bold tracking-widest text-amber-300 uppercase mb-2">
                ENTER YOUR ROLL NUMBER
              </label>
              <div className="relative">
                <input
                  id="roll-no-input"
                  type="text"
                  value={inputRollNo}
                  onChange={(e) => {
                    setInputRollNo(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="e.g. 26A85A6101"
                  className="w-full glass-input rounded-2xl py-4 px-5 pl-12 text-slate-100 font-mono text-base tracking-wider placeholder:text-slate-500 uppercase transition-all"
                  maxLength={15}
                  autoComplete="off"
                />
                <Search className="w-5 h-5 text-amber-400/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Quick Sample Roll Chips */}
            <div>
              <p className="text-[11px] font-medium text-slate-400 mb-2">TRY SAMPLE ROLL NUMBERS:</p>
              <div className="flex flex-wrap gap-2">
                {sampleRolls.map((roll) => (
                  <button
                    key={roll}
                    type="button"
                    onClick={() => {
                      setInputRollNo(roll);
                      setErrorMessage(null);
                    }}
                    className="text-xs font-mono font-semibold bg-slate-900/80 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 px-3 py-1 rounded-lg transition-colors"
                  >
                    {roll}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={searching}
              className="w-full relative group overflow-hidden py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 font-bold text-sm tracking-widest uppercase shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 active:scale-[0.99] disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {searching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    VERIFYING ROLL NUMBER...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                    GENERATE MY INVITATION
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </form>

          {/* Error Message Modal/Alert */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-start gap-3 text-left"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-red-300 uppercase">{errorMessage.title}</h4>
                  <p className="text-xs text-red-200/80 mt-0.5">{errorMessage.detail}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Secure Database Verified
            </span>
            <span>{TOTAL_STUDENTS_COUNT} Student Records Ready</span>
          </div>
        </motion.div>
      )}

      {/* Generated Invitation Card Display */}
      {studentRecord && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>INVITATION UNLOCKED SUCCESSFULLY FOR {studentRecord.full_name}</span>
          </div>

          {/* Invitation Card */}
          <PersonalizedCard ref={cardRef} student={studentRecord} />

          {/* Export & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto pt-4">
            <button
              onClick={handleDownloadPNG}
              disabled={isExporting}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'EXPORTING...' : 'DOWNLOAD INVITATION (PNG)'}
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 border border-amber-500/40 text-amber-300 font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-amber-500/15 transition-all disabled:opacity-50"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              DOWNLOAD PDF
            </button>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-amber-500/30 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              AGAIN
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
