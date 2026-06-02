from fastapi import APIRouter

from app.database import SessionLocal

from app.models.reward_model import RewardPoint

from app.schemas.reward_schema import RewardCreate

router = APIRouter()


@router.post("/add-reward")
def add_reward(reward: RewardCreate):

    db = SessionLocal()

    try:

        new_reward = RewardPoint(
            user_id=reward.user_id,
            points_earned=reward.points_earned
        )

        db.add(new_reward)

        db.commit()

        db.refresh(new_reward)

        return {
            "message": "Reward points added successfully",
            "reward": new_reward
        }

    finally:

        db.close()


@router.get("/rewards")
def get_rewards():

    db = SessionLocal()

    try:

        return db.query(RewardPoint).all()

    finally:

        db.close()