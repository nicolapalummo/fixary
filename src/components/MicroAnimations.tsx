/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable react-hooks/purity */
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useMemo } from "react";

const iconProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "w-full h-full text-primary"
};

const transition: Transition = {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
};

export function AnimVision() {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <svg {...iconProps} className="w-full h-full text-primary drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                {/* Eye Shape */}
                <motion.path
                    d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={transition}
                />
                {/* Pupil */}
                <motion.circle
                    cx="12" cy="12" r="3"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ ...transition, delay: 0.5 }}
                />
                {/* Rays */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <motion.line
                        key={i}
                        x1="12" y1="12" x2="12" y2="4"
                        transform={`rotate(${angle} 12 12)`}
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: [0, 1, 0], pathLength: [0, 1, 0] }}
                        transition={{ ...transition, delay: 1 + i * 0.1, duration: 2 }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function AnimCoding() {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <svg {...iconProps} className="w-full h-full text-primary drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                <motion.polyline
                    points="16 18 22 12 16 6"
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ ...transition, duration: 1.5 }}
                />
                <motion.polyline
                    points="8 6 2 12 8 18"
                    initial={{ x: 5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ ...transition, duration: 1.5 }}
                />
                <motion.line
                    x1="10" y1="20" x2="14" y2="4" // Slash
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ ...transition, delay: 0.5 }}
                />
            </svg>
        </div>
    );
}

export function AnimScan() {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <svg {...iconProps} className="w-full h-full text-primary drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />

                {/* Scan Line */}
                <motion.line
                    x1="2" y1="12" x2="22" y2="12"
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: [-8, 8, -8], opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    strokeWidth={2}
                    className="text-white"
                />

                {/* Document Rect */}
                <motion.rect
                    x="7" y="7" width="10" height="10" rx="1"
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </svg>
        </div>
    );
}

export function AnimLaunch() {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <svg {...iconProps} className="w-full h-full text-primary drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                <motion.path
                    d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
                    animate={{ y: [0, -2, 0], x: [0, -2, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.path
                    d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
                    initial={{ y: 20, x: -20, opacity: 0 }}
                    animate={{ y: 0, x: 0, opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.path
                    d="M9 9 5 5"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: [0, 1, 0], pathLength: [0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                />
                <motion.path
                    d="M15 15 19 19"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: [0, 1, 0], pathLength: [0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                />
            </svg>
        </div>
    );
}

export function AnimReview() {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <svg {...iconProps} className="w-full h-full text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <motion.circle
                    cx="11" cy="11" r="8"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.path
                    d="m21 21-4.3-4.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                />
                {/* Scanning content inside */}
                <motion.path
                    d="M8 11h6M8 14h3M8 8h6"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, staggerChildren: 0.2, repeat: Infinity, repeatDelay: 2 }}
                />
            </svg>
        </div>
    )
}

export function AnimKey() {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <svg {...iconProps} className="w-full h-full text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <motion.circle
                    cx="7.5" cy="15.5" r="5.5"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                    d="m21 2-9.6 9.6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                />
                <path d="m15.5 7.5 3 3L22 7l-3-3" />
            </svg>
        </div>
    )
}

export function AnimShield() {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <svg {...iconProps} className="w-full h-full text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <motion.path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                />
                <motion.path
                    d="m9 12 2 2 4-4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
                />
            </svg>
        </div>
    )
}

// --- COMPLEX ANIMATIONS (Redesign) ---

export function ComplexAnimVision() {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            {/* Ambient Glow (Back) */}
            <motion.div
                className="absolute w-32 h-32 bg-primary/20 rounded-full blur-[40px]"
                animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Rising Particles (Ideas) */}
            <VisionParticles />

            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="z-10 relative">
                <defs>
                    <linearGradient id="bulbGradient" x1="12" y1="2" x2="12" y2="22">
                        <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="white" stopOpacity="0.05" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Base/Socket */}
                <path d="M9 18h6" stroke="#666" strokeWidth="1" strokeLinecap="round" />
                <path d="M10 21h4" stroke="#666" strokeWidth="1" strokeLinecap="round" />

                {/* Bulb Glass */}
                <motion.path
                    d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5a6 6 0 0 0-12 0c0 1.5.5 2.5 1.5 3.5.8.8 1.3 1.5 1.5 2.5"
                    fill="url(#bulbGradient)"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="0.5"
                />

                {/* Filament (The core idea) */}
                <motion.path
                    d="M9 18 C 9 14, 8 10, 12 10 C 16 10, 15 14, 15 18"
                    stroke="#FFD700"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0.2 }}
                    animate={{
                        pathLength: 1,
                        opacity: [0.2, 1, 0.2],
                        strokeWidth: [1, 2, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    filter="url(#glow)"
                />

                {/* Inner Glow Pulse (The Light) */}
                <motion.circle
                    cx="12" cy="11" r="5"
                    fill="#FFD700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="blur-md"
                />

                {/* Fine Light Rays (Expanded) */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <motion.line
                        key={i}
                        x1="12" y1="1" x2="12" y2="4"
                        transform={`rotate(${angle} 12 12) translateY(-6px)`}
                        stroke="#FFD700"
                        strokeWidth="1"
                        strokeLinecap="round"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.1 // Slight lag after filament heats up
                        }}
                    />
                ))}
            </svg>
        </div>
    )
}



