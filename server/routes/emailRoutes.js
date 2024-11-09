// emailRoutes.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use 'gmail' or another email service
      auth: {
        user: 'eyobel1214@gmail.com', // Your email address
        pass: 'nrkfgopmrczfrhsh',  // Your email password (or app password if using Gmail)
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: 'eyobel1214@gmail.com', // Your receiving email address
      subject: `New Contact Form Submission from ${name}`,
      text: `You received a new message from your website contact form:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

module.exports = router;
