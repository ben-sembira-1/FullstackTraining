from threading import Lock
from uuid import uuid4

from .protocol import (
    DBDateIsFromTheFutureError,
    DBScheme,
    DBSessionNotFoundError,
    DBUser,
    DBUserDoesNotExistError,
    DBUserExistsError,
    Quote,
    datetime,
)


def _index_for_sorted_insert_quote(
    quotes: list[Quote],
    quote_to_insert: Quote,
) -> int:
    for index, quote_from_db in enumerate(quotes):
        if quote_to_insert.date >= quote_from_db.date:
            return index


class MockDB:
    def __init__(self):
        self.data: DBScheme = DBScheme.create_empty()
        self.users_lock = Lock()
        self.quotes_lock = Lock()
        self.sessions_lock = Lock()

    def add_user(self, dbuser: DBUser):
        with self.users_lock:
            if dbuser.user.username in self.data.users:
                raise DBUserExistsError()
            self.data.users[dbuser.user.username] = dbuser

    def add_quote(self, quote_to_insert: Quote):
        if quote_to_insert.date > datetime.now():
            raise DBDateIsFromTheFutureError()
        with self.quotes_lock:
            index_to_insert = _index_for_sorted_insert_quote(
                self.data.quotes,
                quote_to_insert,
            )
            self.data.quotes.insert(index_to_insert, quote_to_insert)

    def get_user(self, username: str) -> DBUser:
        with self.users_lock:
            if username not in self.data.users:
                raise DBUserDoesNotExistError()
            return self.data.users[username]

    def _quotes_older_then(self, older_then: datetime):
        for index, quote in enumerate(self.data.quotes):
            if quote.date < older_then:
                return self.data.quotes[index:]

    def get_quotes(self, newest: datetime, max_amount: int) -> list[Quote]:
        with self.quotes_lock:
            return self._quotes_older_then(older_then=newest)[:max_amount]

    def add_session(self, username: str) -> str:
        session_token = uuid4()
        with self.sessions_lock:
            self.data.sessions[session_token] = username
        return session_token

    def get_session_username(self, session_token: str) -> str:
        with self.sessions_lock:
            if session_token in self.data.sessions:
                return self.data.sessions[session_token]
        raise DBSessionNotFoundError()

    def delete_session(self, session_token: str):
        with self.sessions_lock:
            if session_token in self.data.sessions:
                self.data.sessions.pop(session_token)
