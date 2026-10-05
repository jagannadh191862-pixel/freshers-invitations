import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Flame, Mic, Music, Utensils, Gamepad2, Sparkles, Camera } from 'lucide-react';

const schedule = [
  {
    time: '9:30 AM – 10:00 AM',
    title: 'WELCOME & REGISTRATION',
    desc: 'Arrival of freshers, desk registration, badge collection and venue seating.',
    icon: UserCheck,
    tag: 'REGISTRATION'
  },
  {
    time: '10:00 AM – 11:00 AM',
    title: 'INAUGURATION & WELCOME',
    desc: 'Grand inauguration, traditional lamp lighting ceremony, & dignitary introductions.',
    icon: Flame,
    tag: 'CEREMONY'
  },
  {
    time: '11:00 AM – 12:00 PM',
    title: 'DIGNITARIES & FACULTY ADDRESS',
    desc: 'Inspirational addresses by Principal, HODs, faculty introductions & warm welcome.',
    icon: Mic,
    tag: 'ADDRESS'
  },
  {
    time: '12:00 PM – 1:00 PM',
    title: 'CULTURAL HOUR',
    desc: 'Electrifying dance routines, melody singing acts, and classical student performances.',
    icon: Music,
    tag: 'PERFORMANCES'
  },
  {
    time: '1:00 PM – 2:00 PM',
    title: 'LUNCH BREAK',
    desc: 'Sumptuous grand feast and vibrant social networking at the college dining hall.',
    icon: Utensils,
    tag: 'FEAST'
  },
  {
    time: '2:00 PM – 3:00 PM',
    title: 'FUN & INTERACTIVE SESSION',
    desc: 'Icebreaker games, fun fresher challenges, stage interactions, and spot prizes.',
    icon: Gamepad2,
    tag: 'INTERACTIVE'
  },
  {
    time: '3:00 PM – 4:00 PM',
    title: 'CULTURAL FINALE',
    desc: 'High-energy DJ performance, mega group dance, special guest performances & grand entertainment.',
    icon: Sparkles,
    tag: 'FINALE'
  },
  {
    time: '4:00 PM – 4:30 PM',
    title: 'CLOSING CEREMONY',
    desc: 'Vote of thanks, closing remarks, prize distributions & batch group photo session.',
    icon: Camera,
    tag: 'CLOSING'
  }
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="relative py-24 z-10 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-amber-300 uppercase mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>EVENT SCHEDULE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-wider uppercase"
        >
          THE DAY <span className="text-gold-gradient">AWAITS</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 font-sans-modern text-xs sm:text-sm mt-3 max-w-lg mx-auto"
        >
          Join us for a full day of celebration, inaugurations, cultural showcases, interactive sessions, and unforgettable memories.
        </motion.p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Central glowing connection line (desktop) / left line (mobile) */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-amber-500/10 via-amber-500/60 to-amber-500/10 -translate-x-1/2 z-0 hidden sm:block" />
        <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-gradient-to-b from-amber-500/10 via-amber-500/60 to-amber-500/10 z-0 sm:hidden" />

        <div className="space-y-8 sm:space-y-12">
          {schedule.map((item, idx) => {
            const Icon = item.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                  isEven ? 'sm:flex-row-reverse text-left sm:text-right' : 'sm:flex-row text-left'
                }`}
              >
                {/* Timeline node icon */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/30 z-10 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 text-amber-300" />
                </div>

                {/* Content Card */}
                <div className="w-full sm:w-[calc(50%-2.5rem)] ml-14 sm:ml-0">
                  <div className="glass-card glass-card-hover rounded-2xl p-5 border-amber-500/20 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold tracking-widest uppercase bg-amber-500/15 border border-amber-500/30 text-amber-300 px-2.5 py-0.5 rounded-full">
                        {item.tag}
                      </span>
                      <span className="text-xs font-bold text-slate-300 font-sans-modern tracking-wider">
                        {item.time}
                      </span>
                    </div>

                    <h3 className="font-serif-luxury font-bold text-base sm:text-lg text-slate-100 group-hover:text-amber-300 transition-colors uppercase">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 font-sans-modern mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
