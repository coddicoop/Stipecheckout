// This is your test secret API key.
const stripe = require('stripe')('sk_test_51RIHtxCja8lmZne8cShjR3TA8VIUS5Q3bmbSc4fmBL62iZF0PwMwy5o4Wij0y0OHAUmYcXJttGSvfISUls0yYXSS00c1NtC2I4');
const express = require('express');
const cors = require('cors'); // <-- Added this line
const app = express();

app.use(cors({
  origin: 'https://coddicollective.com', // <-- Your front-end website
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

// Root route to handle requests
app.get('/', (req, res) => {
  res.send('Welcome to Stripe Checkout!');
});

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `${YOUR_DOMAIN}/return.html?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({clientSecret: session.client_secret});
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.listen(4242, () => console.log('Running on port 4242'));
