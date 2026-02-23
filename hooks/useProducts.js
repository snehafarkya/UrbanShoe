"use client";
import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '@/lib/firebase';

/**
 * Custom hook for fetching and listening to real-time product updates
 * Features:
 * - Real-time listener setup/cleanup
 * - Automatic error handling
 * - Loading state management
 * - Proper cleanup on unmount
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    // 🚨 Prevent execution during SSR
    if (typeof window === 'undefined' || !database) {
      return;
    }

    const productsRef = ref(database, 'products');

    const unsubscribe = onValue(
      productsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          const productsList = Object.entries(data).map(
            ([id, product]) => ({
              id,
              ...product,
            })
          );

          setProducts(productsList);
          setError(null);
        } else {
          setProducts([]);
        }

        setLoading(false);
      },
      (err) => {
        console.error('Firebase error loading products:', err);
        setError('Failed to load products. Please refresh.');
        setLoading(false);
      }
    );

    // ✅ Proper cleanup
    return () => {
      off(productsRef);
    };
  }, []);

  return { products, loading, error };
}

/**
 * Hook for getting a single product by ID with real-time updates
 */
export function useProduct(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    try {
      const productRef = ref(database, `products/${productId}`);

      const unsubscribe = onValue(
        productRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setProduct({
              id: productId,
              ...snapshot.val(),
            });
            setError(null);
          } else {
            setError('Product not found');
          }
          setLoading(false);
        },
        (err) => {
          console.error('[v0] Firebase error loading product:', err);
          setError('Failed to load product.');
          setLoading(false);
        }
      );

      return () => off(productRef);
    } catch (err) {
      console.error('[v0] Error setting up product listener:', err);
      setError('Failed to load product.');
      setLoading(false);
    }
  }, [productId]);

  return { product, loading, error };
}
