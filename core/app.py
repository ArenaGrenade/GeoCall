from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjkknf1232#'
socketio = SocketIO(app)

@app.route('/', methods=["POST", "GET"])
def login():
    return render_template('login.html')

@app.route('/reset_password')
def reset_password():
    return "reset password here"

@app.route('/new_account', methods=["POST", "GET"])
def new_account():
    return render_template('signup.html')


if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0')
