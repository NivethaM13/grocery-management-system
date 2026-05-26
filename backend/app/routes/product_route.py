from fastapi import APIRouter

from app.schemas.product_schema import ProductCreate

from app.models.product_model import Product

from app.database import SessionLocal

router = APIRouter()


@router.post("/add-product")
def add_product(product: ProductCreate):

    db = SessionLocal()

    try:

        new_product = Product(
            name=product.name,
            description=product.description,
            price=product.price,
            image=product.image,
            rating=product.rating,
            review=product.review,
            category=product.category
        )

        db.add(new_product)

        db.commit()

        db.refresh(new_product)

        return {
            "message": "Product added successfully",
            "product": new_product
        }

    finally:

        db.close()


@router.get("/products")
def get_products():

    db = SessionLocal()

    try:

        products = db.query(Product).all()

        return products

    finally:

        db.close()


@router.delete("/delete-product/{product_id}")
def delete_product(product_id: int):

    db = SessionLocal()

    try:

        product = db.query(Product).filter(
            Product.id == product_id
        ).first()

        if not product:

            return {
                "message": "Product not found"
            }

        db.delete(product)

        db.commit()

        return {
            "message": "Product deleted successfully"
        }

    finally:

        db.close()


@router.put("/update-product/{product_id}")
def update_product(
    product_id: int,
    updated_product: ProductCreate
):

    db = SessionLocal()

    try:

        product = db.query(Product).filter(
            Product.id == product_id
        ).first()

        if not product:

            return {
                "message": "Product not found"
            }

        product.name = updated_product.name

        product.description = updated_product.description

        product.price = updated_product.price

        product.image = updated_product.image

        product.rating = updated_product.rating

        product.review = updated_product.review

        product.category = updated_product.category

        db.commit()

        return {
            "message": "Product updated successfully"
        }

    finally:

        db.close()