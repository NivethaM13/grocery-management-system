from fastapi import APIRouter

from app.send_mail import send_order_email
from app.generate_invoice import generate_invoice

from sqlalchemy import func
from app.models.inventory_log_model import InventoryLog


from openpyxl import Workbook
from fastapi.responses import FileResponse

from app.models.product_model import Product
from app.models.reward_model import RewardPoint
from app.models.fraud_model import FraudAlert

from app.schemas.order_schema import OrderCreate
from app.models.order_model import Order
from app.database import SessionLocal


router = APIRouter()



@router.post("/create-order")
async def create_order(order: OrderCreate):

    db = SessionLocal()

    product = db.query(Product).filter(
        Product.name == order.product_name
    ).first()

    if product:

      if product.stock <= 0:

        db.close()

        return {
            "message": "Out Of Stock"
        }

    old_stock = product.stock

    product.stock -= 1

    inventory_log = InventoryLog(
        product_name=product.name,
        old_stock=old_stock,
        new_stock=product.stock
    )

    db.add(inventory_log)


    new_order = Order(
        customer_name=order.customer_name,
        product_name=order.product_name,
        amount=order.amount,
        status=order.status,
        delivery_slot=order.delivery_slot
    )

    db.add(new_order)

    db.commit()

    db.refresh(new_order)

    # Fraud Detection
    if order.amount > 10000:

        fraud_alert = FraudAlert(
            customer_name=order.customer_name,
            amount=order.amount,
            alert_type="High Value Order"
        )

        db.add(fraud_alert)

        db.commit()

    # Reward Points
    reward_points = int(order.amount // 10)

    new_reward = RewardPoint(
        user_id=1,
        points_earned=reward_points
    )

    db.add(new_reward)

    db.commit()

    generate_invoice(new_order)

    await send_order_email(order.email)

    db.close()

    return {
        "message": "Order created successfully",
        "order": new_order,
        "reward_points": reward_points
    }


@router.get("/orders")
def get_orders():

    db = SessionLocal()

    orders = db.query(Order).all()

    db.close()

    return orders


@router.get("/invoice/{order_id}")
def get_invoice(order_id: int):

    file_name = f"invoice_{order_id}.pdf"

    return FileResponse(
        path=file_name,
        media_type="application/pdf",
        filename=file_name
    )

@router.put("/cancel-order/{order_id}")
def cancel_order(order_id: int):

    db = SessionLocal()

    try:

        order = db.query(Order).filter(
            Order.id == order_id
        ).first()

        if not order:

            return {
                "message": "Order not found"
            }

        order.status = "Cancelled"

        db.commit()

        return {
            "message": "Order cancelled successfully"
        }

    finally:

        db.close()
@router.get("/revenue-analytics")
def revenue_analytics():

    db = SessionLocal()

    try:

        total_orders = db.query(Order).count()

        total_revenue = db.query(
            func.sum(Order.amount)
        ).scalar()

        if total_revenue is None:
            total_revenue = 0

        return {
            "total_orders": total_orders,
            "total_revenue": total_revenue
        }

    finally:

        db.close()



@router.get("/order-statistics")
def order_statistics():

    db = SessionLocal()

    try:

        delivered = db.query(Order).filter(
            Order.status == "Delivered"
        ).count()

        pending = db.query(Order).filter(
            Order.status == "Pending"
        ).count()

        cancelled = db.query(Order).filter(
            Order.status == "Cancelled"
        ).count()

        return {
            "delivered": delivered,
            "pending": pending,
            "cancelled": cancelled
        }

    finally:

        db.close()



@router.get("/recent-orders")
def recent_orders():

    db = SessionLocal()

    try:

        orders = (
            db.query(Order)
            .order_by(Order.id.desc())
            .limit(5)
            .all()
        )

        return orders

    finally:

        db.close()


@router.get("/export-orders")
def export_orders():

    db = SessionLocal()

    try:

        orders = db.query(Order).all()

        workbook = Workbook()

        sheet = workbook.active

        sheet.title = "Orders"

        sheet.append([
            "Order ID",
            "Customer",
            "Product",
            "Amount",
            "Status"
        ])

        for order in orders:

            sheet.append([
                order.id,
                order.customer_name,
                order.product_name,
                order.amount,
                order.status
            ])

        file_name = "orders.xlsx"

        workbook.save(file_name)

        return FileResponse(
            path=file_name,
            filename=file_name,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )

    finally:

        db.close()


@router.get("/top-products")
def top_products():

    db = SessionLocal()

    try:

        products = (
            db.query(
                Order.product_name,
                func.count(Order.id).label("total")
            )
            .group_by(Order.product_name)
            .order_by(
                func.count(Order.id).desc()
            )
            .limit(5)
            .all()
        )

        return [
            {
                "product": p.product_name,
                "orders": p.total
            }
            for p in products
        ]

    finally:

        db.close()


@router.put("/update-order-status/{order_id}")
def update_order_status(
    order_id: int,
    status: str
):

    db = SessionLocal()

    try:

        order = db.query(Order).filter(
            Order.id == order_id
        ).first()

        if not order:

            return {
                "message": "Order not found"
            }

        order.status = status

        db.commit()

        db.refresh(order)

        return {
            "message": "Order status updated",
            "order": order
        }

    finally:

        db.close()


@router.get("/notifications")
def notifications():

    db = SessionLocal()

    try:

        notifications = []

        low_stock_products = db.query(Product).filter(
            Product.stock < 10
        ).all()

        for product in low_stock_products:

            notifications.append({
                "type": "Low Stock",
                "message": f"{product.name} stock is low ({product.stock})"
            })

        fraud_alerts = db.query(FraudAlert).filter(
            FraudAlert.status == "Open"
        ).all()

        for alert in fraud_alerts:

            notifications.append({
                "type": "Fraud Alert",
                "message": f"{alert.customer_name} - ₹{alert.amount}"
            })

        return notifications

    finally:

        db.close()
