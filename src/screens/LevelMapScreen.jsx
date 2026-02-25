import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '../hooks/useGameState';
import { LEVELS } from '../data/gameData';
import { ProgressBar, CrabMascot } from '../components/Shared';
import { Backpack, Trophy, Zap, ChevronRight, Lock, Home } from 'lucide-react';

export const LevelMapScreen = () => {
    const { state, dispatch } = useContext(GameContext);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-6 sm:gap-8">
            <header className="flex justify-between items-center bg-[#13131a] p-3 sm:p-4 rounded-3xl border border-white/5 sticky top-2 sm:top-4 z-50 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#14F195]/10 rounded-2xl flex items-center justify-center border border-[#14F195]/20">
                        <Zap size={20} className="text-[#14F195]" />
                    </div>
                    <div>
                        <p className="text-[9px] sm:text-[10px] font-bold text-[#94a3b8] uppercase tracking-[0.2em]">Tu Progreso</p>
                        <h2 className="text-lg sm:text-xl font-black text-white">{state.xp} <span className="text-[#14F195] text-xs sm:text-sm">XP</span></h2>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <button 
                      onClick={() => dispatch({ type: 'GO_TO_WELCOME'})}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 transition-all active:scale-95 group"
                      title="Volver al Inicio"
                    >
                        <Home size={18} className="text-slate-400 group-hover:text-[#14F195] transition-colors" />
                    </button>
                    <button 
                      onClick={() => dispatch({ type: 'GO_TO_BADGES'})}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 transition-all active:scale-95 group"
                      title="Insignias"
                    >
                        <Backpack size={18} className="text-slate-400 group-hover:text-[#9945ff] transition-colors" />
                    </button>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5" title="Trofeos">
                        <Trophy size={18} className="text-yellow-500" />
                    </div>
                </div>
            </header>

            <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="relative space-y-8 sm:space-y-12 pb-12"
            >
                {/* Visual Path Connector */}
                <div className="absolute left-[27px] sm:left-[31px] top-8 bottom-20 w-0.5 bg-gradient-to-b from-[#14F195]/50 via-[#9945ff]/50 to-transparent z-0" />

                {LEVELS.map((level, index) => {
                    const isUnlocked = level.id === 1 || state.completedLevels.includes(level.id - 1);
                    const isCompleted = state.completedLevels.includes(level.id);
                    const currentChallenges = state.completedChallenges.filter(id => level.challenges.some(c => c.id === id)).length;

                    // Section Headers
                    const renderHeader = () => {
                        if (level.id === 1 || level.id === 5) {
                            const isRust = level.id === 1;
                            const color = isRust ? '#14F195' : '#9945ff';
                            const title = isRust ? 'Fundamentos de Rust' : 'Solana Anchor Development';
                            const subtitle = isRust 
                                ? 'Domina la sintaxis y conceptos básicos.'
                                : 'Desarrollo de Programas (Smart Contracts).';
                            const sectionLabel = isRust ? 'Sección I' : 'Sección II';

                            return (
                                <div className={`${isRust ? 'mb-6 sm:mb-8' : 'mt-12 sm:mt-16 mb-6 sm:mb-8 border-t border-white/5 pt-10 sm:pt-12'} ml-4 sm:ml-2`}>
                                    <div className="flex items-center gap-2 mb-1" style={{ color }}>
                                        <div className="w-6 h-0.5 rounded-full" style={{ backgroundColor: color }} />
                                        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em]">{sectionLabel}</span>
                                    </div>
                                    <div className="pl-8 sm:pl-10">
                                        <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">{title}</h2>
                                        <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 max-w-[240px] sm:max-w-none">{subtitle}</p>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    };

                    return (
                        <React.Fragment key={level.id}>
                            {renderHeader()}
                            <motion.div 
                                variants={item}
                                className="relative z-10"
                            >
                                <button
                                  disabled={!isUnlocked}
                                  onClick={() => dispatch({ type: 'SELECT_LEVEL', payload: level.id })}
                                  className={`w-full group text-left transition-all duration-300 flex gap-3 sm:gap-6
                                    ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed grayscale opacity-50'}`}
                                >
                                    <div className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-[1.25rem] sm:rounded-3xl flex items-center justify-center text-lg sm:text-xl font-black shadow-lg transition-transform group-hover:scale-110
                                      ${isCompleted ? 'bg-[#22c55e]' : isUnlocked ? 'bg-[#13131a] border-2 border-[#1e1e2e]' : 'bg-[#0a0a0f] border-2 border-white/5'}`}
                                      style={{ 
                                        borderColor: isUnlocked && !isCompleted ? level.accent : undefined,
                                        boxShadow: isUnlocked && !isCompleted ? `0 10px 30px ${level.accent}20` : undefined
                                      }}
                                    >
                                        {isCompleted ? '✓' : isUnlocked ? level.id : <Lock size={18} className="text-slate-600" />}
                                    </div>

                                    <div className="flex-1 bg-[#13131a] p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 group-hover:border-white/20 transition-all shadow-xl min-w-0">
                                        <div className="flex justify-between items-start mb-1 sm:mb-2">
                                            <div className="min-w-0 pr-2">
                                                <p className="text-[8px] sm:text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest mb-0.5 sm:mb-1 truncate">Módulo {index + 1}</p>
                                                <h3 className="text-sm sm:text-lg font-black text-white truncate">{level.title}</h3>
                                            </div>
                                            {isUnlocked && <ChevronRight size={16} className="flex-shrink-0 text-slate-600 group-hover:text-[#14F195] transition-colors mt-0.5" />}
                                        </div>
                                        
                                        {isUnlocked ? (
                                            <div className="mt-3 sm:mt-4">
                                                <div className="flex justify-between text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-1.5 sm:mb-2">
                                                    <span>Progreso</span>
                                                    <span>{currentChallenges}/{level.challenges.length}</span>
                                                </div>
                                                <ProgressBar 
                                                    current={currentChallenges} 
                                                    total={level.challenges.length} 
                                                    color={level.accent}
                                                />
                                            </div>
                                        ) : (
                                            <p className="text-[9px] sm:text-xs text-slate-500 font-medium italic mt-1 sm:mt-2">Bloqueado</p>
                                        )}
                                    </div>
                                </button>
                            </motion.div>
                        </React.Fragment>
                    );
                })}
            </motion.div>

            <CrabMascot message="¡Buen trabajo! Cada bloque de código te acerca más a dominar Solana. Elige tu siguiente desafío." />
        </div>
    );
};
