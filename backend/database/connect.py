from .models import *
from .utils import database_is_empty, database_file_exists
from werkzeug.security import generate_password_hash, check_password_hash

DATABASE_FILE = "database/ducktalk.db"

def init_database(app):
  app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DATABASE_FILE}"
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
  db.init_app(app)
  if not database_file_exists(DATABASE_FILE) or database_is_empty(db, app):
    with app.app_context():
      db.create_all()

def add_user(public_name, email, password):
  user = Users(public_name=public_name, email=email, password=generate_password_hash(password))
  db.session.add(user)
  try:
    db.session.commit()
  except:
    return False
  return True

def auth(email, password):
  user = Users.query.filter_by(email=email).first()
  if user is None:
    return
  if not check_password_hash(user.password, password):
    return
  return { "publicName": user.public_name, "email": user.email }, user.id

def send_message(from_user_id, to_id, message):
  # Assume from_user exists and is authenticated
  from_user = Users.query.get(from_user_id)
  to_user = Users.query.filter_by(id=to_id).first()
  if (to_user is None):
    return False

  # Get the from_user chat that contains the to_user
  chat = from_user.chats.filter(Chats.users.any(id=to_user.id)).first()

  if chat is None: # Create new chat if there's none (chat just started)
    chat = Chats()
    chat.users.append(from_user)
    chat.users.append(to_user)
    db.session.add(chat)
  
  # Create the message
  chat_line = ChatLines(user_id=from_user.id, message=message)
  chat.lines.append(chat_line)
  db.session.add(chat_line)
  db.session.commit()

  line_response = {
    "message": chat_line.message,
    "on": chat_line.created_on,
    "from": Users.query.get(chat_line.user_id).public_name
  }

  return {
    "chatId": chat.id,
    "line": line_response
  }

def get_chats(from_id):
  from_user = Users.query.filter_by(id=from_id).first()
  chats_response = []
  chats = from_user.chats.order_by(Chats.updated_on).all()

  for chat in chats:
    last_line = chat.lines.order_by(ChatLines.created_on.desc()).first()
    last_line_from = Users.query.get(last_line.user_id)

    chats_response.append({
      "id": chat.id, 
      # "with" has the user that is part of the chat but is not the from_user
      # the .first() works for 1-1 chats but the query can be modified for group chats
      "with": chat.users.filter(Users.id != from_user.id).first().public_name,
      "lastLine": last_line.message
    })
  return chats_response

def get_chat(from_id, chat_id):
  chat = Chats.query.get(chat_id)
  chat_participant = chat.users.filter_by(id=from_id).first()

  if chat is None or chat_participant is None: # don't show chat if the user is not a participant
    return None

  chat_response = { "lines": [] }
  chat_response["id"] = chat.id
  otherParticipant = chat.users.filter(Users.id != from_id).first()
  chat_response["with"] = {
    "publicName": otherParticipant.public_name,
    "id": otherParticipant.id
  }
    
  for line in chat.lines:
    line_response = {
      "message": line.message,
      "on": line.created_on,
      "from": Users.query.get(line.user_id).public_name
    }
    chat_response["lines"].append(line_response)

  return chat_response
