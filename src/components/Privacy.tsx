import { motion } from "framer-motion"
import { Card } from "./ui/Card"
import { ComplexAnimReview, ComplexAnimKey, ComplexAnimShield } from "./MicroAnimations"

const features = [
    {
        component: <ComplexAnimReview />,
        title: "Ephemeral by Design",
        description: "Runs in isolated memory. Wiped instantly after analysis. Zero traces left behind."
    },
    {
        component: <ComplexAnimKey />,
        title: "End-to-End Encrypted",
        description: "Protected by bank-grade SSL/TLS from your IDE to our engine. Secure in transit."
    },
    {
        component: <ComplexAnimShield />,
        title: "No AI Training",
        description: "We verify your IP; we don’t steal it. Your code never trains our models."
    }
]

export function Privacy() {
    return (
        <section id="privacy" className="py-24 relative overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
                        Your Code Stays <span className="text-primary">Yours</span>.
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Beyond finding bugs, we prioritize your privacy. We process code, we don’t collect it.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Card
                                className="h-[500px] flex flex-col items-center justify-between p-10 bg-surface border-white/5 hover:border-white/10 transition-colors rounded-[25px] text-center group"
                                glass={false}
                            >
                                {/* Title */}
                                <h3 className="text-3xl font-display font-bold text-white leading-tight">
                                    {feature.title}
                                </h3>

                                {/* Micro Animation */}
                                <div className="relative w-48 h-48 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    {feature.component}
                                </div>

                                {/* Description */}
                                <p className="text-gray-400 text-lg leading-relaxed max-w-[80%]">
                                    {feature.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
