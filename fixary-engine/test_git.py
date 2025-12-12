from app.services.git_service import GitService
import os

def test_clone():
    service = GitService()
    # Test with a small, public repo
    repo_url = "https://github.com/octocat/Hello-World"
    scan_id = "test_scan_001"
    
    print(f"Testing cloning of {repo_url}...")
    try:
        path = service.clone_repo(repo_url, scan_id)
        if os.path.exists(path) and os.path.isdir(path):
            print(f"✅ Success! Cloned to: {path}")
            print(f"Contents: {os.listdir(path)}")
            service.cleanup(path)
            print("✅ Cleanup successful.")
        else:
            print("❌ Failed: Directory not found.")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_clone()
