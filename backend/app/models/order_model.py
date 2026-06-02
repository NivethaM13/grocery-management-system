from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database import Base


class Order(Base):

    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    customer_name = Column(String(200))

    product_name = Column(String(200))

    amount = Column(Integer)

    status = Column(String(100))

    delivery_slot = Column(String(100))

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )