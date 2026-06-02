from fastapi import APIRouter

from app.database import SessionLocal
from app.models.fraud_model import FraudAlert
from app.schemas.fraud_schema import FraudAlertCreate

router = APIRouter()


@router.post("/fraud-alert")
def create_fraud_alert(
    fraud: FraudAlertCreate
):

    db = SessionLocal()

    try:

        new_alert = FraudAlert(
            customer_name=fraud.customer_name,
            amount=fraud.amount,
            alert_type=fraud.alert_type
        )

        db.add(new_alert)

        db.commit()

        db.refresh(new_alert)

        return {
            "message": "Fraud alert created",
            "alert": new_alert
        }

    finally:

        db.close()


@router.get("/fraud-alerts")
def get_fraud_alerts():

    db = SessionLocal()

    try:

        return db.query(
            FraudAlert
        ).all()

    finally:

        db.close()