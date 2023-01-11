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


class UserNotFoundError(Exception):
    pass


def get_user_by_username(username: str) -> UserWithPassword:
    try:
        return ALL_USERS[username]
    except KeyError:
        raise UserNotFoundError()
