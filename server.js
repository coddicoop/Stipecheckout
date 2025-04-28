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

app.get('/', (req, res) => {
  res.send('Welcome to Stripe Checkout!');
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1XXXXX', // <--- PUT YOUR REAL PRICE ID HERE
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}/success-html/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/cancel-html/`,
    });

    res.json(session.id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong creating the session.' });
  }
});

app.listen(4242, () => console.log('Running on port 4242'));
