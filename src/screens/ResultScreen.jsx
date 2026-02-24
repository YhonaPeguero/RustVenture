import React, { useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameContext } from '../hooks/useGameState';
import { BADGES } from '../data/gameData';
import { Trophy, Star, Zap, Map, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';

export const ResultScreen = () => {
    const { state, dispatch } = useContext(GameContext);

    useEffect(() => {
        const result = state.lastResult;
        if (!result) return;

        if (result.levelFinished) {
            // Full level celebration: fanfare + confetti
            audioManager.playSFX('success');

            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);
                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

            return () => clearInterval(interval);
        } else {
            // Mid-level: subtle ping
            audioManager.playSFX('correct');
        }
    }, []);

    const result = state.lastResult;

    const handleNextStep = () => {
        if (result.levelFinished) {
            dispatch({ type: 'GO_TO_MAP' });
        } else {
            dispatch({ type: 'NEXT_CHALLENGE' });
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const card = {
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl mx-auto py-8 px-6 flex flex-col items-center text-center"
        >
            <motion.div 
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 10 }}
                className="relative mb-8"
            >
                <div className="absolute inset-0 bg-yellow-500 blur-[60px] opacity-20" />
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-[2rem] flex items-center justify-center shadow-2xl relative z-10">
                    <Trophy size={48} className="text-white" />
                </div>
            </motion.div>

            <motion.div variants={card} className="space-y-2 mb-12">
                <h2 className="text-5xl font-black text-white tracking-tight">¡RETO SUPERADO!</h2>
                <div className="flex items-center justify-center gap-2 text-[#94a3b8] font-bold tracking-[0.2em] text-xs uppercase">
                    <Star size={14} className="text-yellow-500" />
                    <span>Nivel {state.level} • Desafío {state.challengeIndex + 1}</span>
                    <Star size={14} className="text-yellow-500" />
                </div>
            </motion.div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <motion.div variants={card} className="bg-[#13131a] p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 blur-[30px] rounded-full" />
                    <Zap className={`mb-2 opacity-50 ${result?.alreadyCompleted ? 'text-slate-500' : 'text-green-500'}`} size={20} />
                    <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em] mb-1">XP ACUMULADA</p>
                    <p className={`text-4xl font-black ${result?.alreadyCompleted ? 'text-slate-500' : 'text-green-500'}`}>
                        +{result?.xpGained}
                    </p>
                    {result?.alreadyCompleted ? (
                        <div className="mt-3 inline-block px-3 py-1 bg-slate-700/30 rounded-full border border-slate-600/30">
                            <span className="text-[10px] text-slate-400 font-black uppercase">Ya completado ✓</span>
                        </div>
                    ) : result?.bonus && (
                        <div className="mt-3 inline-block px-3 py-1 bg-[#f97316]/10 rounded-full border border-[#f97316]/20">
                            <span className="text-[10px] text-[#f97316] font-black uppercase">PERFECTO 🔥</span>
                        </div>
                    )}
                </motion.div>

                <motion.div variants={card} className="bg-[#13131a] p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#a855f7]/5 blur-[30px] rounded-full" />
                    <Star className="text-[#a855f7] mb-2 opacity-50" size={20} />
                    <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em] mb-1">RACHA ACTUAL</p>
                    <p className="text-4xl font-black text-[#a855f7]">{state.streak}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">RETOS SEGUIDOS</p>
                </motion.div>
            </div>

            {result?.newBadges.length > 0 && (
                <motion.div variants={card} className="w-full mb-12">
                    <p className="text-[10px] font-black text-[#f97316] uppercase mb-6 tracking-[0.3em]">NUEVAS INSIGNIAS</p>
                    <div className="flex justify-center gap-6">
                        {result.newBadges.map((id, i) => {
                            const badge = BADGES.find(b => b.id === id);
                            return (
                                <motion.div 
                                    key={id} 
                                    initial={{ scale: 0, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.1), type: "spring" }}
                                    className="relative group"
                                >
                                    <div className="absolute inset-0 bg-[#f97316]/20 blur-[20px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="w-20 h-20 bg-[#1e1e2e] rounded-3xl flex items-center justify-center text-4xl shadow-2xl border-2 border-white/5 group-hover:border-[#f97316]/50 transition-all relative z-10">
                                        {badge.icon}
                                    </div>
                                    <p className="mt-3 text-[10px] font-black text-white uppercase tracking-widest">{badge.name}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            )}

            <motion.div variants={card} className="w-full">
                <button
                  onClick={handleNextStep}
                  className="group relative w-full py-6 bg-white text-black font-black rounded-3xl transition-all shadow-2xl shadow-white/5 overflow-hidden flex items-center justify-center gap-2"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    <span className="relative z-10 uppercase tracking-widest">
                        {result?.levelFinished ? 'VOLVER AL MAPA' : 'SIGUIENTE DESAFÍO'}
                    </span>
                    {result?.levelFinished ? <Map size={20} /> : <ChevronRight size={20} />}
                </button>
            </motion.div>
        </motion.div>
    );
};
