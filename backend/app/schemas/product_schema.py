from pydantic import BaseModel


class ProductCreate(BaseModel):

    name: str

    price: float

    description: str

    image: str

    rating: float

    review: str

    category: str

    stock: int