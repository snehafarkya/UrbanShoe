"use client";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { CartSidebar } from "@/components/CartSidebar";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { AlertCircle, Loader2, ShoppingBag, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useEffect, useCallback } from "react";

const PRODUCTS_PER_PAGE = 10;

export default function ShopPage() {
  const { products, loading, error } = useProducts();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);


  // Reset to page 1 whenever any filter/search/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedPrice, sortBy]);

  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category);
    return ["All", ...new Set(allCategories)];
  }, [products]);

  // All filtered + sorted products (no pagination yet)
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // 🔎 Search
    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🏷 Category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // 💰 Price Filter
    if (selectedPrice !== "All") {
      if (selectedPrice === "under-1000") filtered = filtered.filter((p) => p.price < 1000);
      if (selectedPrice === "1000-3500") filtered = filtered.filter((p) => p.price >= 1000 && p.price <= 3500);
      if (selectedPrice === "3500-8000") filtered = filtered.filter((p) => p.price > 3500 && p.price <= 8000);
      if (selectedPrice === "8000+") filtered = filtered.filter((p) => p.price > 8000);
    }

    // ↕ Sorting
    if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
    if (sortBy === "name-asc") filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "name-desc") filtered.sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === "stock-low") filtered.sort((a, b) => a.stock - b.stock);

    return filtered;
  }, [products, search, selectedCategory, selectedPrice, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const goToPage = useCallback((page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [totalPages]);

  // Build page number array with ellipsis
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  const hasActiveFilters = search || selectedCategory !== "All" || selectedPrice !== "All" || sortBy !== "default";

  const clearAllFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedPrice("All");
    setSortBy("default");
  };

  const startItem = filteredProducts.length === 0 ? 0 : (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length);

  return (
    <div className="min-h-screen bg-dot-pattern bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-20 bg-card/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-accent-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Urban Shoes</h1>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Our Collection</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover premium sneakers with real-time stock updates.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search shoes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
              className="w-full border border-border bg-card rounded-xl pl-10 pr-10 py-2 text-foreground focus:ring-2 focus:ring-accent outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-3 w-full lg:w-auto flex-wrap">
            <CustomDropdown
              options={categories.map((cat) => ({ label: cat, value: cat }))}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
            <CustomDropdown
              options={[
                { label: "All Prices", value: "All" },
                { label: "Under Rs. 1000", value: "under-1000" },
                { label: "Rs. 1000 - Rs. 3500", value: "1000-3500" },
                { label: "Rs. 3500 - Rs. 8000", value: "3500-8000" },
                { label: "Rs. 8000+", value: "8000+" },
              ]}
              value={selectedPrice}
              onChange={setSelectedPrice}
            />
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

        {/* Active filters + result count row */}
        <div className="flex items-center justify-between mb-8 min-h-[28px]">
          <p className="text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
            {!loading && filteredProducts.length > 0 && (
              <>Showing <span className="font-medium text-foreground">{startItem}–{endItem}</span> of <span className="font-medium text-foreground">{filteredProducts.length}</span> products</>
            )}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 text-xs text-accent hover:underline font-medium"
              aria-label="Clear all filters"
            >
              <X className="w-3 h-3" />
              Clear all filters
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 flex gap-3 rounded-lg bg-red-500/10 p-4 border border-red-500/20 items-start" role="alert">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-500 mb-1">Error Loading Products</p>
              <p className="text-sm text-red-500/80">{error}</p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20" aria-label="Loading products">
            <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20" role="status">
            <p className="text-lg text-muted-foreground mb-3">No matching products found</p>
            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="text-sm text-accent hover:underline">
                Clear filters and try again
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10"
              aria-label={`Products page ${currentPage} of ${totalPages}`}
            >
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="flex items-center justify-center gap-1 pt-8 border-t border-border"
                aria-label="Pagination"
              >
                {/* Prev */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {pageNumbers.map((page, idx) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="w-9 h-9 flex items-center justify-center text-sm text-muted-foreground"
                        aria-hidden="true"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-accent text-accent-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                {/* Next */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </nav>
            )}

            {/* Bottom count */}
            <p className="text-center text-xs text-muted-foreground mt-4" aria-live="polite">
              Page {currentPage} of {totalPages} · {filteredProducts.length} total products
            </p>
          </>
        )}
      </main>

      <CartSidebar />
    </div>
  );
}