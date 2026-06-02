from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.order_model import Order

from app.models.audit_log_model import AuditLog
from app.routes.audit_log_route import router as audit_log_router
from app.routes.return_route import router as return_router
from app.models.fraud_model import FraudAlert
from app.routes.fraud_route import router as fraud_router

from app.models.promotion_model import Promotion
from app.routes.promotion_route import router as promotion_router

from app.routes.product_route import router as product_router
from app.routes.delivery_slot_route import router as delivery_slot_router
from app.routes.reward_route import router as reward_router

from app.models.inventory_log_model import InventoryLog

from app.routes.supplier_route import router as supplier_router

from app.models.supplier_model import Supplier

from app.routes.order_route import router as order_router
from app.routes.coupon_route import router as coupon_router

from app.models.product_model import Product
from app.database import engine
from app.models.user_model import User
from app.database import Base

from app.routes.user_route import router as user_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)

app.include_router(product_router)

app.include_router(order_router)

app.include_router(coupon_router)

app.include_router(reward_router)

app.include_router(return_router)

app.include_router(delivery_slot_router)

app.include_router(fraud_router)

app.include_router(audit_log_router)

app.include_router(supplier_router)

app.include_router(promotion_router)

Base.metadata.create_all(bind=engine)




@app.get("/")
def home():
    return {"message": "Backend is running successfully"}