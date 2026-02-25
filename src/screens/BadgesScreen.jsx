import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '../hooks/useGameState';
import { BADGES } from '../data/gameData';
import { CrabMascot } from '../components/Shared';
import { ArrowLeft, Award, Lock, Sparkles } from 'lucide-react';

export const BadgesScreen = () => {
    const { state, dispatch } = useContext(GameContext);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4 sm:gap-8">
            <header className="flex items-center gap-4 sm:gap-6 bg-[#13131a] p-3 sm:p-4 rounded-3xl border border-white/5 sticky top-2 sm:top-4 z-50 backdrop-blur-xl shadow-2xl">
                <button 
                    onClick={() => dispatch({ type: 'GO_TO_MAP' })} 
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 transition-all active:scale-95 text-[#14F195]"
                >
                    <ArrowLeft size={18} sm:size={20} />
                </button>
                <div>
                    <p className="text-[9px] sm:text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em]">Logros</p>
                    <h2 className="text-lg sm:text-xl font-black text-white">TU COLECCIÓN</h2>
                </div>
                <div className="ml-auto flex items-center gap-2 bg-[#14F195]/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-[#14F195]/20">
                    <Award size={14} sm:size={16} className="text-[#14F195]" />
                    <span className="text-[10px] sm:text-xs font-black text-[#14F195]">{state.unlockedBadges.length}/{BADGES.length}</span>
                </div>
            </header>

            <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-2.5 sm:gap-4"
            >
                {BADGES.map(badge => {
                    const isUnlocked = state.unlockedBadges.includes(badge.id);
                    return (
                        <motion.div 
                          key={badge.id}
                          variants={item}
                          whileHover={isUnlocked ? { y: -5, scale: 1.02 } : {}}
                          className={`relative p-4 sm:p-8 rounded-[1.25rem] sm:rounded-[2.5rem] border-2 flex flex-col items-center text-center transition-all duration-500 overflow-hidden
                            ${isUnlocked 
                                ? 'bg-[#13131a] border-[#14F195]/30 shadow-[0_20px_40px_rgba(20,241,149,0.1)]' 
                                : 'bg-[#0a0a0f] border-white/5 opacity-40 grayscale group'}`}
                        >
                            {isUnlocked && (
                                <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-[#14F195]/5 blur-[30px] rounded-full" />
                            )}
                            
                            <div className={`relative mb-3 sm:mb-6 transform transition-transform duration-500 ${isUnlocked ? 'group-hover:scale-110' : ''}`}>
                                {isUnlocked && (
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-gradient-to-r from-[#14F195]/20 to-transparent rounded-full blur-xl scale-150" 
                                    />
                                )}
                                <span className={`text-3xl sm:text-6xl relative z-10 block ${!isUnlocked ? 'opacity-20' : ''}`}>
                                    {isUnlocked ? badge.icon : '❓'}
                                </span>
                            </div>

                            <h3 className={`text-[9px] sm:text-sm font-black mb-1 sm:mb-2 uppercase tracking-widest relative z-10 ${isUnlocked ? 'text-white' : 'text-slate-600'}`}>
                                {isUnlocked ? badge.name : 'Bloqueado'}
                            </h3>
                            <p className="text-[7.5px] sm:text-[10px] text-slate-500 font-medium leading-relaxed mb-2 sm:mb-4 relative z-10 line-clamp-2">
                                {isUnlocked ? badge.description : 'Sigue aprendiendo.'}
                            </p>

                            {!isUnlocked && (
                                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/5 rounded-full border border-white/5">
                                    <Lock size={7} sm:size={8} className="text-slate-700" />
                                    <span className="text-[6px] sm:text-[7px] font-black text-slate-700 uppercase tracking-widest">Locked</span>
                                </div>
                            )}

                            {isUnlocked && (
                                <Sparkles size={10} className="text-[#14F195] opacity-30 absolute top-3 left-3" />
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
            
            <CrabMascot message="Cada línea de código Rust que escribes es un paso hacia la libertad financiera y técnica en el ecosistema Solana." />
        </div>
    );
};
