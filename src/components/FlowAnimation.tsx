import { motion } from "framer-motion"
import {
    Bot,
    Zap,
    Terminal,
    Code2,
    Bug,
    AlertTriangle,
    ShieldAlert,
    XCircle,
    FileWarning,
    AlertOctagon,
    ArrowRight,
    Github
} from "lucide-react"
import { Card } from "./ui/Card"
import { Input } from "./ui/Input"
import { useState, useMemo } from "react"
import imgCursor from "../assets/images/cursor.png"
import imgWindsurf from "../assets/images/windsurf.png"
import imgReplit from "../assets/images/replit.png"
import imgClaude from "../assets/images/claude.png"
import imgGemini from "../assets/images/gemini.png"
import imgChatGPT from "../assets/images/chatGPT.png"

const detections = [
    { title: "Exposed Secrets", icon: ShieldAlert, color: "red" },
    { title: "SQL Injection", icon: AlertOctagon, color: "orange" },
    { title: "Dangerous HTML", icon: Code2, color: "yellow" },
    { title: "Eval Usage", icon: AlertTriangle, color: "red" },
    { title: "Weak Crypto", icon: ShieldAlert, color: "purple" },
    { title: "Deep Nesting", icon: FileWarning, color: "blue" },
    { title: "Huge Function", icon: FileWarning, color: "cyan" },
    { title: "Mixed Async", icon: Zap, color: "yellow" },
    { title: "Any Type", icon: AlertTriangle, color: "orange" },
    { title: "Console Log", icon: Terminal, color: "gray" },
    { title: "Magic Numbers", icon: Bug, color: "pink" },
    { title: "TODO Left", icon: AlertTriangle, color: "green" },
]

const tools = [
    { icon: Bot, color: "blue", delay: 0 },
    { image: imgCursor, color: "blue", delay: 0.3 },
    { icon: Zap, color: "yellow", delay: 0.6 },
    { image: imgWindsurf, color: "cyan", delay: 0.9 },
    { icon: Terminal, color: "gray", delay: 1.2 },
    { image: imgReplit, color: "orange", delay: 1.5 },
    { icon: Bug, color: "red", delay: 1.8 },
    { image: imgClaude, color: "orange", delay: 2.1 },
    { icon: Code2, color: "green", delay: 2.4 },
    { image: imgGemini, color: "blue", delay: 2.7 },
    { icon: XCircle, color: "red", delay: 3.0 },
    { image: imgChatGPT, color: "green", delay: 3.3 },
]

import { WaitlistModal } from "./WaitlistModal"

