import { useEffect, useState } from "react";

import API from "../services/api";

function Rewards() {

  const [rewards, setRewards] = useState([]);

  const [redeemedPoints, setRedeemedPoints] = useState(0);

  useEffect(() => {

    fetchRewards();

  }, []);

  const fetchRewards = async () => {

    try {

      const response = await API.get("/rewards");

      setRewards(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const totalPoints = rewards.reduce(
    (total, reward) =>
      total +
      reward.points_earned -
      reward.points_used,
    0
  );

  const redeemPoints = () => {

    if (totalPoints <= 0) {

      alert("No points available");

      return;
    }

    const pointsToRedeem = Math.min(
      totalPoints,
      50
    );

    setRedeemedPoints(pointsToRedeem);

    alert(
      `${pointsToRedeem} points redeemed successfully`
    );
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Reward Points
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-bold text-green-600">
          Total Available Points: {totalPoints}
        </h2>

        <h3 className="text-xl mt-3 text-blue-600">
          Redeemed Points: {redeemedPoints}
        </h3>

        <button
          onClick={redeemPoints}
          className="bg-green-600 text-white px-5 py-2 rounded-lg mt-4"
        >
          Redeem 50 Points
        </button>

      </div>

      <div className="space-y-4">

        {rewards.map((reward) => (

          <div
            key={reward.id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-2xl font-bold text-green-600">
              User ID: {reward.user_id}
            </h2>

            <p>
              Points Earned: {reward.points_earned}
            </p>

            <p>
              Points Used: {reward.points_used}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Rewards;