from fastapi import APIRouter

from app.database import SessionLocal

from app.models.promotion_model import Promotion

from app.schemas.promotion_schema import PromotionCreate

router = APIRouter()


@router.post("/add-promotion")
def add_promotion(promotion: PromotionCreate):

    db = SessionLocal()

    try:

        new_promotion = Promotion(
            title=promotion.title,
            discount=promotion.discount,
            status=promotion.status
        )

        db.add(new_promotion)

        db.commit()

        db.refresh(new_promotion)

        return {
            "message": "Promotion added successfully",
            "promotion": new_promotion
        }

    finally:

        db.close()


@router.get("/promotions")
def get_promotions():

    db = SessionLocal()

    try:

        return db.query(Promotion).all()

    finally:

        db.close()