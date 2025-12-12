import os
import shutil
import git
from typing import Optional

class GitService:
    def __init__(self, base_path: str = "/tmp/fixary_repos"):
        self.base_path = base_path
        if not os.path.exists(self.base_path):
            os.makedirs(self.base_path)

    def clone_repo(self, repo_url: str, scan_id: str) -> str:
        """
        Clones a GitHub repository to a local path.
        Returns the local path.
        """
        repo_name = repo_url.rstrip("/").split("/")[-1]
        target_path = os.path.join(self.base_path, f"{scan_id}_{repo_name}")
        
        # Clean up if exists (in case of retry)
        if os.path.exists(target_path):
            shutil.rmtree(target_path)
            
        print(f"Cloning {repo_url} to {target_path}...")
        git.Repo.clone_from(repo_url, target_path, depth=1)
        return target_path

    def cleanup(self, path: str):
        """Removes the cloned repository."""
        if os.path.exists(path):
            shutil.rmtree(path)
