import subprocess
import time
import re
import threading
import urllib.request
import os

print("Starting auto-reconnecting tunnel daemon with active keepalive...")

active_url = None
stop_ping = False

def keepalive_pinger():
    global active_url, stop_ping
    while not stop_ping:
        if active_url:
            try:
                req = urllib.request.Request(
                    f"{active_url}/api/health",
                    headers={'User-Agent': 'TunnelKeepAlive/1.0'}
                )
                with urllib.request.urlopen(req, timeout=10) as resp:
                    pass
            except Exception as err:
                pass
        time.sleep(35)

pinger_thread = threading.Thread(target=keepalive_pinger, daemon=True)
pinger_thread.start()

while True:
    try:
        proc = subprocess.Popen(
            [
                "ssh",
                "-o", "StrictHostKeyChecking=no",
                "-o", "ServerAliveInterval=20",
                "-o", "ServerAliveCountMax=3",
                "-R", "80:localhost:3000",
                "nokey@localhost.run"
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )

        for line in proc.stdout:
            print(line, end='', flush=True)
            match = re.search(r'https://([a-z0-9]+\.lhr\.life)', line)
            if match:
                url = match.group(0)
                active_url = url
                print(f"\n>>> ACTIVE PERSISTENT TUNNEL URL: {url} <<<\n", flush=True)
                os.makedirs('scratch', exist_ok=True)
                with open('scratch/active_tunnel_url.txt', 'w') as f:
                    f.write(url)

        proc.wait()
    except Exception as e:
        print("Tunnel process exception:", e)

    print("Connection closed. Reconnecting in 3 seconds...")
    time.sleep(3)
