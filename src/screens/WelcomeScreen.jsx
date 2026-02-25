import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '../hooks/useGameState';

export const WelcomeScreen = () => {
    const { state, dispatch } = useContext(GameContext);
    const [selected, setSelected] = useState('none');

    const langs = [
        { id: 'js', name: 'JavaScript', icon: '⚡', color: 'from-[#f7df1e]/20 to-[#f7df1e]/5' },
        { id: 'python', name: 'Python', icon: '🐍', color: 'from-[#3776ab]/20 to-transparent' }, 
        { id: 'java', name: 'Java', icon: '☕', color: 'from-[#9945FF]/20 to-[#14F195]/5' }, 
        { id: 'none', name: 'Ninguno', icon: '🥷', color: 'from-slate-500/20 to-slate-500/5' }
    ];

    const SolanaLogo = ({ className }) => (
        <svg viewBox="0 0 384 316" className={className} fill="currentColor">
            <path d="M28.09 308a10.45 10.45 0 007.45 3.09h320.37a10.45 10.45 0 007.45-17.81L289.43 220.8a10.45 10.45 0 00-7.44-3.09H61.62a10.45 10.45 0 00-7.44 17.81l273.93 72.48zM355.91 8.01a10.45 10.45 0 00-7.45-3.09H28.09a10.45 10.45 0 00-7.45 17.81L94.57 95.2a10.45 10.45 0 007.44 3.09h220.37a10.45 10.45 0 007.44-17.81L55.89 8.01zM102.01 200.56a10.45 10.45 0 007.45 3.09h320.37a10.45 10.45 0 007.45-17.81L363.35 113.36a10.45 10.45 0 00-7.44-3.09H35.54a10.45 10.45 0 00-7.44 17.81l273.91 72.48z" />
        </svg>
    );

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
            initial="hidden"
            animate="show"
            className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4"
        >
            {/* Background Image Container */}
            <motion.div 
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <img 
                    src="/welcome-bg.jpg" 
                    alt="Background" 
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
                <div className="absolute inset-0 bg-[#06060a]/50 z-10" /> {/* Darkened Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-transparent to-transparent z-20" />
            </motion.div>

            {/* Adventure Glow Backdrop (Supercharged Solana Aura) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#14F195]/20 blur-[140px] rounded-full" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1.1, 0.9, 1.1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-[#9945FF]/15 blur-[160px] rounded-full" 
                />
                <motion.div 
                    animate={{ 
                        x: [-20, 20, -20],
                        opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#14F195]/10 blur-[180px] rounded-full" 
                />
            </div>

            {/* Content Container */}
            <motion.div 
                variants={container}
                className="relative z-30 max-w-xl w-full py-8 sm:py-12 px-6 flex flex-col items-center text-center bg-[#0a0a0f]/60 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(20,241,149,0.05)]"
            >
                <motion.div
                    variants={item}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative mb-6 sm:mb-10 flex justify-center"
                >
                    <div className="absolute inset-0 bg-[#14F195] blur-[60px] opacity-20 rounded-full" />
                    <img
                        src="/logo.svg"
                        alt="RustVenture"
                        className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] drop-shadow-2xl"
                    />
                </motion.div>

                <motion.div variants={item} className="w-full space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                    <p className="text-[10px] sm:text-xs font-black text-[#14F195]/70 uppercase tracking-[0.3em] drop-shadow-md">Selecciona el lenguaje que conoces</p>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {langs.map(l => (
                            <motion.button
                              key={l.id}
                              whileHover={{ y: -4, scale: 1.02, backgroundColor: 'rgba(20,241,149,0.05)' }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelected(l.id)}
                              className={`relative p-4 sm:p-6 rounded-3xl border-2 transition-all duration-500 flex flex-col items-center gap-2 sm:gap-3 overflow-hidden backdrop-blur-md
                                ${selected === l.id 
                                    ? 'border-[#14F195] bg-[#14F195]/10 shadow-[0_0_30px_rgba(20,241,149,0.15)]' 
                                    : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}
                            >
                                {selected === l.id && (
                                    <motion.div 
                                        layoutId="selectedLangGlow"
                                        className="absolute inset-0 bg-gradient-to-br from-[#14F195]/20 to-transparent" 
                                    />
                                )}
                                <span className={`text-2xl sm:text-3xl relative z-10 filter transition-all duration-500 ${selected === l.id ? 'drop-shadow-[0_0_8px_rgba(20,241,149,0.5)]' : 'grayscale-[50%]'}`}>
                                    {l.icon}
                                </span>
                                <span className={`text-[10px] sm:text-xs font-black relative z-10 uppercase tracking-widest ${selected === l.id ? 'text-[#14F195]' : 'text-slate-500'}`}>
                                    {l.name}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={item} className="w-full">
                    <button
                      onClick={() => dispatch({ type: 'START_GAME', payload: selected })}
                      className="group relative w-full py-5 sm:py-6 flex items-center justify-center overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#0a0a0f] border border-[#14F195]/30 transition-all duration-300"
                    >
                        {/* High-Performance Glow Layer (Opacity-based pulse to avoid boxShadow flicker) */}
                        <motion.div 
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute inset-0 bg-[#14F195]/10 blur-[30px] rounded-full pointer-events-none"
                        />
                        {/* Animated Glassmorphic Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#14F195]/80 via-[#9945FF]/80 to-[#14F195]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Moving Gradient / Shimmer Mask (Solana Theme) */}
                        <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#14F195]/10 to-transparent skew-x-12 pointer-events-none"
                        />
                        
                        {/* Static Glass Look (Default) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#14F195] to-[#9945FF] opacity-40 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105" />
                        
                        {/* Inner Glow Border / Glass Layer */}
                        <div className="absolute inset-[1px] rounded-[1.95rem] sm:rounded-[2.45rem] bg-[#0a0a0f]/60 z-[5] overflow-hidden backdrop-blur-xl group-hover:bg-[#0a0a0f]/20 transition-all duration-500">
                             <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/10 to-[#9945FF]/10 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 px-8">
                            <motion.div
                                animate={{ 
                                    y: [0, -3, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                className="text-[#14F195] transition-all duration-500 drop-shadow-[0_0_10px_rgba(20,241,149,0.3)]"
                            >
                                <SolanaLogo className="w-5 h-5 sm:w-6 sm:h-6" />
                            </motion.div>
                            
                             <span className="text-base sm:text-xl font-black bg-gradient-to-r from-[#f97316] via-[#14f195] to-[#14f195] bg-clip-text text-transparent transition-all duration-500 uppercase tracking-tighter italic drop-shadow-sm group-hover:opacity-80">
                                Comenzar Aventura
                            </span>

                            <motion.div
                                initial={{ opacity: 0.5, scale: 0.8 }}
                                animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.1, 0.8] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-1.5 h-1.5 bg-[#14F195] rounded-full shadow-[0_0_10px_#14F195]"
                            />
                        </div>

                        {/* Hover Bloom Effect (Saturated) */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[#14F195] blur-3xl transition-opacity pointer-events-none" />
                    </button>
                </motion.div>
                {state.completedChallenges.length > 0 && (
                    <motion.p 
                        variants={item}
                        className="mt-6 sm:mt-8 text-[9px] sm:text-xs text-[#14F195]/60 font-black uppercase tracking-widest flex items-center gap-2 bg-[#14F195]/5 px-5 py-2 rounded-full border border-[#14F195]/10"
                        animate={{ 
                            opacity: [0.85, 1],
                            y: [0, -3]
                        }}
                        transition={{ 
                            repeat: Infinity, 
                            repeatType: "mirror",
                            duration: 3, 
                            ease: "easeInOut"
                        }}
                    >
                        <span className="w-1.5 h-1.5 bg-[#14F195]/30 rounded-full" />
                        Progreso detectado: {state.xp} XP
                    </motion.p>
                )}
            </motion.div>
        </motion.div>
    );
};
