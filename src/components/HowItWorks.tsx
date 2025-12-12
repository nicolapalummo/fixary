import { motion } from "framer-motion"
import { Card } from "./ui/Card"
import { ComplexAnimVision, ComplexAnimCoding, ComplexAnimScan, ComplexAnimLaunch } from "./MicroAnimations"

const steps = [
    {
        id: 1,
        title: "The Vision",
        component: <ComplexAnimVision />,
        description: "You want to launch the next SaaS, Marketplace, or Mobile App. You're not a Senior Dev, but you have the entrepreneurial vision and the drive to build something big.",
        highlight: false
    },
    {
        id: 2,
        title: "Vibe Coding",
        component: <ComplexAnimCoding />,
        description: "You rely on new superpowers like Cursor, Windsurf, Copilot, or Claude to turn your prompts into real code. The app comes to life in hours.",
        highlight: false
    },
    {
        id: 3,
        title: "The Reality Check",
        component: <ComplexAnimScan />,
        description: "Before launching, paste your repository link into Fixary. Our engine scans every line of the project, unmasking what AI hides.",
        highlight: true
    },
    {
        id: 4,
        title: "The Bulletproof Launch",
        component: <ComplexAnimLaunch />,
        description: "Get the green light. Fix vulnerabilities with our step-by-step guides and publish to Stores or the Web with total peace of mind.",
        highlight: false
    }
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
                        How to turn your MVP into a <span className="text-primary">solid product</span>.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative z-10"
                        >
                            <Card
                                className={`h-full flex flex-col items-center justify-between p-6 border transition-all duration-300 rounded-[24px] text-center group ${step.highlight
                                    ? 'bg-surface/80 backdrop-blur-sm border-primary/50 shadow-[0_0_60px_rgba(147,51,234,0.15)] scale-105 z-20 hover:border-primary hover:shadow-[0_0_80px_rgba(147,51,234,0.3)]'
                                    : 'bg-surface border-white/5 hover:border-white/10'
                                    }`}
                                glass={false}
                            >
                                <div className="w-full flex items-center justify-between mb-6">
                                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-full">Phase 0{step.id}</span>
                                </div>

                                {/* Micro Animation */}
                                <div className="relative w-32 h-32 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    {step.component}
                                </div>

                                <div>
                                    <h3 className={`text-3xl font-display font-bold mb-4 ${step.highlight ? 'text-white' : 'text-gray-200'}`}>
                                        {step.title}
                                    </h3>

                                    <p className="text-gray-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
