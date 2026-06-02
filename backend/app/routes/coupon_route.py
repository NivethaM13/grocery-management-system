from fastapi import APIRouter

from datetime import date

from app.database import SessionLocal

from app.models.coupon_model import Coupon

from app.schemas.coupon_schema import CouponCreate

router = APIRouter()


@router.post("/add-coupon")
def add_coupon(coupon: CouponCreate):

    db = SessionLocal()

    try:

        new_coupon = Coupon(
            coupon_code=coupon.coupon_code,
            discount_type=coupon.discount_type,
            discount_value=coupon.discount_value,
            minimum_order_amount=coupon.minimum_order_amount,
            expiry_date=coupon.expiry_date,
            usage_limit=coupon.usage_limit,
            is_active=coupon.is_active
        )

        db.add(new_coupon)

        db.commit()

        db.refresh(new_coupon)

        return {
            "message": "Coupon added successfully",
            "coupon": new_coupon
        }

    finally:

        db.close()


@router.get("/coupons")
def get_coupons():

    db = SessionLocal()

    try:

        return db.query(Coupon).all()

    finally:

        db.close()

        



@router.post("/apply-coupon/{coupon_code}")
def apply_coupon(
    coupon_code: str,
    order_amount: float
):

    db = SessionLocal()

    try:

        coupon = db.query(Coupon).filter(
            Coupon.coupon_code == coupon_code
        ).first()

        if not coupon:
            return {
                "message": "Invalid coupon"
            }

        if not coupon.is_active:
            return {
                "message": "Coupon inactive"
            }

        if coupon.expiry_date < date.today():
            return {
                "message": "Coupon expired"
            }

        if order_amount < coupon.minimum_order_amount:
            return {
                "message": f"Minimum order amount is {coupon.minimum_order_amount}"
            }

        if coupon.discount_type == "PERCENTAGE":

            discount = (
                order_amount *
                coupon.discount_value
            ) / 100

        else:

            discount = coupon.discount_value

        final_amount = order_amount - discount

        return {
            "coupon": coupon.coupon_code,
            "discount": discount,
            "final_amount": final_amount
        }

    finally:

        db.close()