from pydantic import BaseModel


class OrderCreate(BaseModel):

    customer_name: str

    product_name: str

    amount: int

    status: str