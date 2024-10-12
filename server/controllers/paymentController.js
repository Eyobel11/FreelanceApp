const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use Stripe for payment

// Create payment intent
exports.createPaymentIntent = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe expects amount in cents
            currency: currency || 'usd',
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Payment failed to initiate' });
    }
};

// Payment confirmation logic
exports.confirmPayment = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
        res.status(200).json(paymentIntent);
    } catch (error) {
        console.error('Error confirming payment:', error);
        res.status(500).json({ error: 'Payment confirmation failed' });
    }
};
