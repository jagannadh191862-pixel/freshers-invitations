import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function OrganizedByFooter() {
  return (
    <footer className="relative py-20 border-t border-amber-500/20 bg-slate-950/80 z-10 px-4 overflow-hidden text-center">
      {/* Glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Organizer info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3"
        >
          <p className="font-serif-luxury text-xs font-semibold text-amber-400 tracking-[0.3em] uppercase">
            ORGANIZED BY
          </p>
          <h3 className="font-serif-luxury text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-wider uppercase">
            DEPARTMENT OF <span className="text-gold-gradient">AIML / CAI / CSD</span>
          </h3>
          <p className="font-sans-modern text-xs sm:text-sm text-slate-400">
            SRI VASAVI ENGINEERING COLLEGE (AUTONOMOUS), TADEPALLIGUDEM
          </p>
        </motion.div>

        {/* Divider line with aikyam logo */}
        <div className="flex items-center justify-center gap-4 max-w-xs mx-auto">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="font-serif-luxury text-xs font-bold text-amber-300 tracking-widest uppercase">
              aikyam
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </div>

        {/* Closing Motto */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-2 pt-2"
        >
          <p className="font-serif-luxury text-sm sm:text-base font-bold text-amber-200/90 tracking-widest uppercase">
            SEE YOU AT THE FRESHEST CHAPTER OF YOUR JOURNEY.
          </p>
          <p className="font-serif-luxury text-2xl font-black text-gold-shimmer">
            2K26
          </p>
        </motion.div>

        {/* Copyright */}
        <div className="pt-8 text-[11px] text-slate-500 font-sans-modern flex flex-col sm:flex-row items-center justify-between border-t border-slate-800/80 gap-3">
          <span>© 2026 Sri Vasavi Engineering College (A). All rights reserved.</span>
          <span className="flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by Department of AIML / CAI / CSD
          </span>
        </div>
      </div>
    </footer>
  );
}
