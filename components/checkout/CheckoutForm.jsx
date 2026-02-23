'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function CheckoutForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
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
      onSubmit={handleSubmit}
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

      <h3 className="font-semibold text-foreground mt-6">
        Payment Method
      </h3>

      <div className="flex gap-4">
        <div className="flex-1 border border-border rounded-xl p-4 cursor-pointer hover:border-accent">
          💳 Credit Card
        </div>
        <div className="flex-1 border border-border rounded-xl p-4 cursor-pointer hover:border-accent">
          🏦 UPI
        </div>
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
          'Pay Now'
        )}
      </Button>
    </form>
  );
}