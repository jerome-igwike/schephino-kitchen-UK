import "./globals.css";
import BottomNav from "../components/layout/BottomNav";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { CartProvider } from "../lib/CartContext";

// 1. VIEWPORT (Locks the app feeling)
export const viewport = {
  themeColor: "#FAF8F3",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents zooming
};

// 2. METADATA (PWA Setup)
export const metadata = {
  title: "Schephino's Kitchen",
  description: "Premium Nigerian Cuisine in the UK",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Schephino's",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--cream-primary)] text-[var(--text-dark)] pb-20 lg:pb-0">
        <CartProvider>
          <Header />
          <main className="min-h-screen w-full">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}