import imgCursor from "../assets/images/cursor.png"
import imgWindsurf from "../assets/images/windsurf.png"
import imgReplit from "../assets/images/replit.png"
import imgClaude from "../assets/images/claude.png"
import imgGemini from "../assets/images/gemini.png"
import imgChatGPT from "../assets/images/chatGPT.png"

export function ComplexAnimCoding() {
    const logos = [imgCursor, imgWindsurf, imgReplit, imgClaude, imgGemini, imgChatGPT]


    return (
        <div className="w-full h-full flex items-center justify-center relative">
            {/* Window Container */}
            <motion.div
                className="w-32 h-24 bg-surface border border-white/10 rounded-lg overflow-hidden shadow-xl z-10 relative"
                initial={{ y: 0 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Window Header */}
                <div className="h-4 bg-white/5 border-b border-white/5 flex items-center px-2 gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                {/* Code Lines */}
                <div className="p-3 space-y-2">
                    <motion.div
                        className="h-2 w-3/4 bg-primary/30 rounded-full"
                        animate={{ width: ["0%", "75%"] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <motion.div
                        className="h-2 w-1/2 bg-white/10 rounded-full"
                        animate={{ width: ["0%", "50%"] }}
                        transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <motion.div
                        className="h-2 w-2/3 bg-white/10 rounded-full"
                        animate={{ width: ["0%", "66%"] }}
                        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatDelay: 2 }}
                    />
                    {/* Cursor */}
                    <motion.div
                        className="w-1 h-3 bg-primary"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        style={{ marginTop: 4 }}
                    />
                </div>
            </motion.div>

            {/* Orbiting Images (Overlaying) */}
            <motion.div
                className="absolute w-full h-full flex items-center justify-center z-20 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
                {logos.map((logo, i) => {
                    const angle = (i * 360) / logos.length
                    const radius = 60 // Slightly wider to breathe since they are larger
                    const x = Math.cos((angle * Math.PI) / 180) * radius
                    const y = Math.sin((angle * Math.PI) / 180) * radius

                    return (
                        <motion.div
                            key={i}
                            className="absolute w-10 h-10 rounded-full bg-surface/90 backdrop-blur-md border border-white/20 p-2 flex items-center justify-center shadow-lg"
                            style={{ x, y }}
                            animate={{ rotate: -360 }} // Counter-rotate
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        >
                            <img src={logo} alt="Tool" className="w-full h-full object-contain" />
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    )
}

export function ComplexAnimScan() {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            {/* Base Code Block */}
            <div className="w-24 h-28 bg-surface/50 border border-white/5 rounded-md p-2 space-y-2 overflow-hidden relative">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-1.5 bg-white/10 rounded-full w-full opacity-50" />
                ))}

                {/* Hidden Bug that reveals */}
                <motion.div
                    className="absolute top-8 left-2 right-2 h-1.5 bg-red-500 rounded-full z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
                />
            </div>

            {/* Scanning Beam */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm z-20"
                style={{ width: "120%", marginLeft: "-10%" }}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />

            {/* Pulse Wave on Scan */}
            <motion.div
                className="absolute inset-0 bg-primary/5 z-0"
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />
        </div>
    )
}

export function ComplexAnimLaunch() {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            {/* Launch Pad / progress */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-primary"
                    animate={{ width: ["0%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Rocket */}
            <motion.div
                className="relative z-10"
                animate={{
                    y: [20, -40],
                    scale: [0.8, 1.2, 0.5],
                    opacity: [0, 1, 1, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeIn" }}
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" className="fill-current text-white/10" />
                    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 9 5 5" />
                    <path d="M15 15 19 19" />
                </svg>

                {/* Exhaust */}
                <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-orange-500 to-transparent blur-sm"
                    animate={{ height: [0, 20, 40], opacity: [0.8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>

            {/* Speed Lines */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1px] bg-white/20"
                        style={{ left: `${20 + i * 15}%`, height: 20 }}
                        animate={{ top: ["100%", "-20%"] }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.1,
                            repeatDelay: Math.random()
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export function ComplexAnimReview() {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            {/* Ephemeral Environment Box */}
            <motion.div
                className="w-24 h-24 bg-surface border border-white/20 rounded-xl relative overflow-hidden backdrop-blur-md"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [0, 1, 1, 1, 0],
                    opacity: [0, 1, 1, 1, 0],
                    rotate: [0, 0, 0, 0, 10]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Header */}
                <div className="h-4 bg-white/10 w-full mb-2" />
                {/* Content Processing */}
                <div className="p-2 space-y-2">
                    <motion.div
                        className="h-1.5 bg-primary/50 rounded-full w-3/4"
                        animate={{ width: ["0%", "75%"] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.div
                        className="h-1.5 bg-white/20 rounded-full w-1/2"
                        animate={{ width: ["0%", "50%"] }}
                        transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
                    />
                    <motion.div
                        className="h-1.5 bg-white/20 rounded-full w-full"
                        animate={{ width: ["0%", "90%"] }}
                        transition={{ duration: 1, delay: 0.4, repeat: Infinity }}
                    />
                </div>

                {/* Vanishing effect (Disintegration particles) */}
                <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 0, 1, 0] }}
                    transition={{ duration: 4, times: [0, 0.8, 0.9, 0.95, 1], repeat: Infinity }}
                />
            </motion.div>

            {/* Floating Particles appearing when it vanishes */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/50 rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0, 1, 0],
                        scale: [0, 0, 1, 0],
                        x: [0, (Math.random() - 0.5) * 60],
                        y: [0, (Math.random() - 0.5) * 60]
                    }}
                    transition={{ duration: 4, times: [0, 0.85, 0.9, 1], repeat: Infinity }}
                />
            ))}

            <motion.div
                className="absolute bottom-4 text-xs font-mono text-gray-500"
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                EPHEMERAL
            </motion.div>
        </div>
    )
}

export function ComplexAnimKey() {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            {/* The Lock */}
            <div className="relative z-10">
                <motion.svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-2xl">
                    {/* Shackle */}
                    <motion.path
                        d="M7 11V7a5 5 0 0 1 10 0v4"
                        initial={{ y: -5 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, repeatType: "reverse" }}
                    />
                    {/* Body */}
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" className="fill-surface/80 blur-sm stroke-none" />
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />

                    {/* Keyhole */}
                    <motion.circle cx="12" cy="16" r="1" className="fill-primary stroke-none" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                    <motion.path d="M12 17v2" />
                </motion.svg>
            </div>

            {/* Data Stream Encyption */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={`left-${i}`}
                    className="absolute left-0 w-2 h-2 rounded-full bg-red-400"
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: [0, 1, 0], backgroundColor: ["#f87171", "#a855f7"] }} // Red to Purple
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
            ))}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={`right-${i}`}
                    className="absolute right-0 w-2 h-2 rounded-full bg-red-400"
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: [0, 1, 0], backgroundColor: ["#f87171", "#a855f7"] }} // Red to Purple
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
            ))}

            {/* Shield Ring */}
            <motion.div
                className="absolute w-24 h-24 border border-primary/30 rounded-full"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute w-20 h-20 border border-t-white/50 border-transparent rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
        </div>
    )
}

