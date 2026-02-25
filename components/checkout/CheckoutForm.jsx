'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function CheckoutForm({ total }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      alert('Razorpay SDK failed to load');
      setLoading(false);
      return;
    }

    // Create order from backend
    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1 }),
    });

    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: "Urban Shoe",
      description: "Order Payment",
      handler: function (response) {
        console.log("Payment Success:", response);
        setSuccess(true);
      },
      prefill: {
        name: "",
        email: "",
      },
      theme: {
        color: "#6366f1",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          🎉 Payment Successful!
        </h2>
        <p className="text-muted-foreground">
          Thank you for shopping with us.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handlePayment}
      className="bg-card border border-border rounded-2xl p-8 space-y-6 shadow-sm"
    >
      <h2 className="text-xl font-bold text-foreground">
        Shipping Information
      </h2>

      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Full Name"
          required
          className="border border-border bg-background rounded-xl px-4 py-2 focus:ring-2 focus:ring-accent outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="border border-border bg-background rounded-xl px-4 py-2 focus:ring-2 focus:ring-accent outline-none"
        />
        <input
          type="text"
          placeholder="Address"
          required
          className="border border-border bg-background rounded-xl px-4 py-2 focus:ring-2 focus:ring-accent outline-none"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          'Pay with Razorpay'
        )}
      </Button>
    </form>
  );
}