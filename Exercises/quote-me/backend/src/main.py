import secrets
from dataclasses import dataclass
from typing import Optional

from db import dbApi
from fastapi import FastAPI, HTTPException, status
from interfaces import User

app = FastAPI()


@dataclass
class LoginResponse:
    user: Optional[User]
    reason: str = ""


SessionToken = str


@app.get("/api/login")
def login(username: str, password: str) -> SessionToken:
    try:
        user_with_password = dbApi.get_user_by_username(username)
    except dbApi.UserNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    if not secrets.compare_digest(
        password.encode("utf8"), user_with_password.password.encode("utf8")
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password",
        )

    session_token = dbApi.create_session(user_with_password.user)
    return session_token


@app.get("/api/currentLoggedUser")
def get_current_logged_in_user(session_token: str) -> Optional[User]:
    return dbApi.get_user_by_session(session_token)


@app.post("/api/logout")
def logout(session_token: str) -> None:
    dbApi.delete_session(session_token)
