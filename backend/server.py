from flask import Flask, request, abort, make_response, jsonify
from flask_cors import CORS
import database.connect as conn

app = Flask(__name__)
CORS(app)

@app.before_request
def only_post_json():
  if request.method == "POST" and not request.is_json: 
    abort(make_response(jsonify(error="Request must be JSON"), 415))

def validateReq(data, required):
  if not all(field in data and data[field] for field in required):
    abort(make_response(jsonify(error=f"Required params: {', '.join(required)}"), 409))


@app.route("/register", methods=["POST"])
def register():
  data = request.get_json()
  validateReq(data, ["publicName", "email", "password"])

  success = conn.add_user(data["publicName"], data["email"], data["password"])
  if not success:
    abort(make_response(jsonify(email="Email already in use"), 400))
  return make_response(jsonify({}), 200)

@app.route("/login", methods=["POST"])
def login():
  data = request.get_json()
  if data["email"] is None or data["password"] is None:
    abort(make_response(jsonify(error="Required params: 'email', 'password'"), 409))
  user_details = conn.auth(data["email"], data["password"])
  if not user_details:
    abort(make_response(jsonify(error="Incorrect user/password"), 403))
  return make_response(jsonify(user_details))

@app.route("/chats/send", methods=["POST"])
def send_message():
  from_email = request.headers.get("email")
  data = request.get_json()
  chat_id = conn.send_message(from_email, data["to"], data["message"])
  if not chat_id:
    abort(make_response(jsonify(error=f"Cannot send message. User with email {from_email} doesn't exist"), 404))
  return make_response(jsonify(success=f"Message sent to chat with id {chat_id}"), 200)

@app.route("/chats", methods=["GET"])
def get_chats():
  from_email = request.headers.get("email")
  chats = conn.get_chats(from_email)
  return make_response(jsonify(chats), 200)

@app.route("/chats/<id>", methods=["GET"])
def get_chat(id):
  from_email = request.headers.get("email")
  chat = conn.get_chat(from_email, id)

  if chat is None:
    abort(make_response(jsonify(error="Chat doesn't exist"), 404))
  return chat


if __name__ == '__main__':
  conn.init_database(app)
  app.run(debug=True) #, host="0.0.0.0")