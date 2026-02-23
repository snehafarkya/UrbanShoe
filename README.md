# Premium Shoes E-Commerce Store

A modern, real-time e-commerce website built with React, Next.js, Firebase, and Zustand. Browse premium shoes, manage your shopping cart with optimistic updates, and enjoy a seamless shopping experience.

## Features

- **Real-time Product Listing** - Products sync instantly from Firebase Realtime Database
- **Live Stock Updates** - See inventory changes in real-time without refreshing
- **Smart Shopping Cart** - Zustand state management with localStorage persistence
- **Optimistic Cart Updates** - Cart updates instantly with automatic rollback on errors
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- **Error Handling** - Graceful error recovery and user feedback

## Tech Stack

- **Frontend**: React 19, Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4, shadcn/ui
- **State Management**: Zustand with persistence middleware
- **Backend**: Firebase Realtime Database
- **Deployment**: Vercel

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.jsx            # Landing page
│   ├── shop/
│   │   └── page.jsx        # Main shop page with products
│   └── api/                # Future API routes
├── components/
│   ├── ProductCard.jsx     # Individual product card
│   ├── CartSidebar.jsx     # Floating cart sidebar
│   └── ui/                 # shadcn/ui components
├── hooks/
│   └── useProducts.js      # Real-time products hook
├── lib/
│   ├── firebase.js         # Firebase configuration
│   └── store/
│       └── cartStore.js    # Zustand cart store
├── public/                 # Static assets
└── app/globals.css         # Global styles with design tokens
```

## Getting Started

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd premium-shoes-ecommerce

# Install dependencies
pnpm install
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or use existing one
3. Create a Web app and copy your config
4. Enable Realtime Database in your Firebase project

### 3. Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
```

### 4. Seed Firebase with Sample Data

Add sample products to your Firebase Realtime Database:

```
products/
├── shoe-001
│   ├── id: "shoe-001"
│   ├── name: "Nike Air Max 90"
│   ├── price: 129.99
│   ├── originalPrice: 159.99
│   ├── description: "Classic Air Max cushioning"
│   ├── category: "Running"
│   ├── stock: 15
│   └── image: "https://example.com/nike-air-max-90.jpg"
├── shoe-002
│   ├── id: "shoe-002"
│   ├── name: "Adidas Ultraboost 22"
│   ├── price: 189.99
│   ├── description: "Ultimate comfort and performance"
│   ├── category: "Running"
│   ├── stock: 8
│   └── image: "https://example.com/adidas-ultraboost-22.jpg"
...
```

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Real-Time Product Fetching

The `useProducts` hook establishes a Firebase Realtime Database listener:

```javascript
// In hooks/useProducts.js
const unsubscribe = onValue(
  ref(database, 'products'),
  (snapshot) => {
    // Updates component whenever products change
    const productsList = Object.entries(snapshot.val()).map(
      ([id, product]) => ({ id, ...product })
    );
    setProducts(productsList);
  }
);
```

When Firebase data changes, all connected clients receive updates instantly.

### Optimistic Cart Updates

The cart store provides optimistic updates with rollback capability:

```javascript
// In lib/store/cartStore.js
addToCart: (product) => {
  const previousItems = get().items;
  
  // Update UI immediately
  set({ items: [...items, product] });
  
  // Return rollback function in case of error
  return () => set({ items: previousItems });
}
```

The UI updates instantly for better UX, and automatically reverts if needed.

### Cart Persistence

Zustand's persist middleware saves cart to localStorage:

```javascript
persist(
  (set, get) => ({ /* store logic */ }),
  { name: 'cart-storage' }
)
```

Cart survives page refreshes and browser sessions.

## Key Components

### ProductCard
Displays individual products with:
- Product image, name, price
- Stock status indicators
- One-click add to cart
- Link to detailed product view

### CartSidebar
Floating cart panel with:
- Item list with images
- Quantity adjustment (+/-)
- Remove item functionality
- Cart total
- Optimistic update handling

### useProducts Hook
Manages real-time product fetching:
- Sets up Firebase listener on mount
- Cleans up listener on unmount
- Handles loading/error states
- Converts Firebase object to array

## Advanced Features

### Optimistic Updates with Rollback

```javascript
// In ProductCard.jsx
const rollback = addToCart(product);
// If something goes wrong, call rollback to restore previous state
```

### Real-Time Data Sync

```javascript
// Any changes to Firebase update all connected clients instantly
// No polling, no manual refresh needed
```

### localStorage Persistence

```javascript
// Cart persists across sessions
// Reload browser and cart items are still there
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel project settings
5. Deploy!

```bash
# Or deploy from CLI
pnpm i -g vercel
vercel
```

## Firebase Security Rules

Set up these rules in Firebase Console to protect your data:

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": false
    }
  }
}
```

Products are readable by everyone but writable only from admin.

## Learning Points for Recruiters

This project demonstrates:

1. **Real-time Data Sync** - Firebase listeners for live updates
2. **State Management** - Zustand with persistence middleware
3. **Optimistic UI** - Updates before server confirmation
4. **Hooks Pattern** - Custom hooks for data fetching
5. **Component Architecture** - Separated, reusable components
6. **Error Handling** - Graceful recovery and user feedback
7. **Performance** - Efficient re-renders, proper cleanup
8. **Accessibility** - ARIA labels, semantic HTML, keyboard nav
9. **Responsive Design** - Mobile-first, works everywhere
10. **Code Organization** - Clean folder structure, clear naming

## Troubleshooting

### Products not loading?

1. Check Firebase credentials in `.env.local`
2. Verify Realtime Database is enabled
3. Ensure database has sample products
4. Check browser console for errors

### Cart not persisting?

1. Check localStorage in DevTools
2. Verify `'cart-storage'` key exists
3. Check browser localStorage is enabled

### Styling looks broken?

1. Run `pnpm install` to ensure Tailwind is installed
2. Check `app/globals.css` is imported in layout
3. Verify Tailwind config is correct

## Next Steps

Consider adding:
- Authentication (Firebase Auth)
- Checkout flow (Stripe integration)
- Product filtering & search
- Product reviews & ratings
- Order history
- Admin dashboard for product management
- Mobile app with React Native

## License

MIT

## Support

For issues or questions, check the debug logs or open an issue in the repository.

---

**Built with ❤️ using React, Next.js & Firebase**
