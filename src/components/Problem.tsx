import { motion } from "framer-motion"
import { Card } from "./ui/Card"
import { ShieldAlert, Database, Package, Layers } from "lucide-react"

const problems = [
    {
        id: 1,
        title: "Hardcoded Secrets & Auth Flaws",
        description: "LLMs love convenience. They often hardcode API keys directly into the source or generate JWT tokens that never expire, leaving your user data permanently exposed.",
        stat: "Found in 45% of unreviewed AI-generated auth flows.",
        icon: ShieldAlert,
        risk: "CRITICAL RISK",
        riskColor: "text-red-500",
        accent: "red",
        side: "left"
    },
    {
        id: 2,
        title: "Silent SQL Injections",
        description: "AI writes queries that work for the 'happy path' but often skips input sanitization. A single malformed request could wipe your entire database.",
        stat: "Common in Supabase & Firebase integrations via Cursor.",
        icon: Database,
        risk: "HIGH RISK",
        riskColor: "text-amber-500",
        accent: "amber",
        side: "right"
    },
    {
        id: 3,
        title: "Hallucinated Dependencies",
        description: "The 'Phantom Package' attack. Your AI might import a library that doesn't exist (or has a typo), allowing hackers to register that name and inject malicious code into your build.",
        stat: "A growing attack vector for Vibe Coders in 2025.",
        icon: Package,
        risk: "CRITICAL RISK",
        riskColor: "text-purple-500",
        accent: "purple",
        side: "left"
    },
    {
        id: 4,
        title: "The 'Spaghetti' Debt",
        description: "Code that works once but breaks if you touch it. Infinite loops, unhandled edge cases, and massive functions that make future scaling impossible.",
        stat: "Increases maintenance costs by 3x within 6 months.",
        icon: Layers,
        risk: "MEDIUM RISK",
        riskColor: "text-blue-500",
        accent: "blue",
        side: "right"
    }
]

export function Problem() {
    return (
        <section id="problem" className="py-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 space-y-4"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                        Your AI-built app looks perfect,
                        <br />
                        <span className="text-primary">but these security flaws are lurking beneath the surface.</span>
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-white/10 hidden md:block">
                        <motion.div
                            initial={{ height: "0%" }}
                            whileInView={{ height: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-secondary to-primary shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                        />
                    </div>

                    <div className="space-y-6 md:space-y-0 relative">
                        {problems.map((problem, index) => (
                            <motion.div
                                key={problem.id}
                                initial={{ opacity: 0, x: problem.side === 'left' ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`md:flex items-center justify-between gap-6 ${problem.side === 'right' ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Card Content */}
                                <div className="md:w-[45%]">
                                    <div className="group relative">
                                        <div className={`absolute -inset-0.5 bg-gradient-to-r from-${problem.accent}-500 to-${problem.riskColor.replace('text-', '')} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`}></div>
                                        <Card className="p-6 relative hover:-translate-y-1 transition-transform duration-300 border-white/5 group-hover:border-white/20">
                                            <div className={`absolute inset-0 bg-${problem.accent}-500/5 group-hover:bg-${problem.accent}-500/10 transition-colors -z-10`} />

                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-2 rounded-lg bg-${problem.accent}-500/20 text-${problem.accent}-400 group-hover:scale-110 transition-transform duration-300`}>
                                                    <problem.icon size={20} />
                                                </div>
                                                <span className={`text-[10px] font-bold tracking-wider px-2 py-1 rounded bg-black/50 border border-white/10 ${problem.riskColor}`}>
                                                    {problem.risk}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{problem.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                                {problem.description}
                                            </p>

                                            <div className="text-xs font-mono text-gray-500 border-t border-white/5 pt-3 flex items-center gap-2">
                                                <span className={`w-1.5 h-1.5 rounded-full bg-${problem.accent}-500 animate-pulse`} />
                                                {problem.stat}
                                            </div>
                                        </Card>
                                    </div>
                                </div>

                                {/* Number Bubble (Center) */}
                                <div className="hidden md:flex flex-col items-center justify-center w-[10%] relative z-10">
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center font-display font-bold text-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] relative group cursor-default"
                                    >
                                        <span className="relative z-10 group-hover:text-white transition-colors">{problem.id}</span>
                                        <div className={`absolute inset-0 rounded-full border border-${problem.accent}-500/50 group-hover:bg-${problem.accent}-500/20 transition-colors`} />
                                    </motion.div>
                                </div>

                                {/* Empty Space for Grid */}
                                <div className="md:w-[45%]" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
