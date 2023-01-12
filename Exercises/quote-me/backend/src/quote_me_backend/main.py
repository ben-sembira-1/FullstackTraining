from dataclasses import dataclass
from typing import Optional

from fastapi import FastAPI, HTTPException, status
from quote_me_backend.db.protocol import DBSessionNotFoundError

from .db import dbApi, mock_db
from .interfaces import User

app = FastAPI()
db = mock_db.MockDB()


@dataclass
class LoginResponse:
    user: Optional[User]
    reason: str = ""


SessionToken = str


def check_user_exists(username):
    try:
        dbApi.get_user_by_username(db, username)
    except dbApi.UserNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )


@app.get("/api/login")
def login(username: str, password: str) -> SessionToken:
    check_user_exists(username)

    if not dbApi.is_password_correct(db, username, password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password",
        )

    session_token = dbApi.create_session(db, username)
    return session_token


@app.post("/api/register")
def register(user: User, password: str):
    try:
        dbApi.create_new_user(db, user, password)
    except dbApi.UsernameExsitsError:
        raise HTTPException(
            status_code=status.HTTP_226_IM_USED,
            detail="username already taken",
        )


@app.get("/api/currentLoggedUser")
def logged_in_user(session_token) -> User:
    try:
        return dbApi.get_user_by_session(db, session_token).user
    except DBSessionNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not logged in",
        )


@app.post("/api/logout")
def logout(session_token: str) -> None:
    dbApi.delete_session(session_token)
