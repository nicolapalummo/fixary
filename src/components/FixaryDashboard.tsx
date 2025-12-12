import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { ArrowLeft, ShieldAlert, CheckCircle, Loader2 } from "lucide-react";
import LiquidEther from "./LiquidEther";

interface Report {
    status: string;
    result?: {
        score: number;
        report: {
            critical: any[];
            architectural: any[];
            summary: string;
        }
    };
    error?: string;
}

export function FixaryDashboard() {
    const { scanId } = useParams();
    const [data, setData] = useState<Report | null>(null);

    useEffect(() => {
        if (!scanId) return;

        const poll = setInterval(async () => {
            try {
                // In dev, assuming proxy or direct localhost:8000
                // For now direct fetch to localhost:8000
                const res = await fetch(`http://localhost:8000/results/${scanId}`);
                if (res.ok) {
                    const json = await res.json();
                    setData(json);

                    if (json.status === "completed" || json.status === "failed") {
                        clearInterval(poll);
                    }
                }
            } catch (e) {
                console.error("Polling error", e);
            }
        }, 2000);

        return () => clearInterval(poll);
    }, [scanId]);

    if (!data) return (
        <div className="min-h-screen flex items-center justify-center text-white">
            <div className="fixed inset-0 z-0 opacity-50">
                <LiquidEther
                    colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                    mouseForce={13}
                    cursorSize={70}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    BFECC={false}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            <div className="z-10 flex flex-col items-center gap-4">
                <Loader2 className="animate-spin w-10 h-10 text-primary" />
                <p>Connecting to Fixary Engine...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black/90 text-white relative p-8">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <LiquidEther
                    colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                    autoDemo={true}
                    autoSpeed={0.2}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto space-y-8">
                <header className="flex items-center justify-between">
                    <Link to="/">
                        <Button variant="ghost" className="gap-2">
                            <ArrowLeft size={16} /> Back to Home
                        </Button>
                    </Link>
                    <div className="text-xl font-bold">Fixary Audit Report</div>
                </header>

                {data.status === "failed" && (
                    <Card className="p-6 border-red-500/50 bg-red-500/10">
                        <h2 className="text-red-400 font-bold flex items-center gap-2">
                            <ShieldAlert /> Scan Failed
                        </h2>
                        <p className="mt-2 text-gray-300">{data.error}</p>
                    </Card>
                )}

                {data.status !== "completed" && data.status !== "failed" && (
                    <div className="flex flex-col items-center py-20 gap-6">
                        <Loader2 className="w-16 h-16 text-primary animate-spin" />
                        <h2 className="text-2xl font-bold">Auditing Repository...</h2>
                        <p className="text-gray-400">Step: {data.status}</p>
                        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: "60%" }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            />
                        </div>
                    </div>
                )}

                {data.status === "completed" && data.result && (
                    <div className="space-y-8 animate-fade-in">
                        {/* Score Card */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="p-8 border-primary/30 bg-surface/50 backdrop-blur-md flex flex-col items-center justify-center text-center">
                                <div className="text-6xl font-black text-primary mb-2">
                                    {data.result.score}
                                </div>
                                <div className="text-gray-400 uppercase tracking-widest text-xs">Security Score</div>
                            </Card>

                            <Card className="col-span-2 p-8 border-white/10 bg-surface/50 backdrop-blur-md">
                                <h3 className="text-xl font-bold mb-4">Executive Summary</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {data.result.report.summary}
                                </p>
                            </Card>
                        </div>

                        {/* Critical Findings (Red) */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                                <ShieldAlert /> Critical Vulnerabilities (Determinisitc)
                            </h3>
                            {data.result.report.critical?.length === 0 ? (
                                <Card className="p-6 border-green-500/20 bg-green-500/5 flex items-center gap-4">
                                    <CheckCircle className="text-green-500" />
                                    <span>No critical vulnerabilities found.</span>
                                </Card>
                            ) : (
                                data.result.report.critical?.map((item: any, i: number) => (
                                    <Card key={i} className="p-6 border-red-500/30 bg-red-500/5">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-mono text-red-300">{item.rule_id}</h4>
                                                <p className="mt-1 text-gray-300">{item.message}</p>
                                                <div className="mt-4 p-3 bg-black/50 rounded-md font-mono text-xs overflow-x-auto">
                                                    {item.file}:{item.line}
                                                </div>
                                            </div>
                                            <div className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded uppercase">
                                                High Risk
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>

                        {/* Architectural (Blue/Purple) - Now acts as the Full Report Container */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                                <ShieldAlert /> Full AI Security Audit
                            </h3>
                            {data.result.report.architectural?.map((item: any, i: number) => (
                                <Card key={i} className="p-8 border-blue-500/30 bg-blue-500/5 backdrop-blur overflow-hidden">
                                    <div className="prose prose-invert max-w-none">
                                        {/* Simple Header rendering for the 'Review' title if present */}
                                        <h4 className="text-lg font-bold text-blue-300 mb-4">{item.type}</h4>

                                        {/* Render the Markdown Message with basic formatting */}
                                        <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-300">
                                            {item.message.split('\n').map((line: string, idx: number) => {
                                                // Basic Markdown Highlighting
                                                if (line.startsWith('#')) {
                                                    return <h3 key={idx} className="text-blue-200 font-bold text-lg mt-6 mb-2">{line.replace(/^#+\s/, '')}</h3>;
                                                }
                                                if (line.trim().startsWith('- ')) {
                                                    return <div key={idx} className="pl-4 flex gap-2">
                                                        <span className="text-blue-400">•</span>
                                                        <span>{line.replace('- ', '')}</span>
                                                    </div>
                                                }
                                                return <div key={idx}>{line}</div>
                                            })}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
