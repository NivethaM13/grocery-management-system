from pydantic import BaseModel


class ProductCreate(BaseModel):

    name: str

    description: str

    price: int

    image: str

    rating: float = 0

    review: str = ""

    category: str = ""