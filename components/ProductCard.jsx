'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, AlertCircle, Check } from 'lucide-react';


export function ProductCard({ product }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCartStore();

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (isOutOfStock) {
      return;
    }

    try {
      // Optimistic update with rollback
      const rollback = addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });

      // Show success feedback
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);

      console.log('[v0] Product added to cart:', product.name);
    } catch (error) {
      console.error('[v0] Error adding to cart:', error);
    }
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full overflow-hidden hover:border-accent/50 transition-colors cursor-pointer bg-card border-border group">
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}

          {/* Stock Badge */}
          <div className="absolute top-3 right-3 z-10">
            {isOutOfStock ? (
              <div className="flex items-center gap-1 bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                <AlertCircle className="w-3 h-3" />
                Out of Stock
              </div>
            ) : isLowStock ? (
              <div className="flex items-center gap-1 bg-yellow-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                <AlertCircle className="w-3 h-3" />
                {product.stock} Left
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                <Check className="w-3 h-3" />
                In Stock
              </div>
            )}
          </div>

          {/* Category Badge */}
          {product.category && (
            <div className="absolute top-3 left-3 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              {product.category}
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col h-48">
          <h3 className="font-bold text-foreground mb-1 line-clamp-2 text-sm">
            {product.name}
          </h3>

          <p className="text-xs text-muted-foreground mb-3 line-clamp-2 ">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-bold text-accent">
             &#8377;{product.price?.toFixed(2)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-muted-foreground line-through">
                &#8377;{product.originalPrice?.toFixed(2)}
              </div>
            )}
          </div>

          {/* Add to Cart Button - Click handler prevents navigation */}
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock || addedToCart}
            className={`w-full mt-auto transition-all ${
              addedToCart
                ? 'bg-success text-background hover:bg-success'
                : isOutOfStock
                ? 'opacity-50 cursor-not-allowed'
                : 'bg-accent hover:bg-accent/90 text-accent-foreground'
            }`}
          >
            {addedToCart ? (
              <span className="flex items-center  gap-2">
                <Check className="w-4 h-4" />
                Added!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </span>
            )}
          </Button>
        </div>
      </Card>
    </Link>
  );
}
