import os
import sys
import json
from typing import Dict, Any

# Add the local pr-agent-main to sys.path
PR_AGENT_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "pr-agent-main")
if PR_AGENT_PATH not in sys.path:
    # Insert at the beginning to ensure local version takes precedence over installed package
    sys.path.insert(0, PR_AGENT_PATH)
    print(f"Added {PR_AGENT_PATH} to sys.path at index 0")

try:
    from pr_agent.tools.pr_reviewer import PRReviewer
    from pr_agent.config_loader import get_settings
    from pr_agent.git_providers.local_git_provider import LocalGitProvider
except ImportError as e:
    print(f"Failed to import pr_agent from {PR_AGENT_PATH}: {e}")
    # Fallback or error handling
    PRReviewer = None

class PRAgentService:
    """
    Wraps the local pr-agent source code to perform AI analysis.
    """
    
    async def run_ai_analysis(self, repo_path: str) -> Dict[str, Any]:
        """
        Performs a 'Single-Shot' Whole Repository Security Audit.
        Instead of using PR-Agent's chunking logic, we concatenate all code 
        into one massive prompt and send it to Gemini 2.0 Flash.
        This maximizes context usage and minimizes API requests (avoiding 429 errors).
        """
        print(f"🚀 Starting Single-Shot AI Audit on {repo_path}...")
        
        try:
            # 1. Collect ALL Code Context
            code_context = ""
            file_count = 0
            
            # Extensions to analyze (exclude assets, locks, etc.)
            valid_extensions = ('.py', '.js', '.jsx', '.ts', '.tsx', '.json', '.yml', '.yaml', '.html', '.css', '.md', '.java', '.go', '.rb', '.php', '.c', '.cpp', '.h')
            
            for root, dirs, files in os.walk(repo_path):
                if '.git' in dirs: dirs.remove('.git')
                if '__pycache__' in dirs: dirs.remove('__pycache__')
                if 'node_modules' in dirs: dirs.remove('node_modules')
                if 'venv' in dirs: dirs.remove('venv')
                
                for file in files:
                    if file.endswith(valid_extensions):
                        file_path = os.path.join(root, file)
                        rel_path = os.path.relpath(file_path, repo_path)
                        
                        try:
                            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                                content = f.read()
                                code_context += f"\n\n--- FILE: {rel_path} ---\n{content}\n"
                                file_count += 1
                        except Exception as read_err:
                            print(f"Skipping file {rel_path}: {read_err}")

            print(f"📦 Packed {file_count} files into the prompt context.")
            
            # 2. Configure Litellm / Gemini Provider manually
            # We bypass the complex PR-Agent config loader to ensure simple direct access
            from litellm import acompletion
            import litellm
            
            api_key = os.environ.get("GEMINI_API_KEY")
            litellm.api_key = api_key # Direct set
            
            # Explicitly force Google provider env vars just in case
            os.environ["GOOGLE_API_KEY"] = api_key
            os.environ["GEMINI_API_KEY"] = api_key
            
            # 3. Construct the Cybersecurity Auditor Prompt
            system_prompt = """You are Fixary AI, an elite Cybersecurity Auditor specialized in analyzing entire codebases.
            
            YOUR GOAL:
            Perform a deep security audit of the provided codebase. You have visibility over ALL files simultaneously.
            Focus on finding HIGH-SEVERITY vulnerabilities that could compromise the system.
            
            LOOK FOR:
            1. 💉 Injection Vulnerabilities (SQLi, XSS, Command Injection).
            2. 🔑 Hardcoded Secrets (API Keys, Credentials, Tokens).
            3. 🔓 Broken Access Control / Insecure Direct Object References (IDOR).
            4. 🛡️ Insecure Security Configurations (Debug enabled in prod, weak crypto).
            5. 🕵️ Logical Flaws (Bypassing auth, race conditions).

            OUTPUT FORMAT:
            You must respond in clean, well-structured MARKDOWN.
            
            Structure your report as follows:
            # 🛡️ Security Audit Report
            
            ## 🚨 Critical Vulnerabilities
            (List only high-confidence critical issues here manually verified from the code)
            - **[ISSUE_TYPE]** in `filename:line`
              - **Risk**: ...
              - **Fix**: ...
            
            ## ⚠️ Major Concerns
            (Medium/High severity issues)
            
            ## 🔍 Architectural Security Insights
            (Comments on the overall security posture, auth implementation, etc.)
            
            If the code looks clean, explicitly state "No critical vulnerabilities found."
            """
            
            user_message = f"""Here is the complete codebase source code:\n{code_context}\n\nAnalyze it now."""

            print("📡 Sending Single-Shot Request to Gemini 2.0 Flash...")
            
            # 4. Call LLM (Single Request)
            # Using standard 'gemini/gemini-2.0-flash' which litellm maps to Vertex or AI Studio.
            # Ideally we want AI Studio.
            response = await acompletion(
                model="gemini/gemini-2.0-flash",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ]
            )
            
            ai_response_text = response.choices[0].message.content
            print("✅ AI Analysis Received!")

            # 5. Return formatted result
            return {
                "tool": "fixary-one-shot",
                "status": "success",
                "findings": [
                     {
                        "type": "review_md", 
                        "message": ai_response_text,
                        "severity": "info"
                     }
                ]
            }

        except Exception as e:
            print(f"❌ Single-Shot Analysis Failed: {e}")
            import traceback
            traceback.print_exc()
            
            # Fallback error report
            error_report = f"# Scan Failed\n\nError during AI Analysis: `{str(e)}`\n\nPossible causes:\n- Context too large (unlikely for Gemini 2.0)\n- API Key invalid\n- Rate Limit (Wait 60s)"
            return {
                "tool": "fixary-one-shot",
                "status": "failed", 
                "error": str(e),
                "findings": [{ "type": "review_md", "message": error_report, "severity": "error" }]
            }

if __name__ == "__main__":
    # Test run
    import asyncio
    service = PRAgentService()
    # Mock path
    print(service.run_ai_analysis("/tmp/test"))
