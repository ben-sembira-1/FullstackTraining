from datetime import datetime
from typing import Protocol

from pydantic import BaseModel
from quote_me_backend.interfaces.quote import Quote
from quote_me_backend.interfaces.user import User


class DBUser(BaseModel):
    user: User
    password_hash: int


class DBScheme(BaseModel):
    users: dict[str, DBUser]
    quotes: list[Quote]
    sessions: dict[str, DBUser]

    @classmethod
    def create_empty(cls):
        return cls(users={}, quotes=[], sessions={})


class DBUserDoesNotExistError(Exception):
    pass


class DBDateIsFromTheFutureError(Exception):
    pass


class DBUserExistsError(Exception):
    pass


class DBSessionNotFoundError(Exception):
    pass


class QuoteMeDB(Protocol):
    def add_user(self, dbuser: DBUser):
        ...

    def add_quote(self, quote: Quote):
        ...

    def get_user(self, username: str) -> DBUser:
        ...

    def get_quotes(self, newest: datetime, max_amount: int) -> list[Quote]:
        ...

    def add_session(self, username: str) -> str:
        ...

    def get_session(self, session_token: str):
        ...

    def delete_session(self, session_token: str):
        ...
