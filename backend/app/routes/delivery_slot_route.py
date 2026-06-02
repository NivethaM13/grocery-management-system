from fastapi import APIRouter

from app.database import SessionLocal

from app.models.delivery_slot_model import DeliverySlot

router = APIRouter()


@router.get("/delivery-slots")
def get_delivery_slots():

    db = SessionLocal()

    try:

        slots = db.query(
            DeliverySlot
        ).all()

        return slots

    finally:

        db.close()