from pydantic import BaseModel


class OrderCreate(BaseModel):

    customer_name: str

    product_name: str

    amount: float

    status: str

    email: str

    delivery_slot: str