import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { ModalFlowAnimation } from "./ModalFlowAnimation";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    repoUrl?: string; // Optional: capture what they were trying to scan
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    // Reset state when opening
    useEffect(() => {
        if (isOpen) {
            setStatus("idle");
            setEmail("");
        }
    }, [isOpen]);

    const handleJoin = async () => {
        if (!email || !email.includes("@")) return;
        setStatus("loading");
        try {
            const res = await fetch("http://localhost:8000/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (e) {
            console.error(e);
            setStatus("error");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        {/* Modal Card */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-lg bg-black/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                        >
                            {/* Visual Header / Animation Area */}
                            <div className="h-32 w-full relative overflow-hidden">
                                <div className="absolute inset-0 opacity-60">
                                    <ModalFlowAnimation />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 z-20 p-2 text-white/50 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 pt-2 relative z-10 text-center">
                                <div className="inline-block p-2 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
                                    <span className="text-xs font-bold tracking-widest uppercase px-2">Private Beta</span>
                                </div>

                                <h2 className="text-3xl font-display font-bold mb-4 text-white">
                                    Get early access.
                                </h2>

                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    Don't let invisible bugs kill your momentum. Join the waitlist to get priority access and secure 3 months free on Fixary. Exclusive offer for early sign-ups.
                                </p>

                                {/* Form */}
                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl flex flex-col items-center gap-3"
                                    >
                                        <CheckCircle className="w-12 h-12 text-green-500" />
                                        <h3 className="text-xl font-bold text-green-400">You're on the list!</h3>
                                        <p className="text-gray-400 text-sm">We'll be in touch shortly.</p>
                                        <Button variant="ghost" onClick={onClose} className="mt-2 text-sm">Close</Button>
                                    </motion.div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-3">
                                            <Input
                                                placeholder="Enter your email address..."
                                                className="bg-white/5 border-white/10 focus:border-primary/50"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                                            />
                                            <Button
                                                className="w-full justify-center text-base py-6"
                                                onClick={handleJoin}
                                                disabled={status === "loading"}
                                            >
                                                {status === "loading" ? (
                                                    <><Loader2 className="animate-spin mr-2" /> Saving...</>
                                                ) : (
                                                    <>Join the Waitlist <ArrowRight className="ml-2 w-4 h-4" /></>
                                                )}
                                            </Button>
                                        </div>
                                        {status === "error" && (
                                            <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                                        )}
                                        <p className="text-xs text-gray-500">
                                            No spam. Unsubscribe anytime.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
