from dataclasses import dataclass
from typing import Optional

from db import dbApi
from fastapi import FastAPI
from interfaces import User

app = FastAPI()

SESSIONS: dict[str, User] = {}


@dataclass
class UserResponse:
    user: Optional[User]
    reason: str = ""


def create_session(session_token: str, user: User):
    SESSIONS[session_token] = user


def delete_session(session_token: str):
    if session_token in SESSIONS:
        SESSIONS.pop(session_token)


@app.get("/api/login")
def login(username: str, password: str, session_token: str):
    try:
        user_with_password = dbApi.get_user_by_username(username)
    except dbApi.UserNotFoundError:
        return UserResponse(None, "User not found")

    if password != user_with_password.password:
        return UserResponse(None, "Incorrect password")

    create_session(session_token, user_with_password.user)

    return get_current_logged_in_user(session_token)


@app.get("/api/currentLoggedUser")
def get_current_logged_in_user(session_token: str):
    if session_token in SESSIONS:
        return SESSIONS[session_token]


@app.post("/api/logout")
def logout(session_token: str):
    delete_session(session_token)
