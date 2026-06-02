from pydantic import BaseModel


class PromotionCreate(BaseModel):

    title: str

    discount: str

    status: str