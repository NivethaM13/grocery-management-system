from reportlab.pdfgen import canvas


def generate_invoice(order):

    file_name = f"invoice_{order.id}.pdf"

    c = canvas.Canvas(file_name)

    c.setFont("Helvetica-Bold", 20)

    c.drawString(
        200,
        800,
        "Grocery Invoice"
    )

    c.setFont("Helvetica", 14)

    c.drawString(
        100,
        700,
        f"Customer: {order.customer_name}"
    )

    c.drawString(
        100,
        650,
        f"Product: {order.product_name}"
    )

    c.drawString(
        100,
        600,
        f"Amount: ₹{order.amount}"
    )

    c.drawString(
        100,
        550,
        f"Status: {order.status}"
    )

    c.save()

    return file_name