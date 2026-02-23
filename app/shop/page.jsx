"use client";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { CartSidebar } from "@/components/CartSidebar";
import { Button } from "@/components/ui/button";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { AlertCircle, Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function ShopPage() {
  const { products, loading, error } = useProducts();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category);
    return ["All", ...new Set(allCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // 🔎 Search
    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // 🏷 Category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // 💰 Price Filter
    if (selectedPrice !== "All") {
      if (selectedPrice === "under-100") {
        filtered = filtered.filter((p) => p.price < 100);
      }
      if (selectedPrice === "100-150") {
        filtered = filtered.filter((p) => p.price >= 100 && p.price <= 150);
      }
      if (selectedPrice === "150-200") {
        filtered = filtered.filter((p) => p.price > 150 && p.price <= 200);
      }
      if (selectedPrice === "200+") {
        filtered = filtered.filter((p) => p.price > 200);
      }
    }

    // ↕ Sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (sortBy === "stock-low") {
      filtered.sort((a, b) => a.stock - b.stock);
    }

    return filtered;
  }, [products, search, selectedCategory, selectedPrice, sortBy]);

  return (
    <div className="min-h-screen bg-dot-pattern bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-20 bg-card/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-accent-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">U Shoes</h1>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Our Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover premium sneakers with real-time stock updates.
          </p>
        </div>

        {/* 🔥 Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10 items-center justify-between">
          {/* Search */}
          <input
            type="text"
            placeholder="Search shoes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-1/3 border border-border bg-card rounded-xl px-4 py-2 text-foreground focus:ring-2 focus:ring-accent outline-none"
          />

          <div className="flex gap-4 w-full lg:w-auto">
            {/* Category */}
            <CustomDropdown
              options={categories.map((cat) => ({
                label: cat,
                value: cat,
              }))}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />

            {/* Price */}
            <CustomDropdown
              options={[
                { label: "All Prices", value: "All" },
                { label: "Under $100", value: "under-100" },
                { label: "$100 - $150", value: "100-150" },
                { label: "$150 - $200", value: "150-200" },
                { label: "$200+", value: "200+" },
              ]}
              value={selectedPrice}
              onChange={setSelectedPrice}
            />

            {/* Sorting */}
            <CustomDropdown
              options={[
                { label: "Sort By", value: "default" },
                { label: "Price: Low → High", value: "price-low" },
                { label: "Price: High → Low", value: "price-high" },
                { label: "Name: A → Z", value: "name-asc" },
                { label: "Name: Z → A", value: "name-desc" },
                { label: "Low Stock First", value: "stock-low" },
              ]}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 flex gap-3 rounded-lg bg-red-500/10 p-4 border border-red-500/20 items-start">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-500 mb-1">
                Error Loading Products
              </p>
              <p className="text-sm text-red-500/80">{error}</p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              No matching products found
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
              <p>Showing {filteredProducts.length} products</p>
            </div>
          </>
        )}
      </main>

      <CartSidebar />
    </div>
  );
}
