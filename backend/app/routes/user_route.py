from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.schemas.user_schema import UserCreate, UserLogin
from app.models.user_model import User
from app.database import SessionLocal
from app.auth import hash_password

from fastapi import Body

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
            "email": new_user.email,
            "is_admin": new_user.is_admin
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
            "email": existing_user.email,
            "is_admin": existing_user.is_admin
        }
    }

@router.put("/forgot-password")
def forgot_password(

    email: str = Body(...),

    new_password: str = Body(...)
):

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:

        return {
            "message": "User not found"
        }

    user.password = hash_password(new_password)

    db.commit()

    db.close()

    return {
        "message": "Password updated successfully"
    }


@router.get("/users")
def get_users():

    db = SessionLocal()

    try:

        users = db.query(User).all()

        return [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "is_admin": user.is_admin
            }
            for user in users
        ]

    finally:

        db.close()



@router.get("/user-count")
def user_count():

    db = SessionLocal()

    try:

        total_users = db.query(User).count()

        return {
            "total_users": total_users
        }

    finally:

        db.close()