import "./globals.css";
import BottomNav from "../components/layout/BottomNav";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { CartProvider } from "../lib/CartContext";

// 1. VIEWPORT SETTINGS (The "Native App" Feel)
export const viewport = {
  themeColor: "#FAF8F3", // Matches your Cream background
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // 🔒 PREVENTS ZOOMING (Crucial for App feel)
};

// 2. METADATA (The "Passport")
export const metadata = {
  title: "Schephino's Kitchen - Premium Nigerian Cuisine",
  description: "Experience authentic Nigerian flavors elevated to perfection. Premium dishes crafted by master chefs.",
  manifest: "/manifest.json", // <-- Links to the file we made earlier
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Schephino's",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--cream-primary)] text-[var(--text-dark)] pb-20 lg:pb-0 overflow-x-hidden selection:bg-[var(--green-primary)] selection:text-white">
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