'use client';

import { useCartStore } from '@/lib/store/cartStore';

export function OrderSummary({ subtotal, shipping, tax, total }) {
  const { items } = useCartStore();

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
              &#8377;{(item.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>&#8377;{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `&#8377;${shipping}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>&#8377;{tax.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
          <span>Total</span>
          <span className="text-accent">
            &#8377;{total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}