from pydantic import BaseModel


class FraudAlertCreate(BaseModel):

    customer_name: str

    amount: int

    alert_type: str