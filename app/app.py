# Copyright (C) 2022  Andrew Voynov
import json
import re
import os
from pathlib import Path

from flask import Flask, render_template, request

app = Flask(__name__)
notes_file = Path("static/files/notes.json")


def add_note(note):
    notes = get_notes()
    notes.append(note)
    save_notes(notes)


def get_notes():
    try:
        with open(notes_file, "r") as file:
            return json.load(file)
    except:
        save_notes([])
        return []


def get_notes_table():
    notes = get_notes()
    if not len(notes):
        return "<p>You don't have any notes yet</p>"
    content = ""
    for note in notes:
        content += " " * 12 + f'<tr><td>{note["name"]}</td><td>'
        content += re.sub(r"\n", "<br>", note["content"])
        content += "</td></tr>\n"
    return render_template("table.html", content=content)


def save_notes(notes):
    os.makedirs(notes_file.parent, exist_ok=True)
    with open(notes_file, "w") as file:
        json.dump(notes, file)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/notes", methods=["GET", "POST"])
def notes():
    if request.method == "GET":
        if "give" in request.args.keys():
            return get_notes_table()
        else:
            return render_template("notes.html")
    else:
        add_note(request.form)
        return get_notes_table()


if __name__ == "__main__":
    app.run()
