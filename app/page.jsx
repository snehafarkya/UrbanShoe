'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shoe, Award, Truck, Shield, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import hero from './hero.png';
/**
 * Landing Page - Premium Shoes Store
 * Showcases the store with CTA to shop
 */
export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background bg-dot-pattern">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-20 bg-card/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-accent-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Urban Shoes</h1>
          </div>
          <Link href="/shop" className='cursor-pointer'>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Shop Now
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-20">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div>
            <h2 className="text-5xl sm:text-6xl lg:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
              Step Into Excellence with <span className="text-accent">Urban Shoes</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-balance max-w-xl">
              Discover our curated collection of premium shoes. Real-time inventory, lightning-fast shopping cart, and seamless checkout.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <span className="flex items-center gap-2">
                    Shop Collection
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
              <Image width={500} height={400} alt='hero image' className='rounded-2xl drop-shadow-xl' src="https://www.libertyshoes.com/sites/default/files/2024-10/fashion-mobile.jpg"/>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 sm:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">
              The Art of Luxury
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Crafted for those who demand excellence in every step
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Italian Craftsmanship */}
            <div className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 ${
              activeIndex === 0 ? 'ring-2 ring-accent scale-105' : ''
            } hover:border-accent/50 cursor-pointer`}
              onMouseEnter={() => setActiveIndex(0)}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors duration-300">
                  <Award className="w-7 h-7 text-accent" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  Italian Craftsmanship
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Handpicked designs from master cobblers with decades of heritage. Every pair tells a story of excellence.
                </p>
              </div>
            </div>

            {/* Card 2: Express Delivery */}
            <div className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 ${
              activeIndex === 1 ? 'ring-2 ring-accent scale-105' : ''
            } hover:border-accent/50 cursor-pointer`}
              onMouseEnter={() => setActiveIndex(1)}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors duration-300">
                  <Truck className="w-7 h-7 text-accent" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  Global Express Delivery
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Fast, secure shipping to 180+ countries. Premium packaging ensures your luxury purchase arrives pristine.
                </p>
              </div>
            </div>

            {/* Card 3: Authenticity Guaranteed */}
            <div className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 ${
              activeIndex === 2 ? 'ring-2 ring-accent scale-105' : ''
            } hover:border-accent/50 cursor-pointer`}
              onMouseEnter={() => setActiveIndex(2)}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors duration-300">
                  <Shield className="w-7 h-7 text-accent" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  100% Authenticity
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Every shoe authenticated by our experts. Certified provenance and lifetime warranty on all purchases.
                </p>
              </div>
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-8 bg-accent' : 'w-2 bg-border'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="bg-card py-20 sm:py-32 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Curated Collections
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Discover exclusive selections from the world's most prestigious brands
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'Classic Icons', 
                desc: 'Timeless elegance',
                color: 'from-blue-500/20 to-transparent'
              },
              { 
                name: 'Limited Editions', 
                desc: 'Exclusively rare',
                color: 'from-purple-500/20 to-transparent'
              },
              { 
                name: 'Performance Elite', 
                desc: 'Sport & luxury',
                color: 'from-pink-500/20 to-transparent'
              },
              { 
                name: 'Seasonal Drops', 
                desc: 'New arrivals weekly',
                color: 'from-amber-500/20 to-transparent'
              },
            ].map((collection, idx) => (
              <div
                key={collection.name}
                className="group relative overflow-hidden rounded-xl border border-border bg-background hover:border-accent/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.color}`} />
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                      {collection.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {collection.desc}
                    </p>
                  </div>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-accent text-sm font-medium flex items-center gap-2">
                      Explore <ArrowRight className="w-4 h-4" />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
            Experience Luxury at Every Step
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Join thousands of collectors and enthusiasts who trust us with their most prized acquisitions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/shop">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 group transition-all duration-300">
                <span className="flex items-center gap-2">
                  Explore Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Trust metrics */}
          <div className="grid sm:grid-cols-3 gap-6 mt-16 pt-8 border-t border-border">
            <div className="space-y-1 group cursor-pointer">
              <p className="text-2xl font-bold text-accent group-hover:text-white transition-colors duration-300">10,000+</p>
              <p className="text-muted-foreground text-sm">Luxury Pairs Available</p>
            </div>
            <div className="space-y-1 group cursor-pointer">
              <p className="text-2xl font-bold text-accent group-hover:text-white transition-colors duration-300">50,000+</p>
              <p className="text-muted-foreground text-sm">Happy Collectors</p>
            </div>
            <div className="space-y-1 group cursor-pointer">
              <p className="text-2xl font-bold text-accent group-hover:text-white transition-colors duration-300">98%</p>
              <p className="text-muted-foreground text-sm">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {/* <Shoe className="w-5 h-5 text-accent" /> */}
                <span className="font-bold text-foreground">Premium Shoes</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The world's destination for luxury footwear
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Men's Collection</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Women's Collection</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Limited Editions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Service</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Authentication</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Premium Shoes. All rights reserved. Luxury redefined.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
