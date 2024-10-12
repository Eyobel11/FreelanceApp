// src/pages/Payment.js
import React, { useState } from 'react';

const Payment = () => {
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency: 'usd' }),
    });
    const data = await res.json();
    setClientSecret(data.clientSecret);
  };

  const confirmPayment = async () => {
    const res = await fetch('/api/payments/confirm-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentIntentId: clientSecret }),
    });
    const paymentData = await res.json();
    alert(paymentData.status === 'succeeded' ? 'Payment confirmed!' : 'Failed');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Make a Payment</h1>
      <form onSubmit={handlePayment} className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700">Amount (USD):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create Payment Intent
        </button>
      </form>

      {clientSecret && (
        <button
          onClick={confirmPayment}
          className="mt-4 py-2 px-6 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Confirm Payment
        </button>
      )}
    </div>
  );
};

export default Payment;
