from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.sql import func

from app.database import Base


class DeliverySlot(Base):

    __tablename__ = "delivery_slots"

    id = Column(Integer, primary_key=True, index=True)

    slot_name = Column(String(100))

    start_time = Column(String(20))

    end_time = Column(String(20))

    max_orders = Column(Integer)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )