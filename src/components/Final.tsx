import { useState } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { ArrowRight } from "lucide-react"

export function Final() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"loading" | "success" | "error" | null>(null);

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
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch (e) {
            console.error(e);
            setStatus("error");
        }
    };

    return (
        <section id="waitlist" className="min-h-[600px] flex flex-col md:flex-row relative">
            {/* Left: User Path */}
            <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center border-r border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent" />

                <div className="relative z-10 max-w-md mx-auto md:mx-0">
                    <span className="text-secondary text-sm font-bold tracking-wider mb-4 block">THE USER PATH</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Get early access.
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        Don't let invisible bugs kill your momentum. Join the waitlist to get priority access and secure 3 months free on Fixary. Exclusive offer for early sign-ups.
                    </p>

                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Enter your email address..."
                                className="bg-black/50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === "loading" || status === "success"}
                            />
                            <Button onClick={handleJoin} disabled={status === "loading" || status === "success"}>
                                {status === "loading" ? "Joining..." : status === "success" ? "Joined!" : "Join"}
                                {status !== "loading" && status !== "success" && <ArrowRight className="ml-2 w-4 h-4" />}
                            </Button>
                        </div>
                        {status === "error" && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
                        {status === "success" && <p className="text-sm text-green-500">Welcome to the future of vibecoding auditing.</p>}
                        {!status && <p className="text-sm text-gray-500">No spam. Unsubscribe anytime.</p>}
                    </div>
                </div>
            </div>

            {/* Right: Builder Path */}
            <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-black relative overflow-hidden group">
                <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/10 to-transparent" />

                <div className="relative z-10 max-w-md mx-auto md:mx-0">
                    <span className="text-primary text-sm font-bold tracking-wider mb-4 block">THE BUILDER PATH</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Build Fixary with us.
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        We have an ambitious vision, but realizing it requires a world-class technical team. If you’re looking for complex challenges, you belong here.
                    </p>

                    <a href="https://t.me/Nik_Anderson" target="_blank" rel="noopener noreferrer">
                        <Button>
                            Join the Core Team <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </a>
                    <p className="text-sm text-gray-500 mt-4">Direct contact with the founder for access to the dev team.</p>
                </div>
            </div>
        </section>
    )
}
