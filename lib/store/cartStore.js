import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Cart Store using Zustand with persistence
 * Features:
 * - Optimistic cart updates (UI updates immediately, reverts on error)
 * - localStorage persistence for cart recovery
 * - Proper error handling with rollback capability
 * - Clean separation of concerns with clear actions
 */

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      error: null,

      // Add item to cart with optimistic update
      addToCart: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          // Update quantity optimistically
          const previousItems = items;
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item
            ),
            error: null,
          });

          // Return rollback function in case of error
          return () => set({ items: previousItems });
        } else {
          // Add new item optimistically
          const previousItems = items;
          set({
            items: [
              ...items,
              {
                ...product,
                quantity: product.quantity || 1,
                addedAt: new Date().toISOString(),
              },
            ],
            error: null,
          });

          return () => set({ items: previousItems });
        }
      },

      // Remove item from cart with optimistic update
      removeFromCart: (productId) => {
        const { items } = get();
        const previousItems = items;

        set({
          items: items.filter((item) => item.id !== productId),
          error: null,
        });

        // Return rollback function
        return () => set({ items: previousItems });
      },

      // Update item quantity with optimistic update
      updateQuantity: (productId, quantity) => {
        const { items } = get();

        if (quantity <= 0) {
          return get().removeFromCart(productId);
        }

        const previousItems = items;
        set({
          items: items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
          error: null,
        });

        return () => set({ items: previousItems });
      },

      // Clear entire cart
      clearCart: () => {
        const previousItems = get().items;
        set({ items: [], error: null });
        return () => set({ items: previousItems });
      },

      // Get cart total
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + (item.price || 0) * item.quantity,
          0
        );
      },

      // Get item count
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      // Get cart items
      getItems: () => get().items,

      // Set error state
      setError: (error) => set({ error }),

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'cart-storage', // localStorage key
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);
