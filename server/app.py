from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt


app = Flask(__name__)

CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)

app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

@app.route('/login', methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    # Hash the password before comparing it
    hashed_password = bcrypt.generate_password_hash("test").decode("utf-8")

    # Compare the hashed password with the stored hashed password
    if not bcrypt.check_password_hash(hashed_password, password):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)

    return jsonify(token=access_token)


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200



if __name__ == '__main__':
    app.run()
