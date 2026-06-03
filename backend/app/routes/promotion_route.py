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



@router.delete("/delete-promotion/{promotion_id}")
def delete_promotion(promotion_id: int):

    db = SessionLocal()

    try:

        promotion = db.query(Promotion).filter(
            Promotion.id == promotion_id
        ).first()

        if not promotion:
            return {"message": "Promotion not found"}

        db.delete(promotion)

        db.commit()

        return {"message": "Promotion deleted successfully"}

    finally:

        db.close() 


@router.put("/update-promotion/{promotion_id}")
def update_promotion(
    promotion_id: int,
    promotion: PromotionCreate
):

    db = SessionLocal()

    try:

        existing = db.query(Promotion).filter(
            Promotion.id == promotion_id
        ).first()

        if not existing:
            return {"message": "Promotion not found"}

        existing.title = promotion.title
        existing.discount = promotion.discount
        existing.status = promotion.status

        db.commit()

        return {"message": "Promotion updated successfully"}

    finally:

        db.close()   