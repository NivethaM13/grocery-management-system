from fastapi import APIRouter

from app.schemas.order_schema import OrderCreate
from app.models.order_model import Order
from app.database import SessionLocal

router = APIRouter()


@router.post("/create-order")
def create_order(order: OrderCreate):

    db = SessionLocal()

    new_order = Order(
        customer_name=order.customer_name,
        product_name=order.product_name,
        amount=order.amount,
        status=order.status
    )

    db.add(new_order)

    db.commit()

    db.refresh(new_order)

    db.close()

    return {
        "message": "Order created successfully",
        "order": new_order
    }


@router.get("/orders")
def get_orders():

    db = SessionLocal()

    orders = db.query(Order).all()

    db.close()

    return orders