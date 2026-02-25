import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({ current, total, color = '#14F195' }) => (
  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${(current / total) * 100}%` }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-full"
      style={{ backgroundColor: color }}
    />
  </div>
);

export const CodeBlock = ({ code, language = 'rust', highlightLine = -1 }) => (
  <motion.pre 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 sm:p-5 rounded-3xl bg-[#0a0a0f] border border-white/5 font-mono text-xs sm:text-sm overflow-x-auto my-6 shadow-2xl"
  >
    <code className="text-[#f1f5f9]">
      {code.split('\n').map((line, i) => (
        <div key={i} className={`flex ${highlightLine === i ? 'bg-[#14F195]/20 -mx-4 sm:-mx-5 px-4 sm:px-5 border-l-2 border-[#14F195]' : ''}`}>
          <span className="opacity-20 mr-4 select-none w-6 text-right flex-shrink-0">{i + 1}</span>
          <span className="whitespace-pre">{line}</span>
        </div>
      ))}
    </code>
  </motion.pre>
);

export const CrabMascot = ({ message }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-start gap-5 bg-[#13131a] p-6 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#14F195]/5 blur-[30px] rounded-full" />
    <motion.span 
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-4xl"
    >
        🦀
    </motion.span>
    <div className="space-y-1">
        <p className="text-xs font-bold text-[#14F195] uppercase tracking-widest">Ferris el Cangrejo</p>
        <p className="text-slate-300 text-sm leading-relaxed italic">"{message}"</p>
    </div>
  </motion.div>
);
