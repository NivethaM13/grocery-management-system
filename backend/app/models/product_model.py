from sqlalchemy import Column, Integer, String, Float

from app.database import Base


class Product(Base):

    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(200))

    description = Column(String(500))

    price = Column(Integer)

    image = Column(String(500))

    rating = Column(Float, default=0)

    review = Column(String(500), default="")

    category = Column(String(100), default="")