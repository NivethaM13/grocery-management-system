from pydantic import BaseModel


class AuditLogCreate(BaseModel):

    action: str

    username: str