from pydantic import BaseModel


class RewardCreate(BaseModel):

    user_id: int

    points_earned: int