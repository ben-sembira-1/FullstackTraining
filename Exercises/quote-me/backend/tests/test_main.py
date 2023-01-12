from uuid import uuid4

import pytest
from quote_me_backend import main
from quote_me_backend.interfaces.user import User


@pytest.fixture
def valid_user():
    return User(
        firstName="Ben",
        lastName="Sembira",
        photoUrl="",
        username="ben",
        uuid=uuid4(),
    )


def test_register(valid_user: User):
    password = "pass"
    main.register(valid_user, password)
    token = main.login(valid_user.username, password)
    assert main.logged_in_user(token).uuid == valid_user.uuid
