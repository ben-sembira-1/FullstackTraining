from quote_me_backend.interfaces.user import User

from .protocol import (
    DBSessionNotFoundError,
    DBUser,
    DBUserDoesNotExistError,
    DBUserExistsError,
    QuoteMeDB,
)


class UserNotFoundError(Exception):
    pass


class UsernameExsitsError(Exception):
    pass


class SessionNotFoundError(Exception):
    pass


def get_user_by_username(db: QuoteMeDB, username: str) -> DBUser:
    try:
        return db.get_user(username)
    except DBUserDoesNotExistError:
        raise UserNotFoundError()


def hash_password(password: str):
    return hash(password.encode("utf8"))


def create_new_user(db: QuoteMeDB, user: User, password: str):
    try:
        db.add_user(DBUser(user=user, password_hash=hash_password(password)))
    except DBUserExistsError:
        raise UsernameExsitsError()


def is_password_correct(db: QuoteMeDB, username: str, password: str):
    attempt = hash_password(password)
    correct = get_user_by_username(db, username).password_hash
    return attempt == correct


def get_user_by_session(db: QuoteMeDB, session_token: str):
    try:
        username = db.get_session_username(session_token)
        return db.get_user(username)
    except DBSessionNotFoundError:
        raise SessionNotFoundError()


def create_session(db: QuoteMeDB, username: str):
    return db.add_session(username)


def delete_session(db: QuoteMeDB, session_token: str):
    db.delete_session(session_token)
