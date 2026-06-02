from fastapi import APIRouter

from app.database import SessionLocal

from app.models.return_model import Return

from app.schemas.return_schema import ReturnCreate

router = APIRouter()


@router.post("/add-return")
def add_return(return_data: ReturnCreate):

    db = SessionLocal()

    try:

        new_return = Return(
            order_id=return_data.order_id,
            reason=return_data.reason,
            status="Pending"
        )

        db.add(new_return)

        db.commit()

        db.refresh(new_return)

        return {
            "message": "Return request created successfully",
            "return": new_return
        }

    finally:

        db.close()


@router.get("/returns")
def get_returns():

    db = SessionLocal()

    try:

        return db.query(Return).all()

    finally:

        db.close()


@router.put("/update-return-status/{return_id}")
def update_return_status(
    return_id: int,
    status: str
):

    db = SessionLocal()

    try:

        return_request = db.query(Return).filter(
            Return.id == return_id
        ).first()

        if not return_request:

            return {
                "message": "Return request not found"
            }

        return_request.status = status

        db.commit()

        return {
            "message": "Status updated successfully"
        }

    finally:

        db.close()