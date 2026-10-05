import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, IdCard, Ban, Car, Flame, AlertOctagon, UserX, Cake } from 'lucide-react';

const guidelines = [
  {
    id: 1,
    rule: 'All the students must wear ID card.',
    icon: IdCard,
    type: 'mandatory'
  },
  {
    id: 2,
    rule: 'Banners in all forms are not allowed.',
    icon: Ban,
    type: 'prohibited'
  },
  {
    id: 3,
    rule: 'Student/Outers vehicles are not allowed into the campus.',
    icon: Car,
    type: 'prohibited'
  },
  {
    id: 4,
    rule: 'Fireworks are not allowed.',
    icon: Flame,
    type: 'prohibited'
  },
  {
    id: 5,
    rule: 'Any violation of the college rules will be viewed seriously.',
    icon: AlertOctagon,
    type: 'warning'
  },
  {
    id: 6,
    rule: 'Outers are not allowed into the campus.',
    icon: UserX,
    type: 'prohibited'
  },
  {
    id: 7,
    rule: 'Cake cuttings are not allowed.',
    icon: Cake,
    type: 'prohibited'
  }
];

export default function GuidelinesSection() {
  return (
    <section id="guidelines" className="relative py-24 z-10 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/10 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-red-300 uppercase mb-3"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
          <span>IMPORTANT RULES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-wider uppercase"
        >
          EVENT <span className="text-gold-gradient">GUIDELINES</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 font-sans-modern text-xs sm:text-sm mt-3 max-w-md mx-auto"
        >
          Please adhere strictly to the college regulations to ensure a smooth, dignified, and enjoyable celebration.
        </motion.p>
      </div>

      {/* Grid of Glassmorphism Rule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {guidelines.map((item, idx) => {
          const Icon = item.icon;
          const isWarning = item.type === 'warning';
          const isMandatory = item.type === 'mandatory';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className={`glass-card glass-card-hover rounded-2xl p-5 border relative overflow-hidden flex items-start gap-4 ${
                isWarning
                  ? 'border-amber-500/40 bg-amber-950/20'
                  : isMandatory
                  ? 'border-cyan-500/40 bg-cyan-950/20'
                  : 'border-red-500/20 bg-slate-950/40'
              }`}
            >
              {/* Rule Number Badge */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                  isWarning
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : isMandatory
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-red-500/20 text-red-300 border border-red-500/40'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    RULE #{item.id}
                  </span>
                </div>
                <p className="font-sans-modern font-semibold text-xs sm:text-sm text-slate-200 leading-snug">
                  {item.rule}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
