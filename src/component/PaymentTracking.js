import React, { useEffect, useState } from 'react';

export default function PaymentTracking() {
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const storedPayment = JSON.parse(localStorage.getItem("selectedPayment"));
    if (storedPayment) {
      setPayment(storedPayment);
    }
  }, []);

  const togglePaymentStatus = () => {
    if (payment) {
      const updatedPayment = { ...payment, completed: !payment.completed };
      localStorage.setItem("selectedPayment", JSON.stringify(updatedPayment));
      setPayment(updatedPayment);
    }
  };

  if (!payment) {
    return <p>No payment data available.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Payment Tracking</h1>
      
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Field</th>
            <th className="border border-gray-300 p-2">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-2">Project Name</td>
            <td className="border border-gray-300 p-2">{payment.projectName}</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-2">Payment Method</td>
            <td className="border border-gray-300 p-2">{payment.paymentMethod}</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-2">Amount</td>
            <td className="border border-gray-300 p-2">${payment.amount.toFixed(2)}</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-2">Status</td>
            <td className="border border-gray-300 p-2">{payment.completed ? "Paid" : "Unpaid"}</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4">
        <button
          onClick={togglePaymentStatus}
          className={`px-4 py-2 rounded ${payment.completed ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"} text-white`}
        >
          Mark as {payment.completed ? "Unpaid" : "Paid"}
        </button>
      </div>
    </div>
  );
}
