from datetime import datetime

import pydantic

from .user import User


class Quote(pydantic.BaseModel):
    quote: str
    quoted: User
    date: datetime
    reporter: User
    uuid: str
