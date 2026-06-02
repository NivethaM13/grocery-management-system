from pydantic import BaseModel


class ReturnCreate(BaseModel):

    order_id: int

    reason: str