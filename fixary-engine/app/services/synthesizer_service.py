from typing import List, Dict, Any
import json
# In real implementation: import google.generativeai as genai

class SynthesizerService:
    """
    The 'Great Merger'.
    Takes findings from Semgrep (Track B) and PR-Agent (Track A).
    Uses Gemini to synthesize them into a unified report.
    """
    
    def synthesize(self, semgrep_findings: List[Dict], ai_findings: Dict) -> Dict[str, Any]:
        print("Synthesizing results (Track A + Track B)...")
        
        # 1. Prepare the Prompt Context
        facts = json.dumps(semgrep_findings, indent=2)
        narrative = json.dumps(ai_findings, indent=2)
        
        prompt = f"""
        You are the Chief Auditor of Fixary.
        
        Data Source A (Deterministic Scanner - The Facts):
        {facts}
        
        Data Source B (AI Reviewer - The Intuition):
        {narrative}
        
        Task:
        1. Compare and Merge findings.
        2. If Semgrep found a SECRET or CRITICAL issue, prioritize it immediately.
        3. Create a unified "Strategic Report" divided by:
           - 🚨 Critical Vulnerabilities (Must Fix Now)
           - 🏗 architectural Debt (Long term)
           - 🧹 Code Hygiene (Quick Wins)
        
        Output JSON format.
        """
        
        # 2. Call LLM (Mocked for MVP)
        # response = genai.generate_text(prompt)
        # return json.loads(response.text)
        
        # Mocked Merged Output
        # Mocked Merged Output (Dynamic)
        critical_count = len(semgrep_findings)
        
        # Extract AI Content
        ai_findings_list = ai_findings.get("findings", [])
        ai_message = "AI Analysis pending."
        ai_full_review = ""
        
        for f in ai_findings_list:
            if f.get("type") == "review_md":
                ai_full_review = f.get("message", "")
                ai_message = "AI Audit Completed."
            elif f.get("message"):
                 ai_message = f.get("message")

        if critical_count > 0:
            summary = f"⚠️ Found {critical_count} critical security issues. {ai_message}"
        else:
            summary = f"✅ Semgrep clean. {ai_message}"
            
        return {
            "status": "completed",
            "score": 100 - (critical_count * 10), # Simple score logic
            "report": {
                "critical": semgrep_findings, 
                "architectural": [
                    {
                        "type": "Security Audit (Gemini 2.0 Flash)",
                        "message": ai_full_review,
                        "suggestion": "Review the full report above."
                    }
                ],
                "summary": summary
            }
        }
