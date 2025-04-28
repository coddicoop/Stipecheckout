// This is your test secret API key.
const stripe = Stripe("pk_test_51RIHtxCja8lmZne8Y5LKNS2YwAkcvTfqNHCEc8prEsQWHX9cMGwTjgWLFaqb89ydNeAKXGdRUls3F8tgcGEwaMEB00q6VbKDrz");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}