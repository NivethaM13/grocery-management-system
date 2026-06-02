from pydantic import BaseModel


class DeliverySlotCreate(BaseModel):

    slot_name: str

    start_time: str

    end_time: str

    max_orders: int