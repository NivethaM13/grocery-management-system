from sqlalchemy import Column, Integer, TIMESTAMP
from sqlalchemy.sql import func

from app.database import Base


class RewardPoint(Base):

    __tablename__ = "reward_points"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer)

    points_earned = Column(Integer)

    points_used = Column(Integer, default=0)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )