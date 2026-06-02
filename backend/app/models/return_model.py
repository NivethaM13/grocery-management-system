from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.sql import func

from app.database import Base


class Return(Base):

    __tablename__ = "returns"

    id = Column(Integer, primary_key=True, index=True)

    order_id = Column(Integer)

    reason = Column(String(500))

    status = Column(String(50), default="Pending")

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )