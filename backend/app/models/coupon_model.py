from sqlalchemy import Column, Integer, String, Float, Boolean, Date, TIMESTAMP
from sqlalchemy.sql import func

from app.database import Base


class Coupon(Base):

    __tablename__ = "coupons"

    id = Column(Integer, primary_key=True, index=True)

    coupon_code = Column(String(50), unique=True)

    discount_type = Column(String(20))

    discount_value = Column(Float)

    minimum_order_amount = Column(Float)

    expiry_date = Column(Date)

    usage_limit = Column(Integer)

    is_active = Column(Boolean, default=True)

    created_at = Column(TIMESTAMP, server_default=func.now())