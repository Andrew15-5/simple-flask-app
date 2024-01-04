default:
  . .venv/bin/activate && cd app && flask run

install:
  python3 -m venv .venv
  . .venv/bin/activate && pip install flask

clean:
  rm -rf .venv app/__pycache__ app/static/files
