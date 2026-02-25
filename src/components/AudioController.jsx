import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '../utils/audio';

export const AudioController = () => {
    const [isMuted, setIsMuted] = useState(audioManager.isMuted);

    const toggleMute = () => {
        const newMutedState = audioManager.toggleMute();
        setIsMuted(newMutedState);
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="fixed bottom-6 right-6 z-[100] w-12 h-12 bg-[#13131a]/80 backdrop-blur-xl border border-white/5 rounded-2xl flex items-center justify-center text-[#14F195] shadow-2xl transition-all hover:bg-[#1e1e2e]"
            title={isMuted ? "Subir volumen" : "Silenciar"}
        >
            <AnimatePresence mode="wait">
                {isMuted ? (
                    <motion.div
                        key="mute"
                        initial={{ opacity: 0, rotate: -20 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 20 }}
                    >
                        <VolumeX size={20} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="volume"
                        initial={{ opacity: 0, rotate: -20 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 20 }}
                    >
                        <Volume2 size={20} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
