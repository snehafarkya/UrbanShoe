'use client';

import { OrderSummary } from '@/components/checkout/OrderSummary';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { useCartStore } from '@/lib/store/cartStore';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { getTotal } = useCartStore();
const { user, loading } = useAuth();
const router = useRouter();

useEffect(() => {
  if (!loading && !user) {
    router.push("/login");
  }
}, [user, loading]);

  const subtotal = getTotal();
  const shipping = subtotal > 2000 ? 0 : 99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
      <CheckoutForm total={total} />
      <OrderSummary
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
      />
    </div>
  );
}