from flask import Flask, request, abort, make_response, jsonify
import database.connect as conn

app = Flask(__name__)

@app.before_request
def only_post_json():
  if request.method == "POST" and not request.is_json: 
    abort(make_response(jsonify(error="Request must be JSON"), 415))

# def validate_required(data, req_params):
  # for req_param in data:


@app.route("/register", methods=["POST"])
def register():
  data = request.get_json()
  if data["public_name"] is None or data["email"] is None or data["password"] is None:
    abort(make_response(jsonify(error="Required params: 'public_name', 'email', 'password'"), 409))
  success = conn.add_user(data["public_name"], data["email"], data["password"])
  if not success:
    abort(make_response(jsonify(error="Email already in use"), 409))
  return make_response(jsonify({}), 200)

@app.route("/login", methods=["POST"])
def login():
  data = request.get_json()
  if data["email"] is None or data["password"] is None:
    abort(make_response(jsonify(error="Required params: 'email', 'password'"), 409))
  user_details = conn.auth(data["email"], data["password"])
  if user_details is None:
    abort(make_response(jsonify(error="User with this email doesn't exist"), 404))
  if not user_details:
    abort(make_response(jsonify(error="Incorrect password"), 403))
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