from fastapi_mail import FastMail, MessageSchema

from app.mail_config import conf


async def send_order_email(email: str):

    message = MessageSchema(
        subject="Order Confirmed",
        recipients=[email],
        body="""
        Your grocery order has been placed successfully.
        Thank you for shopping with us 🙂
        """,
        subtype="plain"
    )

    fm = FastMail(conf)

    await fm.send_message(message)