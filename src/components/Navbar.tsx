import { motion } from "framer-motion"
import { Button } from "./ui/Button"
import { useState, useEffect } from "react"


export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
            const offset = 80 // Height of the navbar + padding
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = element.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
        }
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass border-b border-white/5 py-4" : "bg-transparent border-transparent py-6"}`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <img src="/logo-fixary.png" alt="Fixary" className="h-8 object-contain" />
                    <span className="font-display font-light text-xl tracking-tight text-white">Fixary</span>
                </div>

                {/* Center: Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#problem" onClick={(e) => scrollToSection(e, "problem")} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Problem
                    </a>
                    <a href="#how-it-works" onClick={(e) => scrollToSection(e, "how-it-works")} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Process
                    </a>
                    <a href="#hybrid-engine" onClick={(e) => scrollToSection(e, "hybrid-engine")} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Hybrid Engine
                    </a>
                    <a href="#scan-fix" onClick={(e) => scrollToSection(e, "scan-fix")} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Scan & Fix
                    </a>
                    <a href="#privacy" onClick={(e) => scrollToSection(e, "privacy")} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Privacy
                    </a>
                </div>

                {/* Right: CTA */}
                <div>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-[0_0_20px_rgba(147,51,234,0.5)] border border-white/20"
                    >
                        Join Waitlist
                    </Button>
                </div>
            </div>
        </motion.nav>
    )
}
