import { motion } from "framer-motion";
import { Ruler, Brain, Zap, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/Card";

const features = [
    {
        title: "The Deterministic Layer (Precision)",
        desc: "We don’t guess on security; we measure it. Running parallel to the AI, Fixary’s Static Engine parses your Abstract Syntax Tree (AST) to enforce mathematical certainties. If a vulnerability exists structurally, we find it.",
        tech: "Logic-based AST pattern matching ensures 100% precision on critical flaws.",
        catch: "SQL Injections, Hardcoded Secrets, Cyclomatic Complexity, Dangerous eval() usage, and N+1 Queries.",
        result: "Hard guardrails that an LLM cannot hallucinate away.",
        icon: Ruler,
        color: "purple"
    },
    {
        title: "The Audit-Trained LLM (Context)",
        desc: "An AI that understands \"Why,\" not just \"What.\" While the deterministic layer handles the syntax, our specialized Large Language Model reads your repository to grasp architecture and intent.",
        tech: "Context-aware modeling trained to detect \"Code Smells\" and architectural debt.",
        catch: "Spaghetti code, incoherent logic, unscalable patterns, and blockers that lead to App Store rejections.",
        result: "A Senior Engineer’s intuition applied to your entire codebase instantly.",
        icon: Brain,
        color: "purple"
    },
    {
        title: "The Agentic Synthesis (Velocity)",
        desc: "Fixary AI doesn’t just flag bugs. It ships fixes. Our Agent merges the findings from both layers, filtering out false positives and translating technical jargon into immediate action.",
        impact: "We calculate the \"Refactor Impact %\"—telling you immediately if a fix is a quick one-liner or a structural rewrite.",
        ready: "Instead of vague advice, we generate the exact prompt you need.",
        action: "Copy-paste our solution directly into Cursor, Windsurf, or Copilot to resolve the issue in seconds.",
        icon: Zap,
        color: "purple"
    }
];

export function HybridEngine() {
    return (
        <section id="hybrid-engine" className="pt-12 pb-24 relative overflow-hidden">
            {/* Background Gradient Spot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-display font-bold"
                    >
                        The Intuition of AI. The <span className="text-primary">Certainty of Math.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-gray-400"
                    >
                        Zero hallucinations. Total context. Here is how our Hybrid Engine works.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                        >
                            <Card className={`h-full p-8 border-${feature.color}-500/20 bg-surface/50 backdrop-blur-sm relative overflow-hidden group hover:border-${feature.color}-500/40 transition-colors`}>
                                {/* Top colored line */}
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${feature.color}-500 to-transparent opacity-50`} />

                                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 flex items-center justify-center text-${feature.color}-400 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon size={24} />
                                </div>

                                <h3 className="text-2xl font-bold mb-4 font-display">{feature.title}</h3>
                                <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                                    {feature.desc}
                                </p>

                                <div className="space-y-4 pt-6 border-t border-white/5">
                                    {feature.tech && (
                                        <div className="space-y-1">
                                            <span className={`text-xs font-bold text-${feature.color}-400 uppercase tracking-wider`}>The Tech</span>
                                            <p className="text-sm text-gray-300">{feature.tech}</p>
                                        </div>
                                    )}
                                    {feature.catch && (
                                        <div className="space-y-1">
                                            <span className={`text-xs font-bold text-${feature.color}-400 uppercase tracking-wider`}>What we catch</span>
                                            <p className="text-sm text-gray-300">{feature.catch}</p>
                                        </div>
                                    )}
                                    {feature.impact && (
                                        <div className="space-y-1">
                                            <span className={`text-xs font-bold text-${feature.color}-400 uppercase tracking-wider`}>Impact Score</span>
                                            <p className="text-sm text-gray-300">{feature.impact}</p>
                                        </div>
                                    )}
                                    {feature.ready && (
                                        <div className="space-y-1">
                                            <span className={`text-xs font-bold text-${feature.color}-400 uppercase tracking-wider`}>Ready-To-Code</span>
                                            <p className="text-sm text-gray-300">{feature.ready}</p>
                                        </div>
                                    )}

                                    <div className={`mt-6 p-4 rounded-lg bg-${feature.color}-500/5 border border-${feature.color}-500/10`}>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className={`w-5 h-5 text-${feature.color}-400 flex-shrink-0 mt-0.5`} />
                                            <div>
                                                <span className={`block text-xs font-bold text-${feature.color}-400 uppercase mb-1`}>
                                                    {feature.action ? "The Action" : "The Result"}
                                                </span>
                                                <p className="text-sm font-medium text-gray-200">
                                                    {feature.result || feature.action}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
