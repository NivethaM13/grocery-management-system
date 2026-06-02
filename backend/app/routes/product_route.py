from fastapi import APIRouter
from app.schemas.product_schema import ProductCreate
from app.models.product_model import Product
from app.database import SessionLocal
from app.models.inventory_log_model import InventoryLog

from app.models.audit_log_model import AuditLog
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
            category=product.category,
            stock=product.stock
        )

        db.add(new_product)

        db.commit()

        db.refresh(new_product)

        print("AUDIT LOG CREATED")

        log = AuditLog(
            action=f"Added Product: {product.name}",
            username="Admin"
        )

    

        db.add(log)

        db.commit()

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

        return db.query(Product).all()

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

        log = AuditLog(
            action=f"Deleted Product: {product.name}",
            username="Admin"
        )

        db.add(log)

        db.commit()

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
        product.stock = updated_product.stock

        db.commit()
        db.refresh(product)

        return {
            "message": "Product updated successfully",
            "product": product
        }

    finally:
        db.close()
        
@router.get("/popular-products")
def get_popular_products():

    db = SessionLocal()

    try:

        products = (
            db.query(Product)
            .order_by(Product.rating.desc())
            .limit(4)
            .all()
        )

        return products

    finally:
        db.close()


@router.get("/low-stock-products")
def get_low_stock_products():

    db = SessionLocal()

    try:

        products = db.query(Product).filter(
            Product.stock < 10
        ).all()

        return products

    finally:

        db.close()       


@router.get("/product-analytics")
def product_analytics():

    db = SessionLocal()

    try:

        total_products = db.query(Product).count()

        in_stock = db.query(Product).filter(
            Product.stock > 0
        ).count()

        out_of_stock = db.query(Product).filter(
            Product.stock == 0
        ).count()

        return {
            "total_products": total_products,
            "in_stock": in_stock,
            "out_of_stock": out_of_stock
        }

    finally:

        db.close() 

        


@router.get("/product-count")
def product_count():

    db = SessionLocal()

    try:

        total_products = db.query(Product).count()

        return {
            "total_products": total_products
        }

    finally:

        db.close()


@router.put("/add-review/{product_id}")
def add_review(
    product_id: int,
    rating: float,
    review: str
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

        product.rating = rating

        product.review = review

        db.commit()

        db.refresh(product)

        log = AuditLog(
             action=f"Updated Product: {product.name}",
             username="Admin"
)
        
        db.add(log)

        db.commit()

        return {
            "message": "Review added successfully",
            "product": product
        }

    finally:

        db.close()



@router.get("/inventory-logs")
def inventory_logs():

    db = SessionLocal()

    try:

        return db.query(
            InventoryLog
        ).order_by(
            InventoryLog.id.desc()
        ).all()

    finally:

        db.close()     