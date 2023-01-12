import secrets
from dataclasses import dataclass
from typing import Optional

from fastapi import FastAPI, HTTPException, status

from .db import dbApi, mock_db
from .interfaces import User

app = FastAPI()
db = mock_db.MockDB()


@dataclass
class LoginResponse:
    user: Optional[User]
    reason: str = ""


SessionToken = str


@app.get("/api/login")
def login(username: str, password: str) -> SessionToken:
    try:
        user_with_password = dbApi.get_user_by_username(db, username)
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

    session_token = dbApi.create_session(db, user_with_password.user)
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
    logged_user = dbApi.get_user_by_session(db, session_token)
    if logged_user is not None:
        return logged_user
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not logged in",
    )


@app.post("/api/logout")
def logout(session_token: str) -> None:
    dbApi.delete_session(session_token)
