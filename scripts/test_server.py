import urllib.request
import threading
import http.server
import socketserver
import time
import os

# Disable slow reverse DNS lookup on Windows
http.server.BaseHTTPRequestHandler.address_string = lambda self: self.client_address[0]
http.server.SimpleHTTPRequestHandler.log_message = lambda self, format, *args: None

class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True

def main():
    PORT = 8092
    httpd = ThreadedHTTPServer(('127.0.0.1', PORT), http.server.SimpleHTTPRequestHandler)
    t = threading.Thread(target=httpd.serve_forever)
    t.daemon = True
    t.start()

    time.sleep(0.1)

    all_imgs = [f for f in os.listdir('assets/images') if f.endswith('.jpg') or f.endswith('.webp')]
    urls = [
        'http://127.0.0.1:8092/index.html',
        'http://127.0.0.1:8092/css/style.css',
        'http://127.0.0.1:8092/js/data.js',
        'http://127.0.0.1:8092/js/audio.js',
        'http://127.0.0.1:8092/js/app.js',
        'http://127.0.0.1:8092/content.json'
    ] + [f'http://127.0.0.1:8092/assets/images/{f}' for f in all_imgs]

    start_time = time.time()
    for url in urls:
        with urllib.request.urlopen(url) as res:
            name = url.split('/')[-1]
            data = res.read()
            print(f"{res.status} OK: {name:32} ({len(data)} bytes)")

    elapsed = time.time() - start_time
    httpd.shutdown()
    print(f"\nALL {len(urls)} FILES VERIFIED WITH 200 OK IN {elapsed:.2f}s!")

if __name__ == '__main__':
    main()
