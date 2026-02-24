import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameContext } from '../hooks/useGameState';
import { LEVELS } from '../data/gameData';
import { ProgressBar, CodeBlock } from '../components/Shared';
import { LanguageComparison } from '../components/LanguageComparison';
import { X, CheckCircle2, AlertCircle, Info, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
import { audioManager } from '../utils/audio';

export const ChallengeScreen = () => {
    const { state, dispatch } = useContext(GameContext);
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [feedbackType, setFeedbackType] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const [isComparisonOpen, setIsComparisonOpen] = useState(false);

    const level = LEVELS.find(l => l.id === state.level);
    const challenge = level.challenges[state.challengeIndex];

    const handleSubmit = () => {
        let isCorrect = false;
        if (challenge.type === 'A') isCorrect = selectedOption === challenge.correct;
        if (challenge.type === 'B') isCorrect = inputValue.trim().toLowerCase() === challenge.answer.toLowerCase();
        if (challenge.type === 'C') isCorrect = selectedOption === challenge.correct;

        const handleCorrectAnswer = () => {
            setFeedbackType('success');
            setIsFeedbackOpen(true);
            audioManager.playSFX('correct');
        };

        if (isCorrect) {
            handleCorrectAnswer();
        } else {
            setFeedbackType('error');
            setIsFeedbackOpen(true);
            setAttempts(a => a + 1);
        }
    };

    const handleNext = () => {
        setIsFeedbackOpen(false);
        dispatch({ 
            type: 'COMPLETE_CHALLENGE', 
            payload: { id: challenge.id, noErrors: attempts === 0 } 
        });
    };

    const handleTryAgain = () => {
        setIsFeedbackOpen(false);
        setSelectedOption(null);
        setInputValue('');
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-4 h-full flex flex-col gap-6">
            <header className="flex flex-col sm:flex-row justify-between items-center bg-[#13131a]/50 p-4 rounded-3xl border border-white/5 backdrop-blur-md gap-4">
                <button 
                    onClick={() => dispatch({ type: 'GO_TO_MAP' })} 
                    className="flex items-center gap-2 text-[#94a3b8] hover:text-white transition-colors font-bold text-[10px] sm:text-xs tracking-widest"
                >
                    <X size={16} /> SALIR
                </button>
                <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-[#f97316] uppercase tracking-[0.2em] mb-1">PROGRESO</span>
                        <div className="w-24 sm:w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${((state.challengeIndex) / 3) * 100}%` }}
                                className="h-full bg-[#f97316]"
                            />
                        </div>
                    </div>
                    <div className="bg-[#f97316]/10 px-3 sm:px-4 py-2 rounded-2xl border border-[#f97316]/20">
                        <span className="text-[9px] sm:text-xs font-black text-[#f97316]">RETO {state.challengeIndex + 1}/3</span>
                    </div>
                </div>
            </header>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 items-start"
            >
                {/* Left Side: Question and Context */}
                <div className="space-y-6">
                    <div className="bg-[#13131a] p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f97316]/5 blur-[40px] rounded-full" />
                        <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-4 relative z-10">
                            {challenge.question}
                        </h2>
                        <div className="flex items-center gap-3 text-slate-400 text-xs sm:text-sm font-medium relative z-10">
                            <div className="p-1.5 sm:p-2 bg-white/5 rounded-lg">
                                <BookOpen size={14} className="text-[#f97316]" />
                            </div>
                            <span>Lee el código y encuentra la solución.</span>
                        </div>
                    </div>

                    {(challenge.type === 'B') && (
                        <div className="bg-[#0a0a0f] rounded-3xl overflow-hidden border border-white/5 shadow-inner">
                            <div className="bg-white/5 px-4 sm:px-6 py-3 flex items-center justify-between border-b border-white/5">
                                <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-[0.2em]">contract.rs</span>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-500/20" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                                    <div className="w-2 h-2 rounded-full bg-green-500/20" />
                                </div>
                            </div>
                            <CodeBlock code={challenge.code} />
                        </div>
                    )}

                    {challenge.type === 'C' && (
                        <div className="bg-[#13131a] p-5 sm:p-6 rounded-3xl border border-white/5">
                            <p className="text-[10px] font-black text-[#f97316] uppercase tracking-[0.2em] mb-4">Depura el error:</p>
                            <div className="space-y-1 font-mono text-xs sm:text-sm">
                                {challenge.lines.map((line, i) => (
                                    <motion.button
                                      key={i}
                                      whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.03)' }}
                                      onClick={() => setSelectedOption(i)}
                                      className={`w-full group text-left flex items-center gap-4 py-2 px-3 sm:px-4 rounded-xl transition-all
                                        ${selectedOption === i 
                                            ? 'bg-red-500/10 text-red-400 border border-red-500/30' 
                                            : 'text-slate-400 hover:text-white border border-transparent'}`}
                                    >
                                        <span className={`text-[10px] font-bold w-4 text-right ${selectedOption === i ? 'text-red-400' : 'opacity-20'}`}>
                                            {i + 1}
                                        </span>
                                        <span className="whitespace-pre overflow-x-hidden text-ellipsis">{line}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Options/Input */}
                <div className="space-y-6">
                    {challenge.type === 'A' && (
                        <div className="space-y-3">
                            <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] px-4">Selecciona una opción:</p>
                            {challenge.options.map((opt, i) => (
                                <motion.button
                                  key={i}
                                  whileHover={{ x: 8 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setSelectedOption(i)}
                                  className={`w-full p-4 sm:p-6 min-h-[4rem] sm:h-20 rounded-[1.5rem] sm:rounded-3xl border text-left transition-all flex items-center gap-4
                                    ${selectedOption === i 
                                        ? 'border-[#f97316] bg-[#f97316]/10 text-white shadow-lg shadow-[#f97316]/5' 
                                        : 'border-white/5 bg-[#13131a] text-slate-300 hover:border-white/20'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0
                                        ${selectedOption === i ? 'bg-[#f97316] text-white' : 'bg-white/5 text-slate-500'}`}>
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                    <span className="font-bold text-sm sm:text-base">{opt}</span>
                                </motion.button>
                            ))}
                        </div>
                    )}

                    {challenge.type === 'B' && (
                        <div className="bg-[#13131a] p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 space-y-4">
                            <div className="flex items-center gap-2 text-[#94a3b8] mb-2">
                                <Info size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Escribe la respuesta</span>
                            </div>
                            <input 
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="P. ej. Pubkey o String..."
                                className="w-full bg-[#0a0a0f] border-2 border-white/5 rounded-2xl p-4 sm:p-5 text-base sm:text-lg font-bold text-white focus:outline-none focus:border-[#f97316] focus:bg-[#f97316]/5 transition-all placeholder:text-slate-700"
                            />
                        </div>
                    )}

                    {/* Hints & Help */}
                    <div className="bg-gradient-to-br from-[#a855f7]/10 to-transparent p-5 sm:p-6 rounded-3xl border border-[#a855f7]/20 flex gap-4">
                        <div className="p-2.5 sm:p-3 bg-[#a855f7]/20 rounded-2xl h-fit">
                            <Lightbulb className="text-[#a855f7]" size={18} sm:size={20} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-white uppercase tracking-widest">¿Necesitas ayuda?</p>
                            <p className="text-[10px] sm:text-xs text-[#94a3b8] leading-relaxed">Compara Rust con el lenguaje que ya conoces.</p>
                            <button 
                                onClick={() => setIsComparisonOpen(true)}
                                className="text-[10px] sm:text-xs font-bold text-[#a855f7] hover:underline flex items-center gap-1 mt-2"
                            >
                                COMPARAR CON {state.language.toUpperCase()} <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>

                    <button 
                      onClick={handleSubmit}
                      disabled={challenge.type === 'B' ? !inputValue : selectedOption === null}
                      className="group relative w-full py-5 sm:py-6 bg-[#f97316] disabled:opacity-30 disabled:grayscale hover:bg-[#ea580c] text-white font-black rounded-[1.5rem] sm:rounded-3xl transition-all shadow-2xl shadow-orange-950/20 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        <span className="relative z-10 text-base sm:text-lg uppercase tracking-widest">COMPROBAR CÓDIGO</span>
                    </button>
                </div>
            </motion.div>

            {/* Feedback Overlay */}
            <AnimatePresence>
                {isFeedbackOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 perspective-1000">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#06060a]/90 backdrop-blur-xl"
                            onClick={feedbackType === 'error' ? handleTryAgain : undefined}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 50, rotateX: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50, rotateX: -20 }}
                            className={`relative w-full max-w-lg bg-[#13131a] border-2 rounded-[2.5rem] sm:rounded-[3rem] p-5 sm:p-8 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden
                                ${feedbackType === 'success' ? 'border-green-500/30' : 'border-red-500/30'}`}
                        >
                            {/* Animated Background Decoration */}
                            <div className={`absolute -top-20 -right-20 w-64 h-64 blur-[100px] opacity-20 rounded-full
                                ${feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'}`} 
                            />

                            <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 relative z-10">
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: feedbackType === 'success' ? [0, 10, -10, 10, 0] : 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className={`w-14 h-14 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-2xl sm:text-5xl shadow-2xl
                                        ${feedbackType === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}
                                >
                                    {feedbackType === 'success' ? '🦀' : '⚠️'}
                                </motion.div>

                                <div className="space-y-1 sm:space-y-2">
                                    <h3 className={`text-xl sm:text-4xl font-black ${feedbackType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                        {feedbackType === 'success' ? '¡COMPILADO!' : '¡ERROR!'}
                                    </h3>
                                    <p className="text-[10px] sm:text-slate-400 font-medium px-4">
                                        {feedbackType === 'success' 
                                            ? 'Tu código es seguro y eficiente.' 
                                            : 'Revisa tu lógica e inténtalo de nuevo.'}
                                    </p>
                                </div>

                                <div className="w-full bg-white/5 rounded-2xl sm:rounded-3xl p-3 sm:p-6 text-left border border-white/5 space-y-2 sm:space-y-4">
                                    {feedbackType === 'error' ? (
                                        <>
                                            <div className="flex items-center gap-2 text-red-400">
                                                <AlertCircle size={14} />
                                                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest">Fallo</span>
                                            </div>
                                            <p className="text-[10px] sm:text-sm text-slate-200 leading-relaxed font-medium">{challenge.explanation}</p>
                                        </>
                                    ) : (
                                        <div className="space-y-3 sm:space-y-6">
                                            <p className="text-[10px] sm:text-sm text-slate-200 leading-relaxed font-medium text-center">{challenge.explanation}</p>
                                            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                                <div className="bg-white/5 p-2 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 flex flex-col items-center">
                                                    <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5 sm:mb-1">XP</span>
                                                    <span className="text-base sm:text-2xl font-black text-green-500">+100</span>
                                                </div>
                                                <div className="bg-white/5 p-2 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 flex flex-col items-center">
                                                    <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5 sm:mb-1">STREAK</span>
                                                    <span className="text-base sm:text-2xl font-black text-[#f97316]">{attempts === 0 ? '+50' : '0'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <motion.button 
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={feedbackType === 'success' ? handleNext : handleTryAgain}
                                  className={`w-full py-3 sm:py-5 rounded-xl sm:rounded-[2rem] font-black text-white text-sm sm:text-lg shadow-2xl transition-all
                                    ${feedbackType === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                                >
                                    {feedbackType === 'success' ? 'CONTINUAR' : 'REINTENTAR'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <LanguageComparison 
                prevLang={state.language} 
                category={challenge.comparisonKey} 
                isOpen={isComparisonOpen} 
                onClose={() => setIsComparisonOpen(false)} 
            />
        </div>
    );
};
