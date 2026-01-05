const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json()); // To parse JSON bodies

// 1. Create a Transporter
// This is the configuration for your email service (Gmail, Outlook, etc.)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your App Password (not your login password)
    }
});

// 2. Define the Send Route
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Error sending email");
        }
        res.status(200).send("Email sent successfully: " + info.response);
    });
});


app.get("/", (req, res) => {

        res.status(200).send("Hello from another world");
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});