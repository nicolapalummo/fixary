import { motion } from "framer-motion"
import { useState } from "react";
import { ArrowRight, Github, ShieldAlert } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { WaitlistModal } from "./WaitlistModal";

export function Hero() {
    const [inputValue, setInputValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAnalyze = async () => {
        if (!inputValue) return;

        // --- WAITLIST MODE INTERCEPTION ---
        setIsModalOpen(true);
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-24 overflow-hidden">
            <WaitlistModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                repoUrl={inputValue}
            />

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] opacity-40" />
            </div>

            <div className="w-full max-w-[1400px] mx-auto px-4 relative flex items-center justify-center">

                {/* Floating Code Windows - Left Side */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 pointer-events-none z-10 w-[300px]">
                    <CodeWindowCard
                        title="auth.ts"
                        code={`const user = await db.query(\n  \`SELECT * FROM users WHERE id = \${id}\`\n);`}
                        errorType="SQL Injection"
                        color="red"
                        delay={0}
                        xOffset={-50}
                        className="self-start rotate-[-3deg]"
                    />
                    <CodeWindowCard
                        title=".env"
                        code={`AWS_ACCESS_KEY_ID=AKIA...\nAWS_SECRET_ACCESS_KEY=wJalr...`}
                        errorType="Exposed Secrets"
                        color="yellow"
                        delay={1.5}
                        xOffset={-20}
                        className="self-center rotate-[3deg] translate-x-8"
                    />
                </div>

                {/* Floating Code Windows - Right Side */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 pointer-events-none z-10 w-[300px]">
                    <CodeWindowCard
                        title="api.ts"
                        code={`const token = "eyJhbGciOiJIUz..."\nheaders['Authorization'] = token;`}
                        errorType="Hardcoded Token"
                        color="purple"
                        delay={0.5}
                        xOffset={50}
                        className="self-end rotate-[3deg]"
                    />
                    <CodeWindowCard
                        title="component.tsx"
                        code={`<div dangerouslySetInnerHTML={{\n  __html: userInput\n}} />`}
                        errorType="XSS Detection"
                        color="orange"
                        delay={2}
                        xOffset={20}
                        className="self-center rotate-[-3deg] -translate-x-8"
                    />
                </div>

                {/* Centered Content */}
                <div className="text-center max-w-4xl mx-auto space-y-10 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-light border border-white/10 text-sm text-gray-300 mb-8 hover:bg-white/5 transition-colors cursor-default mx-auto"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Fixary is currently in Private Beta
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight">
                            Turn your Vibe-Coded Idea into an <span className="text-primary inline-block">Enterprise product</span>.
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            The simplest auditor for Vibe Coders. Just your GitHub repository link. No installation required.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col items-center gap-8"
                    >
                        <div className="relative w-full max-w-lg mx-auto">
                            <motion.div
                                animate={{ boxShadow: ["0 0 20px rgba(147, 51, 234, 0.2)", "0 0 50px rgba(147, 51, 234, 0.5)", "0 0 20px rgba(147, 51, 234, 0.2)"] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="bg-surface/50 border border-white/10 p-2 pl-4 rounded-[35px] flex items-center gap-4 relative overflow-hidden backdrop-blur-md"
                            >
                                <Github className="text-gray-500 w-5 h-5 flex-shrink-0" />
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                                    placeholder="github.com/user/repo"
                                    className="bg-transparent border-none shadow-none h-12 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 rounded-none w-full"
                                />
                                <Button
                                    size="lg"
                                    onClick={handleAnalyze}
                                    className="rounded-[25px] shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_45px_rgba(147,51,234,0.5)] transition-all duration-300"
                                >
                                    Analyze <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>

                            {/* Scanning beam effect - Behind input */}
                            <motion.div
                                className="absolute -inset-10 bg-primary/20 blur-[60px] -z-10 rounded-full"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
                            <p>Join 150+ founders and devs on the waitlist.</p>
                        </div>
                    </motion.div>
                </div>
            </div >

            {/* Vignette for Fade Effect */}
            < div className="absolute bottom-0 left-0 w-full pointer-events-none bg-gradient-to-t from-background via-transparent to-transparent h-40 z-20" />
        </section >
    )
}

function CodeWindowCard({ title, code, errorType, color, delay, xOffset, className }: { title: string, code: string, errorType: string, color: string, delay: number, xOffset: number, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: xOffset }}
            animate={{
                opacity: 1,
                x: [xOffset, xOffset + 10, xOffset],
                y: [0, -10, 0]
            }}
            transition={{
                opacity: { duration: 0.8, delay: delay },
                default: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay }
            }}
            className={`
                bg-surface/90
                backdrop-blur-xl
                border border-white/10
                rounded-[25px]
                overflow-hidden
                w-full
                max-w-[300px]
                shadow-2xl
                ${className}
            `}
        >
            {/* Window Header */}
            <div className="h-8 border-b border-white/5 flex items-center px-3 gap-1.5 bg-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <div className="ml-2 text-xs text-gray-500 font-mono">{title}</div>
            </div>

            {/* Code Content */}
            <div className="p-4 font-mono text-[10px] leading-relaxed relative">
                <div className="text-gray-400">
                    {code.split('\n').map((line, i) => (
                        <div key={i} className="whitespace-pre">{line}</div>
                    ))}
                </div>

                {/* Error Overlay */}
                <div className={`absolute inset-0 bg-${color}-500/10 flex items-end justify-end p-2`}>
                    <div className={`
                        bg-${color}-500/20
                        text-${color}-300
                        text-[10px]
                        px-2 py-1
                        rounded
                        border border-${color}-500/30
                        flex items-center gap-1.5
                        backdrop-blur-md
                    `}>
                        <ShieldAlert size={10} />
                        {errorType}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
