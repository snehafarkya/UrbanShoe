'use client';

import { useCartStore } from '@/lib/store/cartStore';

export function OrderSummary() {
  const { items, getTotal } = useCartStore();

  const subtotal = getTotal();
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-foreground">
              {item.name} × {item.quantity}
            </span>
            <span className="text-foreground font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
          <span>Total</span>
          <span className="text-accent">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}