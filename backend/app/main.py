from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.order_model import Order

from app.routes.product_route import router as product_router

from app.routes.order_route import router as order_router

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

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Backend is running successfully"}