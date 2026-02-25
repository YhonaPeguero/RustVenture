import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
    const socials = [
        { 
            name: 'GitHub', 
            url: 'https://github.com/YhonaPeguero', 
            icon: <Github size={18} />,
            color: 'hover:text-[#14F195]' 
        },
        { 
            name: 'LinkedIn', 
            url: 'https://www.linkedin.com/in/yhonatan-peguero/', 
            icon: <Linkedin size={18} />,
            color: 'hover:text-[#0077b5]' 
        },
        { 
            name: 'X (Twitter)', 
            url: 'https://x.com/thisnotmeeme', 
            icon: <Twitter size={18} />,
            color: 'hover:text-[#1DA1F2]' 
        }
    ];

    return (
        <footer className="relative w-full py-8 mt-auto border-t border-white/5 bg-[#0a0a0f]/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center sm:items-start gap-1">
                    <p className="text-[10px] font-black text-[#14F195] uppercase tracking-[0.3em]">
                        RustVenture
                    </p>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
                        Explora · Aprende · Construye
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    {socials.map((social) => (
                        <motion.a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -3, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`text-white/40 transition-colors duration-300 ${social.color}`}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </div>

                <div className="text-[9px] text-white/20 font-black uppercase tracking-[0.2em] text-center sm:text-right">
                    © {new Date().getFullYear()} Desarrollado por{" "}
                    <span className="text-white/40 group-hover:text-white transition-colors">
                        Yhona Peguero
                    </span>
                </div>
            </div>
        </footer>
    );
};
