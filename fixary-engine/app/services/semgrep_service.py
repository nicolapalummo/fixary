import subprocess
import json
import os
from typing import List, Dict, Any

class SemgrepService:
    def run_scan(self, repo_path: str) -> List[Dict[str, Any]]:
        """
        Runs Semgrep on the given repository path.
        Returns a list of raw findings.
        """
        print(f"Running Semgrep on {repo_path}...")
        
        # We use strict security rules + secrets
        # In a real MVP, we might bundle a custom yaml file
        command = [
            "semgrep",
            "scan",
            "--config", "p/security-audit",
            "--config", "p/secrets",
            "--json",
            repo_path
        ]

        try:
            result = subprocess.run(command, capture_output=True, text=True)
            if result.returncode != 0 and result.returncode != 1: # 0=clean, 1=issues found
                 # semgrep exit codes can vary, but we mainly care if we got JSON output
                 print(f"Semgrep stderr: {result.stderr}")

            output_json = json.loads(result.stdout)
            return self._parse_results(output_json)
        except Exception as e:
            print(f"Semgrep failed: {e}")
            return []

    def _parse_results(self, raw_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Simplifies Semgrep JSON output into Fixary internal format.
        """
        findings = []
        for result in raw_data.get("results", []):
            findings.append({
                "tool": "semgrep",
                "type": "hard_risk",
                "rule_id": result.get("check_id"),
                "message": result.get("extra", {}).get("message"),
                "severity": result.get("extra", {}).get("severity"),
                "file": result.get("path"),
                "line": result.get("start", {}).get("line"),
                "code_snippet": result.get("extra", {}).get("lines")
            })
        return findings
