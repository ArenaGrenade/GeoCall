from flask import Flask, render_template, request, flash, url_for, redirect
from flask_socketio import SocketIO
from wtforms import Form, TextField, TextAreaField, StringField, SubmitField, ValidationError, validators
from flask_sqlalchemy import SQLAlchemy
import os
import hashlib

app = Flask(__name__)
app.config['SECRET_KEY'] = 'SjdnUends821Jsdlkvxh391ksdODnejdDw'
socketio = SocketIO(app)

app_dir = os.path.dirname(os.path.abspath(__file__))
db_file = "sqlite:///{}".format(os.path.join(app_dir, "User.db"))
app.config['SQLALCHEMY_DATABASE_URI'] = db_file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    u_name = db.Column(db.String(24), nullable = False)
    passwrd = db.Column(db.String(64), nullable = False)

    def __init__(self, username, password):
        self.u_name = username
        self.passwrd = password


def is_part(form, field):
    user_with_uname = User.query.filter_by(u_name=field.data).first()
    if not user_with_uname:
        raise ValidationError('You are not authorized')
    else:
        if user_with_uname.passwrd != form.password.data:
            raise ValidationError('You are not authorized')


class LoginForm(Form):
    username = StringField('Username', validators=[validators.required(), validators.length(min=6, max=24), is_part])
    password = StringField('Password', validators=[validators.required(), validators.length(min=8, max=16)])


@app.route('/reset_password')
def reset_password():
    return "reset password here"


@app.route('/new_account', methods=["POST", "GET"])
def new_account():
    return render_template('signup.html')


@app.route('/login', methods=["POST", "GET"])
def login():
    form = LoginForm(request.form)
    if request.method == "POST":
        form.username.data = request.form['iuname']
        form.password.data = request.form['ipsswrd']
        print(form.username.data + " " + form.password.data)

        if form.validate():
            flash(u"You have logged in successfully as " + form.username.data, 'success')
            print("Validation Success")
        else:
            if form.errors["username"][0] == 'You are not authorized':
                flash(u"You do not have an account", 'error')
            else:
                flash(u"Please use valid credentials", 'error')
            print("Validate Failed")
            print(form.errors)
    return render_template('login.html', form=form)


@app.route('/')
def welcome():
    db.session.add(User("admin101", "Hacker101"))
    db.session.add(User("admin102", "Hacker102"))
    db.session.add(User("admin103", "Hacker103"))
    db.session.commit()
    return redirect(url_for("login"))


if __name__ == '__main__':
    db.create_all()
    socketio.run(app, debug=True)
