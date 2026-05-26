import { Link } from "react-router-dom";

import jsPDF from "jspdf";

function Success() {

  const downloadInvoice = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "Grocery Store Invoice",
      20,
      20
    );

    doc.setFontSize(14);

    doc.text(
      "Order Status: Successful",
      20,
      40
    );

    doc.text(
      "Thank you for your purchase!",
      20,
      55
    );

    doc.text(
      "Visit Again 🙂",
      20,
      70
    );

    doc.save("invoice.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">

      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-xl">

        <h1 className="text-5xl font-bold text-green-600 mb-6">
          🎉 Payment Successful
        </h1>

        <p className="text-xl text-gray-600 mb-10">
          Your order has been placed successfully.
        </p>

        <div className="flex gap-4 justify-center">

          <button
            onClick={downloadInvoice}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-blue-700"
          >

            Download Invoice

          </button>

          <Link to="/">

            <button className="bg-green-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-green-700">

              Back To Home

            </button>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Success;