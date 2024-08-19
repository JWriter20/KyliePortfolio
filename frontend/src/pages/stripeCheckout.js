import React, { useEffect, useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch the clientSecret from your PHP backend when the component mounts
    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await axios.post('/api/payment_intent', {
                    amount: price, // Specify the amount here
                });

                if (response.data.error) {
                    setError(response.data.error);
                } else {
                    setClientSecret(response.data.clientSecret);
                }
            } catch (err) {
                setError('Failed to create payment intent.');
            }
        };

        createPaymentIntent();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            return;
        }

        setLoading(true);
        setError(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://localhost:4000/order-confirmation",
            },
            clientSecret, // Use the clientSecret retrieved from your backend
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Payment succeeded, Stripe will handle the redirection
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {error && <div>{error}</div>}
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

export default CheckoutForm;
