from uuid import UUID

import pydantic


class User(pydantic.BaseModel):
    firstName: str
    lastName: str
    username: str
    photoUrl: str
    uuid: UUID
