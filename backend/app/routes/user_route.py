from fastapi import APIRouter
from sqlalchemy.orm import Session



from app.schemas.user_schema import UserCreate, UserLogin
from app.models.user_model import User
from app.database import SessionLocal

from app.auth import (
    create_access_token,
    hash_password,
    verify_password
)

router = APIRouter()


# Database connection
def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/register")
def register(user: UserCreate):

    db = SessionLocal()

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email
        }
    }


@router.post("/login")
def login(user: UserLogin):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        return {
            "message": "User not found"
        }

    if not verify_password(
              user.password,
              existing_user.password
                ):
        return {
            "message": "Incorrect password"
        }

    token = create_access_token(
        data={
            "sub": existing_user.email
        }
    )

    return {
        "message": "Login successful",
        "access_token": token,
        "user": {
            "id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email
        }
    }