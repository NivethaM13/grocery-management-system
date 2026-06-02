from fastapi import APIRouter

from app.database import SessionLocal

from app.models.audit_log_model import AuditLog

router = APIRouter()


@router.get("/audit-logs")
def get_audit_logs():

    db = SessionLocal()

    try:

        logs = db.query(AuditLog).all()

        return logs

    finally:

        db.close()