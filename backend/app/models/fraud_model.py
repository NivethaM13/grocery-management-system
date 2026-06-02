from sqlalchemy import Column, Integer, String
from app.database import Base


class FraudAlert(Base):

    __tablename__ = "fraud_alerts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    customer_name = Column(
        String(200),
        nullable=False
    )

    amount = Column(
        Integer,
        nullable=False
    )

    alert_type = Column(
        String(200),
        nullable=False
    )

    status = Column(
        String(100),
        default="Open"
    )