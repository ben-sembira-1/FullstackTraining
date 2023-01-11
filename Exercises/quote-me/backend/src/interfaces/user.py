from dataclasses import dataclass

import pydantic


class User(pydantic.BaseModel):
    firstName: str
    lastName: str
    username: str
    photoUrl: str
    uuid: str


@dataclass
class UserWithPassword:
    user: User
    password: str
