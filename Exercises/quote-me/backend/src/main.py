from dataclasses import dataclass
from typing import Optional

from db import dbApi
from fastapi import FastAPI
from interfaces import User

app = FastAPI()


@dataclass
class LoginResponse:
    user: Optional[User]
    reason: str = ""


@app.get("/api/login")
def login(username: str, password: str, session_token: str) -> LoginResponse:
    try:
        user_with_password = dbApi.get_user_by_username(username)
    except dbApi.UserNotFoundError:
        return LoginResponse(None, "User not found")

    if password != user_with_password.password:
        return LoginResponse(None, "Incorrect password")

    dbApi.create_session(session_token, user_with_password.user)

    return LoginResponse(get_current_logged_in_user(session_token))


@app.get("/api/currentLoggedUser")
def get_current_logged_in_user(session_token: str) -> Optional[User]:
    dbApi.get_user_by_session(session_token)


@app.post("/api/logout")
def logout(session_token: str) -> None:
    dbApi.delete_session(session_token)
