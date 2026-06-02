from sqlalchemy import Column, Integer, String
from app.database import Base


class InventoryLog(Base):

    __tablename__ = "inventory_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    product_name = Column(
        String(200)
    )

    old_stock = Column(
        Integer
    )

    new_stock = Column(
        Integer
    )