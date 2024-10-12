// src/components/PaymentForm.js
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_publishable_key');

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setMessage(error.message);
    } else {
      // Call your backend to create a payment intent
      const res = await fetch('/api/payment/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'usd' }),
      });

      const data = await res.json();
      if (data.clientSecret) {
        // Confirm the payment with Stripe
        const result = await stripe.confirmCardPayment(data.clientSecret);
        if (result.error) {
          setMessage(result.error.message);
        } else {
          setMessage('Payment successful!');
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
      {message && <div>{message}</div>}
    </form>
  );
};

const PaymentPage = ({ amount }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm amount={amount} />
  </Elements>
);

export default PaymentPage;