export function ComplexAnimShield() {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            {/* Base Shield */}
            <motion.svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white relative z-10">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" className="fill-surface/50" />

                {/* Checkmark drawing */}
                <motion.path
                    d="m9 12 2 2 4-4"
                    stroke="#4ade80" // Green
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                />
            </motion.svg>

            {/* Radar Scan Effect */}
            <motion.div
                className="absolute w-full h-1 bg-primary/50 shadow-[0_0_10px_rgba(147,51,234,0.8)]"
                style={{ top: "0%" }}
                animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Hexagon Grid Background (Subtle) */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" patternUnits="userSpaceOnUse">
                    <pattern id="hex" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M10 0l10 5v10l-10 5L0 15V5z" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#hex)" />
                </svg>
            </div>

            {/* Rotating Cert Rings */}
            <motion.div
                className="absolute w-28 h-28 border border-dashed border-white/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

        </div>
    )
}

function VisionParticles() {
    const particles = useMemo(() => [...Array(5)].map(() => ({
        x: Math.random() * 40 - 20,
        delay: Math.random() * 2,
        duration: 2 + Math.random()
    })), []);

    return (
        <>
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-200 rounded-full"
                    initial={{ y: 20, x: p.x, opacity: 0 }}
                    animate={{ y: -40, opacity: [0, 1, 0] }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeOut"
                    }}
                />
            ))}
        </>
    );
}
