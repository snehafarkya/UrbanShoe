'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Trash2, Plus, Minus, ChevronRight, X } from 'lucide-react';

export function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromCart, updateQuantity, getTotal, getItemCount } = useCartStore();

  const itemCount = getItemCount();
  const total = getTotal();

  const handleRemoveItem = (productId) => {
    const rollback = removeFromCart(productId);
    console.log('[v0] Product removed from cart:', productId);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    const rollback = updateQuantity(productId, newQuantity);
  };

  return (
    <>
      {/* Cart Button - Fixed Position */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-accent hover:bg-accent/90 text-accent-foreground p-4 rounded-full shadow-lg transition-all hover:scale-110"
        aria-label={`Shopping cart with ${itemCount} items`}
      >
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Cart Sidebar Panel */}
      <div
        className={`fixed right-0 top-0 h-screen bg-card border-l border-border w-full max-w-md transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Shopping Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <Card key={item.id} className="p-4 bg-muted/50 border-border">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    {item.image && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm mb-1">
                        {item.name}
                      </h3>
                      <p className="text-accent font-bold text-sm mb-3">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4 text-foreground" />
                        </button>
                        <span className="px-3 text-sm font-medium text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4 text-foreground" />
                        </button>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="ml-auto p-1 hover:bg-red-500/20 rounded transition-colors"
                          aria-label="Remove from cart"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {items.length > 0 && (
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold text-accent">
                  ${total.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes will be calculated at checkout
              </p>
              <Link href="/checkout">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold flex items-center gap-2">
                  Proceed to Checkout
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
