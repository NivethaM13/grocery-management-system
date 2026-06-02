from pydantic import BaseModel
from datetime import date


class CouponCreate(BaseModel):

    coupon_code: str

    discount_type: str

    discount_value: float

    minimum_order_amount: float

    expiry_date: date

    usage_limit: int

    is_active: bool