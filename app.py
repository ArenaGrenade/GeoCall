from flask import Flask, render_template, request, flash, url_for, redirect, jsonify
from wtforms import Form, TextField, TextAreaField, StringField, SubmitField, ValidationError, validators
from flask_wtf import FlaskForm
from flask_simple_geoip import SimpleGeoIP
from models import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'SjdnUends821Jsdlkvxh391ksdODnejdDw'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://okxcozfadnqnzf:' \
                                        '1424b0ac3b7135753b6ece87fd62beeac2bd18ebacd45c80816428980ea36e78@' \
                                        'ec2-18-235-97-230.compute-1.amazonaws.com:5432/d7o7kisoh901m8'
app.config['GEOIPIFY_API_KEY'] = 'at_0sULU6rAzLuuAqFgCBpoWE758vcoR'

db = SQLAlchemy(app)
simple_geoip = SimpleGeoIP(app)


class Account(FlaskForm):
    firstname = StringField(u'First Name', validators=[])
    lastname = StringField(u'Last Name', validators=[])
    username = StringField(u'Email Address', validators=[])
    email = StringField(u'User Name', validators=[validators.Email()])
    password = StringField(u'Password', validators=[])
    re_pass = StringField(u'Re-enter Password', validators=[validators.EqualTo('password')])


@app.route('/reset_password')
def reset_password():
    return "reset password here"


@app.route('/new_account', methods=["POST", "GET"])
def new_account():
    form = Account(request.form)
    print(request.form)
    if form.validate_on_submit():
        dup_user_obj_1 = User.query.filter_by(u_name=request.form['u_name']).first()
        dup_user_obj_2 = User.query.filter_by(email=request.form['email']).first()
        if dup_user_obj_1 or dup_user_obj_2:
            return "Nope don't try"
        else:
            new_user = User(
                f_name = request.form['f_name'],
                l_name = request.form['l_name'],
                u_name = request.form['u_name'],
                email = request.form['email'],
            )
            new_user.set_password(request.form['password'])
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('login'))
    else:
        return render_template('signup.html', form=form)


@app.route('/login', methods=["POST", "GET"])
def login():
    print(request.form)
    if request.method == "POST":
        print(request.form['iuname'])
        user = User.query.filter_by(u_name=request.form['iuname']).first()
        if user:
            if user.check_password(request.form['ipsswrd']):
                flash(u'You have successfully logged in', 'success')
                return "You have entered your chat page"
            else:
                flash(u'You have entered the wrong password', 'error')
        else:
            flash(u'This user name doesn\'t exist please create a new account', 'error')
    return render_template('login.html', form=request.form)


@app.route('/')
def welcome():
    geoip_data = simple_geoip.get_geoip_data()
    return jsonify({'ip': request.remote_addr}), 200


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
