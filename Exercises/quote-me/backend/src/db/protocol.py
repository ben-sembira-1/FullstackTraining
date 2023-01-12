from datetime import datetime
from typing import Protocol

from interfaces.quote import Quote
from interfaces.user import User
from pydantic import BaseModel


class DBUser(BaseModel):
    user: User
    password_hash: str


class DBScheme(BaseModel):
    users: dict[str, DBUser]
    quotes: list[Quote]


class DBUserDoesNotExistError(Exception):
    pass


class DBDateIsFromTheFutureError(Exception):
    pass


class DBUserExistsError(Exception):
    pass


class QuoteMeDB(Protocol):
    def add_user(self, dbuser: DBUser):
        ...

    def add_quote(self, quote: Quote):
        ...

    def get_user(self, username: str) -> User:
        ...

    def get_quotes(self, newest: datetime, max_amount: int) -> list[Quote]:
        ...
