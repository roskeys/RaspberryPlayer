import os
from pygame import mixer
from flask import Flask, jsonify, request
from threading import Thread
from queue import Queue

thread = None
app = Flask(__name__)
q = Queue()
global_volume = 42
isPlaying = False

def music_player(in_q, file_name):
    mixer.init()
    mixer.music.load(f"sounds/{file_name}")
    mixer.music.set_volume(0.1)
    mixer.music.play()
    global isPlaying
    while True:
        isPlaying = mixer.music.get_busy()
        command = in_q.get()
        if isinstance(command, int):
            command = max(command, 0)
            command = min(command, 100)
            mixer.music.set_volume(command / 100)
        elif isinstance(command, str):
            if len(command) > 1:
                mixer.music.load(f"sounds/{command}")
            elif command == 'q':
                mixer.music.stop()
                break
            elif command == 'r':
                mixer.music.unpause()
                paused = False
            elif command == 'p':
                mixer.music.pause()
                paused = True
    mixer.quit()

@app.route("/list")
def list_available():
    files = os.listdir("sounds")
    return jsonify({"sounds": files})

@app.route("/play")
def play_sound():
    file_name = request.args.get('f', default="rain.mp3", type=str)
    global thread, q
    while thread is not None and thread.is_alive():
        q.put('q')
    while not q.empty():
        q.get()

    thread = Thread(target=music_player, args=(q, file_name))
    thread.start()
    return "success"

@app.route("/pause")
def pause():
    global q
    q.put('p')
    return "success"

@app.route("/resume")
def resume():
    global q
    q.put('r')
    return "success"

@app.route("/exit")
def exit():
    global q
    q.put('q')
    return "success"

@app.route("/volume")
def volume():
    volume = request.args.get('v', default=global_volume, type=int)
    global q
    q.put(volume)
    return "success"

@app.route("/status")
def status():
    if thread is None:
        return "Empty"
    else:
        if thread.is_alive():
            if isPlaying:
                return "playing"
            else:
                return "paused"
        else:
            return "exited"
