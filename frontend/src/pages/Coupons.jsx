import { useEffect, useState } from "react";
import API from "../services/api";

function Coupons() {

  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {

    try {

      const response = await API.get("/coupons");

      setCoupons(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Coupons
      </h1>

      <div className="space-y-4">

        {coupons.map((coupon) => (

          <div
            key={coupon.id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-2xl font-bold text-green-600">
              {coupon.coupon_code}
            </h2>

            <p>
              Discount: {coupon.discount_value}
            </p>

            <p>
              Minimum Order: ₹{coupon.minimum_order_amount}
            </p>

            <p>
              Expiry: {coupon.expiry_date}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Coupons;