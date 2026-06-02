from fastapi import APIRouter
from app.database import SessionLocal
from app.models.supplier_model import Supplier
from app.schemas.supplier_schema import SupplierCreate

router = APIRouter()


@router.post("/add-supplier")
def add_supplier(supplier: SupplierCreate):

    db = SessionLocal()

    try:

        new_supplier = Supplier(
            name=supplier.name,
            phone=supplier.phone,
            email=supplier.email,
            address=supplier.address
        )

        db.add(new_supplier)

        db.commit()

        db.refresh(new_supplier)

        return {
            "message": "Supplier added successfully",
            "supplier": new_supplier
        }

    finally:

        db.close()


@router.get("/suppliers")
def get_suppliers():

    db = SessionLocal()

    try:

        return db.query(Supplier).all()

    finally:

        db.close()



@router.delete("/delete-supplier/{supplier_id}")
def delete_supplier(supplier_id: int):

    db = SessionLocal()

    try:

        supplier = db.query(Supplier).filter(
            Supplier.id == supplier_id
        ).first()

        if not supplier:
            return {
                "message": "Supplier not found"
            }

        db.delete(supplier)

        db.commit()

        return {
            "message": "Supplier deleted successfully"
        }

    finally:

        db.close()   



@router.put("/update-supplier/{supplier_id}")
def update_supplier(
    supplier_id: int,
    updated_supplier: SupplierCreate
):

    db = SessionLocal()

    try:

        supplier = db.query(Supplier).filter(
            Supplier.id == supplier_id
        ).first()

        if not supplier:
            return {
                "message": "Supplier not found"
            }

        supplier.name = updated_supplier.name
        supplier.phone = updated_supplier.phone
        supplier.email = updated_supplier.email
        supplier.address = updated_supplier.address

        db.commit()

        db.refresh(supplier)

        return {
            "message": "Supplier updated successfully",
            "supplier": supplier
        }

    finally:

        db.close()  