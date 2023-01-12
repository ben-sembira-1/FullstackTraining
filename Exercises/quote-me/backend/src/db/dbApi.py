from uuid import uuid4

from interfaces.user import User, UserWithPassword

ALL_USERS: dict[str, UserWithPassword] = {
    "yoel": UserWithPassword(
        user=User(
            firstName="Yoel",
            lastName="Basin",
            username="yoel",
            photoUrl="",
            uuid="abcd",
        ),
        password="pass",
    )
}

SESSIONS: dict[str, User] = {}


class UserNotFoundError(Exception):
    pass


def get_user_by_username(username: str) -> UserWithPassword:
    try:
        return ALL_USERS[username]
    except KeyError:
        raise UserNotFoundError()


def get_user_by_session(session_token: str):
    if session_token in SESSIONS:
        return SESSIONS[session_token]


def create_session(user: User):
    session_token = uuid4()
    SESSIONS[session_token] = user
    return session_token


def delete_session(session_token: str):
    if session_token in SESSIONS:
        SESSIONS.pop(session_token)
