from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

relation_chat_user = db.Table('relation_chat_user',
  # db.Column("id", db.Integer, primary_key=True),
  db.Column("chat_id", db.Integer, db.ForeignKey("chats.id"), primary_key=True),
  db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
  db.Column("dhkPrivate", db.String), # diffie hellman key private
  db.Column("dhkPublic", db.String)) # diffie hellman key public


# class RelationChatUser(db.Model):
#   __tablename__ = "relation_chat_user"

#   chat_id = db.Column(db.Integer, db.ForeignKey('chats.id'), primary_key=True)
#   user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

#   dhkPrivate = db.Column(db.String) # diffie hellman key private
#   dhkPublic = db.Column(db.String) # diffie hellman key public)

#   user = db.relationship("Users", backref=db.backref("chats_relation", lazy="dynamic"))
#   chat = db.relationship("Chats", backref=db.backref("users_relation", lazy="dynamic"))

#################
#  Users models #
#################
class Users(db.Model):
  __tablename__ = "users"

  id = db.Column(db.Integer, primary_key=True)
  public_name = db.Column(db.String)
  email = db.Column(db.Integer, index=True, unique=True)
  password = db.Column(db.String)
  skPublic = db.Column(db.String)
  skPrivate = db.Column(db.String)
  skPrivateIV = db.Column(db.String)
  wkSalt = db.Column(db.String)
  chats = db.relationship("Chats", secondary=relation_chat_user, backref=db.backref("users", lazy="dynamic"), lazy="dynamic")

  def __repr__(self):
    return f"<Users {self.email}>"


#################
#  Chats models  #
#################
class Chats(db.Model):
  __tablename__ = "chats"

  id = db.Column(db.Integer, primary_key=True)
  secret = db.Column(db.String)
  lines = db.relationship("ChatLines", backref="chat", lazy="dynamic")
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now(), index=True)

  def __repr__(self):
    return f"<Chats {self.id}>"

class ChatLines(db.Model):
  __tablename__ = "chat_lines"

  id = db.Column(db.Integer, primary_key=True)
  created_on = db.Column(db.DateTime, server_default=db.func.now(), index=True)
  chat_id = db.Column(db.Integer, db.ForeignKey("chats.id"))
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  message = db.Column(db.String)
  
  def __repr__(self):
    return f"<ChatLines {self.id}: {self.text}>"