const stripe = require('stripe')('sk_test_51RIHtxCja8lmZne8cShjR3TA8VIUS5Q3bmbSc4fmBL62iZF0PwMwy5o4Wij0y0OHAUmYcXJttGSvfISUls0yYXSS00c1NtC2I4');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'https://coddicollective.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.static('public'));

const YOUR_DOMAIN = 'https://coddicollective.com';

// Root route to handle requests
app.get('/', (req, res) => {
  res.send('Welcome to Stripe Checkout!');
});

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'si_SD451a3HdE5VjD', // Updated with your actual Price ID here
        quantity: 1,
