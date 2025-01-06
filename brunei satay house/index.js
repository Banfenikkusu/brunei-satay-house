function processPayment() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const totalAmount = parseFloat(document.getElementById('total-amount').innerText.replace('Total: $', ''));

    if (paymentMethod === "Online") {
        const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY'); // Replace with your Publishable Key

        fetch('http://localhost:4242/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: totalAmount }),
        })
        .then(response => response.json())
        .then(session => {
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(result => {
            if (result.error) {
                alert(result.error.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        // Existing code for "Pay at Counter"
    }
}
