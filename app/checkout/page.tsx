'use client';

import { useCartStore } from '@/lib/store/cartStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';

export default function CheckoutPage() {
  const { items } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) {
      router.push('/');
    }
  }, [items, router]);

  return (
    <div className="min-h-screen bg-background bg-dot-pattern">
      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12">
        <CheckoutForm />
        <OrderSummary />
      </div>
    </div>
  );
}