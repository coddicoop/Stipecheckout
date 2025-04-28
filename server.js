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
    ui_mode: 'embedded',
    line_items: [
      {
        price: 'si_SD451a3HdE5VjD', // <-- double-check this is your Subscription Price ID
        quantity: 1,
      },
    ],
    mode: 'subscription',
    return_url: `${YOUR_DOMAIN}/success-html/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/cancel-html/`,
  });

  res.send({ clientSecret: session.client_secret });
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
