import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '../hooks/useGameState';

export const WelcomeScreen = () => {
    const { state, dispatch } = useContext(GameContext);
    const [selected, setSelected] = useState('none');

    const langs = [
        { id: 'js', name: 'JavaScript', icon: '⚡', color: 'from-[#f7df1e]/20 to-[#f7df1e]/5' },
        { id: 'python', name: 'Python', icon: '🐍', color: 'from-[#3776ab]/20 to-[#3776ab]/5' },
        { id: 'java', name: 'Java', icon: '☕', color: 'from-[#ed8b00]/20 to-[#ed8b00]/5' },
        { id: 'none', name: 'Ninguno', icon: '🥷', color: 'from-slate-500/20 to-slate-500/5' }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-xl mx-auto py-12 px-6 flex flex-col items-center text-center"
        >
            <motion.div
                variants={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mb-10 flex justify-center"
            >
                <div className="absolute inset-0 bg-[#f97316] blur-[60px] opacity-10 rounded-full" />
                <img
                    src="/logo.svg"
                    alt="RustVenture"
                    className="relative z-10 w-full max-w-[320px] drop-shadow-2xl"
                />
            </motion.div>

            <motion.div variants={item} className="w-full space-y-6 mb-12">
                <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-[0.2em]">Selecciona el lenguaje que conoces</p>
                <div className="grid grid-cols-2 gap-4">
                    {langs.map(l => (
                        <motion.button
                          key={l.id}
                          whileHover={{ y: -4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelected(l.id)}
                          className={`relative p-6 rounded-3xl border transition-all duration-300 flex flex-col items-center gap-3 overflow-hidden
                            ${selected === l.id 
                                ? 'border-[#f97316] bg-[#f97316]/10' 
                                : 'border-white/5 bg-[#13131a] hover:border-white/10'}`}
                        >
                            {selected === l.id && (
                                <motion.div 
                                    layoutId="selectedLang"
                                    className="absolute inset-0 bg-gradient-to-br from-[#f97316]/10 to-transparent" 
                                />
                            )}
                            <span className="text-3xl relative z-10">{l.icon}</span>
                            <span className={`text-sm font-bold relative z-10 ${selected === l.id ? 'text-[#f97316]' : 'text-slate-400'}`}>
                                {l.name}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            <motion.div variants={item} className="w-full">
                <button
                  onClick={() => dispatch({ type: 'START_GAME', payload: selected })}
                  className="group relative w-full py-5 bg-[#f97316] hover:bg-[#ea580c] text-white font-black rounded-3xl shadow-[0_20px_40px_rgba(249,115,22,0.15)] transition-all overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        COMENZAR AVENTURA <span className="opacity-50">→</span>
                    </span>
                </button>
            </motion.div>

            {state.completedChallenges.length > 0 && (
                <motion.p 
                    variants={item}
                    className="mt-8 text-sm text-[#94a3b8] flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5"
                >
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Progreso recuperado: <b>{state.xp} XP</b>
                </motion.p>
            )}
        </motion.div>
    );
};
