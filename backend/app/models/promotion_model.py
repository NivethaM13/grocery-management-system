from sqlalchemy import Column, Integer, String

from app.database import Base


class Promotion(Base):

    __tablename__ = "promotions"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(100))

    discount = Column(String(50))

    status = Column(String(20))