export function FlowAnimation() {
    const [inputValue, setInputValue] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleAnalyze = () => {
        setIsModalOpen(true)
    }

    // Memoize random values for SVG lines
    const flowLines = useMemo(() => {
        return {
            in: [...Array(5)].map((_, i) => ({
                id: i,
                d: `M ${100 + Math.random() * 200} ${100 + (i * 100)} C ${400} ${300}, ${600} ${300}, ${window.innerWidth < 768 ? '50%' : '50%'} 300`,
                duration: 3 + Math.random()
            })),
            out: [...Array(5)].map((_, i) => ({
                id: i,
                d: `M ${window.innerWidth < 768 ? '50%' : '50%'} 300 C ${800} ${300}, ${1000} ${300}, ${1200 + Math.random() * 200} ${100 + (i * 100)}`,
                duration: 4 + Math.random()
            }))
        }
    }, [])

    // Memoize random values for Tools
    const memoizedTools = useMemo(() => {
        return tools.map((tool) => ({
            ...tool,
            randomYStart: Math.random() * 200 - 100
        }))
    }, [])

    // Memoize random values for Detections
    const memoizedDetections = useMemo(() => {
        return detections.map((detection) => ({
            ...detection,
            randomXEnd: Math.random() * 200 + 50,
            randomYEnd: (Math.random() - 0.5) * 600
        }))
    }, [])

    return (
        <section id="scan-fix" className="pt-12 pb-6 relative overflow-hidden">
            <WaitlistModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                repoUrl={inputValue}
            />
            {/* Background removed/transparent as requested */}

            <div className="max-w-[1400px] mx-auto px-4 relative z-20">
                <div className="text-center mb-0 relative z-30 pointer-events-none">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight"
                    >
                        Paste. Scan. <span className="text-primary">Fix.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Run a deterministic audit on your repo in seconds. Uncover the invisible risks lurking in your AI-generated code.
                    </motion.p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-0 relative h-[450px] -mt-16">

                    {/* VISIBLE FLOW LINES - SVG Background */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30">
                        {/* Lines flowing INTO center */}
                        {flowLines.in.map((line) => (
                            <motion.path
                                key={`in-${line.id}`}
                                d={line.d}
                                fill="none"
                                stroke="url(#gradient-in)"
                                strokeWidth="2"
                                strokeDasharray="10 10"
                                initial={{ strokeDashoffset: 100 }}
                                animate={{ strokeDashoffset: -100 }}
                                transition={{ duration: line.duration, repeat: Infinity, ease: "linear" }}
                            />
                        ))}
                        {/* Lines flowing OUT OF center */}
                        {flowLines.out.map((line) => (
                            <motion.path
                                key={`out-${line.id}`}
                                d={line.d}
                                fill="none"
                                stroke="url(#gradient-out)"
                                strokeWidth="2"
                                strokeDasharray="10 10"
                                initial={{ strokeDashoffset: 100 }}
                                animate={{ strokeDashoffset: -300 }}
                                transition={{ duration: line.duration, repeat: Infinity, ease: "linear" }}
                            />
                        ))}
                        <defs>
                            <linearGradient id="gradient-in" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="100%" stopColor="#9333ea" stopOpacity="0.5" />
                            </linearGradient>
                            <linearGradient id="gradient-out" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#9333ea" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                    </svg>







                    {/* LEFT SIDE: Chaos Stream (Tools & Fails) */}
                    <div className="absolute left-0 top-0 bottom-0 w-1/3 flex items-center justify-center pointer-events-none z-10">
                        {memoizedTools.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: -200, opacity: 0, scale: 0.5 }}
                                animate={{
                                    x: ["-100%", "200%"], // Start further left, move closer to center (input)
                                    y: [item.randomYStart, 0], // Funnel effect
                                    opacity: [0, 1, 1, 1, 0], // Fade in, stay visible, fade out at end
                                    scale: [0.5, 1, 1, 1, 0] // Start smaller, grow, stay, shrink at end
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    delay: item.delay,
                                    ease: "easeInOut"
                                }}
                                className={`absolute p-3 rounded-[25px] border backdrop-blur-sm ${item.image
                                    ? 'bg-surface/80 border-white/10'
                                    : `text-${item.color}-400 bg-${item.color}-400/10 border-${item.color}-400/20`
                                    }`}
                            >
                                {item.image ? (
                                    <img src={item.image} alt="AI Tool" className="w-8 h-8 object-contain" />
                                ) : (
                                    // @ts-ignore
                                    <item.icon size={32} />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* CENTER: The Processor (Input) */}
                    <div className="relative z-30 w-full max-w-lg mx-auto">
                        <div className="relative">
                            <motion.div
                                animate={{ boxShadow: ["0 0 20px rgba(147, 51, 234, 0.2)", "0 0 50px rgba(147, 51, 234, 0.5)", "0 0 20px rgba(147, 51, 234, 0.2)"] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="bg-surface/50 border border-white/10 p-2 pl-4 rounded-[35px] flex items-center gap-4 relative overflow-hidden backdrop-blur-md"
                            >
                                <Github className="text-gray-500 w-5 h-5 flex-shrink-0" />
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                                    placeholder="github.com/user/repo"
                                    className="bg-transparent border-none shadow-none h-12 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 rounded-none w-full"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleAnalyze}
                                    className="bg-primary text-white p-3 rounded-[25px] shadow-[0_0_20px_rgba(147,51,234,0.4)] flex-shrink-0"
                                >
                                    <ArrowRight size={20} />
                                </motion.button>
                            </motion.div>

                            {/* Scanning beam effect - Behind input */}
                            <motion.div
                                className="absolute -inset-10 bg-primary/20 blur-[60px] -z-10 rounded-full"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                        </div>
                    </div>

                    {/* RIGHT SIDE: Detection Popups (Visualized Errors) */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none z-10">
                        {memoizedDetections.map((detection, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: -50, opacity: 0, scale: 0.5 }}
                                animate={{
                                    x: [0, detection.randomXEnd], // Start near center, move out
                                    y: [0, detection.randomYEnd], // Spread out vertically
                                    opacity: [0, 1, 1, 0], // Fade in then out
                                    scale: [0.5, 1, 1, 0.8]
                                }}
                                transition={{
                                    duration: 8, // Slowed down from 5
                                    repeat: Infinity,
                                    delay: 2 + (i * 0.8), // Start AFTER the input processing (simulated)
                                    ease: "easeOut"
                                }}
                                className="absolute left-0 top-1/2"
                            >
                                <Card className={`flex items-center gap-3 p-4 bg-surface/90 backdrop-blur-md border-${detection.color}-500/30 border whitespace-nowrap !rounded-[25px]`}>
                                    <div className={`p-2 rounded-full bg-${detection.color}-500/20 text-${detection.color}-400`}>
                                        <detection.icon size={16} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-200">{detection.title}</span>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
