import React from 'react';
import { INITIAL_LANGUAGE_COMPARISONS } from '../data/gameData';
import { CodeBlock } from './Shared';
import { X } from 'lucide-react';

export const LanguageComparison = ({ prevLang, category, isOpen, onClose }) => {
    if (!isOpen) return null;

    const data = INITIAL_LANGUAGE_COMPARISONS[prevLang]?.[category];

    if (!data) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-[#13131a] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔍</div>
                    <h3 className="text-xl font-bold text-white mb-2">Comparativa en camino</h3>
                    <p className="text-slate-400 text-sm mb-6">Estamos preparando los ejemplos para este reto específico. ¡Vuelve pronto!</p>
                    <button onClick={onClose} className="w-full py-3 bg-[#14F195] text-black font-bold rounded-xl active:scale-95 transition-all">Entendido</button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#13131a] border border-[#1e1e2e] rounded-3xl p-5 sm:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                        {prevLang === 'none' ? 'Conceptos de Rust' : `Comparativa: ${prevLang.toUpperCase()} vs Rust`}
                    </h3>
                    <button onClick={onClose} className="p-2 text-[#94a3b8] hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-xs text-[#94a3b8] mb-2 uppercase tracking-widest">{prevLang}</p>
                        <CodeBlock code={data.left} language={prevLang} />
                    </div>
                    <div>
                        <p className="text-xs text-[#94a3b8] mb-2 uppercase tracking-widest">Rust</p>
                        <CodeBlock code={data.right} />
                    </div>
                </div>

                <div className="space-y-3">
                    {data.diffs.map((diff, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-[#f1f5f9]">
                            <span className="text-[#a855f7]">✦</span>
                            <p>{diff}</p>
                        </div>
                    ))}
                </div>

                <button 
                  onClick={onClose}
                  className="w-full mt-8 py-3 bg-[#1e1e2e] hover:bg-[#2a2a3a] text-white rounded-xl transition-all"
                >
                    Entendido
                </button>
            </div>
        </div>
    );
};
