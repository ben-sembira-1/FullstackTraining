from threading import Lock

from quote_me_backend.interfaces.user import User

from .protocol import (
    DBDateIsFromTheFutureError,
    DBScheme,
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
        self.data: DBScheme = DBScheme(users={}, quotes=[])
        self.users_lock = Lock()
        self.quotes_lock = Lock()

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

    def get_user(self, username: str) -> User:
        with self.users_lock:
            if username not in self.data.users:
                raise DBUserDoesNotExistError()
            return self.data.users[username].user

    def _quotes_older_then(self, older_then: datetime):
        for index, quote in enumerate(self.data.quotes):
            if quote.date < older_then:
                return self.data.quotes[index:]

    def get_quotes(self, newest: datetime, max_amount: int) -> list[Quote]:
        with self.quotes_lock:
            return self._quotes_older_then(older_then=newest)[:max_amount]
