import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: '--font-sans' });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Urban Shoes',
  description: 'Experience real-time shopping with live product drops, instant stock updates, and a seamless checkout process.',
  keywords: ['ecommerce', 'shopping', 'real-time', 'products', 'checkout'],
  generator: 'Next.js',
  creator: 'Frontend Developer',
  icons: {
    icon: '/icon.jpg',
    apple: '/icon.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://urban-shoe-store.vercel.app',
    title: 'Urban Shoes - Modern E-Commerce',
    description: 'Experience real-time shopping with live product drops and instant stock updates',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#4f46e5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        <AuthProvider>
          {children}
        
        <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
