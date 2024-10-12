const express = require('express');
const { createPaymentIntent, confirmPayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);
router.post('/confirm-payment', confirmPayment);

module.exports = router;
