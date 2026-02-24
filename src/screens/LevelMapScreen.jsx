import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '../hooks/useGameState';
import { LEVELS } from '../data/gameData';
import { ProgressBar, CrabMascot } from '../components/Shared';
import { Backpack, Trophy, Zap, ChevronRight, Lock } from 'lucide-react';

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
        <div className="max-w-xl mx-auto px-6 py-4 flex flex-col gap-8">
            <header className="flex justify-between items-center bg-[#13131a] p-4 rounded-3xl border border-white/5 sticky top-4 z-50 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#f97316]/10 rounded-2xl flex items-center justify-center border border-[#f97316]/20">
                        <Zap size={24} className="text-[#f97316]" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-[0.2em]">Tu Progreso</p>
                        <h2 className="text-xl font-black text-white">{state.xp} <span className="text-[#f97316] text-sm">XP</span></h2>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <button 
                      onClick={() => dispatch({ type: 'GO_TO_BADGES'})}
                      className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 transition-all active:scale-95"
                    >
                        <Backpack size={20} className="text-slate-400" />
                    </button>
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                        <Trophy size={20} className="text-yellow-500" />
                    </div>
                </div>
            </header>

            <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="relative space-y-12 pb-12"
            >
                {/* Visual Path Connector */}
                <div className="absolute left-[31px] top-8 bottom-20 w-0.5 bg-gradient-to-b from-[#f97316]/50 via-[#f97316]/10 to-transparent z-0" />

                {LEVELS.map((level, index) => {
                    const isUnlocked = level.id === 1 || state.completedLevels.includes(level.id - 1);
                    const isCompleted = state.completedLevels.includes(level.id);
                    const currentChallenges = state.completedChallenges.filter(id => level.challenges.some(c => c.id === id)).length;

                    return (
                        <motion.div 
                            key={level.id} 
                            variants={item}
                            className="relative z-10"
                        >
                            <button
                              disabled={!isUnlocked}
                              onClick={() => dispatch({ type: 'SELECT_LEVEL', payload: level.id })}
                              className={`w-full group text-left transition-all duration-300 flex gap-6
                                ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed grayscale opacity-50'}`}
                            >
                                <div className={`flex-shrink-0 w-16 h-16 rounded-3xl flex items-center justify-center text-xl font-black shadow-lg transition-transform group-hover:scale-110
                                  ${isCompleted ? 'bg-[#22c55e]' : isUnlocked ? 'bg-[#13131a] border-2 border-[#1e1e2e]' : 'bg-[#0a0a0f] border-2 border-white/5'}`}
                                  style={{ 
                                    borderColor: isUnlocked && !isCompleted ? level.accent : undefined,
                                    boxShadow: isUnlocked && !isCompleted ? `0 10px 30px ${level.accent}20` : undefined
                                  }}
                                >
                                    {isCompleted ? '✓' : isUnlocked ? level.id : <Lock size={20} className="text-slate-600" />}
                                </div>

                                <div className="flex-1 bg-[#13131a] p-6 rounded-[2rem] border border-white/5 group-hover:border-white/20 transition-all shadow-xl">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-[10px] font-bold text-[#f97316] uppercase tracking-widest mb-1">Módulo {index + 1}</p>
                                            <h3 className="text-lg font-black text-white">{level.title}</h3>
                                        </div>
                                        {isUnlocked && <ChevronRight size={20} className="text-slate-600 group-hover:text-[#f97316] transition-colors" />}
                                    </div>
                                    
                                    {isUnlocked ? (
                                        <div className="mt-4">
                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-2">
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
                                        <p className="text-xs text-slate-500 font-medium italic mt-2">Completa el módulo anterior para desbloquear</p>
                                    )}
                                </div>
                            </button>
                        </motion.div>
                    );
                })}
            </motion.div>

            <CrabMascot message="¡Buen trabajo! Cada bloque de código te acerca más a dominar Solana. Elige tu siguiente desafío." />
        </div>
    );
};
