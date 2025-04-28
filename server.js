const stripe = require('stripe')('sk_test_51RIHtxCja8lmZne8cShjR3TA8VIUS5Q3bmbSc4fmBL62iZF0PwMwy5o4Wij0y0OHAUmYcXJttGSvfISUls0yYXSS00c1NtC2I4'); // Your real secret key
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'https://coddicollective.com',  // Your real domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // Needed to parse JSON body

app.get('/', (req, res) => {
  res.send('Welcome to Stripe Checkout!');
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1RIbfTCja8lmZne8bneO7vKI', // Your real price ID for the subscription
          quantity: 1,
        },
      ],
      success_url: 'https://coddicollective.com/success',
      cancel_url: 'https://coddicollective.com/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
