import { motion } from "framer-motion";
import { Zap, ShieldAlert, Bug, Terminal } from "lucide-react";

export function ModalFlowAnimation() {
    // Simplified flow lines for the small header
    const lines = [
        { d: "M -50 40 Q 150 10, 300 64 T 650 40", delay: 0, duration: 3 },
        { d: "M -50 90 Q 150 120, 300 64 T 650 90", delay: 0.5, duration: 3.5 },
        { d: "M -50 64 L 650 64", delay: 1, duration: 4 }, // Straight center line
    ];

    const icons = [
        { icon: Bug, color: "red", delay: 0, y: 20 },
        { icon: Terminal, color: "gray", delay: 1.2, y: 80 },
        { icon: ShieldAlert, color: "purple", delay: 0.6, y: 40 },
        { icon: Zap, color: "yellow", delay: 1.8, y: 90 },
    ];

    return (
        <div className="w-full h-full relative overflow-hidden bg-black/40">
            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <defs>
                    <linearGradient id="modal-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#9333ea" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
                {lines.map((line, i) => (
                    <motion.path
                        key={i}
                        d={line.d}
                        fill="none"
                        stroke="url(#modal-gradient)"
                        strokeWidth="1.5"
                        strokeDasharray="5 5"
                        initial={{ strokeDashoffset: 50 }}
                        animate={{ strokeDashoffset: -50 }}
                        transition={{ duration: line.duration, repeat: Infinity, ease: "linear" }}
                    />
                ))}
            </svg>

            {/* Central Core Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 rounded-full bg-primary/20 blur-xl"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(147,51,234,1)]" />
            </div>

            {/* Floating Particles/Icons */}
            {icons.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ x: -40, opacity: 0, scale: 0.5 }}
                    animate={{
                        x: [0, 600], // Move across
                        y: [item.y, item.y + (i % 2 === 0 ? 10 : -10)], // Slight wiggle
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "linear"
                    }}
                    className={`absolute left-0 text-${item.color}-400 opacity-60`}
                >
                    <item.icon size={16} />
                </motion.div>
            ))}
        </div>
    );
}
